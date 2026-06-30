import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const errors = [];
const warnings = [];

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

function routeToFile(route) {
  const clean = route.split("#")[0].split("?")[0];
  if (clean === "/") return path.join(root, "index.html");
  if (clean.endsWith(".html")) return path.join(root, clean.slice(1));
  return path.join(root, clean.slice(1), "index.html");
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
  return route.includes("#") ? route.slice(route.indexOf("#") + 1) : "";
}

function hasFragmentTarget(html, fragment) {
  if (!fragment) return true;
  const encoded = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\s(id|name)=["']${encoded}["']`).test(html);
}

const htmlFiles = await walk(root, (filePath) => filePath.endsWith(".html"));

for (const filePath of htmlFiles) {
  const content = await readFile(filePath, "utf8");
  const relative = rel(filePath);

  for (const bad of ["�", "鈥", "虏", "漏", "路"]) {
    if (content.includes(bad)) errors.push(`${relative}: mojibake marker found: ${bad}`);
  }

  if (!/<title>[^<]{10,80}<\/title>/.test(content)) {
    errors.push(`${relative}: missing or weak <title>`);
  }

  if (!/<meta name="description" content="[^"]{80,180}">/.test(content)) {
    errors.push(`${relative}: missing or weak meta description`);
  }

  if (!/<link rel="canonical" href="https:\/\/panpantechnology\.com\/[^"]*">/.test(content)) {
    errors.push(`${relative}: missing canonical`);
  }

  const h1Count = (content.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1) errors.push(`${relative}: expected exactly one H1, found ${h1Count}`);

  const jsonLdBlocks = [...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (jsonLdBlocks.length === 0) errors.push(`${relative}: missing JSON-LD`);
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
    if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    if (!href.startsWith("/")) continue;
    const targetFile = routeToFile(href);
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
    if (!(await exists(path.join(root, src.replace(/^\//, ""))))) {
      errors.push(`${relative}: missing image ${src}`);
    }
    if (!attrs.alt) warnings.push(`${relative}: image missing alt ${src}`);
    if (!attrs.width || !attrs.height) warnings.push(`${relative}: image missing width/height ${src}`);
  }
}

for (const required of ["robots.txt", "llms.txt", "sitemap.xml", "CNAME", ".nojekyll", "_headers"]) {
  if (!(await exists(path.join(root, required)))) errors.push(`missing ${required}`);
}

const css = await readFile(path.join(root, "assets/css/site.css"), "utf8");
if (/letter-spacing:\s*-/.test(css)) errors.push("assets/css/site.css: negative letter-spacing is not allowed");
if (/font-size:[^;]*(vw|clamp|min|max)/.test(css)) {
  errors.push("assets/css/site.css: viewport-scaled font-size is not allowed");
}
if (/style="/.test((await Promise.all(htmlFiles.map((filePath) => readFile(filePath, "utf8")))).join("\n"))) {
  errors.push("inline style attributes found");
}

const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
for (const filePath of htmlFiles) {
  if (rel(filePath) === "404.html") continue;
  const route =
    rel(filePath) === "index.html"
      ? "/"
      : `/${rel(filePath).replace(/index\.html$/, "")}`;
  if (!sitemap.includes(`https://panpantechnology.com${route}`)) {
    errors.push(`sitemap.xml: missing ${route}`);
  }
}

const imageStats = await Promise.all(
  ["assets/images/p060-hero.jpg", "assets/images/p060-product.jpg", "assets/images/p060-studio.jpg", "assets/images/robot-dark-hero.jpg"].map(
    async (image) => [image, await stat(path.join(root, image))]
  )
);
for (const [image, info] of imageStats) {
  if (info.size <= 0) errors.push(`${image}: empty image file`);
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
