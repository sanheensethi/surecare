/* =========================================================================
   Surecare Clinic, Yelahanka — Shared site JS
   - Mobile menu toggle
   - Sticky navbar shadow on scroll
   - IntersectionObserver fade-up reveal
   - Current year in footer
   - FAQ accordion
   - Active nav link highlighting
   ========================================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     1. MOBILE MENU TOGGLE
     --------------------------------------------------------------------- */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navMenu = document.querySelector("[data-nav-menu]");
  var navBackdrop = document.querySelector("[data-nav-backdrop]");

  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove("is-open");
    if (navToggle) {
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
    if (navBackdrop) navBackdrop.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function toggleMenu() {
    if (!navMenu) return;
    var willOpen = !navMenu.classList.contains("is-open");
    navMenu.classList.toggle("is-open", willOpen);
    if (navToggle) {
      navToggle.classList.toggle("is-open", willOpen);
      navToggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
    }
    if (navBackdrop) navBackdrop.classList.toggle("is-open", willOpen);
    document.body.style.overflow = willOpen ? "hidden" : "";
  }

  if (navToggle) navToggle.addEventListener("click", toggleMenu);
  if (navBackdrop) navBackdrop.addEventListener("click", closeMenu);

  // Close the menu when a link is tapped
  if (navMenu) {
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  // Close on Escape, and reset state when resizing back to desktop
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) closeMenu();
  });

  /* ---------------------------------------------------------------------
     2. STICKY NAVBAR SHADOW ON SCROLL
     --------------------------------------------------------------------- */
  var navbar = document.querySelector("[data-navbar]");
  function onScroll() {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  if (navbar) {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------------
     3. FADE-UP REVEAL VIA INTERSECTIONOBSERVER
     --------------------------------------------------------------------- */
  var fadeEls = document.querySelectorAll(".fade-up");
  if ("IntersectionObserver" in window && fadeEls.length) {
    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    fadeEls.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: reveal everything
    fadeEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------------------------------------------------------------
     4. CURRENT YEAR IN FOOTER
     --------------------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------------------------------------------------------------------
     5. FAQ ACCORDION
     --------------------------------------------------------------------- */
  var faqItems = document.querySelectorAll("[data-faq-item]");
  faqItems.forEach(function (item) {
    var btn = item.querySelector("[data-faq-q]");
    var panel = item.querySelector("[data-faq-a]");
    if (!btn || !panel) return;

    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      // Optional: close siblings for a single-open accordion feel
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          var otherBtn = other.querySelector("[data-faq-q]");
          var otherPanel = other.querySelector("[data-faq-a]");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = null;
      } else {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------------------------------------------------------------------
     6. ACTIVE NAV LINK HIGHLIGHTING
     Handled server-side in BaseLayout.astro (aria-current + .is-active),
     so there is no client-side flash and it works without JS.
     --------------------------------------------------------------------- */
})();
