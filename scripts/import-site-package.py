from __future__ import annotations

import datetime as dt
import json
import os
import re
import shutil
import socket
import subprocess
import tempfile
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import quote

import imageio_ffmpeg
from lxml import etree, html
from PIL import Image


DOMAIN = "https://panpantechnology.com"
LOGO_URL = f"{DOMAIN}/assets/images/panpantech-logo.png"
SOCIAL_URL = f"{DOMAIN}/assets/images/panpantech-social-card.jpg"
INQUIRY_ENDPOINT = "https://inquiry.panpantechnology.com/api/inquiries"

REPO_ROOT = Path.cwd().resolve()
WORKSPACE_ROOT = REPO_ROOT.parent

PACKAGE_ROOT = Path(
    os.environ.get(
        "PANPANTECH_PACKAGE_ROOT",
        WORKSPACE_ROOT / "\u54c1\u724c\u5b98\u7f51 20260709 2.0\u7248\u672c" / "site-package",
    )
)
RETAIL_VIDEO_SOURCE = Path(
    os.environ.get(
        "PANPANTECH_RETAIL_VIDEO",
        WORKSPACE_ROOT / "\u7535\u5b50\u4ef7\u7b7e \u5e94\u7528\u89c6\u9891" / "\u9996\u5c4f\u89c6\u98911.mp4",
    )
)
LOGO_SOURCE = Path(
    os.environ.get(
        "PANPANTECH_LOGO_SOURCE",
        "E:/\u684c\u9762/\u6500\u6500\u79d1\u6280\u8d44\u6599/\u5546\u6807\u5408\u540c/PanPanTech.jpg",
    )
)

PAGE_MAP = {
    "PanPanTech Homepage v2.dc.html": "/",
    "Products.dc.html": "/products/",
    "Product PT90.dc.html": "/products/pt90/",
    "Manufacturing.dc.html": "/manufacturing/",
    "About.dc.html": "/about/",
    "Request a Quote.dc.html": "/request-a-quote/",
    "Blog.dc.html": "/blog/",
    "Blog AMR vs AGV.dc.html": "/blog/amr-robot-vs-agv/",
    "Blog Autonomous Floor Scrubber.dc.html": "/blog/autonomous-floor-scrubber/",
    "Blog Robotic Window Cleaner.dc.html": "/blog/best-robotic-window-cleaner/",
    "Blog Certifications.dc.html": "/blog/certifications-for-commercial-cleaning-robots/",
    "Blog Commercial Robot Vacuum.dc.html": "/blog/commercial-robot-vacuum/",
    "Blog Industrial Robot Vacuum Warehouse.dc.html": "/blog/industrial-robot-vacuum-for-warehouse/",
    "Solutions.dc.html": "/solutions/",
    "Solution Retail.dc.html": "/solutions/retail/",
    "Solution Warehouse Logistics.dc.html": "/solutions/warehouse-logistics/",
    "Solution Factory.dc.html": "/solutions/factory-manufacturing/",
    "Solution Commercial Property.dc.html": "/solutions/commercial-property/",
    "Solution Hospitality.dc.html": "/solutions/hospitality/",
    "Technology.dc.html": "/technology/",
    "Tech Navigation Autonomy.dc.html": "/technology/navigation-autonomy/",
    "Tech Fleet Cloud.dc.html": "/technology/fleet-cloud-platform/",
    "Tech Epaper ESL.dc.html": "/technology/epaper-esl/",
    "Tech Retail Data.dc.html": "/technology/retail-data-platform/",
    "Tech Manufacturing SMT.dc.html": "/technology/manufacturing-smt/",
    "Partner Program.dc.html": "/partners/",
    "Resources.dc.html": "/resources/",
}

OUTPUT_DIRS = [
    "about",
    "assets",
    "blog",
    "commercial-cleaning-robot-manufacturer",
    "contact",
    "faqs",
    "industries",
    "manufacturing",
    "oem-odm-cleaning-robots",
    "partners",
    "products",
    "request-a-quote",
    "resources",
    "solutions",
    "technology",
]


def log(message: str) -> None:
    print(f"[panpantech-build] {message}", flush=True)


def require_path(path: Path, label: str) -> None:
    if not path.exists():
        raise FileNotFoundError(f"{label} not found: {path}")


def safe_remove(path: Path) -> None:
    resolved = path.resolve()
    try:
        resolved.relative_to(REPO_ROOT)
    except ValueError as exc:
        raise RuntimeError(f"Refusing to remove outside repo: {resolved}") from exc
    if resolved.is_dir():
        shutil.rmtree(resolved)
    elif resolved.exists():
        resolved.unlink()


def reset_output() -> None:
    for name in OUTPUT_DIRS:
        safe_remove(REPO_ROOT / name)
    for file_name in ["index.html", "404.html", "robots.txt", "sitemap.xml", "llms.txt", "favicon.ico"]:
        safe_remove(REPO_ROOT / file_name)


def copy_work_package() -> tuple[Path, Path]:
    temp_root = Path(tempfile.mkdtemp(prefix="panpantech-site-package-"))
    work_package = temp_root / "site-package"
    shutil.copytree(PACKAGE_ROOT, work_package)
    return temp_root, work_package


def patch_homepage(work_package: Path) -> None:
    home = work_package / "PanPanTech Homepage v2.dc.html"
    source = home.read_text(encoding="utf-8")
    source = source.replace("state = { active: 1 };", "state = { active: 0 };")
    source = source.replace(
        "kind: 'image', media: 'current-site/assets/images/esl-warehouse-shelves.jpg'",
        "kind: 'video', media: 'current-site/assets/videos/esl-hero.mp4'",
        1,
    )
    source = source.replace(
        "  startTimer() {\n    clearInterval(this._timer);\n    if (this.props.autoRotate ?? true) {",
        "  startTimer() {\n    clearInterval(this._timer);\n    return;\n    if (this.props.autoRotate ?? true) {",
    )
    home.write_text(source, encoding="utf-8", newline="\n")


def transcode_retail_video(destination: Path) -> None:
    require_path(RETAIL_VIDEO_SOURCE, "Retail Tech video")
    destination.parent.mkdir(parents=True, exist_ok=True)
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [
        ffmpeg,
        "-y",
        "-hide_banner",
        "-loglevel",
        "warning",
        "-i",
        str(RETAIL_VIDEO_SOURCE),
        "-an",
        "-vf",
        "scale=1280:-2",
        "-c:v",
        "libx264",
        "-profile:v",
        "high",
        "-level:v",
        "4.0",
        "-pix_fmt",
        "yuv420p",
        "-preset",
        "medium",
        "-crf",
        "24",
        "-movflags",
        "+faststart",
        str(destination),
    ]
    subprocess.run(cmd, check=True)


def find_chrome() -> Path:
    candidates = [
        Path(os.environ["CHROME_PATH"]) if os.environ.get("CHROME_PATH") else None,
        Path("C:/Program Files/Google/Chrome/Application/chrome.exe"),
        Path("C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"),
        Path("C:/Program Files/Microsoft/Edge/Application/msedge.exe"),
        Path("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"),
    ]
    for candidate in candidates:
        if candidate is not None and candidate.is_file():
            return candidate
    raise FileNotFoundError("Chrome or Edge executable was not found")


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format: str, *args: object) -> None:
        return

    def handle(self) -> None:
        try:
            super().handle()
        except (BrokenPipeError, ConnectionAbortedError, ConnectionResetError):
            return


def free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return int(sock.getsockname()[1])


def start_server(root: Path) -> tuple[ThreadingHTTPServer, int]:
    port = free_port()

    class Handler(QuietHandler):
        def __init__(self, *args: object, **kwargs: object) -> None:
            super().__init__(*args, directory=str(root), **kwargs)

    server = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server, port


def render_page(chrome: Path, port: int, file_name: str) -> str:
    url = f"http://127.0.0.1:{port}/{quote(file_name)}"
    cmd = [
        str(chrome),
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--autoplay-policy=no-user-gesture-required",
        "--virtual-time-budget=3500",
        "--dump-dom",
        url,
    ]
    result = subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=75)
    rendered = result.stdout.decode("utf-8", errors="replace")
    if "dc-root" not in rendered and "<sc-" in rendered:
        raise RuntimeError(f"Rendered page still looks unexpanded: {file_name}")
    return rendered


def text_content(element: etree._Element) -> str:
    return " ".join(element.text_content().split()).strip()


def route_for_output(route: str) -> Path:
    if route == "/":
        return REPO_ROOT / "index.html"
    return REPO_ROOT / route.strip("/") / "index.html"


def rewrite_link(value: str | None) -> str | None:
    if not value:
        return value
    value = value.replace("current-site/assets/", "/assets/")
    value = value.replace("./current-site/assets/", "/assets/")
    if value.startswith("http") or value.startswith("mailto:") or value.startswith("tel:") or value.startswith("data:"):
        return value.replace(f"{DOMAIN}/assets/images/robot-dark-hero.jpg", SOCIAL_URL)

    prefix = ""
    suffix = ""
    base = value
    if "#" in base:
        base, suffix = base.split("#", 1)
        suffix = "#" + suffix
    if "?" in base:
        base, query = base.split("?", 1)
        suffix = "?" + query + suffix
    base = base.removeprefix("./")
    if base in PAGE_MAP:
        return PAGE_MAP[base] + suffix
    if base.endswith(".dc.html") and Path(base).name in PAGE_MAP:
        return PAGE_MAP[Path(base).name] + suffix
    return value


def rewrite_style_urls(style: str | None) -> str | None:
    if not style:
        return style
    style = style.replace("current-site/assets/", "/assets/")
    style = style.replace("./current-site/assets/", "/assets/")
    return style


def remove_runtime_nodes(doc: etree._Element) -> None:
    for node in doc.xpath("//x-dc|//helmet|//script[@type='text/x-dc']"):
        parent = node.getparent()
        if parent is not None:
            parent.remove(node)

    for script in list(doc.xpath("//script")):
        script_type = (script.get("type") or "").lower()
        src = script.get("src") or ""
        if script_type == "application/ld+json":
            continue
        if "support.js" in src or "react" in src or "unpkg.com" in src or script.get("data-dc-script") is not None:
            parent = script.getparent()
            if parent is not None:
                parent.remove(script)

    for style in list(doc.xpath("//style")):
        content = style.text or ""
        if (
            ".sc-placeholder" in content
            or "sc-dc-streaming" in content
            or "x-dc{display:none" in content.replace(" ", "")
            or "#dc-root" in content
        ):
            parent = style.getparent()
            if parent is not None:
                parent.remove(style)


def unwrap_render_root(doc: etree._Element) -> None:
    body = doc.find("body")
    if body is None:
        return
    roots = doc.xpath("//div[@id='dc-root']")
    if not roots:
        return
    render_root = roots[0]
    hosts = render_root.xpath("./div[contains(concat(' ', normalize-space(@class), ' '), ' sc-host ')]")
    source = hosts[0] if hosts else render_root
    children = list(source)
    body.clear()
    for child in children:
        body.append(child)


def clean_attributes(doc: etree._Element) -> None:
    remove_names = {
        "data-dc-tpl",
        "data-sc-name",
        "data-screen-label",
        "data-reactroot",
        "style-hover",
        "style-focus",
        "hint-placeholder-count",
        "hint-placeholder-val",
    }
    for element in doc.iter():
        for name in list(element.attrib):
            if name in remove_names or name.startswith("data-sc-"):
                element.attrib.pop(name, None)
        for attr in ["src", "href", "poster"]:
            if attr in element.attrib:
                element.attrib[attr] = rewrite_link(element.attrib[attr]) or ""
        if "style" in element.attrib:
            element.attrib["style"] = rewrite_style_urls(element.attrib["style"]) or ""


def fix_placeholder_links(doc: etree._Element) -> None:
    replacements = {
        "retail tech": "/solutions/retail/",
        "smart robots": "/products/",
        "digital art": "https://einksmart.com",
        "manufacturing": "/manufacturing/",
        "request a quote": "/request-a-quote/",
        "contact": "/request-a-quote/",
    }
    for anchor in doc.xpath("//a[@href='#' or @href='']"):
        text = text_content(anchor).lower()
        for key, href in replacements.items():
            if key in text:
                anchor.set("href", href)
                break
        else:
            anchor.set("href", "/")


def upsert_meta(head: etree._Element, *, name: str | None = None, prop: str | None = None, content: str) -> None:
    selector = f"meta[@name='{name}']" if name else f"meta[@property='{prop}']"
    nodes = head.xpath(selector)
    node = nodes[0] if nodes else etree.SubElement(head, "meta")
    if name:
        node.set("name", name)
    if prop:
        node.set("property", prop)
    node.set("content", content)


def upsert_link(head: etree._Element, rel: str, href: str, **attrs: str) -> None:
    nodes = head.xpath(f"link[@rel='{rel}' and @href='{href}']")
    node = nodes[0] if nodes else etree.SubElement(head, "link")
    node.set("rel", rel)
    node.set("href", href)
    for key, value in attrs.items():
        node.set(key.replace("_", "-"), value)


def update_jsonld_value(value: object, logo_context: bool = False) -> object:
    if isinstance(value, dict):
        result: dict[str, object] = {}
        for key, child in value.items():
            lower = key.lower()
            if lower == "logo":
                result[key] = update_jsonld_value(child, logo_context=True)
            elif lower == "image":
                result[key] = update_jsonld_value(child, logo_context=False)
            else:
                result[key] = update_jsonld_value(child, logo_context=False)
        if result.get("@type") == "Organization":
            result["logo"] = LOGO_URL
            result["image"] = SOCIAL_URL
        if logo_context and "url" in result:
            result["url"] = LOGO_URL
        return result
    if isinstance(value, list):
        return [update_jsonld_value(item, logo_context=logo_context) for item in value]
    if isinstance(value, str):
        if "assets/images/robot-dark-hero.jpg" in value:
            return LOGO_URL if logo_context else SOCIAL_URL
        return value
    return value


def update_head_assets(doc: etree._Element) -> None:
    head = doc.find("head")
    if head is None:
        return
    upsert_link(head, "icon", "/favicon.ico", sizes="any")
    upsert_link(head, "icon", "/assets/images/favicon-48x48.png", type="image/png", sizes="48x48")
    upsert_link(head, "apple-touch-icon", "/assets/images/apple-touch-icon.png")
    upsert_link(head, "stylesheet", "/assets/css/responsive.css")
    upsert_meta(head, name="theme-color", content="#0E5FD9")
    upsert_meta(head, prop="og:image", content=SOCIAL_URL)
    upsert_meta(head, name="twitter:card", content="summary_large_image")
    upsert_meta(head, name="twitter:image", content=SOCIAL_URL)

    for script in doc.xpath("//script[@type='application/ld+json']"):
        try:
            data = json.loads(script.text or "{}")
        except json.JSONDecodeError:
            continue
        script.text = json.dumps(update_jsonld_value(data), ensure_ascii=False, separators=(",", ":"))


def inject_site_script(doc: etree._Element) -> None:
    body = doc.find("body")
    if body is None:
        return
    script = etree.Element("script")
    script.set("src", "/assets/js/site.js")
    script.set("defer", "defer")
    body.append(script)


def connect_rfq_form(doc: etree._Element) -> None:
    inputs = {
        "rfq-name": ("name", True),
        "rfq-email": ("email", True),
        "rfq-company": ("company", False),
        "rfq-country": ("country", False),
        "rfq-interest": ("product_interest", False),
        "rfq-qty": ("quantity", False),
        "rfq-message": ("message", False),
    }
    try:
        name_input = doc.get_element_by_id("rfq-name")
    except KeyError:
        return

    container = name_input.getparent()
    while container is not None:
        has_message = bool(container.xpath(".//*[@id='rfq-message']"))
        has_mailto = bool(container.xpath(".//a[starts-with(@href, 'mailto:')]"))
        if has_message and has_mailto:
            break
        container = container.getparent()
    if container is None:
        return

    container.tag = "form"
    container.set("class", "cleanbot-quote-form")
    container.set("action", INQUIRY_ENDPOINT)
    container.set("method", "post")
    container.set("data-inquiry-form", "panpantech-rfq")

    for element_id, (name, required) in inputs.items():
        try:
            field = doc.get_element_by_id(element_id)
        except KeyError:
            continue
        field.set("name", name)
        if required:
            field.set("required", "required")
        if name == "email":
            field.set("type", "email")

    submit_links = container.xpath(".//a[starts-with(@href, 'mailto:')]")
    if submit_links:
        link = submit_links[0]
        button = etree.Element("button")
        button.set("type", "submit")
        button.set("style", (link.get("style") or "") + "; border:0; cursor:pointer; font-family:'Instrument Sans',sans-serif")
        button.text = "Send RFQ "
        span = etree.SubElement(button, "span")
        span.set("style", "font-family:'IBM Plex Mono',monospace")
        span.text = "\u2192"
        parent = link.getparent()
        parent.replace(link, button)

    status = etree.Element("p")
    status.set("data-inquiry-status", "")
    status.set("aria-live", "polite")
    status.set("style", "margin:16px 0 0; font-size:14px; line-height:1.5; color:#6A7386")
    container.append(status)


def postprocess(rendered: str, route: str) -> str:
    doc = html.document_fromstring(rendered)
    unwrap_render_root(doc)
    remove_runtime_nodes(doc)
    clean_attributes(doc)
    fix_placeholder_links(doc)
    update_head_assets(doc)
    if route == "/request-a-quote/":
        connect_rfq_form(doc)
    inject_site_script(doc)
    html_text = html.tostring(doc, encoding="unicode", method="html", doctype="<!doctype html>")
    html_text = html_text.replace("current-site/assets/", "/assets/")
    return html_text


def write_html(route: str, content: str) -> None:
    target = route_for_output(route)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8", newline="\n")


def non_white_bbox(image: Image.Image) -> tuple[int, int, int, int]:
    rgb = image.convert("RGB")
    pixels = rgb.load()
    width, height = rgb.size
    xs: list[int] = []
    ys: list[int] = []
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            if min(255 - r, 255 - g, 255 - b) > 12:
                xs.append(x)
                ys.append(y)
    if not xs:
        return (0, 0, width, height)
    return (min(xs), min(ys), max(xs) + 1, max(ys) + 1)


def blue_bbox(image: Image.Image) -> tuple[int, int, int, int]:
    rgb = image.convert("RGB")
    pixels = rgb.load()
    width, height = rgb.size
    xs: list[int] = []
    ys: list[int] = []
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            if b > 110 and b > r * 1.45 and b > g * 1.08:
                xs.append(x)
                ys.append(y)
    if not xs:
        return non_white_bbox(image)
    return (min(xs), min(ys), max(xs) + 1, max(ys) + 1)


def square_on_white(image: Image.Image, size: int, padding_ratio: float = 0.14) -> Image.Image:
    image = image.convert("RGBA")
    side = max(image.width, image.height)
    padding = int(side * padding_ratio)
    canvas = Image.new("RGBA", (side + padding * 2, side + padding * 2), (255, 255, 255, 255))
    canvas.alpha_composite(image, ((canvas.width - image.width) // 2, (canvas.height - image.height) // 2))
    return canvas.resize((size, size), Image.Resampling.LANCZOS)


def generate_brand_assets() -> None:
    require_path(LOGO_SOURCE, "PanPanTech logo")
    out = REPO_ROOT / "assets" / "images"
    out.mkdir(parents=True, exist_ok=True)
    logo = Image.open(LOGO_SOURCE).convert("RGBA")
    content = logo.crop(non_white_bbox(logo))
    icon = logo.crop(blue_bbox(logo))

    padded_logo = Image.new("RGBA", (content.width + 120, content.height + 90), (255, 255, 255, 255))
    padded_logo.alpha_composite(content, (60, 45))
    padded_logo.thumbnail((1200, 700), Image.Resampling.LANCZOS)
    padded_logo.save(out / "panpantech-logo.png")

    social = Image.new("RGBA", (1200, 630), (255, 255, 255, 255))
    social_logo = padded_logo.convert("RGBA")
    social_logo.thumbnail((840, 430), Image.Resampling.LANCZOS)
    social.alpha_composite(social_logo, ((1200 - social_logo.width) // 2, (630 - social_logo.height) // 2))
    social.convert("RGB").save(out / "panpantech-social-card.jpg", quality=92, optimize=True)

    icon_512 = square_on_white(icon, 512)
    icon_512.save(out / "panpantech-favicon.png")
    icon_512.resize((48, 48), Image.Resampling.LANCZOS).save(out / "favicon-48x48.png")
    icon_512.resize((180, 180), Image.Resampling.LANCZOS).save(out / "apple-touch-icon.png")
    icon_512.save(REPO_ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])


def write_site_js() -> None:
    js = f"""(function () {{
  "use strict";
  const inquiryEndpoint = "{INQUIRY_ENDPOINT}";
  const salesEmail = "info@panpantechnology.com";

  function field(data, names) {{
    for (const name of names) {{
      const value = data.get(name);
      if (value && String(value).trim()) return String(value).trim();
    }}
    return "";
  }}

  function trackingFields() {{
    const params = new URLSearchParams(window.location.search);
    return {{
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
    }};
  }}

  function setFormMessage(form, message, isError) {{
    const note = form.querySelector("[data-inquiry-status]");
    if (!note) return;
    note.textContent = message;
    note.style.color = isError ? "#b42318" : "#1f7a3f";
  }}

  function mailtoUrl(payload) {{
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
    return "mailto:" + salesEmail + "?subject=" + encodeURIComponent("PanPanTech RFQ") + "&body=" + encodeURIComponent(body);
  }}

  async function submitInquiry(payload) {{
    const response = await fetch(inquiryEndpoint, {{
      method: "POST",
      headers: {{ "Content-Type": "application/json" }},
      body: JSON.stringify(payload)
    }});
    const body = await response.json().catch(() => ({{}}));
    if (!response.ok || body.ok === false) {{
      throw new Error(body.error || "Inquiry endpoint returned " + response.status);
    }}
    return body;
  }}

  document.querySelectorAll(".cleanbot-quote-form").forEach((form) => {{
    form.addEventListener("submit", async (event) => {{
      event.preventDefault();
      if (form.reportValidity && !form.reportValidity()) return;
      const data = new FormData(form);
      const payload = {{
        ...trackingFields(),
        name: field(data, ["name"]),
        email: field(data, ["email"]),
        phone: field(data, ["phone"]),
        company: field(data, ["company"]),
        country: field(data, ["country"]),
        product_interest: field(data, ["product_interest", "interest"]),
        quantity: field(data, ["quantity"]),
        message: field(data, ["message"])
      }};
      const button = form.querySelector("button[type='submit']");
      const originalLabel = button ? button.textContent : "";
      if (button) {{
        button.disabled = true;
        button.textContent = "Sending...";
      }}
      try {{
        await submitInquiry(payload);
        setFormMessage(form, "Submitted. PanPanTech will contact you soon.", false);
        form.reset();
      }} catch (error) {{
        console.error("[PanPanTech inquiry failed]", error);
        setFormMessage(form, "Online submission is temporarily unavailable. Opening email fallback.", true);
        window.setTimeout(() => {{
          window.location.href = mailtoUrl(payload);
        }}, 600);
      }} finally {{
        if (button) {{
          button.disabled = false;
          button.textContent = originalLabel;
        }}
      }}
    }});
  }});
}})();
"""
    target = REPO_ROOT / "assets" / "js" / "site.js"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(js, encoding="utf-8", newline="\n")


def write_responsive_css() -> None:
    css = """html, body {
  max-width: 100%;
  overflow-x: hidden;
}

img, video {
  max-width: 100%;
}

@media (max-width: 900px) {
  body,
  header,
  main,
  section,
  footer {
    width: 100% !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
  }

  body * {
    min-width: 0 !important;
    max-width: 100vw !important;
    box-sizing: border-box !important;
  }

  body > div {
    width: 100vw !important;
    min-width: 0 !important;
    max-width: 100vw !important;
  }

  header > div {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    min-height: 72px !important;
    padding: 14px 24px !important;
    gap: 18px !important;
  }

  header nav {
    display: none !important;
  }

  header a[href="/request-a-quote/"] {
    display: none !important;
    padding: 10px 16px !important;
    font-size: 13px !important;
    white-space: nowrap !important;
  }

  section > div,
  footer > div {
    width: 100vw !important;
    max-width: 100vw !important;
    padding-left: 24px !important;
    padding-right: 24px !important;
  }

  h1 {
    width: calc(100vw - 48px) !important;
    max-width: calc(100vw - 48px) !important;
    font-size: 32px !important;
    line-height: 1.08 !important;
    letter-spacing: 0 !important;
    overflow-wrap: break-word !important;
    white-space: normal !important;
    text-wrap: wrap !important;
    text-wrap-mode: wrap !important;
  }

  h2 {
    width: calc(100vw - 48px) !important;
    max-width: calc(100vw - 48px) !important;
    font-size: 32px !important;
    line-height: 1.12 !important;
    letter-spacing: 0 !important;
    text-wrap: auto !important;
  }

  h3 {
    font-size: 22px !important;
    line-height: 1.18 !important;
  }

  p {
    width: calc(100vw - 48px) !important;
    max-width: calc(100vw - 48px) !important;
    overflow-wrap: break-word !important;
    text-wrap: wrap !important;
  }

  [style*="grid-template-columns"] {
    grid-template-columns: 1fr !important;
  }

  [style*="grid-column"] {
    grid-column: auto !important;
  }

  [style*="display"][style*="flex"][style*="justify-content"][style*="space-between"],
  [style*="display"][style*="flex"][style*="align-items"][style*="flex-end"] {
    flex-direction: column !important;
    align-items: flex-start !important;
  }

  [style*="display"][style*="flex"][style*="justify-content"][style*="space-between"] > *,
  [style*="display"][style*="flex"][style*="align-items"][style*="flex-end"] > * {
    width: 100% !important;
    flex: 0 1 auto !important;
  }

  [style*="display"][style*="flex"][style*="gap"] {
    flex-wrap: wrap !important;
  }

  a,
  button {
    max-width: 100%;
  }

  table {
    display: block;
    max-width: 100%;
    overflow-x: auto;
  }
}

@media (max-width: 480px) {
  header > div {
    padding-left: 18px !important;
    padding-right: 18px !important;
  }

  section > div,
  footer > div {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  h1 {
    width: calc(100vw - 40px) !important;
    max-width: calc(100vw - 40px) !important;
    font-size: 30px !important;
  }

  h2 {
    width: calc(100vw - 40px) !important;
    max-width: calc(100vw - 40px) !important;
    font-size: 29px !important;
  }

  p {
    width: calc(100vw - 40px) !important;
    max-width: calc(100vw - 40px) !important;
  }
}
"""
    target = REPO_ROOT / "assets" / "css" / "responsive.css"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(css, encoding="utf-8", newline="\n")


def write_support_files() -> None:
    today = dt.date.today().isoformat()
    routes = list(PAGE_MAP.values())
    sitemap_entries = "\n".join(
        f"  <url>\n    <loc>{DOMAIN}{route}</loc>\n    <lastmod>{today}</lastmod>\n    <changefreq>{'weekly' if route == '/' else 'monthly'}</changefreq>\n    <priority>{'1.0' if route == '/' else '0.8'}</priority>\n  </url>"
        for route in routes
    )
    (REPO_ROOT / "sitemap.xml").write_text(
        f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{sitemap_entries}
</urlset>
""",
        encoding="utf-8",
        newline="\n",
    )
    (REPO_ROOT / "robots.txt").write_text(
        f"""User-agent: *
Allow: /

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

Sitemap: {DOMAIN}/sitemap.xml
""",
        encoding="utf-8",
        newline="\n",
    )
    llms_lines = [
        "# PanPanTech",
        "",
        "> PanPanTech is the global group brand for retail AIoT, smart robots, and manufacturing capability.",
        "",
        "## Primary Pages",
    ]
    for file_name, route in PAGE_MAP.items():
        label = file_name.replace(".dc.html", "").replace("PanPanTech Homepage v2", "Home")
        llms_lines.append(f"- [{label}]({DOMAIN}{route})")
    llms_lines.extend(
        [
            "",
            "## Brand Relationships",
            "- AiEinkSmart: electronic shelf labels and e-paper retail signage.",
            "- Pyroglaux: privacy-compliant retail footfall analytics.",
            "- AiESL: retail data middleware, API, and platform integration.",
            "- EinkSmart: e-paper art frames and digital art display.",
            "",
            "## Inquiry",
            f"- RFQ endpoint: {DOMAIN}/request-a-quote/",
        ]
    )
    (REPO_ROOT / "llms.txt").write_text("\n".join(llms_lines) + "\n", encoding="utf-8", newline="\n")
    (REPO_ROOT / "CNAME").write_text("panpantechnology.com\n", encoding="utf-8", newline="\n")
    (REPO_ROOT / ".nojekyll").write_text("", encoding="utf-8")
    (REPO_ROOT / "_headers").write_text(
        """/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
""",
        encoding="utf-8",
        newline="\n",
    )
    (REPO_ROOT / "404.html").write_text(
        f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Not Found | PanPanTech</title>
  <meta name="description" content="The PanPanTech page you requested could not be found.">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
  <meta name="robots" content="noindex">
</head>
<body style="margin:0; font-family:Arial, sans-serif; background:#070A12; color:#fff; display:grid; min-height:100vh; place-items:center">
  <main style="max-width:640px; padding:40px">
    <p style="color:#8FA3C8; letter-spacing:.14em; text-transform:uppercase">PanPanTech</p>
    <h1 style="font-size:44px; line-height:1.05; margin:0 0 16px">Page not found</h1>
    <p style="color:#D7DFEE; line-height:1.6">The page may have moved during the PanPanTech 2.0 site upgrade.</p>
    <p><a href="/" style="color:#fff">Go home</a> &nbsp; <a href="/request-a-quote/" style="color:#fff">Request a quote</a></p>
  </main>
  <script src="/assets/js/site.js" defer></script>
</body>
</html>
""",
        encoding="utf-8",
        newline="\n",
    )


def copy_assets(work_package: Path) -> None:
    source_assets = work_package / "current-site" / "assets"
    target_assets = REPO_ROOT / "assets"
    target_assets.mkdir(parents=True, exist_ok=True)
    for child in source_assets.iterdir():
        destination = target_assets / child.name
        if child.is_dir():
            shutil.copytree(child, destination, dirs_exist_ok=True)
        else:
            shutil.copy2(child, destination)


def main() -> None:
    require_path(PACKAGE_ROOT, "Site package")
    require_path(LOGO_SOURCE, "PanPanTech logo")
    log(f"using package: {PACKAGE_ROOT}")
    temp_root, work_package = copy_work_package()
    server: ThreadingHTTPServer | None = None
    try:
        patch_homepage(work_package)
        log("transcoding Retail Tech hero video to H.264")
        transcode_retail_video(work_package / "current-site" / "assets" / "videos" / "esl-hero.mp4")

        reset_output()
        copy_assets(work_package)
        generate_brand_assets()
        write_site_js()
        write_responsive_css()

        chrome = find_chrome()
        server, port = start_server(work_package)
        log(f"rendering {len(PAGE_MAP)} pages with {chrome.name}")
        for file_name, route in PAGE_MAP.items():
            rendered = render_page(chrome, port, file_name)
            write_html(route, postprocess(rendered, route))
            log(f"rendered {route}")

        write_support_files()
        log("site package import complete")
    finally:
        if server:
            server.shutdown()
        shutil.rmtree(temp_root, ignore_errors=True)


if __name__ == "__main__":
    main()
