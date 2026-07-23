(function () {
  "use strict";
  const inquiryEndpoint = "https://inquiry.panpantechnology.com/api/inquiries";
  const salesEmail = "info@panpantechnology.com";
  const heroSlides = [
    {
      tag: "01 Retail Tech",
      headline: "Every price on every shelf, updated in seconds.",
      sub: "Electronic shelf labels, footfall analytics, and retail data middleware — deployed in 6,000+ stores through dedicated group brands."
    },
    {
      tag: "02 Smart Robots",
      headline: "Floors cleaned and goods moved — without adding headcount.",
      sub: "Commercial cleaning robots, facade robots, and warehouse AMRs with fleet cloud management and a defensible ROI story."
    },
    {
      tag: "03 Digital Art",
      headline: "Art that hangs like a print, changes like a screen.",
      sub: "E-paper art frames and ambient displays for interiors, hospitality, and curated commercial spaces — zero glow, weeks of battery."
    },
    {
      tag: "04 Manufacturing",
      headline: "The factory behind the brands — open to your OEM program.",
      sub: "A 3,200 m² production base with SMT lines: ESL assembly, PCBA service, and e-paper modules for qualified B2B partners."
    }
  ];

  function initializeHeroCarousel() {
    const carousel = document.querySelector("[data-hero-carousel]");
    if (!carousel) return;

    const mediaLayers = Array.from(carousel.querySelectorAll("[data-hero-media]"));
    const cards = Array.from(carousel.querySelectorAll("[data-hero-card]"));
    const tag = carousel.querySelector("[data-hero-tag]");
    const headline = carousel.querySelector("[data-hero-headline]");
    const sub = carousel.querySelector("[data-hero-sub]");
    if (mediaLayers.length < 4 || cards.length < 4 || !tag || !headline || !sub) return;

    let active = 0;
    let timer = 0;

    const activeCard = {
      border: "rgb(14, 95, 217)",
      background: "rgba(14, 95, 217, 0.14)",
      number: "rgb(14, 95, 217)",
      dot: "rgb(14, 95, 217)",
      kicker: "rgb(14, 95, 217)",
      desc: "rgb(215, 223, 238)"
    };
    const inactiveCard = {
      border: "rgba(255, 255, 255, 0.16)",
      background: "rgba(7, 10, 18, 0.45)",
      number: "rgb(92, 107, 133)",
      dot: "rgba(255, 255, 255, 0.18)",
      kicker: "rgb(143, 163, 200)",
      desc: "rgb(143, 163, 200)"
    };

    function setCardStyle(card, isActive) {
      const palette = isActive ? activeCard : inactiveCard;
      card.style.borderColor = palette.border;
      card.style.background = palette.background;
      card.setAttribute("aria-pressed", String(isActive));
      const number = card.querySelector("[data-hero-card-number]");
      const dot = card.querySelector("[data-hero-card-dot]");
      const kicker = card.querySelector("[data-hero-card-kicker]");
      const desc = card.querySelector("[data-hero-card-desc]");
      if (number) number.style.color = palette.number;
      if (dot) dot.style.background = palette.dot;
      if (kicker) kicker.style.color = palette.kicker;
      if (desc) desc.style.color = palette.desc;
    }

    function setActive(index, userAction) {
      active = (index + heroSlides.length) % heroSlides.length;
      const slide = heroSlides[active];
      tag.textContent = slide.tag;
      headline.textContent = slide.headline;
      sub.textContent = slide.sub;

      mediaLayers.forEach((layer, layerIndex) => {
        const isActive = layerIndex === active;
        layer.style.display = isActive ? "block" : "none";
        layer.style.opacity = isActive ? "1" : "0";
        layer.style.pointerEvents = isActive ? "auto" : "none";
        layer.setAttribute("aria-hidden", String(!isActive));
        layer.querySelectorAll("video").forEach((video) => {
          video.muted = true;
          video.defaultMuted = true;
          video.playsInline = true;
          if (isActive) {
            const play = video.play();
            if (play && typeof play.catch === "function") play.catch(() => {});
          } else {
            video.pause();
          }
        });
      });

      cards.forEach((card, cardIndex) => setCardStyle(card, cardIndex === active));
      if (userAction) restartTimer();
    }

    function restartTimer() {
      window.clearInterval(timer);
      timer = window.setInterval(() => setActive(active + 1, false), 6000);
    }

    cards.forEach((card, index) => {
      card.addEventListener("click", () => setActive(index, true));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setActive(index, true);
        }
      });
    });

    carousel.addEventListener("mouseenter", () => window.clearInterval(timer));
    carousel.addEventListener("mouseleave", restartTimer);
    setActive(0, false);
    restartTimer();
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
    const note = form.querySelector("[data-inquiry-status]");
    if (!note) return;
    note.textContent = message;
    note.style.color = isError ? "#b42318" : "#1f7a3f";
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
    ].join("\n");
    return "mailto:" + salesEmail + "?subject=" + encodeURIComponent("PanPanTech RFQ") + "&body=" + encodeURIComponent(body);
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

  function metaContent(selector) {
    const node = document.querySelector(selector);
    return node ? node.getAttribute("content") || "" : "";
  }

  function canonicalUrl() {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonical.href) return canonical.href;
    return window.location.href.split("#")[0];
  }

  function sharePayload() {
    const url = canonicalUrl();
    const title = metaContent('meta[property="og:title"]') || document.title || "PanPanTech";
    const description = metaContent('meta[property="og:description"]') || metaContent('meta[name="description"]');
    return { url, title, description };
  }

  function shareUrl(channel, payload) {
    const encodedUrl = encodeURIComponent(payload.url);
    const encodedTitle = encodeURIComponent(payload.title);
    const encodedDescription = encodeURIComponent(payload.description);
    const text = encodeURIComponent([payload.title, payload.description].filter(Boolean).join(" - "));
    const routes = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      pinterest: `https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&description=${text}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      vk: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}&description=${encodedDescription}`,
      email: `mailto:?subject=${encodedTitle}&body=${text}%0A%0A${encodedUrl}`
    };
    return routes[channel] || payload.url;
  }

  function articleShareTemplate() {
    return `
      <section class="article-share" data-article-share aria-labelledby="article-share-title">
        <div class="share-heading">
          <p class="share-label" id="article-share-title">Share this article</p>
          <span class="share-hint">Send the guide to your team or save the canonical URL.</span>
        </div>
        <div class="share-buttons" aria-label="Share this article">
          <a class="share-button facebook" href="#" data-share-channel="facebook" target="_blank" rel="noopener" aria-label="Share on Facebook"><span class="share-icon" aria-hidden="true">f</span><span class="share-text">Facebook</span></a>
          <a class="share-button linkedin" href="#" data-share-channel="linkedin" target="_blank" rel="noopener" aria-label="Share on LinkedIn"><span class="share-icon" aria-hidden="true">in</span><span class="share-text">LinkedIn</span></a>
          <a class="share-button x" href="#" data-share-channel="x" target="_blank" rel="noopener" aria-label="Share on X"><span class="share-icon" aria-hidden="true">X</span><span class="share-text">X</span></a>
          <a class="share-button pinterest" href="#" data-share-channel="pinterest" target="_blank" rel="noopener" aria-label="Share on Pinterest"><span class="share-icon" aria-hidden="true">P</span><span class="share-text">Pinterest</span></a>
          <a class="share-button whatsapp" href="#" data-share-channel="whatsapp" target="_blank" rel="noopener" aria-label="Share on WhatsApp"><span class="share-icon" aria-hidden="true">WA</span><span class="share-text">WhatsApp</span></a>
          <a class="share-button telegram" href="#" data-share-channel="telegram" target="_blank" rel="noopener" aria-label="Share on Telegram"><span class="share-icon" aria-hidden="true">TG</span><span class="share-text">Telegram</span></a>
          <a class="share-button vk" href="#" data-share-channel="vk" target="_blank" rel="noopener" aria-label="Share on VK"><span class="share-icon" aria-hidden="true">VK</span><span class="share-text">VK</span></a>
          <a class="share-button email" href="#" data-share-channel="email" aria-label="Share by email"><span class="share-icon" aria-hidden="true">@</span><span class="share-text">Email</span></a>
          <button type="button" class="share-button copy" data-share-action="copy" aria-label="Copy article link"><span class="share-icon" aria-hidden="true">URL</span><span class="share-text">Copy link</span></button>
          <button type="button" class="share-button native" data-share-action="native" aria-label="Share this article"><span class="share-icon" aria-hidden="true">+</span><span class="share-text">Share</span></button>
        </div>
      </section>
    `;
  }

  function ensureArticleShareStyles() {
    if (document.getElementById("panpantech-article-share-styles")) return;
    const style = document.createElement("style");
    style.id = "panpantech-article-share-styles";
    style.textContent = `
      .article-share{margin-top:64px;padding:28px;background:#fff;border:1px solid var(--border);border-radius:14px;display:grid;gap:20px}
      .share-heading{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;align-items:baseline}
      .share-label{margin:0;font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mono-grey)}
      .share-hint{font-size:13px;line-height:1.5;color:var(--muted)}
      .share-buttons{display:flex;flex-wrap:wrap;gap:10px}
      .share-button{appearance:none;border:1px solid var(--border);background:#fff;color:var(--ink);min-height:42px;padding:9px 14px;border-radius:999px;display:inline-flex;align-items:center;gap:9px;font:600 13.5px/1 "Instrument Sans",system-ui,sans-serif;cursor:pointer;transition:transform 180ms,border-color 180ms,background 180ms,color 180ms}
      .share-button:hover{transform:translateY(-1px);border-color:currentColor}
      .share-button:focus-visible{outline:3px solid rgba(14,95,217,.2);outline-offset:2px}
      .share-icon{width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:var(--ink);color:#fff;font-size:10px;font-family:"IBM Plex Mono",monospace;font-weight:600;line-height:1}
      .share-button.facebook .share-icon{background:#1877f2}
      .share-button.linkedin .share-icon{background:#0a66c2}
      .share-button.x .share-icon{background:#000}
      .share-button.pinterest .share-icon{background:#bd081c}
      .share-button.whatsapp .share-icon{background:#25d366}
      .share-button.telegram .share-icon{background:#229ed9}
      .share-button.vk .share-icon{background:#4c75a3}
      .share-button.email .share-icon{background:#5c6b85}
      .share-button.copy .share-icon{background:var(--blue)}
      .share-button.native .share-icon{background:#111827}
      .share-button.is-copied{border-color:#1f7a3f;color:#1f7a3f;background:#f1fbf5}
      .share-button.is-copied .share-icon{background:#1f7a3f}
      @media (max-width:480px){
        .article-share{margin-top:48px;padding:20px}
        .share-button{width:42px;height:42px;min-height:42px;justify-content:center;padding:0}
        .share-button .share-text{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
      }
    `;
    document.head.append(style);
  }

  function ensureArticleShareSection() {
    const isArticle = metaContent('meta[property="og:type"]') === "article";
    if (!isArticle || document.querySelector("[data-article-share]")) return;
    ensureArticleShareStyles();
    const article = document.querySelector("article");
    if (!article) return;
    const holder = document.createElement("div");
    holder.innerHTML = articleShareTemplate().trim();
    const share = holder.firstElementChild;
    const related = article.querySelector(".related");
    if (related) {
      related.before(share);
    } else {
      article.append(share);
    }
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  function initArticleShare() {
    ensureArticleShareSection();
    document.querySelectorAll("[data-article-share]").forEach((share) => {
      const payload = sharePayload();
      share.querySelectorAll("[data-share-channel]").forEach((link) => {
        const channel = link.getAttribute("data-share-channel");
        link.setAttribute("href", shareUrl(channel, payload));
      });

      const copyButton = share.querySelector('[data-share-action="copy"]');
      if (copyButton) {
        const label = copyButton.querySelector(".share-text");
        const original = label ? label.textContent : "";
        copyButton.addEventListener("click", async () => {
          try {
            await copyText(payload.url);
            copyButton.classList.add("is-copied");
            if (label) label.textContent = "Copied";
            window.setTimeout(() => {
              copyButton.classList.remove("is-copied");
              if (label) label.textContent = original;
            }, 1800);
          } catch (error) {
            console.error("[PanPanTech copy share link failed]", error);
          }
        });
      }

      const nativeButton = share.querySelector('[data-share-action="native"]');
      if (nativeButton) {
        if (!navigator.share) {
          nativeButton.hidden = true;
          return;
        }
        nativeButton.addEventListener("click", async () => {
          try {
            await navigator.share(payload);
          } catch (error) {
            if (error && error.name !== "AbortError") {
              console.error("[PanPanTech native share failed]", error);
            }
          }
        });
      }
    });
  }

  initArticleShare();
  initializeHeroCarousel();
})();
