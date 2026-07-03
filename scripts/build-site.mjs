import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const site = {
  name: "PanPanTech",
  domain: "https://panpantechnology.com",
  address: "Building A1, Yuexiu iPARK Yuegang Zhigu, Nansha District, Guangzhou, Guangdong Province, China",
  email: "info@panpantechnology.com",
  phone: "+86-13925118851",
  city: "Guangzhou",
  country: "CN",
  description:
    "PanPanTech is a retail AIoT, smart robotics, and manufacturing platform connecting electronic shelf labels, retail analytics, AMR robots, and OEM programs.",
};

const nav = [
  ["Solutions", "/solutions/"],
  ["Technology", "/technology/"],
  ["Manufacturing", "/manufacturing/"],
  ["About", "/about/"],
  ["Contact", "/contact/"],
];

const groupBrands = [
  {
    name: "AiEinkSmart",
    url: "https://aieinksmart.com",
    role: "Electronic shelf labels and e-paper signage",
    note: "Electronic shelf label systems for retailers that need fast price updates, e-paper shelf displays, and store-level operations support.",
  },
  {
    name: "Pyroglaux",
    url: "https://pyroglaux.com",
    role: "Privacy-compliant retail footfall analytics",
    note: "Retail analytics for store traffic, behavior measurement, and privacy-compliant occupancy insights.",
  },
  {
    name: "AiESL",
    url: "https://aiesl.com",
    role: "Retail data middleware, API, and platform entry",
    note: "Platform and API entry for retail data, label management, and system integration.",
  },
  {
    name: "EinkSmart",
    url: "https://einksmart.com",
    role: "E-paper art frame and digital art display",
    note: "E-paper art frames and ambient digital display products for residential and commercial interiors.",
  },
];

const businessUnits = [
  {
    title: "Retail Tech",
    eyebrow: "ESL / Analytics / Middleware",
    text: "Connect shelf-edge displays, price updates, store analytics, and retail data workflows through dedicated PanPanTech group brands.",
    href: "/solutions/#retail-tech",
  },
  {
    title: "Smart Robots",
    eyebrow: "Cleaning / AMR / Facade",
    text: "Commercial cleaning robots, facade cleaning robots, and warehouse AMRs for facility automation, distributor sourcing, and project evaluation.",
    href: "/solutions/smart-robots/",
  },
  {
    title: "Digital Art",
    eyebrow: "E-paper display line",
    text: "E-paper art frames and ambient display products for interiors, hospitality spaces, galleries, and curated commercial environments.",
    href: "/solutions/#digital-art",
  },
  {
    title: "Manufacturing",
    eyebrow: "ESL OEM / PCBA / Modules",
    text: "ESL finished-goods assembly, PCBA service, and e-paper display module manufacturing for qualified B2B cooperation.",
    href: "/manufacturing/",
  },
];

const trustFacts = [
  ["2015", "Founded in Guangzhou"],
  ["30+", "countries served"],
  ["6,000+", "retail stores deployed"],
  ["3,200 m2", "production base and SMT capability"],
];

const manufacturingCapabilities = [
  ["01", "ESL OEM / ODM", "Finished electronic shelf label programs, model planning, neutral datasheets, packaging support, and distributor-ready documentation."],
  ["02", "PCBA assembly", "Board-level assembly, firmware coordination, test fixtures, inspection workflow, and sourcing support for retail IoT hardware."],
  ["03", "E-paper modules", "E-paper display modules, wireless gateway accessory planning, enclosure coordination, and sample-to-pilot validation."],
  ["04", "Quality control", "Incoming material checks, SMT process notes, functional testing, burn-in expectations, packing checks, and export document control."],
];

const products = [
  {
    "slug": "p060",
    "title": "ONE S55 / P060 All-in-One Commercial Cleaning Robot",
    "shortTitle": "ONE S55 / P060 Cleaning Robot",
    "model": "ONE S55 / P060",
    "category": "Indoor Cleaning",
    "type": "6-in-1 indoor commercial cleaning robot",
    "excerpt": "A compact all-in-one robot for sweeping, scrubbing, vacuuming, dust-pushing, self-cleaning, and sanitizing commercial floors.",
    "image": "/assets/images/one-s55-p060-cleaning-robot.jpg",
    "url": "/products/p060/",
    "efficiency": "Up to 1,368 m2/h",
    "runtime": "Up to 4.5 h standard scrubbing",
    "dimensions": "650 x 580 x 550 mm",
    "cleaningWidth": "520 mm scrubbing width",
    "tanks": "22 L clean / 15 L waste / 1 L dust bin",
    "navigation": "LiDAR + vision navigation",
    "certifications": "CE / FCC / IEC documentation available per order",
    "bestFor": "Offices, hotels, hospitals, small warehouses, factories, showrooms, and mixed indoor commercial floors.",
    "highlights": [
      "Combines sweep, scrub, vacuum, mop, self-cleaning, and sanitizing workflows.",
      "70 kg compact body with 15 kPa suction and HEPA H13 filtration for indoor commercial use.",
      "Low-noise operation and quick-change modules help distributors support varied facility tasks."
    ],
    "specs": [
      [
        "Dimensions",
        "650 x 580 x 550 mm"
      ],
      [
        "Weight",
        "70 kg"
      ],
      [
        "Cleaning efficiency",
        "About 1,197 m2/h scrubbing; up to 1,368 m2/h sweeping, vacuuming, or dust-pushing"
      ],
      [
        "Cleaning width",
        "520 mm scrubbing width"
      ],
      [
        "Tank / dust capacity",
        "22 L clean water, 15 L waste water, 1 L dust bin"
      ],
      [
        "Suction",
        "15 kPa peak suction"
      ],
      [
        "Runtime",
        "4.5 h standard scrubbing; 2.5 h strong mode"
      ],
      [
        "Protection / filtration",
        "IP43, HEPA H13"
      ],
      [
        "Noise",
        "55 dB / 45 dB modes"
      ],
      [
        "Navigation",
        "LiDAR + vision"
      ],
      [
        "Certifications",
        "CE / FCC / IEC documents available per final configuration"
      ]
    ]
  },
  {
    "slug": "pt90",
    "title": "SC80 / PT90 Autonomous Floor Scrubber",
    "shortTitle": "SC80 / PT90 Floor Scrubber",
    "model": "SC80 / PT90",
    "category": "Large-Area Scrubbing",
    "type": "Driverless large-area floor scrubber",
    "excerpt": "A large autonomous scrubber for transport hubs, warehouses, factories, malls, and broad indoor or semi-outdoor hard floors.",
    "image": "/assets/images/sc80-pt90-floor-scrubber.jpg",
    "url": "/products/pt90/",
    "efficiency": "Up to 4,000 m2/h",
    "runtime": "4-6 h per charge",
    "dimensions": "1340 x 1024 x 1350 mm",
    "cleaningWidth": "800 mm scrubbing / 1160 mm sweeping",
    "tanks": "140 L clean water class",
    "navigation": "LiDAR + depth camera + ultrasonic sensing",
    "certifications": "Final documents confirmed per order",
    "bestFor": "Large hard-floor areas in stations, airports, warehouses, factories, malls, and public facilities.",
    "highlights": [
      "Large cleaning width and 140 L clean-water class tank reduce route interruptions.",
      "36 V / 200 Ah lithium iron phosphate battery supports long repeated routes.",
      "Multi-sensor perception supports driverless operation around mixed obstacles."
    ],
    "specs": [
      [
        "Dimensions",
        "1340 x 1024 x 1350 mm"
      ],
      [
        "Weight",
        "400 kg"
      ],
      [
        "Maximum efficiency",
        "Up to 4,000 m2/h"
      ],
      [
        "Cleaning width",
        "1160 mm sweeping; 800 mm scrubbing; 1024 mm squeegee width"
      ],
      [
        "Battery",
        "36 V / 200 Ah lithium iron phosphate"
      ],
      [
        "Runtime",
        "4-6 h per charge"
      ],
      [
        "Clean water tank",
        "140 L"
      ],
      [
        "Navigation",
        "LiDAR, depth camera, and ultrasonic sensing"
      ],
      [
        "Best-fit scenarios",
        "Transport hubs, plazas, malls, warehouses, and large hard-floor facilities"
      ]
    ]
  },
  {
    "slug": "t300-industrial-delivery-amr",
    "title": "T300 Standard Industrial Delivery AMR",
    "shortTitle": "T300 Standard AMR",
    "model": "T300 Standard",
    "category": "Warehouse AMR",
    "type": "Industrial delivery and material-handling AMR",
    "excerpt": "A 300 kg payload AMR platform for industrial logistics, line-side delivery, warehouse picking support, and commercial heavy delivery.",
    "image": "/assets/images/t300-standard-amr.jpg",
    "url": "/products/t300-industrial-delivery-amr/",
    "efficiency": "300 kg payload class",
    "runtime": "Project confirmed",
    "dimensions": "Final datasheet confirmed per configuration",
    "cleaningWidth": "Open platform with onboard touchscreen",
    "tanks": "Flat-deck / accessory-ready payload platform",
    "navigation": "Autonomous AMR navigation with integration interfaces",
    "certifications": "Project safety documents confirmed per order",
    "bestFor": "Industrial logistics, commercial heavy delivery, line-side replenishment, and warehouse material movement.",
    "highlights": [
      "300 kg payload class for repeatable material movement.",
      "Onboard touchscreen and open platform support flexible operation.",
      "Supports elevator, door, call, and software or hardware integration workflows."
    ],
    "specs": [
      [
        "Payload",
        "Up to 300 kg class"
      ],
      [
        "Configuration",
        "Standard delivery AMR with high-load chassis and open platform"
      ],
      [
        "Control",
        "Onboard touchscreen"
      ],
      [
        "Interfaces",
        "Elevator control, door access, calling, and software or hardware interfaces available by project"
      ],
      [
        "Use cases",
        "Industrial logistics and commercial heavy-load delivery"
      ],
      [
        "Documentation",
        "Final datasheet and safety file confirmed per deployment"
      ]
    ]
  },
  {
    "slug": "t300-lifting-amr",
    "title": "T300 Lifting AMR",
    "shortTitle": "T300 Lifting AMR",
    "model": "T300 Lifting",
    "category": "Warehouse AMR",
    "type": "Latent lifting AMR for rack movement",
    "excerpt": "A T300-series AMR variant for latent lifting and rack movement in factories, warehouses, and work-in-progress transfer areas.",
    "image": "/assets/images/t300-lifting-amr.jpg",
    "url": "/products/t300-lifting-amr/",
    "efficiency": "300 kg payload class",
    "runtime": "Project confirmed",
    "dimensions": "T300-series chassis; final datasheet confirmed",
    "cleaningWidth": "Latent lifting rack module",
    "tanks": "Rack / shelf payload workflow",
    "navigation": "Autonomous AMR navigation",
    "certifications": "Project safety documents confirmed per order",
    "bestFor": "Factory rack movement, warehouse shelf transfer, and flexible material staging.",
    "highlights": [
      "Designed for under-rack lifting and transfer tasks.",
      "Uses the T300 platform with 300 kg class payload planning.",
      "Best evaluated with rack size, center of gravity, path width, and docking workflow."
    ],
    "specs": [
      [
        "Payload",
        "Up to 300 kg class"
      ],
      [
        "Configuration",
        "Latent lifting variant for rack or shelf movement"
      ],
      [
        "Platform",
        "T300-series AMR"
      ],
      [
        "Use cases",
        "Factory and warehouse rack movement"
      ],
      [
        "Project checks",
        "Rack size, floor flatness, turning radius, docking position, and center of gravity"
      ],
      [
        "Documentation",
        "Final lifting module datasheet confirmed per order"
      ]
    ]
  },
  {
    "slug": "t300-conveyor-amr",
    "title": "T300 Conveyor AMR",
    "shortTitle": "T300 Conveyor AMR",
    "model": "T300 Conveyor",
    "category": "Warehouse AMR",
    "type": "Conveyor docking AMR",
    "excerpt": "A T300-series AMR with roller conveyor module for automatic loading, unloading, and station-to-station transfer.",
    "image": "/assets/images/t300-conveyor-amr-new.jpg",
    "url": "/products/t300-conveyor-amr/",
    "efficiency": "300 kg payload class",
    "runtime": "Project confirmed",
    "dimensions": "Final conveyor height and length confirmed per station",
    "cleaningWidth": "Single or double roller conveyor module",
    "tanks": "Conveyor transfer payload module",
    "navigation": "Autonomous AMR docking navigation",
    "certifications": "Project safety documents confirmed per order",
    "bestFor": "Production-line loading, unloading, conveyor docking, and station transfer workflows.",
    "highlights": [
      "Roller module supports automatic material handoff at fixed stations.",
      "Conveyor height, roller length, and docking tolerance are configured by project.",
      "Designed for line-side automation where manual cart transfer is repetitive."
    ],
    "specs": [
      [
        "Payload",
        "Up to 300 kg class"
      ],
      [
        "Configuration",
        "Roller conveyor AMR"
      ],
      [
        "Module options",
        "Single-layer or double-layer roller concepts by project"
      ],
      [
        "Use cases",
        "Automatic loading, unloading, and conveyor station transfer"
      ],
      [
        "Project checks",
        "Docking height, station width, roller direction, path clearance, and safety zones"
      ],
      [
        "Documentation",
        "Final conveyor module datasheet confirmed per order"
      ]
    ]
  },
  {
    "slug": "t300-tray-amr",
    "title": "T300 Tray AMR",
    "shortTitle": "T300 Tray AMR",
    "model": "T300 Tray",
    "category": "Warehouse AMR",
    "type": "Tray delivery AMR",
    "excerpt": "A T300-series tray delivery AMR for moving boxed parts, bins, tools, and small material batches across factories and warehouses.",
    "image": "/assets/images/t300-tray-amr.jpg",
    "url": "/products/t300-tray-amr/",
    "efficiency": "300 kg payload class",
    "runtime": "Project confirmed",
    "dimensions": "Tray size confirmed per payload",
    "cleaningWidth": "Tray / shelf payload module",
    "tanks": "Tray-based payload workflow",
    "navigation": "Autonomous AMR navigation",
    "certifications": "Project safety documents confirmed per order",
    "bestFor": "Material tray delivery, small-batch transfer, tool delivery, and internal warehouse circulation.",
    "highlights": [
      "Tray or shelf module supports small parts and boxed material movement.",
      "Useful for factory routes where payloads change but delivery points repeat.",
      "Configure tray dimensions, edge protection, and loading height around the site workflow."
    ],
    "specs": [
      [
        "Payload",
        "Up to 300 kg class"
      ],
      [
        "Configuration",
        "Tray or shelf delivery AMR"
      ],
      [
        "Platform",
        "T300-series AMR"
      ],
      [
        "Use cases",
        "Material trays, boxed parts, tools, and bin delivery"
      ],
      [
        "Project checks",
        "Tray size, loading method, path width, station height, and manual handoff rules"
      ],
      [
        "Documentation",
        "Final tray module datasheet confirmed per order"
      ]
    ]
  },
  {
    "slug": "t300-towing-amr",
    "title": "T300 Towing AMR",
    "shortTitle": "T300 Towing AMR",
    "model": "T300 Towing",
    "category": "Warehouse AMR",
    "type": "Industrial towing AMR",
    "excerpt": "A T300-series towing AMR concept for pulling multiple material carts and supporting repeatable factory logistics routes.",
    "image": "/assets/images/t300-towing-amr.jpg",
    "url": "/products/t300-towing-amr/",
    "efficiency": "300 kg class workflow",
    "runtime": "Project confirmed",
    "dimensions": "Tow hook and cart dimensions confirmed per project",
    "cleaningWidth": "Towing / cart module",
    "tanks": "Multi-cart material workflow",
    "navigation": "Autonomous AMR route navigation",
    "certifications": "Project safety documents confirmed per order",
    "bestFor": "Multi-cart towing, milk-run logistics, line-side replenishment, and factory route automation.",
    "highlights": [
      "Designed for repeated material-cart movement instead of single-load delivery.",
      "Cart train length, tow point, turning radius, and aisle width must be checked together.",
      "Supports warehouse picking support and line-side replenishment planning."
    ],
    "specs": [
      [
        "Payload / workflow",
        "300 kg class T300-series towing workflow; final cart train confirmed by project"
      ],
      [
        "Configuration",
        "Towing AMR with cart or trailer interface"
      ],
      [
        "Use cases",
        "Multi-cart towing, milk-run routes, and line-side material replenishment"
      ],
      [
        "Project checks",
        "Tow hook, cart size, train length, turning radius, slopes, and safety zones"
      ],
      [
        "Documentation",
        "Final towing module datasheet confirmed per order"
      ]
    ]
  },
  {
    "slug": "t600-heavy-payload-amr",
    "title": "T600 Heavy-Payload AMR",
    "shortTitle": "T600 Heavy-Payload AMR",
    "model": "T600",
    "category": "Warehouse AMR",
    "type": "Heavy-payload latent lifting AMR",
    "excerpt": "A 600 kg payload AMR for heavy factory and warehouse material movement, rack transfer, and industrial delivery routes.",
    "image": "/assets/images/t600-heavy-payload-amr-new.jpg",
    "url": "/products/t600-heavy-payload-amr/",
    "efficiency": "600 kg payload",
    "runtime": "Project confirmed",
    "dimensions": "960 x 500 x 1350 mm",
    "cleaningWidth": "Latent lifting heavy-payload module",
    "tanks": "Rack / heavy material workflow",
    "navigation": "Autonomous AMR navigation with VDA5050 support",
    "certifications": "Project safety documents confirmed per order",
    "bestFor": "Heavy material movement in factories, warehouses, line-side storage, and rack transfer workflows.",
    "highlights": [
      "600 kg payload class supports heavier rack and material movement than T300 variants.",
      "VDA5050 support helps buyers discuss fleet interoperability.",
      "Built-in screen and local control features can reduce dependency on a central control station."
    ],
    "specs": [
      [
        "Payload",
        "600 kg"
      ],
      [
        "Dimensions",
        "960 x 500 x 1350 mm"
      ],
      [
        "Robot weight",
        "About 112 kg"
      ],
      [
        "Configuration",
        "Latent lifting heavy-payload AMR"
      ],
      [
        "Protocol",
        "VDA5050 support"
      ],
      [
        "Operation",
        "Built-in screen, elevator dispatch priority, assist switch, shortcut buttons, and front indicator lights"
      ],
      [
        "Use cases",
        "Factory and warehouse heavy material movement"
      ]
    ]
  },
  {
    "slug": "iqx70b-autonomous-scrubber",
    "title": "IQX70B Autonomous Floor Scrubber",
    "shortTitle": "IQX70B Floor Scrubber",
    "model": "IQX70B",
    "category": "Large-Area Scrubbing",
    "type": "Fully autonomous floor scrubbing robot",
    "excerpt": "A fully autonomous floor scrubber for smart factories, hospitals, airports, stations, malls, offices, and warehouse floors.",
    "image": "/assets/images/iqx70b-floor-scrubber.jpg",
    "url": "/products/iqx70b-autonomous-scrubber/",
    "efficiency": "Up to 2,160 m2/h",
    "runtime": "Up to 5 h",
    "dimensions": "940 x 800 x 1170 mm",
    "cleaningWidth": "Edge cleaning to about 10 cm",
    "tanks": "65 L water tank class",
    "navigation": "Autonomous navigation with service-station workflow",
    "certifications": "Project documentation confirmed per order",
    "bestFor": "Large indoor sites that need autonomous scrubbing plus charging, water refill, drainage, and maintenance workflow planning.",
    "highlights": [
      "65 L water tank class and 5 h runtime support large repeated cleaning routes.",
      "Service-station workflow can handle charging, wastewater discharge, clean-water refill, detergent adding, and tank washing.",
      "Suitable for hospitals, airports, stations, malls, office buildings, warehouses, and smart factories."
    ],
    "specs": [
      [
        "Dimensions",
        "940 x 800 x 1170 mm"
      ],
      [
        "Weight",
        "200 kg"
      ],
      [
        "Runtime",
        "Up to 5 h"
      ],
      [
        "Maximum efficiency",
        "Up to 2,160 m2/h"
      ],
      [
        "Water tank",
        "65 L class"
      ],
      [
        "Edge cleaning",
        "Can clean to about 10 cm from edge"
      ],
      [
        "Noise",
        "65 dB(A)"
      ],
      [
        "Station workflow",
        "Automatic charging, drainage, refill, detergent adding, and waste-tank washing"
      ]
    ]
  },
  {
    "slug": "xg-cleaning-robot",
    "title": "XG High-End Commercial Cleaning Robot",
    "shortTitle": "XG Cleaning Robot",
    "model": "XG",
    "category": "Outdoor Sweeping",
    "type": "High-end commercial all-in-one cleaning robot",
    "excerpt": "A high-end commercial cleaning robot for large-area routes, outdoor-capable scenes, cloud management, and autonomous cleaning programs.",
    "image": "/assets/images/xg-cleaning-robot.jpg",
    "url": "/products/xg-cleaning-robot/",
    "efficiency": "Large-area route class",
    "runtime": "Auto-return charging workflow",
    "dimensions": "Final datasheet confirmed per order",
    "cleaningWidth": "Brochure-confirmed cleaning module",
    "tanks": "Large trash-bin class; final volume confirmed",
    "navigation": "High-precision mapping and omnidirectional perception",
    "certifications": "Project documentation confirmed per order",
    "bestFor": "Large outdoor or mixed-area cleaning programs where cloud management and route memory are important.",
    "highlights": [
      "High-precision mapping and dynamic memory support repeated large-area routes.",
      "Omnidirectional obstacle perception helps reduce blind spots.",
      "Cloud platform management supports remote monitoring and route programs."
    ],
    "specs": [
      [
        "Model",
        "XG"
      ],
      [
        "Robot class",
        "High-end commercial all-in-one cleaning robot"
      ],
      [
        "Navigation",
        "High-precision mapping and dynamic route memory"
      ],
      [
        "Obstacle perception",
        "Omnidirectional perception without blind-zone planning"
      ],
      [
        "Charging",
        "Low-battery auto-return charging workflow"
      ],
      [
        "Management",
        "Cloud platform remote management"
      ],
      [
        "Open item",
        "Exact dimensions, tank size, and cleaning width should be confirmed from the final datasheet"
      ]
    ]
  },
  {
    "slug": "yz-outdoor-sweeping-robot",
    "title": "YZ Outdoor Sweeping Robot",
    "shortTitle": "YZ Outdoor Sweeper",
    "model": "YZ",
    "category": "Outdoor Sweeping",
    "type": "Driverless outdoor sweeping robot",
    "excerpt": "An outdoor driverless sweeping robot for municipal roads, large outdoor plazas, industrial parks, and campus cleaning routes.",
    "image": "/assets/images/yz-outdoor-sweeper.jpg",
    "url": "/products/yz-outdoor-sweeping-robot/",
    "efficiency": "Up to 10,000 m2/h",
    "runtime": "All-weather autonomous workflow",
    "dimensions": "Final datasheet confirmed per order",
    "cleaningWidth": "1.0-1.8 m sweeping width",
    "tanks": "120 L standard trash-bin workflow",
    "navigation": "4G / 5G, app, cloud platform, optional remote takeover",
    "certifications": "Project documentation confirmed per order",
    "bestFor": "Municipal roads, outdoor industrial parks, large plazas, campuses, and logistics-park exterior routes.",
    "highlights": [
      "Up to 10,000 m2/h outdoor sweeping efficiency for large-area routes.",
      "Supports automatic loading and unloading of a 120 L standard trash bin.",
      "4G / 5G, app, cloud platform, and optional remote takeover support operations teams."
    ],
    "specs": [
      [
        "Maximum efficiency",
        "Up to 10,000 m2/h"
      ],
      [
        "Sweeping width",
        "1.0-1.8 m"
      ],
      [
        "Cleaning rate",
        "At least 99% stated in source table"
      ],
      [
        "Trash handling",
        "60 L/min waste handling; automatic loading and unloading of 120 L standard trash bin"
      ],
      [
        "Operation",
        "All-weather autonomous operation"
      ],
      [
        "Connectivity",
        "4G / 5G, app, cloud platform, optional remote takeover"
      ],
      [
        "Use cases",
        "Large outdoor and municipal road sweeping"
      ]
    ]
  },
  {
    "slug": "c2-cleaning-robot",
    "title": "C2 Four-in-One Commercial Cleaning Robot",
    "shortTitle": "C2 Cleaning Robot",
    "model": "C2",
    "category": "Indoor Cleaning",
    "type": "Four-in-one commercial cleaning robot",
    "excerpt": "A four-in-one commercial cleaning robot for sweeping, vacuuming, scrubbing, and mopping indoor commercial spaces.",
    "image": "/assets/images/c2-cleaning-robot.jpg",
    "url": "/products/c2-cleaning-robot/",
    "efficiency": "Indoor commercial class",
    "runtime": "Final datasheet confirmed",
    "dimensions": "Final datasheet confirmed",
    "cleaningWidth": "Four-in-one cleaning module",
    "tanks": "Final datasheet confirmed",
    "navigation": "Autonomous indoor navigation",
    "certifications": "Project documentation confirmed per order",
    "bestFor": "Commercial indoor cleaning programs that need a compact four-in-one robot before adding a smart station.",
    "highlights": [
      "Four-in-one cleaning modes: sweep, vacuum, scrub, and mop.",
      "Good starting point for indoor commercial cleaning catalogs.",
      "Detailed numeric specifications should be confirmed from the final model datasheet before quotation."
    ],
    "specs": [
      [
        "Robot class",
        "Four-in-one commercial cleaning robot"
      ],
      [
        "Cleaning modes",
        "Sweep, vacuum, scrub, and mop"
      ],
      [
        "Best-fit environment",
        "Commercial indoor areas"
      ],
      [
        "Known source note",
        "The selection table marks detailed specifications as brochure-based and requiring final confirmation"
      ],
      [
        "Open item",
        "Dimensions, tank volumes, runtime, and cleaning width should be confirmed from final datasheet"
      ]
    ]
  },
  {
    "slug": "c2-pro-cleaning-robot",
    "title": "C2 PRO Cleaning Robot with Smart Station",
    "shortTitle": "C2 PRO Cleaning Robot",
    "model": "C2 PRO",
    "category": "Indoor Cleaning",
    "type": "Four-in-one cleaning robot with smart station",
    "excerpt": "A compact commercial cleaning robot with smart station workflow for automatic drainage, refill, charging, AI recognition, and indoor route cleaning.",
    "image": "/assets/images/c2-pro-cleaning-robot.jpg",
    "url": "/products/c2-pro-cleaning-robot/",
    "efficiency": "Indoor smart-station class",
    "runtime": "2.5 h vacuum / 4 h scrubbing",
    "dimensions": "506 x 506 x 660 mm",
    "cleaningWidth": "Narrow passage from 75 cm",
    "tanks": "Smart station drainage / refill workflow",
    "navigation": "AI recognition and autonomous mapping",
    "certifications": "Project documentation confirmed per order",
    "bestFor": "Large indoor commercial spaces that need cleaning plus automatic station support.",
    "highlights": [
      "Smart station supports automatic drainage, water refill, and charging.",
      "Compact 506 mm body with 75 cm narrow-passage planning.",
      "AI recognition and optional mobile transfer station support broader site workflows."
    ],
    "specs": [
      [
        "Dimensions",
        "506 x 506 x 660 mm"
      ],
      [
        "Weight",
        "50 kg"
      ],
      [
        "Protection",
        "IP33"
      ],
      [
        "Maximum speed",
        "1 m/s"
      ],
      [
        "Slope / obstacle",
        "5 degree slope; 10 mm obstacle"
      ],
      [
        "Runtime",
        "2.5 h sweeping or vacuuming; 4 h scrubbing"
      ],
      [
        "Battery",
        "24 V / 36 Ah"
      ],
      [
        "Charging",
        "About 3 h"
      ],
      [
        "Minimum passage",
        "75 cm"
      ],
      [
        "Map capacity",
        "Up to 10,000 m2"
      ],
      [
        "Peak suction",
        "15 kPa"
      ],
      [
        "Station",
        "Automatic drainage, refill, charging, and optional mobile transfer station"
      ]
    ]
  },
  {
    "slug": "c3-mini-cleaning-robot",
    "title": "C3-Mini Compact Cleaning Robot",
    "shortTitle": "C3-Mini Cleaning Robot",
    "model": "C3-Mini",
    "category": "Indoor Cleaning",
    "type": "Compact sweep, vacuum, mop, and scrub robot",
    "excerpt": "A compact commercial cleaning robot for small and narrow indoor routes, with sweep, vacuum, mop, scrub, edge-cleaning, and multi-sensor perception.",
    "image": "/assets/images/c3-mini-cleaning-robot.jpg",
    "url": "/products/c3-mini-cleaning-robot/",
    "efficiency": "About 200 m2/h",
    "runtime": "About 1.5 h",
    "dimensions": "400 x 400 x 360 mm body",
    "cleaningWidth": "530 mm sweeping / 350 mm scrubbing",
    "tanks": "5 L clean / 3.5 L waste / 0.7 L dust bin",
    "navigation": "2D laser, structured light, line laser, ultrasonic sensing",
    "certifications": "Project documentation confirmed per order",
    "bestFor": "Small indoor areas, narrow passages, offices, shops, and compact commercial spaces.",
    "highlights": [
      "400 mm compact body supports 60 cm narrow-passage planning.",
      "Active retractable side brush supports zero-edge cleaning scenarios.",
      "Useful as a compact indoor model below larger station-based robots."
    ],
    "specs": [
      [
        "Dimensions",
        "400 x 400 x 360 mm, excluding side brush"
      ],
      [
        "Weight",
        "27 kg empty"
      ],
      [
        "Speed",
        "0.5 m/s"
      ],
      [
        "Runtime",
        "About 1.5 h"
      ],
      [
        "Battery",
        "24 V / 15 Ah"
      ],
      [
        "Charging",
        "About 1.5 h"
      ],
      [
        "Minimum passage",
        "60 cm"
      ],
      [
        "Map capacity",
        "Up to 5,000 m2"
      ],
      [
        "Tank / dust capacity",
        "5 L clean, 3.5 L waste, 0.7 L dust bin"
      ],
      [
        "Cleaning width",
        "530 mm sweeping; 350 mm scrubbing"
      ],
      [
        "Roller brush",
        "300 rpm"
      ],
      [
        "Noise",
        "Under 60 dB"
      ],
      [
        "Efficiency",
        "About 200 m2/h"
      ],
      [
        "Sensors",
        "2D laser, structured light, line laser, and ultrasonic sensing"
      ]
    ]
  },
  {
    "slug": "q3-g-cleaning-robot",
    "title": "Q3-G Commercial Cleaning Robot",
    "shortTitle": "Q3-G Cleaning Robot",
    "model": "Q3-G",
    "category": "Indoor Cleaning",
    "type": "Four-in-one indoor commercial cleaning robot",
    "excerpt": "A four-in-one indoor cleaning robot with 2D or 3D LiDAR options, smart station workflow, multilingual app, and broad floor-material support.",
    "image": "/assets/images/q3-g-cleaning-robot.jpg",
    "url": "/products/q3-g-cleaning-robot/",
    "efficiency": "Brochure-confirmed per module",
    "runtime": "Final datasheet confirmed",
    "dimensions": "Final datasheet confirmed",
    "cleaningWidth": "Roller brush / roller mop module options",
    "tanks": "Smart station refill / drainage workflow",
    "navigation": "Q3-G 2D single-line or Q3-G 3D multi-line LiDAR",
    "certifications": "CE / FCC stated in source table; final documents confirmed per order",
    "bestFor": "Workshops, offices, hotels, metros, hospitals, schools, public service buildings, transport hubs, and warehouses.",
    "highlights": [
      "Four-in-one modes: scrubbing, vacuuming, sweeping, and dust-pushing.",
      "2D single-line or 3D multi-line LiDAR options support different project budgets.",
      "Smart station supports automatic drainage, water refill, and charging."
    ],
    "specs": [
      [
        "Cleaning modes",
        "Scrubbing, vacuuming, sweeping, and dust-pushing"
      ],
      [
        "Navigation options",
        "Q3-G 2D single-line LiDAR or Q3-G 3D multi-line LiDAR"
      ],
      [
        "Safety sensing",
        "21 sensors with 360-degree protection stated in source table"
      ],
      [
        "Robot weight",
        "68.5 kg including 7 kg battery"
      ],
      [
        "Station weight",
        "25 kg"
      ],
      [
        "Station workflow",
        "Automatic drainage, refill, and charging"
      ],
      [
        "Cleaning modules",
        "Roller brush + roller mop, dual roller brush, or dual roller mop options"
      ],
      [
        "Connectivity",
        "4G, WiFi, or offline"
      ],
      [
        "App",
        "19 languages stated in source table"
      ],
      [
        "Certifications",
        "CE / FCC stated in source table"
      ],
      [
        "Floor types",
        "Marble, terrazzo, tile, epoxy, short carpet, and similar indoor floors"
      ]
    ]
  },
  {
    "slug": "q3-w-cleaning-robot",
    "title": "Q3-W Textile Factory Cleaning Robot",
    "shortTitle": "Q3-W Cleaning Robot",
    "model": "Q3-W",
    "category": "Indoor Cleaning",
    "type": "High-suction cleaning robot for textile factories",
    "excerpt": "A Q3-series high-suction cleaning robot developed for textile and garment factories that need to collect cloth scraps, thread, and lightweight production waste.",
    "image": "/assets/images/q3-w-cleaning-robot.jpg",
    "url": "/products/q3-w-cleaning-robot/",
    "efficiency": "Textile factory route class",
    "runtime": "Final datasheet confirmed",
    "dimensions": "Q3-series platform; final datasheet confirmed",
    "cleaningWidth": "High-suction textile waste module",
    "tanks": "Final dust and waste capacity confirmed",
    "navigation": "Q3-series autonomous navigation",
    "certifications": "Project documentation confirmed per order",
    "bestFor": "Garment factories, textile workshops, and production areas with cloth scraps, threads, and lightweight debris.",
    "highlights": [
      "Developed for garment-factory waste such as cloth scraps and thread.",
      "Uses the Q3-series platform while focusing on stronger suction needs.",
      "Best quoted after checking debris type, route width, dust load, and waste-disposal workflow."
    ],
    "specs": [
      [
        "Robot class",
        "Textile factory high-suction cleaning robot"
      ],
      [
        "Platform",
        "Q3-series platform"
      ],
      [
        "Target debris",
        "Cloth scraps, thread, and similar garment-factory waste"
      ],
      [
        "Best-fit sites",
        "Garment factories and textile workshops"
      ],
      [
        "Open item",
        "Detailed suction, tank, runtime, and module values should be confirmed from the final datasheet"
      ]
    ]
  },
  {
    "slug": "facade-cleaning-robot",
    "title": "High-Rise Facade Cleaning Robot",
    "shortTitle": "Facade Cleaning Robot",
    "model": "Facade Cleaning Robot",
    "category": "Facade Cleaning",
    "type": "Glass curtain wall and exterior facade cleaning robot",
    "excerpt": "A high-rise facade and glass curtain wall cleaning robot for property teams seeking safer, repeatable exterior cleaning workflows.",
    "image": "/assets/images/facade-cleaning-robot-new.jpg",
    "url": "/products/facade-cleaning-robot/",
    "efficiency": "Project dependent",
    "runtime": "Project dependent",
    "dimensions": "Final model confirmed after facade review",
    "cleaningWidth": "Glass curtain wall cleaning module",
    "tanks": "Water / cleaning method confirmed by project",
    "navigation": "Remote operation and safety workflow",
    "certifications": "Project safety documentation confirmed per order",
    "bestFor": "High-rise glass curtain walls, commercial building facades, and exterior property maintenance projects.",
    "highlights": [
      "Supports unmanned or reduced-exposure cleaning for high-rise glass facades.",
      "Best reviewed after confirming building height, glass type, roof access, anchor points, and local safety rules.",
      "Useful for replacing or reducing high-risk manual rope-access or basket cleaning workflows."
    ],
    "specs": [
      [
        "Robot class",
        "Glass curtain wall and high-rise facade cleaning robot"
      ],
      [
        "Cleaning method",
        "Water and cleaning module confirmed by project"
      ],
      [
        "Use cases",
        "High-rise glass facade, exterior curtain wall, and property maintenance"
      ],
      [
        "Deployment checks",
        "Building height, roof access, anchoring, glass type, wind limits, and safety perimeter"
      ],
      [
        "Known deployments",
        "Source material references projects in Foshan, Shenzhen, Hong Kong, Macau, and Singapore"
      ],
      [
        "Open item",
        "Exact model code and numeric specifications require final supplier confirmation"
      ]
    ]
  },
  {
    "slug": "jsr1-service-robot",
    "title": "JSR-1 General-Purpose Service Robot",
    "shortTitle": "JSR-1 Service Robot",
    "model": "JSR-1",
    "category": "Service Robot",
    "type": "General-purpose AI service robot",
    "excerpt": "A general-purpose embodied AI service robot concept for retail service, light manipulation, facility assistance, and exploratory commercial automation projects.",
    "image": "/assets/images/jsr1-service-robot.jpg",
    "url": "/products/jsr1-service-robot/",
    "efficiency": "Up to 3 kg arm payload",
    "runtime": "Project confirmed",
    "dimensions": "Final datasheet confirmed",
    "cleaningWidth": "Mobile service robot with robotic arm",
    "tanks": "General-purpose payload workflow",
    "navigation": "Centimeter-level localization stated in source material",
    "certifications": "Project documentation confirmed per order",
    "bestFor": "Exploratory commercial service, retail assistance, light pick-and-place, and facility support projects where the final use case must be confirmed.",
    "highlights": [
      "General-purpose service robot model added from the supplier selection table as a to-confirm category.",
      "Source material states a 6-DoF robotic arm with up to 3 kg payload and RGB-D camera perception.",
      "Best treated as an exploratory project until final model, scope, and specifications are confirmed."
    ],
    "specs": [
      [
        "Model",
        "JSR-1"
      ],
      [
        "Robot class",
        "General-purpose AI service robot"
      ],
      [
        "Arm",
        "6-DoF robotic arm"
      ],
      [
        "Payload",
        "Up to 3 kg stated in source material"
      ],
      [
        "Perception",
        "RGB-D cameras; 720-degree FOV stated in source material"
      ],
      [
        "Localization",
        "Centimeter-level precise localization stated in source material"
      ],
      [
        "Open item",
        "Final dimensions, battery, runtime, and deployment scope require confirmation"
      ]
    ]
  }
];

const productCategories = [
  {
    "label": "Indoor Cleaning",
    "text": "Compact and station-based commercial cleaning robots for offices, hotels, hospitals, shops, workshops, and narrow indoor routes."
  },
  {
    "label": "Large-Area Scrubbing",
    "text": "Autonomous scrubbers for warehouses, factories, malls, stations, airports, and high-traffic hard floors."
  },
  {
    "label": "Warehouse AMR",
    "text": "Standard, lifting, conveyor, tray, towing, and heavy-payload AMR platforms for picking support and material handling."
  },
  {
    "label": "Outdoor Sweeping",
    "text": "Large-area cleaning and sweeping robots for campuses, logistics parks, outdoor plazas, and municipal-style routes."
  },
  {
    "label": "Facade Cleaning",
    "text": "Specialized robots for glass curtain walls, commercial building facades, and exterior property maintenance."
  },
  {
    "label": "Service Robot",
    "text": "General-purpose service robot concepts for light manipulation, retail service, and exploratory commercial automation."
  }
];

const videos = [
  {
    title: "Compact Cleaning Demo",
    text: "Short indoor cleaning clip for compact commercial spaces.",
    src: "/assets/videos/compact-cleaner-demo.mp4",
    poster: "/assets/images/s55-compact-cleaner.jpg",
  },
  {
    title: "Floor Cleaning Route",
    text: "Autonomous route demonstration for hard-floor cleaning tasks.",
    src: "/assets/videos/floor-cleaning-demo.mp4",
    poster: "/assets/images/p060-product.jpg",
  },
  {
    title: "Warehouse AMR Movement",
    text: "Material-handling robot movement for warehouse and factory workflows.",
    src: "/assets/videos/warehouse-amr-demo.mp4",
    poster: "/assets/images/t300-amr.jpg",
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

const blogPosts = [
  {
    slug: "commercial-robot-vacuum",
    keyword: "commercial robot vacuum",
    title: "Commercial Robot Vacuum",
    metaTitle: "Commercial Robot Vacuum Guide | PanPanTech",
    description:
      "A buyer guide to commercial robot vacuum systems, floor scrubbers, sweepers, use cases, costs, safety checks, and supplier selection.",
    date: "2026-07-01",
    readTime: "8 min read",
    category: "Commercial Cleaning",
    image: "/assets/images/p060-product.jpg",
    imageAlt: "Compact commercial robot vacuum and scrubber for indoor facilities",
    intro:
      "A commercial robot vacuum is an autonomous floor-cleaning machine built for offices, retail stores, hospitals, hotels, warehouses, and public buildings. Unlike a home robot vacuum, a commercial model is selected by floor area, cleaning mode, runtime, tank capacity, route reporting, safety sensors, and after-sales support. Buyers should compare the real cleaning task first: dust pickup, sweeping, scrubbing, mopping, or a combined workflow.",
    toc: [
      ["What is a commercial robot vacuum?", "what-is"],
      ["Which robot type fits each facility?", "types"],
      ["What should buyers compare?", "compare"],
      ["How much does a commercial robot vacuum cost?", "cost"],
      ["Deployment checklist", "deployment"],
      ["FAQ", "faq"],
    ],
    sections: [
      {
        id: "what-is",
        h2: "What is a commercial robot vacuum?",
        html: `<p>A commercial robot vacuum is a professional autonomous cleaning robot designed for repeatable facility cleaning. Some models focus on vacuuming and sweeping. Others combine vacuuming with scrubbing, dust-pushing, mopping, disinfection, route reports, and fleet management.</p>
        <p>For B2B buyers, the important question is not whether the robot can move by itself. The important question is whether it can clean the required floor type, finish within the shift window, work around people safely, and provide service records that the facility team can trust.</p>`,
      },
      {
        id: "types",
        h2: "Which robot type fits each facility?",
        html: `<div class="ppt-table-wrap"><table><thead><tr><th>Facility need</th><th>Best-fit robot class</th><th>What to confirm</th></tr></thead><tbody>
        <tr><td>Office, clinic, hotel corridor, showroom</td><td>Compact multi-function robot</td><td>Noise, edge cleaning, narrow passage width, maintenance access</td></tr>
        <tr><td>Warehouse support areas and retail aisles</td><td>Commercial vacuum and mop robot</td><td>Dust load, floor material, route scheduling, staff handoff</td></tr>
        <tr><td>Warehouse, mall, station, airport</td><td>Autonomous floor scrubber</td><td>Tank size, scrubbing width, runtime, recharge and water workflow</td></tr>
        <tr><td>Campus, loading zone, outdoor route</td><td>Outdoor sweeper</td><td>Debris type, slope, weather exposure, trash-bin capacity</td></tr>
        </tbody></table></div>`,
      },
      {
        id: "compare",
        h2: "What should buyers compare?",
        html: `<p>Start with measurable constraints: square meters per shift, aisle width, floor material, obstacle density, cleaning frequency, staff availability, and required proof-of-work reports. A smaller robot can be better than a larger scrubber if the site has tight spaces or mixed public traffic.</p>
        <div class="ppt-table-wrap"><table><thead><tr><th>Data point</th><th>Why it matters</th><th>Source to verify</th></tr></thead><tbody>
        <tr><td>Clean and dry walking surfaces</td><td>Robotic cleaning should support, not replace, a facility's slip and trip prevention plan.</td><td><a href="https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.22" target="_blank" rel="noopener">OSHA 1910.22</a></td></tr>
        <tr><td>Autonomous navigation and safety zones</td><td>Robots working around people need controlled routes, sensors, and stop procedures.</td><td><a href="https://www.iso.org/standard/70660.html" target="_blank" rel="noopener">ISO 3691-4</a></td></tr>
        <tr><td>Professional service robot market context</td><td>Commercial cleaning and logistics robots are part of a broader professional service robot category.</td><td><a href="https://ifr.org/wr-service-robots/" target="_blank" rel="noopener">International Federation of Robotics</a></td></tr>
        </tbody></table></div>`,
      },
      {
        id: "cost",
        h2: "How much does a commercial robot vacuum cost?",
        html: `<p>Commercial robot vacuum pricing depends on the robot class, sensors, cleaning modules, battery, service plan, spare parts, and order quantity. A compact robot is usually quoted differently from a large autonomous floor scrubber with a docking or water station.</p>
        <p>Ask suppliers to quote the robot, consumables, warranty, spare parts, training, shipping, customs documents, and optional software separately. This makes total cost of ownership easier to compare across suppliers.</p>`,
      },
      {
        id: "deployment",
        h2: "Deployment checklist for buyers",
        html: `<ul class="ppt-check-list"><li>Send a floor map, photos, floor material, and daily cleaning schedule.</li><li>Measure the narrowest passage, elevator route, and storage location.</li><li>Confirm water refill, drainage, charging, and staff handoff workflow.</li><li>Request a final datasheet, certification package, spare-part list, and warranty terms before purchase.</li></ul>`,
      },
    ],
    faqs: [
      ["Can a commercial robot vacuum replace cleaners?", "It usually replaces repetitive floor routes, not the whole cleaning team. Staff still handle detail cleaning, exceptions, safety checks, and guest-facing tasks."],
      ["Is a robot vacuum enough for commercial floors?", "It depends on the soil. Dry dust and debris may fit vacuum or sweep modes. Spills, grease, and heavy traffic often require scrubbing or combined cleaning."],
      ["What floor types can commercial cleaning robots handle?", "Common indoor targets include tile, PVC, terrazzo, marble, epoxy, concrete, and short carpet. Final compatibility should be confirmed against the model datasheet."],
      ["Do commercial robot vacuums work around people?", "Professional robots use sensors, route rules, and emergency stops, but the site still needs a deployment plan and trained staff."],
      ["What should I send for a quote?", "Send floor area, floor type, cleaning frequency, site photos, aisle width, destination country, quantity, and any OEM or distributor requirements."],
    ],
    related: ["/products/p060/", "/products/c3-mini-cleaning-robot/", "/request-a-quote/"],
  },
  {
    slug: "autonomous-floor-scrubber",
    keyword: "autonomous floor scrubber",
    title: "Autonomous Floor Scrubber",
    metaTitle: "Autonomous Floor Scrubber Buyer Guide | PanPanTech",
    description:
      "Learn how autonomous floor scrubbers work, where they fit, what specifications matter, and how to compare scrubber robots for large facilities.",
    date: "2026-07-01",
    readTime: "9 min read",
    category: "Floor Scrubbing",
    image: "/assets/images/pt90-scrubber.jpg",
    imageAlt: "Large autonomous floor scrubber for warehouses and public facilities",
    intro:
      "An autonomous floor scrubber is a driverless cleaning robot that applies solution, scrubs the floor, recovers dirty water, and follows planned routes with obstacle detection. It is best suited to large, repeatable hard-floor areas such as warehouses, factories, airports, malls, hospitals, and transport hubs. Buyers should compare tank capacity, scrubbing width, route control, runtime, safety, and water-handling workflow.",
    toc: [
      ["How does an autonomous floor scrubber work?", "how-it-works"],
      ["Where does it fit best?", "use-cases"],
      ["Which specifications matter?", "specs"],
      ["What does a service station change?", "station"],
      ["Supplier questions", "supplier"],
      ["FAQ", "faq"],
    ],
    sections: [
      {
        id: "how-it-works",
        h2: "How does an autonomous floor scrubber work?",
        html: `<p>The robot maps the facility, creates repeatable cleaning routes, detects obstacles, dispenses clean solution, scrubs the floor, and recovers wastewater through a squeegee or recovery system. Operators usually define zones, schedules, no-go areas, and manual intervention rules.</p>
        <p>The value comes from consistency. A scrubber robot can run the same route every night, record area coverage, and reduce the amount of staff time spent on broad repeated floor routes.</p>`,
      },
      {
        id: "use-cases",
        h2: "Where does an autonomous floor scrubber fit best?",
        html: `<div class="ppt-table-wrap"><table><thead><tr><th>Site</th><th>Why it fits</th><th>Typical constraint</th></tr></thead><tbody>
        <tr><td>Warehouse</td><td>Large repeated hard-floor routes</td><td>Aisle width, pallets, forklifts, shift windows</td></tr>
        <tr><td>Airport or station</td><td>High-traffic floor cleaning with audit needs</td><td>Passenger flow, operating hours, safety zoning</td></tr>
        <tr><td>Hospital</td><td>Consistent public-area cleaning</td><td>Noise, staff handoff, infection-control procedures</td></tr>
        <tr><td>Mall or supermarket</td><td>Visible floor quality and night cleaning</td><td>Mixed obstacles, store schedules, wet-floor controls</td></tr>
        </tbody></table></div>`,
      },
      {
        id: "specs",
        h2: "Which specifications matter?",
        html: `<p>Do not choose only by headline cleaning efficiency. A wider scrub path can still underperform if the robot must stop often, cannot navigate a narrow route, or requires too much manual water handling.</p>
        <div class="ppt-table-wrap"><table><thead><tr><th>Specification</th><th>Buying meaning</th><th>Verification source</th></tr></thead><tbody>
        <tr><td>Scrubbing width and tank size</td><td>Determines route duration and refill frequency.</td><td>Final signed datasheet</td></tr>
        <tr><td>Clean floor and dry surface workflow</td><td>Supports facility slip prevention and inspection routines.</td><td><a href="https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.22" target="_blank" rel="noopener">OSHA walking-working surfaces</a></td></tr>
        <tr><td>Driverless operation</td><td>Requires safety planning for people, routes, speed, and emergency stop behavior.</td><td><a href="https://www.iso.org/standard/70660.html" target="_blank" rel="noopener">ISO 3691-4</a></td></tr>
        </tbody></table></div>`,
      },
      {
        id: "station",
        h2: "What does a service station change?",
        html: `<p>A service station can reduce manual charging, water refill, wastewater discharge, and standby tasks. It matters most where the facility wants longer unattended operation or where staff cannot repeatedly support the robot during a shift.</p>
        <p>Before buying a station, confirm water access, drainage, installation space, local plumbing rules, and service responsibility.</p>`,
      },
      {
        id: "supplier",
        h2: "Supplier questions before purchase",
        html: `<ul class="ppt-check-list"><li>Which floors and cleaning chemicals are approved?</li><li>What happens if the route is blocked?</li><li>Can the robot export cleaning reports?</li><li>How are spare parts, brushes, squeegees, batteries, and filters supplied?</li><li>Which certificates and battery documents are available for the destination country?</li></ul>`,
      },
    ],
    faqs: [
      ["What is the difference between a robotic scrubber and a robot vacuum?", "A robotic scrubber uses water or solution, brushes, and recovery to clean hard floors. A robot vacuum focuses on dry debris pickup."],
      ["Can autonomous floor scrubbers work in warehouses?", "Yes, when routes, aisle width, floor condition, people, and forklift interactions are planned carefully."],
      ["Do scrubber robots need operators?", "They need trained operators for setup, exception handling, maintenance, water workflow, and safety checks."],
      ["How do I compare runtime claims?", "Ask what mode, speed, floor condition, tank workflow, and battery state were used for the runtime claim."],
      ["Which PanPanTech models fit large areas?", "SC80 / PT90 and IQX70B class robots are the main large-area scrubbing options in the current PanPanTech range."],
    ],
    related: ["/products/pt90/", "/products/iqx70b-autonomous-scrubber/", "/industries/warehouse-cleaning-robots/"],
  },
  {
    slug: "industrial-robot-vacuum-for-warehouse",
    keyword: "industrial robot vacuum for warehouse",
    title: "Industrial Robot Vacuum for Warehouse",
    metaTitle: "Industrial Robot Vacuum for Warehouse | PanPanTech",
    description:
      "A warehouse buyer guide to industrial robot vacuums, scrubbers, sweepers, AMR workflows, safety planning, and supplier questions.",
    date: "2026-07-01",
    readTime: "8 min read",
    category: "Warehouse Cleaning",
    image: "/assets/images/warehouse-amr-scene.jpg",
    imageAlt: "Warehouse automation scene with autonomous mobile robots",
    intro:
      "An industrial robot vacuum for warehouse use should be evaluated as part of a facility workflow, not as a standalone gadget. Warehouses need dust pickup, floor scrubbing, outdoor sweeping, route scheduling, and sometimes material movement with AMRs. The right solution depends on floor area, dust load, forklift traffic, aisle width, shift timing, and whether the robot must produce cleaning records.",
    toc: [
      ["What warehouse problem are you solving?", "problem"],
      ["Robot vacuum, sweeper, or scrubber?", "types"],
      ["Warehouse safety and traffic planning", "safety"],
      ["Cleaning and AMR coordination", "amr"],
      ["Buying checklist", "checklist"],
      ["FAQ", "faq"],
    ],
    sections: [
      {
        id: "problem",
        h2: "What warehouse problem are you solving?",
        html: `<p>Warehouse cleaning problems usually fall into four groups: dust and debris, tire marks and spills, outdoor loading-area debris, and proof-of-work reporting. A robot vacuum may be enough for dry debris in support areas, while high-traffic logistics floors often need scrubbing or sweeping.</p>
        <p>Start by mapping where dirt is generated: inbound docks, packaging lines, forklift lanes, pedestrian corridors, and production-side transfer routes.</p>`,
      },
      {
        id: "types",
        h2: "Robot vacuum, sweeper, or scrubber?",
        html: `<div class="ppt-table-wrap"><table><thead><tr><th>Robot type</th><th>Best warehouse use</th><th>Limitation to check</th></tr></thead><tbody>
        <tr><td>Commercial vacuum robot</td><td>Dry dust and light debris in offices or support areas</td><td>Not designed for wet or heavy soil</td></tr>
        <tr><td>Autonomous scrubber</td><td>Hard-floor cleaning in large indoor routes</td><td>Needs water, drainage, and wet-floor controls</td></tr>
        <tr><td>Outdoor sweeper</td><td>Loading areas, yards, campuses, logistics parks</td><td>Weather, debris type, slope, bin size</td></tr>
        <tr><td>Warehouse AMR</td><td>Material movement and picking support</td><td>Not a cleaning robot, but route planning may overlap</td></tr>
        </tbody></table></div>`,
      },
      {
        id: "safety",
        h2: "Warehouse safety and traffic planning",
        html: `<p>Robots must be deployed around forklifts, pallets, workers, and temporary obstacles. Safety planning should include speed limits, stop zones, blocked-route behavior, charging locations, and staff training.</p>
        <div class="ppt-table-wrap"><table><thead><tr><th>Control point</th><th>Why it matters</th><th>Reference</th></tr></thead><tbody>
        <tr><td>Walkway condition</td><td>Floors should be kept clean, orderly, and dry where possible.</td><td><a href="https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.22" target="_blank" rel="noopener">OSHA 1910.22</a></td></tr>
        <tr><td>Driverless industrial vehicles</td><td>Warehouse AMRs and AGVs require safety design and operational controls.</td><td><a href="https://www.iso.org/standard/70660.html" target="_blank" rel="noopener">ISO 3691-4</a></td></tr>
        <tr><td>Industrial mobile robot safety</td><td>Mobile robot risk assessment should address people, payload, and work area.</td><td><a href="https://webstore.ansi.org/standards/ria/ansiriar15082020" target="_blank" rel="noopener">ANSI/RIA R15.08</a></td></tr>
        </tbody></table></div>`,
      },
      {
        id: "amr",
        h2: "Cleaning and AMR coordination",
        html: `<p>Many warehouses need both clean floors and material movement. Cleaning robots should avoid peak forklift routes, while AMRs should avoid wet cleaning zones until the floor is ready. A good deployment plan separates cleaning schedules, delivery routes, charging locations, and exception handling.</p>
        <p>PanPanTech can pair warehouse cleaning products with T300 and T600 AMR discussions when the buyer wants a broader facility automation roadmap.</p>`,
      },
      {
        id: "checklist",
        h2: "Buying checklist",
        html: `<ul class="ppt-check-list"><li>Send floor area, aisle width, dock photos, and peak traffic hours.</li><li>Identify dry debris, wet soil, tire marks, and outdoor cleaning needs separately.</li><li>Confirm whether the robot needs route reports for contractor or facility audits.</li><li>Ask for a pilot plan before scaling across several buildings.</li></ul>`,
      },
    ],
    faqs: [
      ["Is a warehouse robot vacuum the same as an autonomous scrubber?", "No. A vacuum handles dry debris. An autonomous scrubber uses liquid and recovery to clean hard floors."],
      ["Can robots clean around forklifts?", "They can work in warehouses when routes, speed, timing, and safety controls are planned around forklift traffic."],
      ["Which model fits a dusty warehouse?", "For support areas, a compact cleaning robot may fit. For large hard floors, compare SC80 / PT90 or IQX70B class scrubbers."],
      ["Can one supplier provide cleaning robots and AMRs?", "A single supplier can coordinate both categories, but cleaning performance and material-handling performance should be evaluated separately."],
      ["What is the first step for a warehouse quote?", "Share a floor map, photos, floor area, soil type, aisle width, shift schedule, and target country."],
    ],
    related: ["/industries/warehouse-cleaning-robots/", "/products/pt90/", "/products/t300-industrial-delivery-amr/"],
  },
  {
    slug: "amr-robot-vs-agv",
    keyword: "AMR robot vs AGV",
    title: "AMR Robot vs AGV",
    metaTitle: "AMR Robot vs AGV: Warehouse Buyer Guide | PanPanTech",
    description:
      "Compare AMR robots and AGVs for warehouses, factories, picking support, conveyor integration, payload, navigation, safety, and cost planning.",
    date: "2026-07-01",
    readTime: "8 min read",
    category: "Warehouse AMR",
    image: "/assets/images/t300-conveyor-amr.jpg",
    imageAlt: "Conveyor-top autonomous mobile robot for warehouse material handling",
    intro:
      "An AMR robot is usually more flexible than an AGV because it can plan routes with onboard perception and adapt to changing warehouse layouts. An AGV often follows fixed paths, markers, wires, or predefined guidance. The best choice depends on route stability, payload, docking accuracy, traffic complexity, integration needs, safety requirements, and how often the operation changes.",
    toc: [
      ["What is the difference between AMR and AGV?", "difference"],
      ["Which technology fits each workflow?", "workflow"],
      ["Navigation and safety standards", "safety"],
      ["Payload and docking questions", "payload"],
      ["How to choose", "choose"],
      ["FAQ", "faq"],
    ],
    sections: [
      {
        id: "difference",
        h2: "What is the difference between AMR and AGV?",
        html: `<p>An AGV is typically built around fixed guidance. It is strong for stable, repetitive routes where the environment changes slowly. An AMR uses sensors and software to localize, avoid obstacles, and plan routes with more flexibility.</p>
        <p>For a warehouse buyer, the difference is operational. If routes change often or the site needs multiple workflows, an AMR may reduce layout friction. If the route is fixed and highly controlled, an AGV can still be practical.</p>`,
      },
      {
        id: "workflow",
        h2: "Which technology fits each workflow?",
        html: `<div class="ppt-table-wrap"><table><thead><tr><th>Workflow</th><th>AMR fit</th><th>AGV fit</th></tr></thead><tbody>
        <tr><td>Line-side delivery</td><td>Good when routes change or people share aisles</td><td>Good when route is fixed and controlled</td></tr>
        <tr><td>Conveyor docking</td><td>Good with precise docking and integration plan</td><td>Good with fixed station layouts</td></tr>
        <tr><td>Heavy rack movement</td><td>Good for flexible rack dispatching</td><td>Good for fixed heavy transport routes</td></tr>
        <tr><td>Mixed warehouse picking support</td><td>Usually stronger because task flow changes</td><td>Possible but less flexible</td></tr>
        </tbody></table></div>`,
      },
      {
        id: "safety",
        h2: "Navigation and safety standards",
        html: `<p>Both AMRs and AGVs are industrial mobile machines. Buyers should ask for a risk assessment, safety function explanation, emergency stop behavior, obstacle detection limits, payload limits, and staff training plan.</p>
        <div class="ppt-table-wrap"><table><thead><tr><th>Reference</th><th>Why buyers should care</th><th>Use in RFQ</th></tr></thead><tbody>
        <tr><td><a href="https://www.iso.org/standard/70660.html" target="_blank" rel="noopener">ISO 3691-4</a></td><td>Covers driverless industrial trucks and their systems.</td><td>Ask how the offered robot aligns with the relevant safety requirements.</td></tr>
        <tr><td><a href="https://webstore.ansi.org/standards/ria/ansiriar15082020" target="_blank" rel="noopener">ANSI/RIA R15.08</a></td><td>Addresses industrial mobile robot safety in the United States context.</td><td>Ask for documented risk assessment and safety procedures.</td></tr>
        <tr><td>Final robot datasheet</td><td>Payload, speed, obstacle handling, and docking accuracy vary by model.</td><td>Do not rely on category labels alone.</td></tr>
        </tbody></table></div>`,
      },
      {
        id: "payload",
        h2: "Payload and docking questions",
        html: `<p>Payload is not only a maximum kilogram number. Buyers must confirm payload center of gravity, rack dimensions, turning radius, path clearance, docking tolerance, charging workflow, and whether accessories change runtime.</p>
        <p>For PanPanTech discussions, the T300 class supports 300 kg delivery workflows, conveyor variants support station transfer, and the T600 class targets heavier rack and industrial delivery needs.</p>`,
      },
      {
        id: "choose",
        h2: "How to choose between AMR and AGV",
        html: `<ul class="ppt-check-list"><li>Choose AMR when route flexibility, mixed traffic, and fast deployment matter.</li><li>Choose AGV when routes are fixed, controlled, and unlikely to change.</li><li>Ask for a site simulation or pilot route before scaling.</li><li>Compare payload, integration, safety documentation, and service response as a package.</li></ul>`,
      },
    ],
    faqs: [
      ["Is an AMR better than an AGV?", "Not always. AMRs are usually more flexible, while AGVs can be effective on stable fixed routes."],
      ["Do AMRs need warehouse management software integration?", "Some projects can start with onboard operation, but larger deployments often need integration with WMS, conveyors, elevators, or access control."],
      ["What payload should I choose?", "Choose by real load weight, rack dimensions, route width, docking needs, and future expansion plans."],
      ["Can AMRs support picking?", "Yes, AMRs can support goods movement, line-side delivery, and picking workflows, depending on accessories and software."],
      ["What should an AMR quote include?", "It should include robot configuration, payload module, batteries, charger, software, integration, training, spare parts, warranty, and shipping documents."],
    ],
    related: ["/products/t300-industrial-delivery-amr/", "/products/t300-conveyor-amr/", "/products/t600-heavy-payload-amr/"],
  },
  {
    slug: "best-robotic-window-cleaner",
    keyword: "best robotic window cleaner",
    title: "Best Robotic Window Cleaner for Commercial Buildings",
    metaTitle: "Best Robotic Window Cleaner for Commercial Buildings | PanPanTech",
    description:
      "A commercial buyer guide to robotic window cleaners, facade cleaning robots, high-rise glass workflows, safety checks, and supplier questions.",
    date: "2026-07-01",
    readTime: "7 min read",
    category: "Facade Cleaning",
    image: "/assets/images/facade-cleaning-robot.jpg",
    imageAlt: "Facade cleaning robot for commercial glass curtain wall maintenance",
    intro:
      "The best robotic window cleaner for a commercial building is the one that matches the facade, height, glass type, anchoring method, water workflow, operator plan, and local safety rules. Small consumer window robots are not the same as commercial facade cleaning systems. For offices, hotels, malls, and high-rise properties, buyers should start with a site assessment before comparing robot models.",
    toc: [
      ["Commercial vs consumer window robots", "commercial"],
      ["Which buildings fit facade robots?", "buildings"],
      ["Safety and site assessment", "safety"],
      ["Comparison table", "comparison"],
      ["Supplier checklist", "supplier"],
      ["FAQ", "faq"],
    ],
    sections: [
      {
        id: "commercial",
        h2: "Commercial vs consumer window robots",
        html: `<p>Consumer window robots are usually designed for individual indoor windows. Commercial facade cleaning robots address larger surfaces, exterior conditions, operator workflows, and building maintenance requirements.</p>
        <p>For B2B procurement, the evaluation should cover the whole cleaning method: access, anchors, water, power, safety backup, operator training, and weather limits.</p>`,
      },
      {
        id: "buildings",
        h2: "Which buildings fit facade robots?",
        html: `<div class="ppt-table-wrap"><table><thead><tr><th>Building type</th><th>Potential fit</th><th>What to verify</th></tr></thead><tbody>
        <tr><td>Office tower</td><td>Large repeated glass surfaces</td><td>Facade geometry, anchor points, roof access, wind limits</td></tr>
        <tr><td>Hotel</td><td>Image-sensitive exterior cleaning</td><td>Guest-area timing, noise, safety perimeter</td></tr>
        <tr><td>Shopping center</td><td>Public-facing glass and atriums</td><td>Indoor/outdoor access, operating hours, crowd control</td></tr>
        <tr><td>Industrial building</td><td>Hard-to-reach exterior surfaces</td><td>Dust, water access, surface material</td></tr>
        </tbody></table></div>`,
      },
      {
        id: "safety",
        h2: "Safety and site assessment",
        html: `<p>Facade cleaning is a safety-critical job. A robot can reduce some manual exposure, but it does not remove the need for a safety plan. Buyers should ask for local compliance review, operator training, fall-prevention planning, emergency procedures, and weather restrictions.</p>
        <div class="ppt-table-wrap"><table><thead><tr><th>Assessment item</th><th>Why it matters</th><th>Source</th></tr></thead><tbody>
        <tr><td>Fall protection and work area controls</td><td>Exterior maintenance may involve elevated work and controlled access zones.</td><td><a href="https://www.osha.gov/fall-protection" target="_blank" rel="noopener">OSHA fall protection</a></td></tr>
        <tr><td>Machine safety documentation</td><td>Robot operation should be supported by clear instructions and risk controls.</td><td>Supplier safety manual and local rules</td></tr>
        <tr><td>Building-specific conditions</td><td>Glass type, frame geometry, height, and wind affect feasibility.</td><td>Site inspection report</td></tr>
        </tbody></table></div>`,
      },
      {
        id: "comparison",
        h2: "Comparison table for buyers",
        html: `<div class="ppt-table-wrap"><table><thead><tr><th>Option</th><th>Best for</th><th>Main limitation</th></tr></thead><tbody>
        <tr><td>Manual rope access</td><td>Complex facades and spot work</td><td>Labor availability and safety management</td></tr>
        <tr><td>Lift or platform cleaning</td><td>Accessible low and mid-rise areas</td><td>Equipment access and disruption</td></tr>
        <tr><td>Commercial facade robot</td><td>Repeatable glass curtain wall cleaning</td><td>Requires site assessment and trained operators</td></tr>
        </tbody></table></div>`,
      },
      {
        id: "supplier",
        h2: "Supplier checklist",
        html: `<ul class="ppt-check-list"><li>Share building height, facade photos, roof access, glass type, and local safety requirements.</li><li>Ask for cleaning method, safety backup, operator count, and weather limits.</li><li>Confirm spare parts, training, warranty, and local service responsibilities.</li><li>Request a project-specific feasibility review before public claims or final quotation.</li></ul>`,
      },
    ],
    faqs: [
      ["Do robotic window cleaners work on high-rise buildings?", "Commercial facade robots can support some high-rise cleaning projects, but feasibility depends on the building and safety plan."],
      ["Are consumer window robots suitable for commercial facades?", "Usually no. Consumer models are not a substitute for commercial facade cleaning systems and safety procedures."],
      ["What information is needed for a facade robot quote?", "Send facade photos, building height, surface material, access points, local safety rules, and cleaning frequency."],
      ["Can a facade robot clean all glass buildings?", "No. Geometry, anchors, weather, water access, and surface condition can limit feasibility."],
      ["Which PanPanTech product fits facade cleaning?", "The facade cleaning robot page is the starting point for project review and quotation."],
    ],
    related: ["/products/facade-cleaning-robot/", "/request-a-quote/", "/contact/"],
  },
  {
    slug: "certifications-for-commercial-cleaning-robots",
    keyword: "certifications for commercial cleaning robots",
    title: "Certifications for Commercial Cleaning Robots",
    metaTitle: "Certifications for Commercial Cleaning Robots | PanPanTech",
    description:
      "A practical guide to CE, FCC, IEC, battery, safety, radio, and import documents for commercial cleaning robots and warehouse AMRs.",
    date: "2026-07-01",
    readTime: "9 min read",
    category: "Sourcing",
    image: "/assets/images/robot-dark-hero.jpg",
    imageAlt: "Commercial floor cleaning robot used for sourcing and certification review",
    intro:
      "Commercial cleaning robot certifications depend on the destination market, product configuration, battery, charger, wireless module, and safety design. Buyers should not accept a generic claim such as CE or FCC without matching the certificate to the exact model, version, adapter, battery, and shipment country. The safest RFQ asks for a document list before payment.",
    toc: [
      ["Which documents matter?", "documents"],
      ["CE, FCC, IEC, and battery documents", "certs"],
      ["How to verify a certificate", "verify"],
      ["Cleaning robots vs AMRs", "amr"],
      ["RFQ document checklist", "checklist"],
      ["FAQ", "faq"],
    ],
    sections: [
      {
        id: "documents",
        h2: "Which documents matter?",
        html: `<p>Most buyers need a combination of electrical safety, EMC, radio, battery, charger, manual, label, packing, customs, and warranty documents. The exact list changes by destination country and product configuration.</p>
        <p>For distributor programs, request neutral model names and final document copies before printing catalogs or publishing public claims.</p>`,
      },
      {
        id: "certs",
        h2: "CE, FCC, IEC, and battery documents",
        html: `<div class="ppt-table-wrap"><table><thead><tr><th>Document family</th><th>Why it matters</th><th>Authoritative reference</th></tr></thead><tbody>
        <tr><td>CE / EU conformity</td><td>Relevant for products placed on the EU market, depending on applicable directives and regulations.</td><td><a href="https://single-market-economy.ec.europa.eu/single-market/ce-marking_en" target="_blank" rel="noopener">European Commission CE marking</a></td></tr>
        <tr><td>FCC radio / EMC</td><td>Relevant for wireless and electronic products marketed in the United States.</td><td><a href="https://www.fcc.gov/oet/ea" target="_blank" rel="noopener">FCC equipment authorization</a></td></tr>
        <tr><td>Driverless industrial truck safety</td><td>Relevant when the robot is an AMR or industrial mobile platform.</td><td><a href="https://www.iso.org/standard/70660.html" target="_blank" rel="noopener">ISO 3691-4</a></td></tr>
        <tr><td>Workplace floor safety</td><td>Deployment must support clean, orderly, and dry walking-working surfaces where applicable.</td><td><a href="https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.22" target="_blank" rel="noopener">OSHA 1910.22</a></td></tr>
        </tbody></table></div>`,
      },
      {
        id: "verify",
        h2: "How to verify a certificate",
        html: `<p>Match the certificate holder, model number, product photos, rating label, adapter, wireless module, battery, and report number to the actual robot being purchased. If a supplier offers multiple shell colors, docking stations, or battery packs, ask whether the document still applies.</p>
        <p>For private-label projects, verify whether the certificate can be used with the private-label model name or whether additional documentation is required.</p>`,
      },
      {
        id: "amr",
        h2: "Cleaning robots vs warehouse AMRs",
        html: `<p>A compact cleaning robot and a warehouse AMR may need different safety files. Cleaning robots are evaluated for electrical, radio, battery, charger, and cleaning-machine concerns. AMRs add payload, vehicle movement, docking, traffic, and industrial mobile robot safety questions.</p>
        <div class="ppt-table-wrap"><table><thead><tr><th>Robot class</th><th>Extra document focus</th><th>Buyer action</th></tr></thead><tbody>
        <tr><td>Compact cleaning robot</td><td>Wireless, charger, battery, cleaning module</td><td>Request model-specific CE/FCC/IEC and battery documents</td></tr>
        <tr><td>Autonomous scrubber</td><td>Water recovery, wet floor controls, battery, charger</td><td>Confirm manual, maintenance, and safety warnings</td></tr>
        <tr><td>Warehouse AMR</td><td>Payload, speed, obstacle detection, docking, route controls</td><td>Request risk assessment and industrial mobile robot safety documentation</td></tr>
        </tbody></table></div>`,
      },
      {
        id: "checklist",
        h2: "RFQ document checklist",
        html: `<ul class="ppt-check-list"><li>Final datasheet with model, dimensions, battery, charger, and wireless configuration.</li><li>CE, FCC, IEC, EMC, radio, and battery documents where relevant.</li><li>User manual, maintenance guide, warning label, and packing list.</li><li>Spare-part list and consumable replacement schedule.</li><li>Warranty, service workflow, and destination-country shipping documents.</li></ul>`,
      },
    ],
    faqs: [
      ["Is CE enough for a commercial cleaning robot?", "Not by itself. Buyers need to confirm which EU requirements apply and whether the document matches the exact model and configuration."],
      ["Do commercial cleaning robots need FCC?", "Wireless and electronic products marketed in the United States may require FCC-related authorization or compliance documentation."],
      ["What should distributors verify before publishing a product page?", "Verify model name, datasheet, certificate scope, photos, claims, warranty terms, and destination-market requirements."],
      ["Are AMR certifications different from cleaning robot certifications?", "They can be. AMRs add payload, traffic, route, docking, and industrial mobile robot safety concerns."],
      ["Can PanPanTech provide certification documents?", "PanPanTech can prepare model-specific documentation for review, but buyers should verify final documents for the destination country before order."],
    ],
    related: ["/commercial-cleaning-robot-manufacturer/", "/oem-odm-cleaning-robots/", "/request-a-quote/"],
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
    legalName: "PanPan Technology",
    alternateName: ["PanPanTech", "PanPan Technology"],
    url: site.domain,
    logo: url("/assets/images/robot-dark-hero.jpg"),
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.city,
      addressCountry: site.country,
    },
    knowsAbout: [
      "retail AIoT",
      "electronic shelf labels",
      "retail analytics",
      "commercial cleaning robots",
      "warehouse AMR",
      "PCBA assembly",
      "e-paper display module manufacturing",
    ],
    brand: groupBrands.map((brand) => ({
      "@type": "Brand",
      name: brand.name,
      url: brand.url,
      description: brand.role,
    })),
    subOrganization: groupBrands.map((brand) => ({
      "@type": "Organization",
      name: brand.name,
      url: brand.url,
      description: brand.role,
    })),
    sameAs: groupBrands.map((brand) => brand.url),
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
    additionalProperty: productSpecs(product).map(([name, value]) => ({ "@type": "PropertyValue", name, value })),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      url: url(product.url.split("#")[0]),
    },
  };
}

function productSpecs(product) {
  if (product.specs?.length) return product.specs;
  return [
    [product.category === "Warehouse AMR" ? "Payload / capacity" : "Cleaning efficiency", product.efficiency],
    ["Runtime", product.runtime],
    ["Dimensions", product.dimensions],
    [product.category === "Warehouse AMR" ? "Robot configuration" : "Cleaning width", product.cleaningWidth],
    [product.category === "Warehouse AMR" ? "Payload module" : "Clean / waste tank", product.tanks],
    ["Navigation", product.navigation],
    ["Certifications", product.certifications],
  ];
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
  const groupLinks = groupBrands
    .map((brand) => `<a href="${brand.url}">${html(brand.name)} - ${html(brand.role)}</a>`)
    .join("\n");
  return `<footer class="ppt-footer">
  <div class="ppt-container ppt-footer__grid">
    <div class="ppt-footer__brand">
      <a class="ppt-logo ppt-logo--footer" href="/"><span>PanPan</span>Tech</a>
      <p>Retail AIoT, smart robotics, and manufacturing platform for global B2B buyers, system integrators, distributors, and OEM partners.</p>
      <ul class="ppt-cert-list" aria-label="Group capability tags"><li>AIoT</li><li>ESL</li><li>AMR</li><li>PCBA</li></ul>
    </div>
    <div>
      <h2>PanPanTech Group</h2>
      ${groupLinks}
    </div>
    <div>
      <h2>Solutions</h2>
      <a href="/solutions/">Solutions overview</a>
      <a href="/solutions/#retail-tech">Retail Tech</a>
      <a href="/solutions/smart-robots/">Smart Robots</a>
      <a href="/solutions/#digital-art">Digital Art</a>
      <a href="/manufacturing/">Manufacturing</a>
    </div>
    <div>
      <h2>Robot Business</h2>
      <a href="/products/">Robot product range</a>
      <a href="/industries/warehouse-cleaning-robots/">Warehouse cleaning robots</a>
      <a href="/commercial-cleaning-robot-manufacturer/">Robot sourcing support</a>
      <a href="/oem-odm-cleaning-robots/">Robot OEM / ODM</a>
      <a href="/request-a-quote/">Request a Quote</a>
    </div>
    <div>
      <h2>Company</h2>
      <a href="/technology/">Technology</a>
      <a href="/about/">About</a>
      <a href="/blog/">Blog</a>
      <a href="/faqs/">FAQ</a>
      <a href="/contact/">Contact</a>
    </div>
  </div>
  <div class="ppt-container ppt-footer__bottom">
    <p>Copyright 2026 PanPanTech. All rights reserved.</p>
    <p>${site.city}, China | <a href="mailto:${site.email}">${site.email}</a> | <a href="tel:${site.phone.replaceAll("-", "")}">${site.phone}</a></p>
  </div>
</footer>`;
}

function layout({
  path: currentPath,
  title,
  description,
  body,
  schemas = [],
  image = "/assets/images/robot-dark-hero.jpg",
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

function trustStrip() {
  return `<div class="ppt-trust-grid" aria-label="PanPanTech group facts">
${trustFacts
  .map(([value, label]) => `<div><strong>${html(value)}</strong><span>${html(label)}</span></div>`)
  .join("\n")}
</div>`;
}

function businessMatrix() {
  return `<div class="ppt-business-grid">
${businessUnits
  .map(
    (unit) => `<article class="ppt-business-card" id="${unit.href.includes("#") ? unit.href.split("#")[1] : unit.title.toLowerCase().replaceAll(" ", "-")}">
  <span>${html(unit.eyebrow)}</span>
  <h3>${html(unit.title)}</h3>
  <p>${html(unit.text)}</p>
  <a class="ppt-link" href="${unit.href}">View path</a>
</article>`
  )
  .join("\n")}
</div>`;
}

function groupRelationship() {
  return `<div class="ppt-group-map" aria-label="PanPanTech brand relationship map">
  <div class="ppt-group-map__hub">
    <span>Hub</span>
    <strong>panpantechnology.com</strong>
    <p>PanPanTech group website for company information, business paths, smart robots, and manufacturing cooperation.</p>
  </div>
  <div class="ppt-group-map__spokes">
${groupBrands
  .map(
    (brand) => `<a class="ppt-group-node" href="${brand.url}">
  <span>${html(brand.name)}</span>
  <strong>${html(brand.role)}</strong>
  <p>${html(brand.note)}</p>
</a>`
  )
  .join("\n")}
  </div>
  <div class="ppt-group-map__defense">
    <span>Single contact point</span>
    <p>Start with PanPanTech and we will guide your request to the right retail technology, robotics, digital art, or manufacturing team.</p>
  </div>
</div>`;
}

function manufacturingCapabilityGrid() {
  return `<div class="ppt-system-grid">
${manufacturingCapabilities
  .map(
    ([number, title, text]) => `<article><span>${html(number)}</span><h3>${html(title)}</h3><p>${html(text)}</p></article>`
  )
  .join("\n")}
</div>`;
}

function representativeRobotCards() {
  const featuredSlugs = ["p060", "pt90", "t300-industrial-delivery-amr", "t600-heavy-payload-amr", "facade-cleaning-robot", "yz-outdoor-sweeping-robot"];
  return productCards(products.filter((product) => featuredSlugs.includes(product.slug)));
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
    <p class="cleanbot-kicker">${html(product.category)} / ${html(product.model)}</p>
    <h3><a href="${product.url}">${html(product.shortTitle)}</a></h3>
    <p>${html(product.excerpt)}</p>
    <dl class="cleanbot-mini-specs">
      <div><dt>${html(product.cardMetricLabel || (["Warehouse AMR", "Service Robot"].includes(product.category) ? "Payload" : "Efficiency"))}</dt><dd>${html(product.efficiency)}</dd></div>
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

function categoryOverview() {
  return `<div class="ppt-category-grid">
${productCategories
  .map(
    (category) => `<article class="ppt-category-tile">
  <span>${html(category.label)}</span>
  <p>${html(category.text)}</p>
</article>`
  )
  .join("\n")}
</div>`;
}

function productCategorySections() {
  return productCategories
    .map((category) => {
      const categoryProducts = products.filter((product) => product.category === category.label);
      if (!categoryProducts.length) return "";
      return `<section class="ppt-product-band" id="${category.label.toLowerCase().replaceAll(" ", "-")}">
  <div class="ppt-section-head">
    <p class="ppt-eyebrow">${html(category.label)}</p>
    <h2>${html(category.label)} Robots</h2>
    <p>${html(category.text)}</p>
  </div>
  ${productCards(categoryProducts)}
</section>`;
    })
    .join("\n");
}

function videoShowcase() {
  return `<div class="ppt-video-grid">
${videos
  .map(
    (video) => `<article class="ppt-video-card">
  <video src="${video.src}" poster="${video.poster}" controls preload="metadata" playsinline></video>
  <div>
    <h3>${html(video.title)}</h3>
    <p>${html(video.text)}</p>
  </div>
</article>`
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

function blogFaqSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

function blogPostSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: url(post.image),
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: url("/assets/images/p060-product.jpg") },
    },
    articleSection: post.category,
    keywords: post.keyword,
    mainEntityOfPage: url(`/blog/${post.slug}/`),
  };
}

function blogCards() {
  return `<div class="ppt-blog-grid">
${blogPosts
  .map(
    (post) => `<article class="ppt-blog-card">
  <a class="ppt-blog-card__media" href="/blog/${post.slug}/">
    <img src="${post.image}" alt="${html(post.imageAlt)}" width="900" height="620" loading="lazy" decoding="async">
  </a>
  <div class="ppt-blog-card__body">
    <p class="cleanbot-kicker">${html(post.category)} / ${html(post.readTime)}</p>
    <h2><a href="/blog/${post.slug}/">${html(post.title)}</a></h2>
    <p>${html(post.description)}</p>
    <a class="cleanbot-link" href="/blog/${post.slug}/">Read guide</a>
  </div>
</article>`
  )
  .join("\n")}
</div>`;
}

function relatedLinkLabel(pathName) {
  const product = products.find((item) => item.url === pathName);
  if (product) return product.shortTitle;
  const known = {
    "/products/": "Product Range",
    "/request-a-quote/": "Request a Quote",
    "/contact/": "Contact PanPanTech",
    "/commercial-cleaning-robot-manufacturer/": "Manufacturer Support",
    "/oem-odm-cleaning-robots/": "OEM / ODM Program",
    "/industries/warehouse-cleaning-robots/": "Warehouse Cleaning Robots",
  };
  return known[pathName] ?? pathName;
}

function blogIndexPage() {
  const body = `<main id="main-content" class="ppt-main">
  <section class="ppt-page-hero ppt-section--dark">
    <div class="ppt-container">
      <p class="ppt-eyebrow">Buyer Guides</p>
      <h1>Commercial Cleaning and Warehouse Robot Blog</h1>
      <p class="ppt-lead">Practical guides for facility managers, distributors, and importers comparing cleaning robots, autonomous scrubbers, facade robots, warehouse AMRs, and sourcing documents.</p>
    </div>
  </section>
  <section class="ppt-section ppt-section--soft">
    <div class="ppt-container">
      ${blogCards()}
    </div>
  </section>
  ${finalCta("Send the guide you are reading, your site type, and your target robot class. PanPanTech will map the right model and sourcing documents.")}</main>`;

  return layout({
    path: "/blog/",
    title: "Commercial Robot Blog | PanPanTech",
    description:
      "Buyer guides for commercial cleaning robots, autonomous floor scrubbers, facade cleaning robots, warehouse AMRs, certifications, and sourcing.",
    body,
    schemas: [breadcrumbSchema([["Home", "/"], ["Blog", "/blog/"]])],
  });
}

function blogArticlePage(post) {
  const toc = post.toc
    .map(([label, id]) => `<a href="#${id}">${html(label)}</a>`)
    .join("");
  const related = post.related
    .map((href) => `<a class="ppt-resource-card" href="${href}"><span>Related</span><h3>${html(relatedLinkLabel(href))}</h3><p>Continue from this guide to the relevant product, solution, or RFQ page.</p></a>`)
    .join("\n");
  const body = `<main id="main-content" class="ppt-main">
  <article class="ppt-article">
    <header class="ppt-article-hero ppt-section--dark">
      <div class="ppt-container ppt-article-hero__grid">
        <div>
          <p class="ppt-eyebrow">${html(post.category)}</p>
          <h1>${html(post.title)}</h1>
          <p class="ppt-lead">${html(post.intro)}</p>
          <p class="ppt-article-meta">Updated ${html(post.date)} | ${html(post.readTime)}</p>
        </div>
        <figure class="ppt-article-hero__media">
          <img src="${post.image}" width="1100" height="760" alt="${html(post.imageAlt)}" decoding="async" fetchpriority="high">
        </figure>
      </div>
    </header>
    <div class="ppt-container ppt-article-layout">
      <aside class="ppt-article-toc" aria-label="Table of contents">
        <h2>Contents</h2>
        ${toc}
      </aside>
      <div class="ppt-article-body">
        ${post.sections.map((section) => `<section id="${section.id}"><h2>${html(section.h2)}</h2>${section.html}</section>`).join("\n")}
        <section id="faq" class="ppt-article-faq">
          <h2>FAQ</h2>
          ${post.faqs.map(([question, answer]) => `<h3>${html(question)}</h3><p>${html(answer)}</p>`).join("\n")}
        </section>
        <section class="ppt-article-related">
          <h2>Related PanPanTech pages</h2>
          <div class="ppt-resource-grid">${related}</div>
        </section>
      </div>
    </div>
  </article>
  ${finalCta(`Send your site details and ask for the ${post.title} checklist. PanPanTech will recommend the right configuration and documents.`)}
</main>`;

  return layout({
    path: `/blog/${post.slug}/`,
    title: post.metaTitle,
    description: post.description,
    body,
    image: post.image,
    schemas: [
      breadcrumbSchema([
        ["Home", "/"],
        ["Blog", "/blog/"],
        [post.title, `/blog/${post.slug}/`],
      ]),
      blogPostSchema(post),
      blogFaqSchema(post),
    ],
  });
}

function finalCta(text = "Send your retail technology, robotics, or manufacturing brief. PanPanTech will connect you with the right team and next steps.") {
  return `<section class="ppt-section">
  <div class="ppt-container ppt-final-cta">
    <h2>Talk to PanPanTech about your next program</h2>
    <p>${html(text)}</p>
    <a class="ppt-button ppt-button--primary" href="/request-a-quote/">Request a Quote</a>
  </div>
</section>`;
}

function homePageV2() {
  const body = `<main id="main-content" class="ppt-main">
  <section class="ppt-hero ppt-section--dark ppt-hero--brand">
    <div class="ppt-container ppt-hero__grid">
      <div class="ppt-hero__copy">
        <p class="ppt-eyebrow">PanPanTech Group</p>
        <h1>PanPanTech | Retail AIoT, Smart Robots, and Manufacturing Platform</h1>
        <p class="ppt-lead">PanPanTech connects retail technology, smart robotics, and manufacturing capability for global B2B buyers. Explore our product brands, robot systems, and OEM programs from one official group website.</p>
        <div class="ppt-actions">
          <a class="ppt-button ppt-button--primary" href="/solutions/">Explore Solutions</a>
          <a class="ppt-button ppt-button--outline-on-dark" href="/manufacturing/">Manufacturing Capability</a>
        </div>
      </div>
      <figure class="ppt-hero__media">
        <img src="/assets/images/robot-dark-hero.jpg" width="1200" height="800" alt="PanPanTech industrial robot and AIoT technology hero" decoding="async" fetchpriority="high">
      </figure>
    </div>
  </section>

  <section class="ppt-section">
    <div class="ppt-container">
      ${trustStrip()}
    </div>
  </section>

  <section class="ppt-section ppt-section--soft">
    <div class="ppt-container">
      ${sectionHead(
        "Business Matrix",
        "One group, four focused business paths",
        "Explore the group's four public business areas and move quickly to the team or product path that matches your project."
      )}
      ${businessMatrix()}
    </div>
  </section>

  <section class="ppt-section">
    <div class="ppt-container">
      ${sectionHead(
        "Group Relationship",
        "A clear group structure for buyers and partners",
        "Each PanPanTech group brand has a defined role, so buyers can reach the right product, software, robotics, or manufacturing team."
      )}
      ${groupRelationship()}
    </div>
  </section>

  <section class="ppt-section ppt-section--soft">
    <div class="ppt-container">
      ${sectionHead(
        "Smart Robots",
        "Robot business stays here, but as a business unit instead of the whole brand",
        "Cleaning robots, facade cleaning robots, and warehouse AMRs remain on panpantechnology.com. The homepage shows representative categories and sends detailed evaluation to the robot section."
      )}
      ${categoryOverview()}
      ${representativeRobotCards()}
      <div class="ppt-actions">
        <a class="ppt-button ppt-button--outline" href="/solutions/smart-robots/">View Smart Robots</a>
        <a class="ppt-button ppt-button--outline" href="/products/">Compare Robot Models</a>
      </div>
    </div>
  </section>

  <section class="ppt-section ppt-section--dark ppt-manufacturing">
    <div class="ppt-container ppt-split">
      <div>
        <p class="ppt-eyebrow">Manufacturing</p>
        <h2>Future ESL OEM, PCBA, and e-paper module capability starts inside the group site</h2>
        <p>PanPanTech supports OEM, PCBA, and e-paper module discussions for qualified B2B partners. The manufacturing page outlines capability areas, sample review, pilot production, and QC workflow.</p>
        <a class="ppt-button ppt-button--outline-on-dark" href="/manufacturing/">Review Manufacturing Path</a>
      </div>
      <div class="ppt-process-list">
        <div><span>01</span><strong>ESL OEM / ODM</strong><p>Finished ESL programs, model planning, packaging, and documentation.</p></div>
        <div><span>02</span><strong>PCBA assembly</strong><p>Board assembly, firmware coordination, testing, and QC workflow.</p></div>
        <div><span>03</span><strong>E-paper modules</strong><p>Display modules, gateway accessories, samples, and pilot validation.</p></div>
      </div>
    </div>
  </section>

  <section class="ppt-section">
    <div class="ppt-container ppt-cta-panel">
      <div>
        <p class="ppt-eyebrow">Unified Inquiry</p>
        <h2>Start retail tech, robot, and manufacturing conversations with PanPanTech</h2>
        <p>Use one group contact point and PanPanTech will connect your request with the right retail technology, robotics, digital art, or manufacturing team.</p>
      </div>
      <a class="ppt-button ppt-button--primary" href="/request-a-quote/">Contact PanPanTech</a>
    </div>
  </section>
</main>`;

  return layout({
    path: "/",
    title: "PanPanTech | Retail AIoT, Smart Robots, Manufacturing Platform",
    description:
      "PanPanTech connects retail AIoT, electronic shelf label brands, smart robots, and ESL OEM, PCBA, and e-paper module manufacturing capability.",
    body,
    image: "/assets/images/robot-dark-hero.jpg",
    schemas: [faqSchema()],
  });
}

function solutionsPage() {
  return simplePage({
    path: "/solutions/",
    title: "Solutions | PanPanTech Retail Tech, Robots, Digital Art",
    description:
      "Explore PanPanTech solution paths for retail technology, smart robots, digital art displays, and manufacturing programs for global B2B buyers.",
    eyebrow: "Solutions",
    h1: "PanPanTech solution paths",
    lead:
      "Explore PanPanTech business areas and choose the right path for retail stores, facility automation, interior display products, or manufacturing cooperation.",
    schemas: [breadcrumbSchema([["Home", "/"], ["Solutions", "/solutions/"]])],
    content: `<section class="ppt-section">
  <div class="ppt-container">
    ${businessMatrix()}
  </div>
</section>
<section class="ppt-section ppt-section--soft">
  <div class="ppt-container ppt-split">
    <div id="retail-tech">
      <p class="ppt-eyebrow">Retail Tech</p>
      <h2>Retail technology for digital shelf operations and store intelligence</h2>
      <p>PanPanTech group brands support electronic shelf labels, e-paper signage, store traffic analytics, and retail data integration for retailers, distributors, and system integrators.</p>
      <ul class="ppt-check-list">
        <li>AiEinkSmart supports electronic shelf labels and e-paper shelf displays.</li>
        <li>Pyroglaux supports retail footfall analytics and store behavior measurement.</li>
        <li>AiESL supports retail data middleware, API access, and platform integration.</li>
      </ul>
    </div>
    <div class="ppt-process-list ppt-process-list--light">
      <div><span>Brand</span><strong>AiEinkSmart</strong><p>Electronic shelf labels and e-paper signage.</p></div>
      <div><span>Brand</span><strong>Pyroglaux</strong><p>Retail footfall analytics and store behavior measurement.</p></div>
      <div><span>Brand</span><strong>AiESL</strong><p>Retail data middleware, API, and platform integration.</p></div>
    </div>
  </div>
</section>
<section class="ppt-section">
  <div class="ppt-container ppt-split">
    <div id="digital-art">
      <p class="ppt-eyebrow">Digital Art</p>
      <h2>E-paper art frames for calm interiors and commercial spaces</h2>
      <p>EinkSmart presents e-paper art frames and ambient digital display products for homes, hospitality spaces, galleries, and curated commercial interiors.</p>
      <a class="ppt-link" href="https://einksmart.com">Visit EinkSmart</a>
    </div>
    <figure class="ppt-image-frame ppt-image-frame--landscape"><img src="/assets/images/digital-art-frame-living-room.png" alt="EinkSmart e-paper art frame in a warm living room" width="879" height="662" loading="lazy" decoding="async"></figure>
  </div>
</section>
${finalCta("Tell us whether your project is for retail tech, smart robots, digital art, or manufacturing. PanPanTech will connect you with the right team.")}`,
  });
}

function smartRobotsSolutionPage() {
  return simplePage({
    path: "/solutions/smart-robots/",
    title: "Smart Robots | Cleaning Robots and AMR | PanPanTech",
    description:
      "PanPanTech Smart Robots covers commercial cleaning robots, autonomous floor scrubbers, facade cleaning robots, warehouse AMRs, and sourcing support.",
    eyebrow: "Smart Robots",
    h1: "Smart robots for cleaning, facade care, and warehouse movement",
    lead:
      "This section helps facility teams, distributors, and integrators compare cleaning robots, facade cleaning robots, and warehouse AMRs through the PanPanTech robot business.",
    schemas: [breadcrumbSchema([["Home", "/"], ["Solutions", "/solutions/"], ["Smart Robots", "/solutions/smart-robots/"]])],
    content: `<section class="ppt-section">
  <div class="ppt-container">
    ${sectionHead(
      "Robot Categories",
      "Choose robots by facility task",
      "Detailed product pages stay available for sourcing checks, but this solution page starts with use case and deployment logic."
    )}
    ${categoryOverview()}
  </div>
</section>
<section class="ppt-section ppt-section--soft">
  <div class="ppt-container">
    ${sectionHead(
      "Representative Models",
      "A compact snapshot before model comparison",
      "Use this set to orient buyers across indoor cleaning, large-area scrubbing, warehouse AMR, outdoor sweeping, and facade cleaning."
    )}
    ${representativeRobotCards()}
  </div>
</section>
<section class="ppt-section">
  <div class="ppt-container ppt-feature-grid">
    <article class="ppt-feature-card"><span>01</span><h2>Cleaning routes</h2><p>Match floor area, aisle width, soil level, water workflow, and cleaning frequency before comparing model names.</p></article>
    <article class="ppt-feature-card"><span>02</span><h2>AMR movement</h2><p>Match payload, station layout, docking workflow, safety zone, elevator or door integration, and cart interface.</p></article>
    <article class="ppt-feature-card"><span>03</span><h2>Distributor launch</h2><p>Keep neutral datasheets, model naming, spare parts, warranty terms, and export documents visible before RFQ.</p></article>
  </div>
</section>
${finalCta("Send your facility task, floor area, payload, path constraints, and destination country. PanPanTech will recommend a robot path.")}`,
  });
}

function technologyPage() {
  return simplePage({
    path: "/technology/",
    title: "Technology | AIoT, E-paper, Retail Systems | PanPanTech",
    description:
      "PanPanTech technology pages explain the group capability layer behind AIoT retail systems, e-paper display products, smart robots, and manufacturing programs.",
    eyebrow: "Technology",
    h1: "Technology layer behind the PanPanTech group",
    lead:
      "The technology page gives buyers and partners a clear view of PanPanTech's AIoT platform logic, e-paper capability, robot systems, and IP posture.",
    schemas: [breadcrumbSchema([["Home", "/"], ["Technology", "/technology/"]])],
    content: `<section class="ppt-section">
  <div class="ppt-container ppt-feature-grid">
    <article class="ppt-feature-card"><span>AIoT</span><h2>Retail data platform</h2><p>Retail decision logic, ESL data flow, API integration, and operational visibility for store operations, integrations, and management workflows.</p></article>
    <article class="ppt-feature-card"><span>E-paper</span><h2>Display and ESL capability</h2><p>E-paper displays, ESL hardware, wireless gateways, low-power labels, and e-paper signage belong in the technology vocabulary without duplicating AiEinkSmart product pages.</p></article>
    <article class="ppt-feature-card"><span>Robotics</span><h2>Autonomous systems</h2><p>Cleaning routes, AMR movement, perception, docking workflow, fleet reporting, and service readiness connect the robot business to the group technology story.</p></article>
  </div>
</section>
<section class="ppt-section ppt-section--soft">
  <div class="ppt-container ppt-content">
    <h2>Trust signals for buyers and partners</h2>
    <table>
      <tbody>
        <tr><th scope="row">Company facts</th><td>Founded in 2015 in Guangzhou, with R&D, manufacturing, and sales capability presented under PanPanTech.</td></tr>
        <tr><th scope="row">Deployment proof</th><td>Use 30+ countries and 6,000+ stores as group-level trust statements where documentation supports the claim.</td></tr>
        <tr><th scope="row">Manufacturing base</th><td>Use 3,200 m2, SMT lines, ISO9001, test workflow, and QC evidence as manufacturing facts when verified.</td></tr>
        <tr><th scope="row">Group brands</th><td>AiEinkSmart, Pyroglaux, AiESL, and EinkSmart each support a focused product, software, analytics, or display category.</td></tr>
      </tbody>
    </table>
  </div>
</section>
${finalCta("Share the technology capability you need to verify. PanPanTech will connect you with the right product, software, or manufacturing team.")}`,
  });
}

function manufacturingPage() {
  return simplePage({
    path: "/manufacturing/",
    title: "Manufacturing | ESL OEM, PCBA, E-paper Modules | PanPanTech",
    description:
      "PanPanTech manufacturing introduces future ESL OEM, PCBA assembly, e-paper display module, testing, QC, and export documentation capability.",
    eyebrow: "Manufacturing",
    h1: "ESL OEM, PCBA, and e-paper module manufacturing capability",
    lead:
      "PanPanTech manufacturing supports qualified B2B cooperation for ESL OEM, PCBA assembly, e-paper display modules, testing, QC, and export documentation.",
    schemas: [breadcrumbSchema([["Home", "/"], ["Manufacturing", "/manufacturing/"]])],
    content: `<section class="ppt-section">
  <div class="ppt-container">
    ${sectionHead(
      "Capability Map",
      "Manufacturing programs for qualified B2B partners",
      "Review the capability areas PanPanTech can discuss for ESL OEM, PCBA assembly, e-paper modules, testing, QC, and export documentation."
    )}
    ${manufacturingCapabilityGrid()}
  </div>
</section>
<section class="ppt-section ppt-section--soft">
  <div class="ppt-container ppt-content">
    <h2>Manufacturing cooperation areas</h2>
    <table>
      <tbody>
        <tr><th scope="row">ESL OEM / ODM programs</th><td>Finished electronic shelf label programs, private-label planning, packaging, documentation, and rollout support.</td></tr>
        <tr><th scope="row">PCBA and module work</th><td>PCBA assembly, e-paper display modules, contract manufacturing, pilot production, firmware coordination, and functional testing.</td></tr>
        <tr><th scope="row">QC and export support</th><td>Incoming checks, SMT process notes, sample validation, burn-in expectations, packing checks, and destination-market document review.</td></tr>
      </tbody>
    </table>
  </div>
</section>
<section class="ppt-section ppt-section--dark ppt-manufacturing">
  <div class="ppt-container ppt-split">
    <div>
      <p class="ppt-eyebrow">Manufacturing Workflow</p>
      <h2>From sample request to controlled pilot</h2>
      <p>Share product requirements, target market, enclosure needs, wireless requirements, firmware scope, order quantity, and certification expectations before sample planning.</p>
    </div>
    <div class="ppt-process-list">
      <div><span>01</span><strong>Requirement review</strong><p>Product category, target market, enclosure, wireless, firmware, order quantity, and certification needs.</p></div>
      <div><span>02</span><strong>Engineering sample</strong><p>Display module, PCBA, firmware, test fixture, and pilot documentation alignment.</p></div>
      <div><span>03</span><strong>QC and export</strong><p>Incoming checks, functional testing, burn-in expectations, packing, and destination document review.</p></div>
    </div>
  </div>
</section>
${finalCta("Send your OEM, ODM, PCBA, or e-paper module requirements. PanPanTech will qualify the manufacturing path before quoting.")}`,
  });
}

function aboutPageV2() {
  return simplePage({
    path: "/about/",
    title: "About PanPanTech | Retail AIoT and Smart Robotics Group",
    description:
      "PanPanTech is a Guangzhou-based group for retail AIoT, electronic shelf label brands, smart robots, digital art displays, and manufacturing capability.",
    eyebrow: "About PanPanTech",
    h1: "A global group for retail AIoT, smart robots, and manufacturing",
    lead:
      "PanPanTech connects retail technology, smart robotics, digital art displays, and manufacturing capability under one group identity for global buyers, distributors, and OEM partners.",
    schemas: [breadcrumbSchema([["Home", "/"], ["About", "/about/"]])],
    content: `<section class="ppt-section">
  <div class="ppt-container">
    ${trustStrip()}
  </div>
</section>
<section class="ppt-section ppt-section--soft">
  <div class="ppt-container">
    ${sectionHead(
      "Group Structure",
      "One group identity with focused business lines",
      "PanPanTech is the group brand behind retail technology, smart robotics, digital art displays, and manufacturing programs. Each business line gives buyers a clearer path to the right product team."
    )}
    ${groupRelationship()}
  </div>
</section>
<section class="ppt-section">
  <div class="ppt-container ppt-content">
    <h2>How PanPanTech supports buyers</h2>
    <ul>
      <li>Use PanPanTech as the group contact for retail technology, robotics, digital art, and manufacturing cooperation.</li>
      <li>AiEinkSmart is the electronic shelf label and e-paper shelf display brand within the PanPanTech group.</li>
      <li>Robot sourcing, OEM robot programs, ESL manufacturing, and PCBA cooperation are guided through the relevant PanPanTech business path.</li>
      <li>PanPanTech supports distributors, integrators, retailers, facility operators, and qualified OEM partners.</li>
    </ul>
  </div>
</section>
${finalCta("Ask about PanPanTech group structure, brand ownership, robot sourcing, or manufacturing capability.")}`,
  });
}

function homePage() {
  return homePageV2();

  const body = `<main id="main-content" class="ppt-main">
  <section class="ppt-hero ppt-section--dark">
    <div class="ppt-container ppt-hero__grid">
      <div class="ppt-hero__copy">
        <p class="ppt-eyebrow">Commercial Cleaning & Logistics Robots</p>
        <h1>Commercial robots for cleaning, facade care, and warehouse automation</h1>
        <p class="ppt-lead">PanPanTech supplies autonomous floor scrubbers, compact cleaning robots, outdoor sweepers, facade cleaning robots, and warehouse AMRs for facilities, distributors, and OEM / ODM partners.</p>
        <div class="ppt-actions">
          <a class="ppt-button ppt-button--primary" href="/products/">Explore Products</a>
          <a class="ppt-button ppt-button--outline-on-dark" href="/request-a-quote/">Get a Quote</a>
        </div>
        <div class="ppt-stat-row" aria-label="Key capabilities">
          <div><strong>18</strong><span>models from the selection table</span></div>
          <div><strong>600 kg</strong><span>heavy-payload AMR class</span></div>
          <div><strong>4,000</strong><span>m2/h scrubber class</span></div>
        </div>
      </div>
      <figure class="ppt-hero__media">
        <img src="/assets/images/p060-product.jpg" width="930" height="1120" alt="PanPanTech commercial cleaning robot in a white studio scene" decoding="async" fetchpriority="high">
      </figure>
    </div>
  </section>

  <section class="ppt-section">
    <div class="ppt-container ppt-answer-grid">
      <div>
        <p class="ppt-eyebrow">Answer first</p>
        <h2>Robots cut repetitive facility work while keeping your team in control</h2>
      </div>
      <div>
        <p>Cleaning robots handle repeated floor routes and record the work. AMRs move materials between warehouse and production points. Your team stays focused on exceptions, safety checks, customer-facing tasks, and process control.</p>
        <a class="ppt-link" href="/commercial-cleaning-robot-manufacturer/">See manufacturer capabilities</a>
      </div>
    </div>
  </section>

  <section class="ppt-section ppt-section--soft">
    <div class="ppt-container ppt-manufacturer-system">
      <div class="ppt-section-head">
        <p class="ppt-eyebrow">B2B Manufacturer Framework</p>
        <h2>From robot selection to deployable facility system</h2>
        <p>PanPanTech presents commercial robots as configurable projects: model fit, documentation, quality checks, logistics, training, and support are handled before the buyer commits to scale.</p>
      </div>
      <div class="ppt-system-grid">
        <article><span>01</span><h3>Scope</h3><p>Floor area, payload, site photos, traffic pattern, route timing, and destination-country requirements.</p></article>
        <article><span>02</span><h3>Configure</h3><p>Cleaning modules, AMR payload options, docking workflow, spare parts, labels, and OEM model naming.</p></article>
        <article><span>03</span><h3>Verify</h3><p>Datasheets, certifications, inspection points, packing details, and proof-of-work reporting expectations.</p></article>
        <article><span>04</span><h3>Deploy</h3><p>Training, route setup, maintenance workflow, warranty terms, and distributor after-sales responsibilities.</p></article>
      </div>
    </div>
  </section>

  <section class="ppt-section">
    <div class="ppt-container">
      ${sectionHead(
        "Video Demos",
        "See robots in motion before the RFQ",
        "Short local demo clips give buyers a faster feel for cleaning routes, compact robot behavior, and warehouse AMR movement."
      )}
      ${videoShowcase()}
    </div>
  </section>

  <section class="ppt-section ppt-section--soft">
    <div class="ppt-container">
      ${sectionHead(
        "Product Range",
        "Commercial robots by facility task",
        "Start with the work to automate: indoor cleaning, large-area scrubbing, outdoor sweeping, facade care, or warehouse material movement."
      )}
      ${categoryOverview()}
      ${productCards(products)}
    </div>
  </section>

  <section class="ppt-section ppt-section--dark ppt-manufacturing">
    <div class="ppt-container ppt-split">
      <div>
        <p class="ppt-eyebrow">Manufacturing & QC</p>
        <h2>Built for B2B sourcing checks</h2>
        <p>PanPanTech presents a unified product family with manufacturing partners, quality control, export documentation, spare parts planning, and clear OEM / ODM cooperation terms. Final certification claims should be verified against signed model documents before launch.</p>
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
        "Buyer Guides",
        "Practical robot sourcing guides",
        "Use these guides to compare cleaning robot types, warehouse AMR workflows, certification documents, and facility use cases."
      )}
      ${blogPosts.slice(0, 3)
        .map(
          (post) => `<a class="ppt-resource-card" href="/blog/${post.slug}/">
        <span>${html(post.category)}</span>
        <h3>${html(post.title)}</h3>
        <p>${html(post.description)}</p>
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
      <h1>Commercial Cleaning, Facade, and Warehouse Robots</h1>
      <p class="ppt-lead">Compare PanPanTech robot classes by facility task, payload, cleaning performance, runtime, navigation, and OEM requirements.</p>
    </div>
  </section>
  <section class="ppt-section ppt-section--soft">
    <div class="ppt-container">
      ${categoryOverview()}
      ${productCategorySections()}
    </div>
  </section>
  <section class="ppt-section">
    <div class="ppt-container ppt-content">
      <h2>How to choose the right robot class</h2>
      <table>
        <thead><tr><th>Buying question</th><th>What to compare</th></tr></thead>
        <tbody>
          <tr><td>Which task should be automated?</td><td>Choose indoor cleaning, large-area scrubbing, outdoor sweeping, facade cleaning, delivery AMR, conveyor AMR, or heavy-payload AMR first.</td></tr>
          <tr><td>How large is the floor area or payload?</td><td>For cleaning robots, compare square meters per hour, tank size, route time, and charging workflow. For AMRs, compare payload, path clearance, docking, and scheduling.</td></tr>
          <tr><td>Does the robot work around people?</td><td>Compare navigation sensors, obstacle handling, operating speed, and safety procedures.</td></tr>
          <tr><td>Is this a distributor or OEM project?</td><td>Confirm model codes, neutral datasheets, packaging, certifications, and support terms.</td></tr>
        </tbody>
      </table>
    </div>
  </section>
  ${finalCta("Send your site type, floor area, payload, target task, and destination country. PanPanTech will recommend the right model mix and next steps.")}</main>`;

  return layout({
    path: "/products/",
    title: "Commercial Cleaning and Warehouse Robots | PanPanTech Product Range",
    description:
      "Compare PanPanTech cleaning robots, scrubbers, outdoor sweepers, facade cleaning robots, and warehouse AMRs by task, payload, efficiency, runtime, and OEM requirements.",
    body,
    schemas: [breadcrumbSchema([["Home", "/"], ["Products", "/products/"]])],
  });
}

function productPage(product) {
  const specs = productSpecs(product);
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
          <div><strong>${html(product.efficiency)}</strong><span>${["Warehouse AMR", "Service Robot"].includes(product.category) ? "Payload / capacity" : "Cleaning efficiency"}</span></div>
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
  <div class="ppt-container">${productCards(products.slice(0, 6))}</div>
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
      <p>SC80 / PT90 and IQX70B scrubbers fit broad indoor logistics floors. XG and YZ robots support campuses and outdoor routes. T300 and T600 AMRs support line-side delivery, picking support, and heavy material movement.</p>
      <ul class="ppt-check-list">
        <li>Map cleaning routes by floor area, shift time, and aisle width.</li>
        <li>Compare tank size, cleaning width, runtime, and recharge workflow.</li>
        <li>For AMR projects, compare payload, path clearance, docking points, and line-side delivery routes.</li>
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
    title: "Request a Commercial Robot Quote | PanPanTech",
    description:
      "Request a quote for PanPanTech cleaning robots, facade cleaning robots, and warehouse AMRs with site, payload, quantity, and OEM details.",
    eyebrow: "RFQ",
    h1: "Request a commercial robot quote",
    lead:
      "Tell us your site type, cleaning schedule, payload or product interest, and destination country. PanPanTech will recommend the right model and confirm OEM or distributor options.",
    schemas: [breadcrumbSchema([["Home", "/"], ["Request a Quote", "/request-a-quote/"]])],
    content: `<section class="ppt-section">
  <div class="ppt-container ppt-product-overview">
    <form class="cleanbot-form-wrap cleanbot-quote-form" action="mailto:${site.email}" method="post" enctype="text/plain">
      <p><label for="name">Name</label><input id="name" name="name" autocomplete="name" required></p>
      <p><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required></p>
      <p><label for="company">Company</label><input id="company" name="company" autocomplete="organization"></p>
      <p><label for="country">Country</label><input id="country" name="country" autocomplete="country-name"></p>
      <p><label for="interest">Product interest</label><input id="interest" name="product_interest" aria-describedby="interest-help"><small id="interest-help">ONE S55 / P060, SC80 / PT90, T300 variants, T600, IQX70B, XG, YZ, C2, C2 PRO, C3-Mini, Q3-G, Q3-W, facade robot, JSR-1, or OEM / ODM.</small></p>
      <p><label for="quantity">Purchase quantity</label><input id="quantity" name="quantity" aria-describedby="quantity-help"><small id="quantity-help">Pilot order, 5 units, 20 units, or distributor launch.</small></p>
      <p class="cleanbot-form-wrap__wide"><label for="message">Project details</label><textarea id="message" name="message" rows="6" aria-describedby="message-help"></textarea><small id="message-help">Include floor area, payload, site type, cleaning schedule, destination country, certifications, and OEM needs.</small></p>
      <p class="cleanbot-form-wrap__wide"><button class="cleanbot-button cleanbot-button--primary" type="submit">Send RFQ</button></p>
    </form>
    <aside class="ppt-note-card">
      <h2>Direct contact</h2>
      <p>Use the form or contact PanPanTech directly for model selection, distributor cooperation, and OEM / ODM requests.</p>
      <p>Email: <a href="mailto:${site.email}">${site.email}</a></p>
      <p>Phone: <a href="tel:${site.phone.replaceAll("-", "")}">${site.phone}</a></p>
    </aside>
  </div>
</section>`,
  });
}

function contactPage() {
  return simplePage({
    path: "/contact/",
    title: "Contact PanPanTech | Commercial Robots",
    description:
      "Contact PanPanTech for commercial cleaning robot model selection, facade cleaning robots, warehouse AMR projects, OEM / ODM programs, and distributor support.",
    eyebrow: "Contact",
    h1: "Contact PanPanTech",
    lead:
      `Email ${site.email}, call ${site.phone}, or use the RFQ page for model selection and OEM / ODM requests.`,
    schemas: [breadcrumbSchema([["Home", "/"], ["Contact", "/contact/"]])],
    content: `<section class="ppt-section">
  <div class="ppt-container ppt-cta-panel">
    <div>
      <h2>Need a product recommendation?</h2>
      <p>Share your facility type, floor area, payload, cleaning schedule, destination country, and purchase plan.</p>
      <p><strong>Address:</strong> ${html(site.address)}</p>
      <p><strong>Email:</strong> <a href="mailto:${site.email}">${site.email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${site.phone.replaceAll("-", "")}">${site.phone}</a></p>
    </div>
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
    content: `<section class="ppt-section ppt-section--soft"><div class="ppt-container">${productCards(products.slice(0, 6))}</div></section>${finalCta()}`,
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
  overflow-x: hidden;
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
  overflow-wrap: anywhere;
}
h1 { font-size: 34px; }
h2 { font-size: 30px; }
h3 { font-size: 20px; }
p { margin: 0 0 16px; overflow-wrap: anywhere; }
ul, ol { margin: 0 0 20px; padding-left: 22px; }
table { border-collapse: collapse; width: 100%; }
.ppt-container { width: calc(100% - 32px); max-width: var(--ppt-container); margin-inline: auto; }
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
.ppt-header__actions > .ppt-button { display: none; }
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
.ppt-hero--brand { background: #070b12; }
.ppt-hero__grid { position: relative; display: grid; gap: 32px; align-items: center; }
.ppt-hero h1 { max-width: 760px; font-size: 36px; }
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
.ppt-image-frame--landscape { aspect-ratio: 879 / 662; }
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
.ppt-manufacturer-system { display: grid; gap: 8px; }
.ppt-system-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
.ppt-system-grid article {
  border: 1px solid var(--ppt-line);
  border-radius: var(--ppt-radius);
  background: #ffffff;
  padding: 20px;
}
.ppt-system-grid span {
  display: inline-flex;
  margin-bottom: 12px;
  color: var(--ppt-teal);
  font-size: 13px;
  font-weight: 800;
}
.ppt-system-grid h3 { margin-bottom: 8px; }
.ppt-system-grid p { margin: 0; }
.ppt-trust-grid {
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid var(--ppt-line);
  background: #ffffff;
}
.ppt-trust-grid div {
  min-height: 118px;
  border-bottom: 1px solid var(--ppt-line);
  padding: 22px;
}
.ppt-trust-grid div:last-child { border-bottom: 0; }
.ppt-trust-grid strong {
  display: block;
  color: var(--ppt-ink);
  font-size: 28px;
  line-height: 1.1;
}
.ppt-trust-grid span { display: block; margin-top: 8px; color: var(--ppt-muted); font-size: 14px; }
.ppt-business-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
.ppt-business-card,
.ppt-group-map__hub,
.ppt-group-node,
.ppt-group-map__defense {
  position: relative;
  display: grid;
  gap: 10px;
  border: 1px solid var(--ppt-line);
  border-radius: var(--ppt-radius-sm);
  background: #ffffff;
  color: var(--ppt-body);
  padding: 22px;
}
.ppt-business-card::before,
.ppt-group-node::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  width: 12px;
  height: 12px;
  background: var(--ppt-teal);
}
.ppt-business-card span,
.ppt-group-map span,
.ppt-group-node span {
  color: var(--ppt-teal);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}
.ppt-business-card h3 { margin: 0; }
.ppt-business-card p,
.ppt-group-map p,
.ppt-group-node p { margin: 0; color: var(--ppt-body); }
.ppt-group-map { display: grid; gap: 14px; }
.ppt-group-map__hub {
  background: var(--ppt-dark);
  color: var(--ppt-on-dark-muted);
}
.ppt-group-map__hub strong { color: #ffffff; font-size: 22px; }
.ppt-group-map__hub p { color: var(--ppt-on-dark-muted); }
.ppt-group-map__spokes { display: grid; grid-template-columns: 1fr; gap: 14px; }
.ppt-group-node strong { color: var(--ppt-ink); font-size: 17px; line-height: 1.35; }
.ppt-group-map__defense { background: var(--ppt-soft); }
.ppt-process-list--light div {
  border-color: var(--ppt-line);
  background: #ffffff;
}
.ppt-process-list--light strong { color: var(--ppt-ink); }
.ppt-process-list--light p { color: var(--ppt-body); }
.ppt-category-grid { display: grid; grid-template-columns: 1fr; gap: 14px; margin-bottom: 28px; }
.ppt-category-tile {
  border: 1px solid var(--ppt-line);
  border-radius: var(--ppt-radius);
  background: #ffffff;
  padding: 18px;
}
.ppt-category-tile span { display: block; margin-bottom: 8px; color: var(--ppt-ink); font-weight: 800; }
.ppt-category-tile p { margin: 0; color: var(--ppt-body); }
.ppt-product-band { margin-top: 44px; }
.ppt-product-band:first-of-type { margin-top: 28px; }
.ppt-video-grid { display: grid; grid-template-columns: 1fr; gap: 18px; }
.ppt-video-card {
  overflow: hidden;
  border: 1px solid var(--ppt-line);
  border-radius: var(--ppt-radius);
  background: #ffffff;
}
.ppt-video-card video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: var(--ppt-dark-2);
  object-fit: cover;
}
.ppt-video-card div { padding: 18px; }
.ppt-video-card h3 { margin-bottom: 8px; font-size: 18px; }
.ppt-video-card p { margin: 0; color: var(--ppt-body); }
.ppt-blog-grid { display: grid; grid-template-columns: 1fr; gap: 18px; }
.ppt-blog-card {
  display: grid;
  overflow: hidden;
  border: 1px solid var(--ppt-line);
  border-radius: var(--ppt-radius);
  background: #ffffff;
}
.ppt-blog-card__media {
  display: block;
  background: #f8fafc;
  aspect-ratio: 16 / 10;
}
.ppt-blog-card__media img { width: 100%; height: 100%; object-fit: cover; }
.ppt-blog-card__body { display: grid; gap: 12px; padding: 22px; }
.ppt-blog-card__body h2 { margin: 0; font-size: 22px; }
.ppt-blog-card__body h2 a { color: var(--ppt-ink); }
.ppt-blog-card__body p { margin: 0; }
.ppt-article-hero { padding: 52px 0; }
.ppt-article-hero__grid { display: grid; gap: 28px; align-items: center; }
.ppt-article-hero__media {
  overflow: hidden;
  margin: 0;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--ppt-radius);
  background: #ffffff;
  aspect-ratio: 16 / 10;
}
.ppt-article-hero__media img { width: 100%; height: 100%; object-fit: cover; }
.ppt-article-meta { color: var(--ppt-on-dark-muted); font-size: 14px; font-weight: 700; }
.ppt-article-layout { display: grid; gap: 28px; min-width: 0; padding: 42px 0 12px; }
.ppt-article-toc {
  border: 1px solid var(--ppt-line);
  border-radius: var(--ppt-radius);
  background: #ffffff;
  padding: 18px;
  min-width: 0;
  overflow: hidden;
}
.ppt-article-toc h2 { margin-bottom: 12px; font-size: 18px; }
.ppt-article-toc a { display: block; border-top: 1px solid var(--ppt-line); color: var(--ppt-body); padding: 10px 0; font-weight: 700; overflow-wrap: anywhere; }
.ppt-article-toc a:first-of-type { border-top: 0; }
.ppt-article-body {
  max-width: 860px;
  color: var(--ppt-body);
  min-width: 0;
}
.ppt-article-body section { margin-bottom: 42px; }
.ppt-article-body h2 { margin-top: 0; }
.ppt-article-body h3 { margin-top: 22px; font-size: 19px; }
.ppt-table-wrap { overflow-x: auto; width: 100%; max-width: 100%; margin: 20px 0; border: 1px solid var(--ppt-line); border-radius: var(--ppt-radius); background: #ffffff; }
.ppt-table-wrap table { min-width: 680px; }
.ppt-table-wrap th, .ppt-table-wrap td { border-bottom: 1px solid var(--ppt-line); padding: 13px 14px; text-align: left; vertical-align: top; }
.ppt-table-wrap th { background: #fbfcff; color: var(--ppt-ink); font-weight: 800; }
.ppt-table-wrap tr:last-child th, .ppt-table-wrap tr:last-child td { border-bottom: 0; }
.ppt-article-related .ppt-resource-grid { margin-top: 16px; }
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
.cleanbot-quote-form small { display: block; margin-top: 6px; color: var(--ppt-muted); font-size: 13px; line-height: 1.4; }
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
.ppt-footer__bottom a { display: inline; margin: 0; color: rgba(255, 255, 255, 0.72); font-size: inherit; }
.ppt-cta-panel a:not(.ppt-button) { color: #ffffff; text-decoration: underline; text-underline-offset: 3px; }
.screen-reader-text {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
@media (max-width: 559px) {
  .ppt-container {
    width: calc(100% - 32px);
    max-width: 358px;
    margin-left: 16px;
    margin-right: 16px;
  }
  .ppt-hero h1 { font-size: 32px; }
  .ppt-actions .ppt-button { flex: 1 1 0; padding-inline: 12px; }
  .ppt-table-wrap table { min-width: 0; table-layout: fixed; }
  .ppt-table-wrap th,
  .ppt-table-wrap td {
    padding: 10px 8px;
    font-size: 12px;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }
}
@media (min-width: 560px) {
  h1 { font-size: 46px; }
  h2 { font-size: 34px; }
  .ppt-header__actions > .ppt-button { display: inline-flex; }
  .ppt-stat-row, .ppt-product-kpis { grid-template-columns: repeat(3, 1fr); }
  .cleanbot-product-grid, .cleanbot-industry-grid, .ppt-feature-grid, .ppt-video-grid, .ppt-system-grid, .ppt-blog-grid, .ppt-business-grid, .ppt-group-map__spokes { grid-template-columns: repeat(2, 1fr); }
  .ppt-trust-grid { grid-template-columns: repeat(2, 1fr); }
  .ppt-trust-grid div { border-right: 1px solid var(--ppt-line); }
  .ppt-trust-grid div:nth-child(2n) { border-right: 0; }
  .ppt-trust-grid div:nth-last-child(-n + 2) { border-bottom: 0; }
  .ppt-category-grid { grid-template-columns: repeat(2, 1fr); }
  .cleanbot-quote-form { grid-template-columns: repeat(2, 1fr); }
  .cleanbot-form-wrap__wide { grid-column: 1 / -1; }
}
@media (min-width: 820px) {
  :root { --ppt-section: 78px; }
  .ppt-container { width: calc(100% - 48px); max-width: var(--ppt-container); }
  .ppt-menu-toggle { display: none; }
  .ppt-nav { position: static; display: block; border: 0; background: transparent; padding: 0; }
  .ppt-nav__list { display: flex; align-items: center; gap: 2px; }
  .ppt-nav__list a { padding: 10px 11px; font-size: 14px; }
  .ppt-hero { padding: 82px 0; }
  .ppt-hero__grid, .ppt-answer-grid, .ppt-split, .ppt-product-overview, .ppt-product-hero__grid { grid-template-columns: 1fr 1fr; }
  .ppt-article-hero__grid { grid-template-columns: 1.1fr 0.9fr; }
  .ppt-article-layout { grid-template-columns: 240px minmax(0, 1fr); align-items: start; }
  .ppt-article-toc { position: sticky; top: 92px; }
  .ppt-hero h1 { font-size: 56px; }
  .cleanbot-product-grid { grid-template-columns: repeat(3, 1fr); }
  .cleanbot-industry-grid { grid-template-columns: repeat(4, 1fr); }
  .ppt-system-grid { grid-template-columns: repeat(4, 1fr); }
  .ppt-business-grid { grid-template-columns: repeat(4, 1fr); }
  .ppt-trust-grid { grid-template-columns: repeat(4, 1fr); }
  .ppt-trust-grid div { border-bottom: 0; }
  .ppt-trust-grid div:nth-child(2n) { border-right: 1px solid var(--ppt-line); }
  .ppt-trust-grid div:last-child { border-right: 0; }
  .ppt-group-map { grid-template-columns: 0.85fr 1.55fr; align-items: stretch; }
  .ppt-group-map__hub { min-height: 100%; }
  .ppt-group-map__defense { grid-column: 1 / -1; }
  .ppt-category-grid { grid-template-columns: repeat(5, 1fr); }
  .ppt-video-grid { grid-template-columns: repeat(3, 1fr); }
  .ppt-blog-grid { grid-template-columns: repeat(3, 1fr); }
  .ppt-cta-panel { grid-template-columns: 1fr auto; padding: 38px; }
  .ppt-resource-grid { grid-template-columns: repeat(3, 1fr); }
  .ppt-resource-grid .ppt-section-head { grid-column: 1 / -1; }
  .ppt-feature-grid { grid-template-columns: repeat(3, 1fr); }
  .ppt-footer__grid { grid-template-columns: 1.3fr 1.45fr repeat(3, 1fr); }
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
  const inquiryEndpoint = "https://inquiry.panpantechnology.com/api/inquiries";
  const salesEmail = "${site.email}";

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

  function field(data, names) {
    for (const name of names) {
      const value = data.get(name);
      if (value && String(value).trim()) return String(value).trim();
    }
    return "";
  }

  function trackingFields() {
    const params = new URLSearchParams(window.location.search);
    return {
      lead_brand: "PanPanTech",
      site_domain: window.location.hostname,
      page_url: window.location.href,
      page_title: document.title,
      language: document.documentElement.lang || navigator.language || "en",
      market: "global",
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || ""
    };
  }

  function setFormMessage(form, message, isError) {
    let note = form.querySelector("[data-inquiry-status]");
    if (!note) {
      note = document.createElement("p");
      note.setAttribute("data-inquiry-status", "");
      note.className = "cleanbot-form-wrap__wide";
      form.appendChild(note);
    }
    note.textContent = message;
    note.style.color = isError ? "#b42318" : "";
  }

  function mailtoUrl(payload) {
    const body = [
      "Name: " + payload.name,
      "Email: " + payload.email,
      "Company: " + (payload.company || ""),
      "Country: " + (payload.country || ""),
      "Product interest: " + (payload.product_interest || ""),
      "Quantity: " + (payload.quantity || ""),
      "Page: " + payload.page_url,
      "Project details: " + (payload.message || "")
    ].join("\\n");
    return (
      "mailto:" +
      salesEmail +
      "?subject=" +
      encodeURIComponent("PanPanTech RFQ") +
      "&body=" +
      encodeURIComponent(body)
    );
  }

  async function submitInquiry(payload) {
    const response = await fetch(inquiryEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok || body.ok === false) {
      throw new Error(body.error || "Inquiry endpoint returned " + response.status);
    }
    return body;
  }

  document.querySelectorAll(".cleanbot-quote-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (form.reportValidity && !form.reportValidity()) return;
      const data = new FormData(form);
      const payload = {
        ...trackingFields(),
        name: field(data, ["name"]),
        email: field(data, ["email"]),
        phone: field(data, ["phone"]),
        company: field(data, ["company"]),
        country: field(data, ["country"]),
        product_interest: field(data, ["product_interest", "interest"]),
        quantity: field(data, ["quantity"]),
        message: field(data, ["message"])
      };
      const button = form.querySelector("button[type='submit']");
      const originalLabel = button ? button.textContent : "";
      if (button) {
        button.disabled = true;
        button.textContent = "Sending...";
      }
      try {
        await submitInquiry(payload);
        setFormMessage(form, "Submitted. PanPanTech will contact you soon.", false);
        form.reset();
      } catch (error) {
        console.error("[PanPanTech inquiry failed]", error);
        setFormMessage(form, "Online submission is temporarily unavailable. Opening email fallback.", true);
        window.setTimeout(() => {
          window.location.href = mailtoUrl(payload);
        }, 600);
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = originalLabel;
        }
      }
    });
  });
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

> PanPanTech is the group brand for retail AIoT, smart robotics, digital art displays, and manufacturing capability for global B2B buyers.

## Key Pages
- [Home](${site.domain}/): PanPanTech group overview, smart robots, retail technology brands, and manufacturing entry.
- [Solutions](${site.domain}/solutions/): retail tech, smart robots, digital art, and manufacturing paths.
- [Technology](${site.domain}/technology/): AIoT, e-paper, retail platform, robotics, and IP trust signals.
- [Manufacturing](${site.domain}/manufacturing/): ESL OEM, PCBA assembly, e-paper display module manufacturing, testing, QC, and export documentation.
- [About PanPanTech](${site.domain}/about/): group structure, business lines, and buyer support.

## Group Brand Relationships
${groupBrands.map((brand) => `- [${brand.name}](${brand.url}): ${brand.role}. ${brand.note}`).join("\n")}

## Smart Robots
- [Smart Robots](${site.domain}/solutions/smart-robots/): cleaning robots, facade cleaning robots, and warehouse AMRs as the robot business unit.
- [Robot Product Range](${site.domain}/products/): detailed robot model comparison pages.
${products.map((product) => `- [${product.shortTitle}](${site.domain}${product.url}): ${product.excerpt}`).join("\n")}

## Buying And Contact
- [Commercial Cleaning Robot Manufacturer](${site.domain}/commercial-cleaning-robot-manufacturer/): robot sourcing, QC, export, and certification information.
- [OEM / ODM Cleaning Robots](${site.domain}/oem-odm-cleaning-robots/): robot private-label and distributor support.
- [Request a Quote](${site.domain}/request-a-quote/): RFQ path for facility buyers and distributors.
- [Warehouse Cleaning Robots](${site.domain}/industries/warehouse-cleaning-robots/): recommended models and ROI guidance for warehouses.
- [Blog](${site.domain}/blog/): buyer guides for cleaning robots, warehouse AMRs, facade robots, sourcing, and certification checks.
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
    ["/", homePageV2()],
    ["/solutions/", solutionsPage()],
    ["/solutions/smart-robots/", smartRobotsSolutionPage()],
    ["/technology/", technologyPage()],
    ["/manufacturing/", manufacturingPage()],
    ["/products/", productsPage()],
    ["/oem-odm-cleaning-robots/", oemPage()],
    ["/commercial-cleaning-robot-manufacturer/", manufacturerPage()],
    ["/industries/warehouse-cleaning-robots/", warehousePage()],
    ["/blog/", blogIndexPage()],
    ["/resources/", resourcesPage()],
    ["/faqs/", faqPage()],
    ["/about/", aboutPageV2()],
    ["/request-a-quote/", quotePage()],
    ["/contact/", contactPage()],
  ]);

  for (const product of products) {
    pages.set(product.url.split("#")[0], productPage(product));
  }

  for (const post of blogPosts) {
    pages.set(`/blog/${post.slug}/`, blogArticlePage(post));
  }

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
