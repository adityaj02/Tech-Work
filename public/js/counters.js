/* ============================================
   COUNTERS.JS — Animated Stat Counters
   ============================================ */

const Counters = (() => {
  let observer = null;

  function init() {
    const counterElements = document.querySelectorAll('[data-counter]');
    if (!counterElements.length) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    counterElements.forEach((el) => observer.observe(el));
  }

  /**
   * Animate a counter element from 0 to its target value.
   * Uses requestAnimationFrame for smooth animation.
   *
   * @param {HTMLElement} el - Element with data-counter attribute
   *   data-counter: target number
   *   data-counter-suffix: suffix text (e.g., "+", "%", "K+")
   *   data-counter-prefix: prefix text (e.g., "$")
   *   data-counter-duration: animation duration in ms (default 2000)
   */
  function animateCounter(el) {
    const target = parseInt(el.dataset.counter, 10);
    const suffix = el.dataset.counterSuffix || '';
    const prefix = el.dataset.counterPrefix || '';
    const duration = parseInt(el.dataset.counterDuration, 10) || 2000;

    if (isNaN(target)) return;

    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.round(startValue + (target - startValue) * easedProgress);

      el.textContent = prefix + formatNumber(currentValue) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + formatNumber(target) + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  /**
   * Format number with commas for thousands.
   */
  function formatNumber(num) {
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  }

  return { init };
})();
