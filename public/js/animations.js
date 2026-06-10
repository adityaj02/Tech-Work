/* ============================================
   ANIMATIONS.JS — IntersectionObserver Reveals
   ============================================ */

const ScrollAnimations = (() => {
  let observer = null;
  let staggerObserver = null;
  let wordObserver = null;

  function init() {
    setupRevealObserver();
    setupStaggerObserver();
    setupWordRevealObserver();
    setupTimelineObserver();
  }

  /**
   * Standard reveal animation — elements with class "reveal"
   * get "revealed" class when they enter the viewport.
   */
  function setupRevealObserver() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  /**
   * Stagger children — parent with "reveal--stagger" has children
   * that animate in sequence.
   */
  function setupStaggerObserver() {
    const staggerParents = document.querySelectorAll('.reveal--stagger');
    if (!staggerParents.length) return;

    staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.stagger-child');
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('revealed');
              }, index * 120);
            });
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    staggerParents.forEach((el) => staggerObserver.observe(el));
  }

  /**
   * Word-by-word text reveal for elements with class "text-reveal".
   * Each word is wrapped in a span and animated in sequence.
   */
  function setupWordRevealObserver() {
    const textRevealElements = document.querySelectorAll('.text-reveal');
    if (!textRevealElements.length) return;

    // Wrap each word in a span
    textRevealElements.forEach((el) => {
      const text = el.textContent;
      const words = text.split(' ');
      el.innerHTML = words
        .map(
          (word, i) =>
            `<span class="text-reveal__word" style="transition-delay: ${i * 60}ms">${word}</span>`
        )
        .join(' ');
    });

    wordObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const words = entry.target.querySelectorAll('.text-reveal__word');
            words.forEach((word) => {
              word.classList.add('revealed');
            });
            wordObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    textRevealElements.forEach((el) => wordObserver.observe(el));
  }

  /**
   * Timeline progress line — activates when the how-it-works
   * section enters viewport.
   */
  function setupTimelineObserver() {
    const timeline = document.querySelector('.how-it-works__timeline');
    const progressLine = document.querySelector('.how-it-works__line-progress');
    if (!timeline || !progressLine) return;

    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            progressLine.classList.add('active');
            timelineObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    timelineObserver.observe(timeline);
  }

  return { init };
})();
