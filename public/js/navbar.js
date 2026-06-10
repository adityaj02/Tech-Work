/* ============================================
   NAVBAR.JS — Sticky Nav Show/Hide Logic
   ============================================ */

const Navbar = (() => {
  let navbar = null;
  let lastScrollY = 0;
  let scrollThreshold = 100;
  let ticking = false;
  let mobileMenu = null;
  let mobileOverlay = null;

  function init() {
    navbar = document.getElementById('navbar');
    mobileMenu = document.getElementById('mobile-menu');
    mobileOverlay = document.getElementById('mobile-overlay');

    if (!navbar) return;

    // Scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });

    // Mobile toggle
    const toggleBtn = document.getElementById('navbar-toggle');
    const closeBtn = document.getElementById('mobile-close');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', openMobileMenu);
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', closeMobileMenu);
    }
    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu on nav link click
    if (mobileMenu) {
      mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    const currentScrollY = window.scrollY;

    // Add/remove scrolled class
    if (currentScrollY > scrollThreshold) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }

    // Hide/show on scroll direction (only when past hero)
    if (currentScrollY > 600) {
      if (currentScrollY > lastScrollY + 5) {
        navbar.classList.add('navbar--hidden');
      } else if (currentScrollY < lastScrollY - 5) {
        navbar.classList.remove('navbar--hidden');
      }
    } else {
      navbar.classList.remove('navbar--hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  function openMobileMenu() {
    if (mobileMenu) mobileMenu.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  return { init };
})();
