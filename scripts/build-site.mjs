import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const site = {
  name: "PanPanTech",
  domain: "https://panpantechnology.com",
  email: "sales@panpantech.com",
  city: "Shenzhen",
  country: "CN",
  description:
    "PanPanTech supplies commercial cleaning robots, autonomous floor scrubbers, multifunction cleaning robots, sweeping robots, and industrial AMR solutions for global B2B buyers and OEM / ODM partners.",
};

const nav = [
  ["Products", "/products/"],
  ["OEM / ODM", "/oem-odm-cleaning-robots/"],
  ["Manufacturer", "/commercial-cleaning-robot-manufacturer/"],
  ["Warehouse", "/industries/warehouse-cleaning-robots/"],
  ["Resources", "/resources/"],
  ["FAQ", "/faqs/"],
];

const products = [
  {
    slug: "p060",
    title: "P060 All-in-One Commercial Cleaning Robot",
    shortTitle: "P060 All-in-One Cleaning Robot",
    model: "P060",
    type: "Multifunction commercial cleaning robot",
    excerpt:
      "A compact 6-in-1 robot for sweeping, scrubbing, vacuuming, mopping, self-cleaning, and sanitizing commercial floors.",
    image: "/assets/images/p060-product.jpg",
    url: "/products/p060/",
    efficiency: "Up to 1,368 m2/h",
    runtime: "Up to 4.5 h standard scrubbing",
    dimensions: "650 x 580 x 550 mm",
    cleaningWidth: "520 mm scrubbing width",
    tanks: "22 L clean / 15 L waste",
    navigation: "LiDAR + vision autonomous navigation",
    certifications: "CE / FCC / IEC documentation confirmed per order",
    bestFor: "Offices, shops, hotels, clinics, showrooms, and small to medium indoor facilities.",
    highlights: [
      "Six cleaning modes in one robot: sweep, scrub, vacuum, mop, self-clean, and sanitize.",
      "Compact body for commercial interiors, service corridors, and mixed public spaces.",
      "Designed for distributors that need a clear model story, product photos, and RFQ path.",
    ],
  },
  {
    slug: "pt90",
    title: "PT90 Autonomous Floor Scrubber",
    shortTitle: "PT90 Autonomous Floor Scrubber",
    model: "PT90",
    type: "Large-area autonomous floor scrubber",
    excerpt:
      "A driverless ride-on scrubber concept for warehouses, factories, malls, and high-traffic facilities.",
    image: "/assets/images/robot-dark-hero.jpg",
    url: "/products/pt90/",
    efficiency: "Up to 4,000 m2/h",
    runtime: "Project dependent",
    dimensions: "Final dimensions confirmed with datasheet",
    cleaningWidth: "800 mm class",
    tanks: "140 L / 170 L class",
    navigation: "LiDAR, depth sensing, ultrasonic sensors",
    certifications: "Certification documents confirmed per order",
    bestFor: "Warehouses, factories, malls, transport hubs, and large public facilities.",
    highlights: [
      "Large-area scrubbing for facilities where repeated routes consume staff time.",
      "Navigation and obstacle sensing options for mixed indoor and semi-outdoor projects.",
      "Prepared for OEM discussions where tank size, cleaning width, and route reporting matter.",
    ],
  },
  {
    slug: "outdoor-sweeping-robot",
    title: "Outdoor Sweeping Robot",
    shortTitle: "Outdoor Sweeping Robot",
    model: "Outdoor",
    type: "Outdoor sweeper",
    excerpt:
      "Autonomous sweeping for campuses, logistics parks, transport hubs, and industrial outdoor zones.",
    image: "/assets/images/p060-studio.jpg",
    url: "/products/#outdoor-sweeping-robot",
    efficiency: "Large-area outdoor cleaning",
    runtime: "Project dependent",
    dimensions: "Project dependent",
    cleaningWidth: "Outdoor sweeper class",
    tanks: "Dust collection class confirmed per order",
    navigation: "Autonomous route planning options",
    certifications: "Certification documents confirmed per order",
    bestFor: "Campuses, logistics parks, public squares, and outdoor industrial spaces.",
    highlights: [
      "Outdoor sweeping option for buyers comparing beyond indoor floor scrubbers.",
      "Useful for logistics parks and campus environments with repeatable outdoor routes.",
      "Can be packaged into distributor catalogs alongside indoor cleaning robots.",
    ],
  },
  {
    slug: "industrial-amr-platform",
    title: "Industrial AMR Platform",
    shortTitle: "Industrial AMR Platform",
    model: "AMR",
    type: "Material-handling robot",
    excerpt:
      "Autonomous mobile robots for warehouse transport, picking support, and factory material movement.",
    image: "/assets/images/p060-hero.jpg",
    url: "/products/#industrial-amr-platform",
    efficiency: "Up to 600 kg payload class",
    runtime: "Project dependent",
    dimensions: "Project dependent",
    cleaningWidth: "Not applicable",
    tanks: "Not applicable",
    navigation: "Autonomous mobile robot navigation",
    certifications: "Project documentation confirmed per order",
    bestFor: "Warehouse transport, factory material movement, and picking support.",
    highlights: [
      "Adds warehouse automation coverage beyond cleaning tasks.",
      "Useful for buyers planning both clean floors and material movement workflows.",
      "Supports PanPanTech's broader commercial robotics positioning.",
    ],
  },
];

const industries = [
  ["Warehouse & Logistics", "/industries/warehouse-cleaning-robots/"],
  ["Retail & Supermarket", "/industries/retail-cleaning-robots/"],
  ["Airport & Transit", "/industries/airport-cleaning-robots/"],
  ["Healthcare & Hospital", "/industries/hospital-cleaning-robots/"],
  ["Hotel & Hospitality", "/industries/hotel-cleaning-robots/"],
  ["Office & Buildings", "/industries/office-cleaning-robots/"],
  ["Education & Schools", "/industries/school-cleaning-robots/"],
  ["Manufacturing & Factory", "/industries/factory-cleaning-robots/"],
];

const faq = [
  {
    question: "What is a commercial cleaning robot?",
    answer:
      "A commercial cleaning robot is an autonomous machine that scrubs, sweeps, vacuums, or sanitizes large facility floors without a driver. PanPanTech robots are positioned for warehouses, malls, hospitals, offices, airports, hotels, and factories.",
  },
  {
    question: "How do I choose the right robot for my facility?",
    answer:
      "Start with floor area, soil level, aisle width, cleaning frequency, water access, and whether the robot must work around people. PanPanTech maps these inputs to a recommended model and ROI estimate.",
  },
  {
    question: "Do you provide OEM or private-label service?",
    answer:
      "Yes. PanPanTech supports OEM and ODM programs, including private-label model codes, neutral datasheets, packaging support, and distributor-ready sales materials.",
  },
  {
    question: "Can the robots ship worldwide?",
    answer:
      "Yes. PanPanTech is designed for global B2B export projects. Certification documents, manuals, spare parts, and shipping requirements should be confirmed per model and destination before order.",
  },
];

const resources = [
  {
    label: "Guide",
    title: "How Do Robotic Floor Scrubbers Work?",
    text: "A plain-English explainer for facility managers comparing automated cleaning.",
  },
  {
    label: "Buying Guide",
    title: "How to Choose a Commercial Cleaning Robot",
    text: "Selection criteria for floor area, tanks, runtime, navigation, and service.",
  },
  {
    label: "Sourcing",
    title: "How to Import Commercial Cleaning Robots from China",
    text: "OEM, certificates, logistics, MOQ, and distributor questions in one checklist.",
  },
];

const html = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const url = (pathname) => new URL(pathname, site.domain).toString();

async function write(relativePath, content) {
  const filePath = path.join(root, relativePath);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");
}

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.domain,
    logo: url("/assets/images/p060-product.jpg"),
    description: site.description,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: site.country,
    },
  };
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item[0],
      item: url(item[1]),
    })),
  };
}

function productSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: url(product.image),
    description: product.excerpt,
    brand: { "@type": "Brand", name: site.name },
    sku: product.model,
    category: product.type,
    additionalProperty: [
      ["Cleaning efficiency", product.efficiency],
      ["Runtime", product.runtime],
      ["Dimensions", product.dimensions],
      ["Cleaning width", product.cleaningWidth],
      ["Clean / waste tank", product.tanks],
      ["Navigation", product.navigation],
      ["Certifications", product.certifications],
    ].map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      url: url(product.url.split("#")[0]),
    },
  };
}

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function header(currentPath = "/") {
  const links = nav
    .map(([label, href]) => {
      const active = currentPath === href || (href !== "/" && currentPath.startsWith(href));
      return `<li><a href="${href}"${active ? ' aria-current="page"' : ""}>${html(label)}</a></li>`;
    })
    .join("");

  return `<a class="ppt-skip-link" href="#main-content">Skip to content</a>
<header class="ppt-header" data-ppt-header>
  <div class="ppt-container ppt-header__inner">
    <a class="ppt-logo" href="/" aria-label="PanPanTech home"><span>PanPan</span>Tech</a>
    <nav class="ppt-nav" id="ppt-primary-nav" aria-label="Primary" data-ppt-nav>
      <ul class="ppt-nav__list">${links}</ul>
    </nav>
    <div class="ppt-header__actions">
      <a class="ppt-button ppt-button--primary" href="/request-a-quote/">Request a Quote</a>
      <button class="ppt-menu-toggle" type="button" aria-controls="ppt-primary-nav" aria-expanded="false" data-ppt-menu-toggle>
        <span></span><span></span><span></span><span class="screen-reader-text">Toggle menu</span>
      </button>
    </div>
  </div>
</header>`;
}

function footer() {
  return `<footer class="ppt-footer">
  <div class="ppt-container ppt-footer__grid">
    <div class="ppt-footer__brand">
      <a class="ppt-logo ppt-logo--footer" href="/"><span>PanPan</span>Tech</a>
      <p>Commercial cleaning robots and industrial automation solutions for global B2B buyers, distributors, and OEM / ODM partners.</p>
      <ul class="ppt-cert-list" aria-label="Certification categories"><li>CE</li><li>FCC</li><li>IEC</li></ul>
    </div>
    <div>
      <h2>Products</h2>
      <a href="/products/">Commercial Cleaning Robots</a>
      <a href="/products/p060/">P060 All-in-One Robot</a>
      <a href="/products/pt90/">PT90 Floor Scrubber</a>
      <a href="/products/#industrial-amr-platform">Industrial AMR</a>
    </div>
    <div>
      <h2>Solutions</h2>
      <a href="/industries/warehouse-cleaning-robots/">Warehouse Cleaning</a>
      <a href="/commercial-cleaning-robot-manufacturer/">Manufacturer Program</a>
      <a href="/oem-odm-cleaning-robots/">OEM / ODM</a>
      <a href="/request-a-quote/">Request a Quote</a>
    </div>
    <div>
      <h2>Company</h2>
      <a href="/about/">About</a>
      <a href="/resources/">Resources</a>
      <a href="/faqs/">FAQ</a>
      <a href="/contact/">Contact</a>
    </div>
  </div>
  <div class="ppt-container ppt-footer__bottom">
    <p>Copyright 2026 PanPanTech. All rights reserved.</p>
    <p>Shenzhen, China | ${site.email}</p>
  </div>
</footer>`;
}

function layout({
  path: currentPath,
  title,
  description,
  body,
  schemas = [],
  image = "/assets/images/p060-hero.jpg",
}) {
  const canonical = url(currentPath);
  const schemaScripts = [organizationSchema(), ...schemas].map(jsonLd).join("\n");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${html(title)}</title>
  <meta name="description" content="${html(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${html(title)}">
  <meta property="og:description" content="${html(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${url(image)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preload" href="/assets/css/site.css" as="style">
  <link rel="stylesheet" href="/assets/css/site.css">
  ${schemaScripts}
</head>
<body>
${header(currentPath)}
${body}
${footer()}
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
}

function sectionHead(eyebrow, title, text) {
  return `<div class="ppt-section-head">
  <p class="ppt-eyebrow">${html(eyebrow)}</p>
  <h2>${html(title)}</h2>
  <p>${html(text)}</p>
</div>`;
}

function productCards(items = products) {
  return `<div class="cleanbot-product-grid">
${items
  .map(
    (product) => `<article class="cleanbot-product-card" id="${product.slug}">
  <a class="cleanbot-product-card__media" href="${product.url}">
    <img src="${product.image}" alt="${html(product.shortTitle)}" width="900" height="900" loading="lazy" decoding="async">
  </a>
  <div class="cleanbot-product-card__body">
    <p class="cleanbot-kicker">${html(product.model)}</p>
    <h3><a href="${product.url}">${html(product.shortTitle)}</a></h3>
    <p>${html(product.excerpt)}</p>
    <dl class="cleanbot-mini-specs">
      <div><dt>Efficiency</dt><dd>${html(product.efficiency)}</dd></div>
      <div><dt>Runtime</dt><dd>${html(product.runtime)}</dd></div>
    </dl>
    <a class="cleanbot-link" href="${product.url}">View robot</a>
  </div>
</article>`
  )
  .join("\n")}
</div>`;
}

function industryGrid() {
  return `<div class="cleanbot-industry-grid">
${industries
  .map(
    ([label, href]) =>
      `<a class="cleanbot-industry-tile" href="${href}"><span aria-hidden="true"></span>${html(label)}</a>`
  )
  .join("\n")}
</div>`;
}

function faqBlock(withHeading = true) {
  return `<section class="cleanbot-faq-block" aria-labelledby="cleanbot-faq-title">
  ${withHeading ? '<h2 id="cleanbot-faq-title">Frequently Asked Questions</h2>' : ""}
  ${faq.map((item) => `<h3>${html(item.question)}</h3><p>${html(item.answer)}</p>`).join("\n")}
</section>`;
}

function finalCta(text = "Send your floor area, cleaning frequency, destination country, and OEM requirements. PanPanTech will recommend the right configuration and next steps.") {
  return `<section class="ppt-section">
  <div class="ppt-container ppt-final-cta">
    <h2>Tell us about your facility or distributor program</h2>
    <p>${html(text)}</p>
    <a class="ppt-button ppt-button--primary" href="/request-a-quote/">Request a Quote</a>
  </div>
</section>`;
}

function homePage() {
  const body = `<main id="main-content" class="ppt-main">
  <section class="ppt-hero ppt-section--dark">
    <div class="ppt-container ppt-hero__grid">
      <div class="ppt-hero__copy">
        <p class="ppt-eyebrow">Commercial Cleaning & Logistics Robots</p>
        <h1>Commercial cleaning robots for facilities that need proof, not promises</h1>
        <p class="ppt-lead">PanPanTech supplies autonomous floor scrubbers, multifunction cleaning robots, robotic sweepers, facade robots, and industrial AMRs for warehouses, retail, airports, hospitals, hotels, factories, and OEM / ODM partners.</p>
        <div class="ppt-actions">
          <a class="ppt-button ppt-button--primary" href="/products/">Explore Products</a>
          <a class="ppt-button ppt-button--outline-on-dark" href="/request-a-quote/">Get a Quote</a>
        </div>
        <div class="ppt-stat-row" aria-label="Key capabilities">
          <div><strong>4,000</strong><span>m2/h max scrubber class</span></div>
          <div><strong>6-in-1</strong><span>P060 compact cleaning modes</span></div>
          <div><strong>OEM</strong><span>Private-label ready</span></div>
        </div>
      </div>
      <figure class="ppt-hero__media">
        <img src="/assets/images/p060-hero.jpg" width="930" height="1120" alt="PanPanTech commercial cleaning robot in a white studio scene" decoding="async" fetchpriority="high">
      </figure>
    </div>
  </section>

  <section class="ppt-section">
    <div class="ppt-container ppt-answer-grid">
      <div>
        <p class="ppt-eyebrow">Answer first</p>
        <h2>Robotic cleaning cuts repetitive floor labor while keeping your team in control</h2>
      </div>
      <div>
        <p>A commercial cleaning robot handles large, repeated cleaning routes and records the work. Your staff stay focused on exceptions, detail cleaning, guest-facing tasks, and safety checks. That is the value buyers need to see before a demo.</p>
        <a class="ppt-link" href="/commercial-cleaning-robot-manufacturer/">See manufacturer capabilities</a>
      </div>
    </div>
  </section>

  <section class="ppt-section ppt-section--soft">
    <div class="ppt-container">
      ${sectionHead(
        "Product Range",
        "One PanPanTech range for every facility format",
        "Start with your cleaning environment. Then map to robot size, cleaning mode, runtime, water capacity, and OEM requirements."
      )}
      ${productCards(products)}
    </div>
  </section>

  <section class="ppt-section ppt-section--dark ppt-manufacturing">
    <div class="ppt-container ppt-split">
      <div>
        <p class="ppt-eyebrow">Manufacturing & QC</p>
        <h2>Built for B2B sourcing checks</h2>
        <p>PanPanTech presents a unified product family with manufacturing partners, quality control, export documentation, spare parts planning, and clear OEM / ODM cooperation terms. Public certification claims should be verified against final white-label documents before launch.</p>
        <a class="ppt-button ppt-button--outline-on-dark" href="/oem-odm-cleaning-robots/">OEM / ODM Program</a>
      </div>
      <div class="ppt-process-list">
        <div><span>01</span><strong>Model selection</strong><p>Match area, floor type, soil level, aisle width, and cleaning schedule.</p></div>
        <div><span>02</span><strong>White-label assets</strong><p>Confirm neutral datasheets, product photos, packaging, and model codes.</p></div>
        <div><span>03</span><strong>Export package</strong><p>Prepare certification, manuals, spare parts, warranty, and logistics details.</p></div>
      </div>
    </div>
  </section>

  <section class="ppt-section">
    <div class="ppt-container">
      ${sectionHead(
        "Industries",
        "Cleaning robots by facility type",
        "Facility buyers search by environment. Each industry page answers use case, model fit, ROI drivers, and procurement concerns."
      )}
      ${industryGrid()}
    </div>
  </section>

  <section class="ppt-section ppt-section--soft">
    <div class="ppt-container ppt-split">
      <figure class="ppt-image-frame">
        <img src="/assets/images/p060-studio.jpg" width="1000" height="1000" alt="PanPanTech P060 commercial cleaning robot product photo" loading="lazy" decoding="async">
      </figure>
      <div>
        <p class="ppt-eyebrow">Technology Platform</p>
        <h2>Autonomous navigation, fleet visibility, and measurable cleaning records</h2>
        <ul class="ppt-check-list">
          <li>LiDAR, vision, and sensor-based navigation options for different robot classes.</li>
          <li>Cleaning routes, coverage records, and operational reports for audit-ready service.</li>
          <li>Fleet and app workflows for distributors, facility teams, and service partners.</li>
          <li>Spare parts and after-sales support designed into the procurement conversation.</li>
        </ul>
        <a class="ppt-link" href="/products/">Compare robot classes</a>
      </div>
    </div>
  </section>

  <section class="ppt-section">
    <div class="ppt-container ppt-cta-panel">
      <div>
        <p class="ppt-eyebrow">For Distributors & Importers</p>
        <h2>Launch a private-label cleaning robot line with one sourcing partner</h2>
        <p>Use PanPanTech as your neutral front-end brand system: model naming, datasheets, quote flow, product pages, and RFQ pages are already structured for OEM / ODM selling.</p>
      </div>
      <a class="ppt-button ppt-button--primary" href="/request-a-quote/">Discuss Your Program</a>
    </div>
  </section>

  <section class="ppt-section ppt-section--soft">
    <div class="ppt-container ppt-resource-grid">
      ${sectionHead(
        "SEO / GEO Resources",
        "Buyer guides that answer real search questions",
        "Use these resources to compare cleaning robot types, sourcing paths, and facility use cases."
      )}
      ${resources
        .map(
          (item) => `<a class="ppt-resource-card" href="/resources/">
        <span>${html(item.label)}</span>
        <h3>${html(item.title)}</h3>
        <p>${html(item.text)}</p>
      </a>`
        )
        .join("\n")}
    </div>
  </section>

  <section class="ppt-section">
    <div class="ppt-container">
      ${faqBlock(true)}
    </div>
  </section>

  ${finalCta()}
</main>`;

  return layout({
    path: "/",
    title: "Commercial Cleaning Robots Manufacturer | PanPanTech",
    description:
      "PanPanTech supplies autonomous floor scrubbers, multifunction cleaning robots, sweeping robots, and industrial AMRs for B2B buyers and OEM / ODM partners.",
    body,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.name,
        url: site.domain,
      },
      faqSchema(),
    ],
  });
}

function productsPage() {
  const body = `<main id="main-content" class="ppt-main">
  <section class="ppt-page-hero ppt-section--dark">
    <div class="ppt-container">
      <p class="ppt-eyebrow">Product Range</p>
      <h1>Commercial Cleaning Robots</h1>
      <p class="ppt-lead">Compare PanPanTech robot classes by facility type, cleaning task, efficiency, runtime, and OEM requirements.</p>
    </div>
  </section>
  <section class="ppt-section ppt-section--soft">
    <div class="ppt-container">${productCards(products)}</div>
  </section>
  <section class="ppt-section">
    <div class="ppt-container ppt-content">
      <h2>How to choose the right robot class</h2>
      <table>
        <thead><tr><th>Buying question</th><th>What to compare</th></tr></thead>
        <tbody>
          <tr><td>How large is the floor area?</td><td>Match square meters per hour, tank size, route time, and charging workflow.</td></tr>
          <tr><td>Does the robot work around people?</td><td>Compare navigation sensors, obstacle handling, operating speed, and safety procedures.</td></tr>
          <tr><td>Is this a distributor or OEM project?</td><td>Confirm model codes, neutral datasheets, packaging, certifications, and support terms.</td></tr>
        </tbody>
      </table>
    </div>
  </section>
  ${finalCta("Send your floor area, site type, and target robot class. PanPanTech will recommend the right model mix and next steps.")}</main>`;

  return layout({
    path: "/products/",
    title: "Commercial Cleaning Robots | PanPanTech Product Range",
    description:
      "Compare PanPanTech P060, PT90, outdoor sweeping robots, and industrial AMR platforms by facility type, efficiency, runtime, and OEM requirements.",
    body,
    schemas: [breadcrumbSchema([["Home", "/"], ["Products", "/products/"]])],
  });
}

function productPage(product) {
  const specs = [
    ["Cleaning efficiency", product.efficiency],
    ["Runtime", product.runtime],
    ["Dimensions", product.dimensions],
    ["Cleaning width", product.cleaningWidth],
    ["Clean / waste tank", product.tanks],
    ["Navigation", product.navigation],
    ["Certifications", product.certifications],
  ];
  const body = `<main id="main-content" class="ppt-main ppt-product">
  <nav class="ppt-container ppt-breadcrumb" aria-label="Breadcrumb">
    <a href="/">Home</a><span>/</span><a href="/products/">Products</a><span>/</span><span>${html(product.shortTitle)}</span>
  </nav>
  <section class="ppt-product-hero">
    <div class="ppt-container ppt-product-hero__grid">
      <figure class="ppt-product-hero__media">
        <img src="${product.image}" width="1000" height="1000" alt="${html(product.title)}" decoding="async" fetchpriority="high">
      </figure>
      <div>
        <p class="ppt-eyebrow">${html(product.type)}</p>
        <h1>${html(product.title)}</h1>
        <p class="ppt-lead">${html(product.excerpt)}</p>
        <div class="ppt-product-kpis">
          <div><strong>${html(product.efficiency)}</strong><span>Cleaning efficiency</span></div>
          <div><strong>${html(product.runtime)}</strong><span>Runtime</span></div>
          <div><strong>${html(product.navigation)}</strong><span>Navigation</span></div>
        </div>
        <div class="ppt-actions">
          <a class="ppt-button ppt-button--primary" href="/request-a-quote/?model=${encodeURIComponent(product.model)}">Request a Quote</a>
          <a class="ppt-button ppt-button--outline" href="/products/">Compare Products</a>
        </div>
      </div>
    </div>
  </section>
  <section class="ppt-section">
    <div class="ppt-container ppt-product-overview">
      <div class="ppt-content">
        <h2>What this robot is designed to solve</h2>
        <p>${html(product.excerpt)} It keeps specifications, usage context, and quote path visible so buyers and AI search systems can understand the model without relying on hidden scripts.</p>
        <ul>${product.highlights.map((item) => `<li>${html(item)}</li>`).join("")}</ul>
      </div>
      <div class="ppt-note-card">
        <h2>Best-fit use cases</h2>
        <p>${html(product.bestFor)}</p>
      </div>
    </div>
  </section>
  <section class="ppt-section ppt-section--soft">
    <div class="ppt-container">
      ${sectionHead(product.model, "Technical specifications", "Specifications should be checked against the final signed datasheet before public launch or quotation.")}
      <table class="ppt-spec-table">
        <caption>${html(product.shortTitle)} product specifications</caption>
        <tbody>${specs.map(([label, value]) => `<tr><th scope="row">${html(label)}</th><td>${html(value)}</td></tr>`).join("")}</tbody>
      </table>
    </div>
  </section>
  <section class="ppt-section">
    <div class="ppt-container ppt-feature-grid">
      <article class="ppt-feature-card"><span>01</span><h2>Answer-first buying data</h2><p>The model page keeps efficiency, runtime, tanks, navigation, and certification notes visible for search engines, AI crawlers, and human buyers.</p></article>
      <article class="ppt-feature-card"><span>02</span><h2>OEM-ready presentation</h2><p>Product details use PanPanTech model names, export-ready documentation notes, and neutral OEM language for distributor conversations.</p></article>
      <article class="ppt-feature-card"><span>03</span><h2>Quote-focused path</h2><p>The primary action passes the model name into the RFQ form so sales can respond with the right datasheet and project questions.</p></article>
    </div>
  </section>
  ${finalCta(`Send your floor area, cleaning frequency, destination country, and OEM requirements. PanPanTech will recommend the right ${product.model} configuration and next steps.`)}</main>`;

  return layout({
    path: product.url.split("#")[0],
    title: `${product.shortTitle} | PanPanTech`,
    description: product.excerpt,
    body,
    image: product.image,
    schemas: [
      breadcrumbSchema([
        ["Home", "/"],
        ["Products", "/products/"],
        [product.shortTitle, product.url.split("#")[0]],
      ]),
      productSchema(product),
    ],
  });
}

function simplePage({ path, title, description, eyebrow, h1, lead, content, schemas = [] }) {
  const body = `<main id="main-content" class="ppt-main">
  <section class="ppt-page-hero ppt-section--dark">
    <div class="ppt-container">
      <p class="ppt-eyebrow">${html(eyebrow)}</p>
      <h1>${html(h1)}</h1>
      <p class="ppt-lead">${html(lead)}</p>
    </div>
  </section>
  ${content}
</main>`;
  return layout({ path, title, description, body, schemas });
}

function oemPage() {
  return simplePage({
    path: "/oem-odm-cleaning-robots/",
    title: "OEM / ODM Cleaning Robots | PanPanTech",
    description:
      "Launch a private-label commercial cleaning robot line with PanPanTech model planning, neutral datasheets, packaging support, and distributor-ready assets.",
    eyebrow: "OEM / ODM",
    h1: "Private-label cleaning robots for distributors and importers",
    lead:
      "PanPanTech helps distributors and importers launch cleaning robot lines with custom model codes, neutral datasheets, packaging support, and export documentation.",
    schemas: [breadcrumbSchema([["Home", "/"], ["OEM / ODM", "/oem-odm-cleaning-robots/"]])],
    content: `<section class="ppt-section">
  <div class="ppt-container ppt-feature-grid">
    <article class="ppt-feature-card"><span>01</span><h2>Model planning</h2><p>Choose the product mix by facility type, floor area, tank size, runtime, and price tier.</p></article>
    <article class="ppt-feature-card"><span>02</span><h2>Brand assets</h2><p>Prepare private-label model names, product photos, neutral datasheets, packaging direction, and RFQ copy.</p></article>
    <article class="ppt-feature-card"><span>03</span><h2>Export package</h2><p>Confirm certification documents, spare parts, manuals, warranty terms, and shipping requirements.</p></article>
  </div>
</section>
${finalCta("Tell us your target market, first order quantity, and preferred robot classes. PanPanTech will outline a private-label launch path.")}`,
  });
}

function manufacturerPage() {
  return simplePage({
    path: "/commercial-cleaning-robot-manufacturer/",
    title: "Commercial Cleaning Robot Manufacturer | PanPanTech",
    description:
      "PanPanTech supports commercial cleaning robot sourcing with product selection, QC, export documentation, spare parts planning, and OEM / ODM programs.",
    eyebrow: "Manufacturer Program",
    h1: "Commercial cleaning robot manufacturer support for B2B sourcing",
    lead:
      "PanPanTech connects product selection, manufacturing partners, quality control, export documents, and quote-ready product pages for commercial robot buyers.",
    schemas: [
      breadcrumbSchema([
        ["Home", "/"],
        ["Manufacturer", "/commercial-cleaning-robot-manufacturer/"],
      ]),
    ],
    content: `<section class="ppt-section ppt-section--soft">
  <div class="ppt-container">${productCards(products.slice(0, 2))}</div>
</section>
<section class="ppt-section">
  <div class="ppt-container ppt-content">
    <h2>What buyers should verify before order</h2>
    <table>
      <tbody>
        <tr><th scope="row">Final datasheet</th><td>Confirm model version, cleaning width, tanks, runtime, dimensions, and navigation configuration.</td></tr>
        <tr><th scope="row">Certification package</th><td>Review destination-specific CE, FCC, IEC, EMC, battery, and customs documentation before shipment.</td></tr>
        <tr><th scope="row">After-sales plan</th><td>Define warranty scope, spare parts list, remote support workflow, and distributor service responsibilities.</td></tr>
      </tbody>
    </table>
  </div>
</section>
${finalCta("Send your sourcing checklist and destination country. PanPanTech will map the product, documentation, and support steps.")}`,
  });
}

function warehousePage() {
  return simplePage({
    path: "/industries/warehouse-cleaning-robots/",
    title: "Warehouse Cleaning Robots | PanPanTech",
    description:
      "Warehouse cleaning robots reduce repetitive floor labor, improve route coverage, and provide auditable cleaning records for logistics and industrial sites.",
    eyebrow: "Warehouse Solution",
    h1: "Warehouse cleaning robots for large repeated routes",
    lead:
      "Use autonomous floor scrubbers and sweeping robots to reduce night-shift floor labor, improve cleaning consistency, and track coverage across logistics sites.",
    schemas: [
      breadcrumbSchema([
        ["Home", "/"],
        ["Warehouse Cleaning Robots", "/industries/warehouse-cleaning-robots/"],
      ]),
    ],
    content: `<section class="ppt-section ppt-section--soft">
  <div class="ppt-container ppt-split">
    <div>
      <h2>Best-fit models for warehouse floors</h2>
      <p>PT90 class scrubbers fit broad indoor logistics floors. Outdoor sweeping robots support campuses and loading areas. P060 fits offices, showrooms, and support spaces attached to the warehouse.</p>
      <ul class="ppt-check-list">
        <li>Map cleaning routes by floor area, shift time, and aisle width.</li>
        <li>Compare tank size, cleaning width, runtime, and recharge workflow.</li>
        <li>Use route reports as proof of work for facility managers and clients.</li>
      </ul>
    </div>
    <figure class="ppt-image-frame"><img src="/assets/images/robot-dark-hero.jpg" alt="Autonomous floor scrubber for warehouse cleaning" width="1000" height="1000" loading="lazy" decoding="async"></figure>
  </div>
</section>
${finalCta("Send your warehouse floor area, aisle width, shift schedule, and cleaning target. PanPanTech will recommend a model mix.")}`,
  });
}

function resourcesPage() {
  return simplePage({
    path: "/resources/",
    title: "Cleaning Robot Buyer Resources | PanPanTech",
    description:
      "Buyer guides for commercial cleaning robots, robotic floor scrubbers, OEM sourcing, distributor programs, and facility ROI planning.",
    eyebrow: "Resources",
    h1: "Buyer guides that answer real sourcing questions",
    lead:
      "PanPanTech resources are structured for B2B buyers, distributors, and AI search systems that need direct answers before a sales call.",
    schemas: [breadcrumbSchema([["Home", "/"], ["Resources", "/resources/"]])],
    content: `<section class="ppt-section ppt-section--soft">
  <div class="ppt-container ppt-resource-grid">
    ${resources
      .map(
        (item) => `<article class="ppt-resource-card">
      <span>${html(item.label)}</span>
      <h2>${html(item.title)}</h2>
      <p>${html(item.text)}</p>
    </article>`
      )
      .join("\n")}
  </div>
</section>
${finalCta("Tell us what you are comparing. PanPanTech will respond with the most relevant model and sourcing checklist.")}`,
  });
}

function faqPage() {
  return simplePage({
    path: "/faqs/",
    title: "Commercial Cleaning Robot FAQ | PanPanTech",
    description:
      "Answers about commercial cleaning robots, model selection, OEM / ODM service, worldwide shipping, certification documents, and distributor support.",
    eyebrow: "FAQ",
    h1: "Commercial cleaning robot FAQ",
    lead:
      "Fast answers for facility buyers, distributors, importers, and OEM / ODM partners evaluating PanPanTech robots.",
    schemas: [breadcrumbSchema([["Home", "/"], ["FAQ", "/faqs/"]]), faqSchema()],
    content: `<section class="ppt-section"><div class="ppt-container">${faqBlock(false)}</div></section>${finalCta()}`,
  });
}

function aboutPage() {
  return simplePage({
    path: "/about/",
    title: "About PanPanTech | Commercial Robotics Brand",
    description:
      "PanPanTech is a B2B robotics brand focused on commercial cleaning automation, OEM / ODM cooperation, and export-ready facility solutions.",
    eyebrow: "About",
    h1: "About PanPanTech",
    lead:
      "PanPanTech is a B2B robotics brand focused on commercial cleaning automation, OEM / ODM cooperation, and export-ready facility solutions.",
    schemas: [breadcrumbSchema([["Home", "/"], ["About", "/about/"]])],
    content: `<section class="ppt-section">
  <div class="ppt-container ppt-content">
    <h2>A practical brand system for commercial robot buyers</h2>
    <p>The site is designed to help buyers evaluate product classes, use cases, sourcing requirements, and quote details without relying on hidden scripts or a locked CMS.</p>
    <p>Final factory, certification, and white-label documents should be reviewed before publishing public claims or issuing formal quotations.</p>
  </div>
</section>${finalCta()}`,
  });
}

function quotePage() {
  return simplePage({
    path: "/request-a-quote/",
    title: "Request a Cleaning Robot Quote | PanPanTech",
    description:
      "Request a quote for PanPanTech commercial cleaning robots. Share floor area, site type, product interest, quantity, destination country, and OEM needs.",
    eyebrow: "RFQ",
    h1: "Request a cleaning robot quote",
    lead:
      "Tell us your floor area, cleaning schedule, product interest, and destination country. PanPanTech will recommend the right model and confirm OEM or distributor options.",
    schemas: [breadcrumbSchema([["Home", "/"], ["Request a Quote", "/request-a-quote/"]])],
    content: `<section class="ppt-section">
  <div class="ppt-container ppt-product-overview">
    <form class="cleanbot-form-wrap cleanbot-quote-form" action="mailto:${site.email}" method="post" enctype="text/plain">
      <p><label for="name">Name</label><input id="name" name="name" autocomplete="name" required></p>
      <p><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required></p>
      <p><label for="company">Company</label><input id="company" name="company" autocomplete="organization"></p>
      <p><label for="country">Country</label><input id="country" name="country" autocomplete="country-name"></p>
      <p><label for="interest">Product interest</label><input id="interest" name="product_interest" placeholder="P060, PT90, OEM / ODM, warehouse project"></p>
      <p><label for="quantity">Purchase quantity</label><input id="quantity" name="quantity" placeholder="Pilot, 5 units, 20 units, distributor launch"></p>
      <p class="cleanbot-form-wrap__wide"><label for="message">Project details</label><textarea id="message" name="message" rows="6" placeholder="Floor area, site type, cleaning schedule, destination country, certifications, and OEM needs."></textarea></p>
      <p class="cleanbot-form-wrap__wide"><button class="cleanbot-button cleanbot-button--primary" type="submit">Email RFQ</button></p>
    </form>
    <aside class="ppt-note-card">
      <h2>Static-site note</h2>
      <p>This GitHub-ready version uses an email RFQ form. For production lead capture, connect Formspree, Tally, HubSpot, Fluent Forms on WordPress, or another CRM endpoint.</p>
      <p>Email: <a href="mailto:${site.email}">${site.email}</a></p>
    </aside>
  </div>
</section>`,
  });
}

function contactPage() {
  return simplePage({
    path: "/contact/",
    title: "Contact PanPanTech | Commercial Cleaning Robots",
    description:
      "Contact PanPanTech for commercial cleaning robot model selection, OEM / ODM programs, distributor support, and warehouse cleaning robot projects.",
    eyebrow: "Contact",
    h1: "Contact PanPanTech",
    lead:
      `Email ${site.email} or use the RFQ page for model selection and OEM / ODM requests.`,
    schemas: [breadcrumbSchema([["Home", "/"], ["Contact", "/contact/"]])],
    content: `<section class="ppt-section">
  <div class="ppt-container ppt-cta-panel">
    <div><h2>Need a product recommendation?</h2><p>Share your facility type, floor area, cleaning schedule, destination country, and purchase plan.</p></div>
    <a class="ppt-button ppt-button--primary" href="/request-a-quote/">Request a Quote</a>
  </div>
</section>`,
  });
}

function placeholderIndustryPage(label, pathName) {
  return simplePage({
    path: pathName,
    title: `${label} Cleaning Robots | PanPanTech`,
    description: `PanPanTech commercial cleaning robot guidance for ${label.toLowerCase()} facilities, including model selection, route planning, OEM support, and RFQ next steps.`,
    eyebrow: "Industry Solution",
    h1: `${label} cleaning robots`,
    lead:
      "This static landing page gives buyers a direct path to compare robot classes and request a facility-specific recommendation.",
    schemas: [breadcrumbSchema([["Home", "/"], [label, pathName]])],
    content: `<section class="ppt-section ppt-section--soft"><div class="ppt-container">${productCards(products.slice(0, 2))}</div></section>${finalCta()}`,
  });
}

function notFoundPage() {
  return layout({
    path: "/404.html",
    title: "Page Not Found | PanPanTech",
    description:
      "The requested PanPanTech page was not found. Start with commercial cleaning robot products, OEM programs, resources, or request a quote.",
    body: `<main id="main-content" class="ppt-main"><section class="ppt-page-hero ppt-section--dark"><div class="ppt-container"><p class="ppt-eyebrow">404</p><h1>Page not found</h1><p class="ppt-lead">The page may have moved. Start with products or request a quote.</p><div class="ppt-actions"><a class="ppt-button ppt-button--primary" href="/products/">View Products</a><a class="ppt-button ppt-button--outline-on-dark" href="/request-a-quote/">Request a Quote</a></div></div></section></main>`,
  });
}

const css = `:root {
  --ppt-blue: #0e5fd9;
  --ppt-blue-deep: #0a3f94;
  --ppt-teal: #00a98f;
  --ppt-ink: #101522;
  --ppt-body: #3f4858;
  --ppt-muted: #667085;
  --ppt-line: #d9e1ee;
  --ppt-soft: #f4f7fb;
  --ppt-canvas: #ffffff;
  --ppt-dark: #070b12;
  --ppt-dark-2: #111927;
  --ppt-on-dark: #f7fbff;
  --ppt-on-dark-muted: #aeb8c9;
  --ppt-radius: 8px;
  --ppt-radius-sm: 4px;
  --ppt-container: 1180px;
  --ppt-section: 56px;
  --ppt-font: Inter, "IBM Plex Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--ppt-canvas);
  color: var(--ppt-body);
  font-family: var(--ppt-font);
  font-size: 16px;
  line-height: 1.6;
  letter-spacing: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
body.ppt-menu-open { overflow: hidden; }
img { display: block; max-width: 100%; height: auto; }
a { color: var(--ppt-blue); text-decoration: none; }
a:hover, a:focus-visible { color: var(--ppt-blue-deep); }
h1, h2, h3, h4 {
  margin: 0 0 16px;
  color: var(--ppt-ink);
  font-weight: 650;
  line-height: 1.16;
  letter-spacing: 0;
}
h1 { font-size: 38px; }
h2 { font-size: 30px; }
h3 { font-size: 20px; }
p { margin: 0 0 16px; }
ul, ol { margin: 0 0 20px; padding-left: 22px; }
table { border-collapse: collapse; width: 100%; }
.ppt-container { width: min(100% - 32px, var(--ppt-container)); margin-inline: auto; }
.ppt-main { background: var(--ppt-canvas); }
.ppt-section { padding: var(--ppt-section) 0; }
.ppt-section--soft { background: var(--ppt-soft); }
.ppt-section--dark { background: var(--ppt-dark); color: var(--ppt-on-dark-muted); }
.ppt-section--dark h1, .ppt-section--dark h2, .ppt-section--dark h3 { color: var(--ppt-on-dark); }
.ppt-section-head { max-width: 720px; margin-bottom: 28px; }
.ppt-section-head p { color: var(--ppt-muted); }
.ppt-eyebrow {
  margin-bottom: 10px;
  color: var(--ppt-teal);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0;
  text-transform: uppercase;
}
.ppt-lead { color: inherit; font-size: 18px; line-height: 1.55; }
.ppt-skip-link {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 999;
  transform: translateY(-180%);
  border-radius: var(--ppt-radius-sm);
  background: var(--ppt-blue);
  color: #ffffff;
  padding: 10px 14px;
}
.ppt-skip-link:focus { transform: translateY(0); }
.ppt-header {
  position: sticky;
  top: 0;
  z-index: 80;
  border-bottom: 1px solid rgba(217, 225, 238, 0.9);
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
}
.ppt-header.is-scrolled { box-shadow: 0 8px 24px rgba(16, 21, 34, 0.08); }
.ppt-header__inner {
  display: flex;
  min-height: 68px;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}
.ppt-logo {
  color: var(--ppt-ink);
  font-size: 20px;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
}
.ppt-logo span { color: var(--ppt-blue); }
.ppt-logo:hover, .ppt-logo:focus-visible { color: var(--ppt-ink); }
.ppt-nav {
  position: fixed;
  inset: 68px 0 auto;
  display: none;
  border-bottom: 1px solid var(--ppt-line);
  background: #ffffff;
  padding: 12px 16px 20px;
}
.ppt-nav.is-open { display: block; }
.ppt-nav__list {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.ppt-nav__list a {
  display: block;
  border-radius: var(--ppt-radius-sm);
  color: var(--ppt-ink);
  font-size: 15px;
  font-weight: 600;
  padding: 11px 10px;
}
.ppt-nav__list a:hover,
.ppt-nav__list a:focus-visible,
.ppt-nav__list a[aria-current="page"] {
  background: var(--ppt-soft);
  color: var(--ppt-blue);
}
.ppt-header__actions { display: flex; align-items: center; gap: 10px; }
.ppt-menu-toggle {
  display: inline-grid;
  width: 44px;
  height: 44px;
  place-content: center;
  gap: 5px;
  border: 1px solid var(--ppt-line);
  border-radius: var(--ppt-radius-sm);
  background: #ffffff;
  cursor: pointer;
}
.ppt-menu-toggle span:not(.screen-reader-text) {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--ppt-ink);
}
.ppt-button, .cleanbot-button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: var(--ppt-radius-sm);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
  padding: 12px 18px;
  text-align: center;
  transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease;
}
.ppt-button:hover, .ppt-button:focus-visible,
.cleanbot-button:hover, .cleanbot-button:focus-visible { transform: translateY(-1px); }
.ppt-button--primary, .cleanbot-button--primary { background: var(--ppt-blue); color: #ffffff; }
.ppt-button--primary:hover, .ppt-button--primary:focus-visible,
.cleanbot-button--primary:hover, .cleanbot-button--primary:focus-visible { background: var(--ppt-blue-deep); color: #ffffff; }
.ppt-button--outline { border-color: var(--ppt-blue); background: transparent; color: var(--ppt-blue); }
.ppt-button--outline-on-dark { border-color: rgba(255, 255, 255, 0.5); background: transparent; color: #ffffff; }
.ppt-button--outline-on-dark:hover, .ppt-button--outline-on-dark:focus-visible { border-color: #ffffff; color: #ffffff; }
.ppt-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.ppt-link, .cleanbot-link { display: inline-flex; align-items: center; gap: 8px; color: var(--ppt-blue); font-weight: 700; }
.ppt-link::after, .cleanbot-link::after {
  content: "";
  width: 7px;
  height: 7px;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
  transform: rotate(45deg);
}
.ppt-hero { position: relative; overflow: hidden; padding: 48px 0; background: linear-gradient(115deg, #070b12 0%, #101827 58%, #0a3f94 100%); }
.ppt-hero__grid { position: relative; display: grid; gap: 32px; align-items: center; }
.ppt-hero h1 { max-width: 760px; font-size: 42px; }
.ppt-hero__copy { position: relative; z-index: 2; }
.ppt-hero__media {
  position: relative;
  overflow: hidden;
  margin: 0;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--ppt-radius);
  background: #111927;
  aspect-ratio: 4 / 3;
}
.ppt-hero__media img { width: 100%; height: 100%; object-fit: cover; }
.ppt-stat-row { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 28px; }
.ppt-stat-row div { border-left: 3px solid var(--ppt-teal); background: rgba(255, 255, 255, 0.06); padding: 14px 16px; }
.ppt-stat-row strong { display: block; color: #ffffff; font-size: 24px; line-height: 1.1; }
.ppt-stat-row span { color: var(--ppt-on-dark-muted); font-size: 13px; }
.ppt-answer-grid, .ppt-split, .ppt-product-overview { display: grid; gap: 28px; }
.ppt-image-frame, .ppt-product-hero__media, .cleanbot-product-card__media {
  overflow: hidden;
  margin: 0;
  border: 1px solid var(--ppt-line);
  border-radius: var(--ppt-radius);
  background: #ffffff;
  aspect-ratio: 1 / 1;
}
.ppt-image-frame img, .ppt-product-hero__media img, .cleanbot-product-card__media img { width: 100%; height: 100%; object-fit: cover; }
.cleanbot-product-grid { display: grid; grid-template-columns: 1fr; gap: 18px; }
.cleanbot-product-card {
  display: grid;
  overflow: hidden;
  border: 1px solid var(--ppt-line);
  border-radius: var(--ppt-radius);
  background: #ffffff;
}
.cleanbot-product-card__media { display: block; border: 0; border-radius: 0; }
.cleanbot-product-card__body { display: grid; gap: 12px; padding: 22px; }
.cleanbot-product-card__body h3 { margin-bottom: 0; font-size: 20px; }
.cleanbot-product-card__body h3 a { color: var(--ppt-ink); }
.cleanbot-product-card__body p { margin: 0; color: var(--ppt-body); }
.cleanbot-kicker { margin: 0; color: var(--ppt-teal); font-size: 13px; font-weight: 800; text-transform: uppercase; }
.cleanbot-mini-specs { display: grid; gap: 8px; margin: 4px 0; }
.cleanbot-mini-specs div { display: flex; justify-content: space-between; gap: 12px; border-top: 1px solid var(--ppt-line); padding-top: 8px; }
.cleanbot-mini-specs dt, .cleanbot-mini-specs dd { margin: 0; font-size: 13px; }
.cleanbot-mini-specs dt { color: var(--ppt-muted); }
.cleanbot-mini-specs dd { color: var(--ppt-ink); font-weight: 700; text-align: right; }
.ppt-manufacturing { background: linear-gradient(115deg, #070b12 0%, #111927 58%, #0a3f94 100%); }
.ppt-process-list { display: grid; gap: 12px; }
.ppt-process-list div {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--ppt-radius);
  background: rgba(255, 255, 255, 0.05);
  padding: 18px;
}
.ppt-process-list span, .ppt-feature-card span { display: inline-flex; margin-bottom: 12px; color: var(--ppt-teal); font-size: 13px; font-weight: 800; }
.ppt-process-list strong { display: block; color: #ffffff; font-size: 18px; }
.ppt-process-list p { margin-bottom: 0; color: var(--ppt-on-dark-muted); }
.cleanbot-industry-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
.cleanbot-industry-tile {
  display: flex;
  min-height: 64px;
  align-items: center;
  gap: 12px;
  border: 1px solid var(--ppt-line);
  border-radius: var(--ppt-radius);
  background: #ffffff;
  color: var(--ppt-ink);
  font-weight: 700;
  padding: 16px;
}
.cleanbot-industry-tile span { width: 10px; height: 10px; flex: none; background: var(--ppt-teal); }
.ppt-check-list { display: grid; gap: 12px; padding: 0; list-style: none; }
.ppt-check-list li { position: relative; border-top: 1px solid var(--ppt-line); padding: 12px 0 0 26px; }
.ppt-check-list li::before {
  content: "";
  position: absolute;
  top: 18px;
  left: 0;
  width: 12px;
  height: 7px;
  border-bottom: 2px solid var(--ppt-teal);
  border-left: 2px solid var(--ppt-teal);
  transform: rotate(-45deg);
}
.ppt-cta-panel, .ppt-final-cta {
  display: grid;
  gap: 20px;
  align-items: center;
  border-radius: var(--ppt-radius);
  background: var(--ppt-dark);
  color: var(--ppt-on-dark-muted);
  padding: 28px;
}
.ppt-cta-panel h2, .ppt-final-cta h2 { color: #ffffff; }
.ppt-final-cta { text-align: left; }
.ppt-resource-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
.ppt-resource-grid .ppt-section-head { margin-bottom: 0; }
.ppt-resource-card {
  display: grid;
  gap: 10px;
  border: 1px solid var(--ppt-line);
  border-radius: var(--ppt-radius);
  background: #ffffff;
  color: var(--ppt-body);
  padding: 22px;
}
.ppt-resource-card span { color: var(--ppt-teal); font-size: 12px; font-weight: 800; text-transform: uppercase; }
.ppt-resource-card h2, .ppt-resource-card h3 { margin-bottom: 0; color: var(--ppt-ink); font-size: 20px; }
.ppt-resource-card p { margin: 0; color: var(--ppt-body); }
.cleanbot-faq-block { max-width: 860px; }
.cleanbot-faq-block h3 { margin-top: 24px; border-top: 1px solid var(--ppt-line); padding-top: 20px; }
.cleanbot-faq-block p { color: var(--ppt-body); }
.ppt-page-hero { padding: 52px 0; }
.ppt-page { padding: 42px 0 64px; }
.ppt-content { max-width: 920px; }
.ppt-content > * + * { margin-top: 18px; }
.ppt-content h1 { font-size: 38px; }
.ppt-content h2 { margin-top: 36px; }
.ppt-content table { border: 1px solid var(--ppt-line); background: #ffffff; }
.ppt-content th, .ppt-content td { border-bottom: 1px solid var(--ppt-line); padding: 12px; text-align: left; vertical-align: top; }
.ppt-breadcrumb { display: flex; flex-wrap: wrap; gap: 8px; padding-top: 18px; color: var(--ppt-muted); font-size: 14px; }
.ppt-breadcrumb a { color: var(--ppt-muted); }
.ppt-product-hero { padding: 28px 0 56px; }
.ppt-product-hero__grid { display: grid; gap: 28px; align-items: center; }
.ppt-product-kpis { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 22px; }
.ppt-product-kpis div, .ppt-note-card, .ppt-feature-card {
  border: 1px solid var(--ppt-line);
  border-radius: var(--ppt-radius);
  background: #ffffff;
  padding: 18px;
}
.ppt-product-kpis strong { display: block; color: var(--ppt-ink); font-size: 18px; line-height: 1.2; }
.ppt-product-kpis span { color: var(--ppt-muted); font-size: 13px; }
.ppt-note-card h2, .ppt-feature-card h2 { font-size: 20px; }
.ppt-note-card p, .ppt-feature-card p { margin-bottom: 0; }
.ppt-spec-table { overflow: hidden; border: 1px solid var(--ppt-line); border-radius: var(--ppt-radius); background: #ffffff; font-size: 15px; }
.ppt-spec-table caption { caption-side: top; padding: 0 0 10px; color: var(--ppt-muted); text-align: left; }
.ppt-spec-table th, .ppt-spec-table td { border-bottom: 1px solid var(--ppt-line); padding: 13px 14px; text-align: left; vertical-align: top; }
.ppt-spec-table th { width: 40%; background: #fbfcff; color: var(--ppt-muted); font-weight: 700; }
.ppt-spec-table tr:last-child th, .ppt-spec-table tr:last-child td { border-bottom: 0; }
.ppt-feature-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
.cleanbot-form-wrap { border: 1px solid var(--ppt-line); border-radius: var(--ppt-radius); background: #ffffff; padding: 20px; }
.cleanbot-quote-form { display: grid; grid-template-columns: 1fr; gap: 16px; }
.cleanbot-quote-form p { margin: 0; }
.cleanbot-quote-form label { display: block; margin-bottom: 6px; color: var(--ppt-ink); font-size: 14px; font-weight: 700; }
.cleanbot-quote-form input, .cleanbot-quote-form textarea {
  width: 100%;
  min-height: 44px;
  border: 1px solid var(--ppt-line);
  border-radius: var(--ppt-radius-sm);
  background: #ffffff;
  color: var(--ppt-ink);
  font: inherit;
  padding: 11px 12px;
}
.cleanbot-quote-form textarea { resize: vertical; }
.cleanbot-quote-form input:focus, .cleanbot-quote-form textarea:focus {
  border-color: var(--ppt-blue);
  outline: 2px solid rgba(14, 95, 217, 0.16);
}
.ppt-footer { background: var(--ppt-dark); color: var(--ppt-on-dark-muted); padding: 48px 0 28px; }
.ppt-footer__grid { display: grid; gap: 28px; }
.ppt-footer h2 { margin-bottom: 14px; color: #ffffff; font-size: 15px; }
.ppt-footer a { display: block; margin-bottom: 9px; color: var(--ppt-on-dark-muted); font-size: 14px; }
.ppt-footer a:hover, .ppt-footer a:focus-visible { color: #ffffff; }
.ppt-footer__brand p { max-width: 360px; }
.ppt-logo--footer { display: inline-block; margin-bottom: 14px; color: #ffffff; }
.ppt-cert-list { display: flex; flex-wrap: wrap; gap: 8px; margin: 18px 0 0; padding: 0; list-style: none; }
.ppt-cert-list li {
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: var(--ppt-radius-sm);
  color: #ffffff;
  font-size: 12px;
  font-weight: 800;
  padding: 4px 8px;
}
.ppt-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  margin-top: 34px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 18px;
}
.ppt-footer__bottom p { margin: 0; color: rgba(255, 255, 255, 0.55); font-size: 13px; }
.screen-reader-text {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
@media (min-width: 560px) {
  h1 { font-size: 46px; }
  h2 { font-size: 34px; }
  .ppt-stat-row, .ppt-product-kpis { grid-template-columns: repeat(3, 1fr); }
  .cleanbot-product-grid, .cleanbot-industry-grid, .ppt-feature-grid { grid-template-columns: repeat(2, 1fr); }
  .cleanbot-quote-form { grid-template-columns: repeat(2, 1fr); }
  .cleanbot-form-wrap__wide { grid-column: 1 / -1; }
}
@media (min-width: 820px) {
  :root { --ppt-section: 78px; }
  .ppt-container { width: min(100% - 48px, var(--ppt-container)); }
  .ppt-menu-toggle { display: none; }
  .ppt-nav { position: static; display: block; border: 0; background: transparent; padding: 0; }
  .ppt-nav__list { display: flex; align-items: center; gap: 2px; }
  .ppt-nav__list a { padding: 10px 11px; font-size: 14px; }
  .ppt-hero { padding: 82px 0; }
  .ppt-hero__grid, .ppt-answer-grid, .ppt-split, .ppt-product-overview, .ppt-product-hero__grid { grid-template-columns: 1fr 1fr; }
  .ppt-hero h1 { font-size: 56px; }
  .cleanbot-product-grid { grid-template-columns: repeat(4, 1fr); }
  .cleanbot-industry-grid { grid-template-columns: repeat(4, 1fr); }
  .ppt-cta-panel { grid-template-columns: 1fr auto; padding: 38px; }
  .ppt-resource-grid { grid-template-columns: repeat(3, 1fr); }
  .ppt-resource-grid .ppt-section-head { grid-column: 1 / -1; }
  .ppt-feature-grid { grid-template-columns: repeat(3, 1fr); }
  .ppt-footer__grid { grid-template-columns: 1.4fr repeat(3, 1fr); }
}
@media (min-width: 1080px) {
  .ppt-nav__list { gap: 6px; }
  .ppt-nav__list a { padding-inline: 13px; }
}
`;

const js = `(function () {
  "use strict";
  const toggle = document.querySelector("[data-ppt-menu-toggle]");
  const nav = document.querySelector("[data-ppt-nav]");
  const header = document.querySelector("[data-ppt-header]");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("ppt-menu-open", !isOpen);
    });
    nav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        document.body.classList.remove("ppt-menu-open");
      }
    });
  }
  if (header) {
    const updateHeaderState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
  }
})();`;

function robotsTxt() {
  return `User-agent: *
Allow: /

# PanPanTech GEO crawler access
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${site.domain}/sitemap.xml
`;
}

function llmsTxt() {
  return `# PanPanTech

> PanPanTech supplies commercial cleaning robots, autonomous floor scrubbers, multifunction cleaning robots, sweeping robots, and industrial AMR solutions for warehouses, retail, airports, hospitals, hotels, factories, and OEM / ODM distributors.

## Products
- [Commercial Cleaning Robots](${site.domain}/products/): product range overview.
- [P060 All-in-One Cleaning Robot](${site.domain}/products/p060/): compact 6-in-1 robot for indoor commercial cleaning.
- [PT90 Autonomous Floor Scrubber](${site.domain}/products/pt90/): large-area floor scrubbing robot for warehouses and public facilities.

## Buying And OEM
- [Commercial Cleaning Robot Manufacturer](${site.domain}/commercial-cleaning-robot-manufacturer/): manufacturing, QC, export, and certification information.
- [OEM / ODM Cleaning Robots](${site.domain}/oem-odm-cleaning-robots/): private-label and distributor support.
- [Request a Quote](${site.domain}/request-a-quote/): RFQ path for facility buyers and distributors.

## Facility Solutions
- [Warehouse Cleaning Robots](${site.domain}/industries/warehouse-cleaning-robots/): recommended models and ROI guidance for warehouses.
- [FAQ](${site.domain}/faqs/): shipping, certification, OEM, model selection, and support answers.
`;
}

function sitemapXml(pagePaths) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = pagePaths
    .map(
      (pagePath) => `  <url>
    <loc>${url(pagePath)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${pagePath === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${pagePath === "/" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

async function main() {
  const pages = new Map([
    ["/", homePage()],
    ["/products/", productsPage()],
    ["/products/p060/", productPage(products[0])],
    ["/products/pt90/", productPage(products[1])],
    ["/oem-odm-cleaning-robots/", oemPage()],
    ["/commercial-cleaning-robot-manufacturer/", manufacturerPage()],
    ["/industries/warehouse-cleaning-robots/", warehousePage()],
    ["/resources/", resourcesPage()],
    ["/faqs/", faqPage()],
    ["/about/", aboutPage()],
    ["/request-a-quote/", quotePage()],
    ["/contact/", contactPage()],
  ]);

  for (const [label, href] of industries) {
    if (!pages.has(href)) {
      pages.set(href, placeholderIndustryPage(label, href));
    }
  }

  for (const [pagePath, content] of pages) {
    const relative = pagePath === "/" ? "index.html" : path.join(pagePath.slice(1), "index.html");
    await write(relative, content);
  }

  await write("404.html", notFoundPage());
  await write("assets/css/site.css", css);
  await write("assets/js/site.js", js);
  await write("robots.txt", robotsTxt());
  await write("llms.txt", llmsTxt());
  await write("sitemap.xml", sitemapXml([...pages.keys()]));
  await write("CNAME", "panpantechnology.com\n");
  await write(".nojekyll", "");
  await write(
    "_headers",
    `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
`
  );
}

await main();
