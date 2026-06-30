(function () {
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
})();