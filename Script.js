/* ==========================================================================
   SHAFA LIVING — SCRIPT.JS
   Vanilla JS only. No external libraries.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------
     1. MOBILE NAV TOGGLE
  --------------------------------------------------------- */
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  function closeNav() {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleNav() {
    var isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', toggleNav);

    /* Close mobile menu after a nav link is tapped */
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    /* Close mobile menu if the viewport is resized back to desktop */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) closeNav();
    });
  }

  /* ---------------------------------------------------------
     2. STICKY HEADER SHADOW ON SCROLL
     Adds a subtle shadow once the page scrolls past the hero
     so the header reads as elevated, without extra libraries.
  --------------------------------------------------------- */
  var header = document.getElementById('site-header');

  function updateHeaderState() {
    if (window.scrollY > 8) {
      header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
    } else {
      header.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();

  /* ---------------------------------------------------------
     3. FOOTER YEAR
  --------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     4. PLACEHOLDER IMAGE HANDLING (data-bg)
     When a real photo is added at the given path, this will
     automatically switch the placeholder to display it.
     Until then, elements keep their CSS placeholder background.
  --------------------------------------------------------- */
  document.querySelectorAll('[data-bg]').forEach(function (el) {
    var src = el.getAttribute('data-bg');
    var img = new Image();
    img.onload = function () {
      el.style.backgroundImage = 'url(' + src + ')';
      var placeholderText = el.querySelector('.hero-image-placeholder-text');
      if (placeholderText) placeholderText.style.display = 'none';
    };
    img.onerror = function () {
      /* Keep the placeholder background if the image is not yet uploaded */
    };
    img.src = src;
  });

});
