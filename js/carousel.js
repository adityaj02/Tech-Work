/* ============================================
   CAROUSEL.JS — Testimonial Rotation
   ============================================ */

const Carousel = (() => {
  let slides = [];
  let dots = [];
  let currentIndex = 0;
  let intervalId = null;
  const INTERVAL_MS = 5000;

  function init() {
    slides = document.querySelectorAll('.testimonials__slide');
    dots = document.querySelectorAll('.carousel-dot');

    if (!slides.length) return;

    // Set first slide active
    showSlide(0);

    // Dot click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });

    // Auto-rotate
    startAutoPlay();

    // Pause on hover
    const carousel = document.querySelector('.testimonials__carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);
    }
  }

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  function goToSlide(index) {
    showSlide(index);
    // Reset auto-play timer
    stopAutoPlay();
    startAutoPlay();
  }

  function nextSlide() {
    const next = (currentIndex + 1) % slides.length;
    showSlide(next);
  }

  function startAutoPlay() {
    stopAutoPlay();
    intervalId = setInterval(nextSlide, INTERVAL_MS);
  }

  function stopAutoPlay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  return { init };
})();
