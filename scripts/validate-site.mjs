import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const domain = "https://www.panpantechnology.com";
const errors = [];
const warnings = [];
const verificationHtmlPattern = /^google[a-z0-9]+\.html$/i;

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, matcher, output = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if ([".git", "node_modules"].includes(entry.name)) continue;
      await walk(fullPath, matcher, output);
    } else if (matcher(fullPath)) {
      output.push(fullPath);
    }
  }
  return output;
}

function rel(filePath) {
  return path.relative(root, filePath).replaceAll("\\", "/");
}

function routeForFile(filePath) {
  const relative = rel(filePath);
  if (relative === "index.html") return "/";
  return `/${relative.replace(/index\.html$/, "")}`;
}

function routeToFile(route) {
  let clean = route.split("#")[0].split("?")[0];
  if (clean.startsWith(domain)) clean = clean.slice(domain.length);
  if (clean === "/" || clean === "") return path.join(root, "index.html");
  if (clean.endsWith(".html")) return path.join(root, clean.replace(/^\//, ""));
  return path.join(root, clean.replace(/^\//, ""), "index.html");
}

function getAttrs(tag) {
  const attrs = {};
  const pattern = /([a-zA-Z_:.-]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let match;
  while ((match = pattern.exec(tag))) {
    const name = match[1].toLowerCase();
    attrs[name] = match[3] ?? match[4] ?? match[5] ?? "";
  }
  return attrs;
}

function stripFragment(route) {
  const index = route.indexOf("#");
  return index >= 0 ? route.slice(index + 1) : "";
}

function hasFragmentTarget(html, fragment) {
  if (!fragment) return true;
  const encoded = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\s(id|name)=["']${encoded}["']`).test(html);
}

function isExternal(href) {
  return /^https?:\/\//.test(href) && !href.startsWith(domain);
}

const htmlFiles = await walk(root, (filePath) => filePath.endsWith(".html"));
const generatedHtml = htmlFiles.filter((filePath) => {
  const relative = rel(filePath);
  return relative !== "404.html" && !verificationHtmlPattern.test(path.basename(relative));
});

for (const filePath of htmlFiles) {
  const content = await readFile(filePath, "utf8");
  const relative = rel(filePath);
  const is404 = relative === "404.html";
  const isVerificationHtml = verificationHtmlPattern.test(path.basename(relative));

  if (isVerificationHtml) continue;

  for (const bad of [
    "<x-dc",
    "<sc-",
    "data-dc-script",
    "support.js",
    "current-site/assets",
    ".dc.html",
    "{{",
    "\u951f",
    "\u95b3",
    "\u94cf",
    "\u5a55",
    "\u8dfa",
    "\ufffd",
  ]) {
    if (content.includes(bad)) errors.push(`${relative}: generated page contains build/runtime residue: ${bad}`);
  }

  if (!/<title>[^<]{10,90}<\/title>/.test(content)) {
    errors.push(`${relative}: missing or weak <title>`);
  }

  if (!is404 && !/<meta name="description" content="[^"]{50,220}">/.test(content)) {
    errors.push(`${relative}: missing or weak meta description`);
  }

  if (!is404 && !/<link rel="canonical" href="https:\/\/www\.panpantechnology\.com\/[^"]*">/.test(content)) {
    errors.push(`${relative}: missing canonical`);
  }

  const h1Count = (content.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1) errors.push(`${relative}: expected exactly one H1, found ${h1Count}`);

  if (!is404) {
    if (!content.includes('property="og:image" content="https://www.panpantechnology.com/assets/images/panpantech-social-card.jpg"')) {
      errors.push(`${relative}: og:image is not the PanPanTech brand social card`);
    }
    if (!content.includes('name="twitter:image" content="https://www.panpantechnology.com/assets/images/panpantech-social-card.jpg"')) {
      errors.push(`${relative}: twitter:image is not the PanPanTech brand social card`);
    }
  }

  const jsonLdBlocks = [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!is404 && jsonLdBlocks.length === 0) errors.push(`${relative}: missing JSON-LD`);
  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      errors.push(`${relative}: invalid JSON-LD (${error.message})`);
    }
  }

  const anchorTags = [...content.matchAll(/<a\b[^>]*>/g)];
  for (const match of anchorTags) {
    const attrs = getAttrs(match[0]);
    const href = attrs.href;
    if (!href || href === "#" || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;
    if (isExternal(href)) continue;
    if (!href.startsWith("/") && !href.startsWith(domain) && !href.startsWith("#")) continue;
    const targetFile = href.startsWith("#") ? filePath : routeToFile(href);
    if (!(await exists(targetFile))) {
      errors.push(`${relative}: broken internal link ${href}`);
      continue;
    }
    const fragment = stripFragment(href);
    if (fragment) {
      const targetContent = await readFile(targetFile, "utf8");
      if (!hasFragmentTarget(targetContent, fragment)) {
        errors.push(`${relative}: missing fragment target ${href}`);
      }
    }
  }

  const imageTags = [...content.matchAll(/<img\b[^>]*>/g)];
  for (const match of imageTags) {
    const attrs = getAttrs(match[0]);
    const src = attrs.src;
    if (!src || src.startsWith("http") || src.startsWith("data:")) continue;
    const target = path.join(root, src.replace(/^\//, ""));
    if (!(await exists(target))) {
      errors.push(`${relative}: missing image ${src}`);
    }
    if (!attrs.alt) warnings.push(`${relative}: image missing alt ${src}`);
  }

  const videoTags = [...content.matchAll(/<video\b[^>]*>/g)];
  for (const match of videoTags) {
    const attrs = getAttrs(match[0]);
    const src = attrs.src;
    if (!src || src.startsWith("http") || src.startsWith("data:")) continue;
    const target = path.join(root, src.replace(/^\//, ""));
    if (!(await exists(target))) errors.push(`${relative}: missing video ${src}`);
    if (attrs.poster && !(await exists(path.join(root, attrs.poster.replace(/^\//, ""))))) {
      errors.push(`${relative}: missing video poster ${attrs.poster}`);
    }
  }
}

for (const required of [
  "robots.txt",
  "llms.txt",
  "sitemap.xml",
  "CNAME",
  ".nojekyll",
  "_headers",
  "favicon.ico",
  "assets/images/panpantech-logo.png",
  "assets/images/panpantech-social-card.jpg",
  "assets/images/panpantech-favicon.png",
  "assets/images/favicon-48x48.png",
  "assets/images/apple-touch-icon.png",
  "assets/css/responsive.css",
  "assets/js/site.js",
]) {
  if (!(await exists(path.join(root, required)))) errors.push(`missing ${required}`);
}

const siteJs = await readFile(path.join(root, "assets/js/site.js"), "utf8");
if (!siteJs.includes("https://inquiry.panpantechnology.com/api/inquiries")) {
  errors.push("assets/js/site.js: RFQ endpoint is not connected");
}

const rfq = await readFile(path.join(root, "request-a-quote/index.html"), "utf8");
if (!rfq.includes('class="cleanbot-quote-form"') || !rfq.includes('action="https://inquiry.panpantechnology.com/api/inquiries"')) {
  errors.push("request-a-quote/index.html: RFQ form is not wired to the inquiry service");
}

const home = await readFile(path.join(root, "index.html"), "utf8");
if (!home.includes("data-hero-carousel")) {
  errors.push("index.html: home hero carousel marker is missing");
}
if ((home.match(/data-hero-card=/g) ?? []).length !== 4) {
  errors.push("index.html: expected 4 hero carousel cards");
}
if ((home.match(/data-hero-media=/g) ?? []).length !== 4) {
  errors.push("index.html: expected 4 hero carousel media layers");
}
if (!siteJs.includes("initializeHeroCarousel")) {
  errors.push("assets/js/site.js: home hero carousel script is missing");
}

const retailVideoPath = path.join(root, "assets/videos/esl-hero.mp4");
if (await exists(retailVideoPath)) {
  const retailVideo = await readFile(retailVideoPath);
  const signature = retailVideo.toString("latin1");
  if (!signature.includes("avc1") || signature.includes("hvc1") || signature.includes("hev1")) {
    errors.push("assets/videos/esl-hero.mp4: expected H.264/avc1 video, not HEVC");
  }
  const info = await stat(retailVideoPath);
  if (info.size <= 1024) errors.push("assets/videos/esl-hero.mp4: video file is unexpectedly small");
} else {
  errors.push("missing assets/videos/esl-hero.mp4");
}

const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
for (const filePath of generatedHtml) {
  const route = routeForFile(filePath);
  if (!sitemap.includes(`${domain}${route}`)) {
    errors.push(`sitemap.xml: missing ${route}`);
  }
}

if (warnings.length) {
  console.warn("Warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error("Validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validation passed: ${htmlFiles.length} HTML files checked.`);
