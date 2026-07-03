(function () {
  "use strict";
  const toggle = document.querySelector("[data-ppt-menu-toggle]");
  const nav = document.querySelector("[data-ppt-nav]");
  const header = document.querySelector("[data-ppt-header]");
  const inquiryEndpoint = "https://inquiry.panpantechnology.com/api/inquiries";
  const salesEmail = "info@einksmart.com";

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
      lead_brand: "PanPan Robotics",
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
    ].join("\n");
    return (
      "mailto:" +
      salesEmail +
      "?subject=" +
      encodeURIComponent("PanPanTech robotics RFQ") +
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
})();
