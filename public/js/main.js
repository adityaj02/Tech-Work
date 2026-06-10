/* ============================================
   MAIN.JS — Entry Point, Initializes All Modules
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  Navbar.init();
  ScrollAnimations.init();
  Counters.init();
  Carousel.init();
  Parallax.init();

  // Custom cursor glow effect (subtle)
  initCursorGlow();

  // Loading screen
  revealPage();
});

/**
 * Subtle cursor glow that follows the mouse.
 * Creates a radial gradient effect on the body.
 */
function initCursorGlow() {
  const glowEl = document.createElement('div');
  glowEl.id = 'cursor-glow';
  glowEl.style.cssText = `
    position: fixed;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(glowEl);

  let mouseTimer;
  document.addEventListener('mousemove', (e) => {
    glowEl.style.left = e.clientX + 'px';
    glowEl.style.top = e.clientY + 'px';
    glowEl.style.opacity = '1';

    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
      glowEl.style.opacity = '0';
    }, 2000);
  });
}

/**
 * Simple page reveal — removes loading state.
 */
function revealPage() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    // Wait a brief moment for fonts/content to settle
    setTimeout(() => {
      loader.classList.add('loaded');
      // Remove from DOM after animation
      setTimeout(() => {
        loader.remove();
      }, 600);
    }, 300);
  }

  document.body.classList.add('page-ready');
}
