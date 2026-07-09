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

  initializeHeroCarousel();
})();
