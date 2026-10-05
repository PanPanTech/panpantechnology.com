"""Generate static redirect pages for legacy URLs.

The 1.0 site (removed in the 2026-07-09 redesign deploy) and the old WordPress
site left URLs in Google's index that now 404. GitHub Pages has no server-side
redirects, so each legacy path gets a tiny page with an instant meta refresh and
a canonical pointing at the replacement. Google treats a 0-second meta refresh
as a permanent redirect. Redirect pages must stay out of sitemap.xml.

Run: python scripts/generate-redirects.py
"""

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOMAIN = "https://www.panpantechnology.com"
SOCIAL = f"{DOMAIN}/assets/images/panpantech-social-card.jpg"

REDIRECTS = {
    # Removed 1.0 site pages
    "/commercial-cleaning-robot-manufacturer/": "/products/",
    "/contact/": "/request-a-quote/",
    "/faqs/": "/",
    "/oem-odm-cleaning-robots/": "/manufacturing/",
    "/solutions/smart-robots/": "/products/",
    "/industries/airport-cleaning-robots/": "/solutions/hospitality/",
    "/industries/factory-cleaning-robots/": "/solutions/factory-manufacturing/",
    "/industries/hospital-cleaning-robots/": "/products/acr-0520v/",
    "/industries/hotel-cleaning-robots/": "/solutions/hospitality/",
    "/industries/office-cleaning-robots/": "/solutions/commercial-property/",
    "/industries/retail-cleaning-robots/": "/solutions/retail/",
    "/industries/school-cleaning-robots/": "/solutions/commercial-property/",
    "/industries/warehouse-cleaning-robots/": "/solutions/warehouse-logistics/",
    "/products/c2-cleaning-robot/": "/products/acr-0370/",
    "/products/c2-pro-cleaning-robot/": "/products/acr-0440p/",
    "/products/c3-mini-cleaning-robot/": "/products/acr-0350/",
    "/products/iqx70b-autonomous-scrubber/": "/products/acr-0600/",
    "/products/jsr1-service-robot/": "/products/asr-0012/",
    "/products/p060/": "/products/acr-0520/",
    "/products/pt90/": "/products/acr-0800/",
    "/products/q3-g-cleaning-robot/": "/products/acr-0440c/",
    "/products/q3-w-cleaning-robot/": "/products/acr-0670/",
    "/products/xg-cleaning-robot/": "/products/acr-0800/",
    "/products/yz-outdoor-sweeping-robot/": "/products/acr-1200/",
    "/products/t300-conveyor-amr/": "/products/amr-0300/",
    "/products/t300-industrial-delivery-amr/": "/products/amr-0300/",
    "/products/t300-lifting-amr/": "/products/amr-0300r/",
    "/products/t300-towing-amr/": "/products/amr-0300/",
    "/products/t300-tray-amr/": "/products/amr-0300/",
    "/products/t600-heavy-payload-amr/": "/products/amr-0600/",
    # Old WordPress slug still in Google's index
    "/blog/best-robot-window-cleaner-for-commercial-buildings/": "/blog/best-robotic-window-cleaner/",
}


def page_title(route: str) -> str:
    source = (ROOT / route.strip("/") / "index.html").read_text(encoding="utf-8")
    return html.unescape(re.search(r"<title>([^<]*)</title>", source).group(1))


def render(target: str) -> str:
    title = page_title(target)
    name = title.split(" | ")[0]
    url = f"{DOMAIN}{target}"
    e = lambda s: html.escape(s, quote=True)
    description = f"This page has moved. Continue to {name} on the PanPanTech website."
    return (
        '<!doctype html><html lang="en"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f"<title>{e(title)}</title>\n"
        f'<meta name="description" content="{e(description)}">\n'
        f'<link rel="canonical" href="{url}">\n'
        f'<meta http-equiv="refresh" content="0; url={target}">\n'
        f'<meta property="og:url" content="{url}"><meta property="og:image" content="{SOCIAL}">'
        f'<meta name="twitter:image" content="{SOCIAL}">\n'
        f'<script>location.replace("{target}" + location.hash);</script>\n'
        f'</head><body><h1>{e(name)}</h1><p><a href="{target}">Continue to {e(name)}</a></p></body></html>\n'
    )


for source, target in REDIRECTS.items():
    if not (ROOT / target.strip("/") / "index.html").exists() and target != "/":
        raise SystemExit(f"redirect target missing: {target}")
    out = ROOT / source.strip("/") / "index.html"
    if out.exists() and "http-equiv=\"refresh\"" not in out.read_text(encoding="utf-8"):
        raise SystemExit(f"refusing to overwrite real page: {source}")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(render(target), encoding="utf-8")

print(f"Wrote {len(REDIRECTS)} redirect pages.")
