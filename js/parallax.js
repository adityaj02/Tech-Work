/* ============================================
   PARALLAX.JS — GSAP Scrollytelling & Lenis
   ============================================ */

const Parallax = (() => {
  let lenis;

  function init() {
    initLenis();
    initGSAPVideoScrub();
    initGenericParallax();
  }

  function initLenis() {
    // Initialize Lenis for buttery smooth scrolling
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard Apple-like ease
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // RequestAnimationFrame loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  function initGSAPVideoScrub() {
    const heroVideo = document.getElementById('hero-video');
    const heroSection = document.getElementById('hero');

    if (!heroVideo || !heroSection) return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Sync GSAP with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0, 0);

    // Wait for video metadata to get correct duration
    if (heroVideo.readyState >= 1) {
      setupScrubAnimation(heroVideo, heroSection);
    } else {
      heroVideo.addEventListener('loadedmetadata', () => {
        setupScrubAnimation(heroVideo, heroSection);
      }, { once: true });
    }
  }

  function setupScrubAnimation(video, section) {
    // Pause the video — GSAP ScrollTrigger controls it
    video.pause();

    // The user's industry-standard cinematic scrub config
    // Mobile optimization: Less scroll distance on mobile
    const isMobile = window.innerWidth <= 768;
    const scrollEnd = isMobile ? "+=3500" : "+=5000";

    // Create the video scrub timeline
    gsap.to(video, {
      currentTime: video.duration,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: scrollEnd,
        scrub: 1.2, // 1.2 is the recommended sweet spot for 8s videos
        // We already have native position: sticky on .hero__sticky in CSS, 
        // so we don't need GSAP to pin it, but it will map perfectly to the 5000px height.
      }
    });

    // Fade out text content early (e.g., in the first 25% of the scroll)
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
      gsap.to(heroContent, {
        opacity: 0,
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1500", // Fades out in the first 1500px
          scrub: true
        }
      });
    }
  }

  function initGenericParallax() {
    // Other generic parallax elements on the page (if any exist later)
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      
      gsap.to(el, {
        y: (i, target) => -window.innerHeight * speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }

  return { init };
})();
