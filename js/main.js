/* ============================================
   PEDRO PUCHEU PORTFOLIO - MAIN JS
   Ollie Studio Design - GSAP Integration
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  initNavigation();

  // Image Loading
  initImageLoading();

  // Lightbox
  initLightbox();

  // Live Time
  initLiveTime();

  // Showreel Video
  initShowreel();
});

/* === NAVIGATION === */
function initNavigation() {
  const nav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  // Mobile toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Scroll behavior for nav background (fallback if GSAP not loaded)
  if (nav && typeof gsap === 'undefined') {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }
}

/* === IMAGE LOADING ANIMATION === */
function initImageLoading() {
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
      img.addEventListener('error', () => {
        img.classList.add('loaded');
      });
    }
  });
}

/* === LIGHTBOX === */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!lightbox || !lightboxImage) return;

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        // Get high-res version
        let src = img.src;
        // If using Unsplash, get larger size
        if (src.includes('unsplash.com')) {
          src = src.replace(/w=\d+/, 'w=1600').replace(/h=\d+/, 'h=1600');
        }
        lightboxImage.src = src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* === LIVE TIME === */
function initLiveTime() {
  const timeEl = document.getElementById('currentTime');
  if (!timeEl) return;

  function updateTime() {
    const now = new Date();
    const options = {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    timeEl.textContent = now.toLocaleTimeString('en-GB', options);
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* === SHOWREEL VIDEO PLAYER === */
function initShowreel() {
  const container = document.getElementById('showreelContainer');
  const video = document.getElementById('showreelVideo');
  const overlay = document.getElementById('showreelPlayOverlay');

  if (!container || !video) return;

  // Click on overlay to start video
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      e.stopPropagation();
      video.play();
      container.classList.add('playing');
    });
  }

  // Track video state changes
  video.addEventListener('play', () => {
    container.classList.add('playing');
  });

  video.addEventListener('pause', () => {
    container.classList.remove('playing');
  });

  video.addEventListener('ended', () => {
    container.classList.remove('playing');
  });

  // Pause on scroll out of view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(container);
}

/* === SMOOTH SCROLL FOR ANCHOR LINKS === */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();

      // Use GSAP if available, otherwise native smooth scroll
      if (typeof gsap !== 'undefined' && gsap.plugins && gsap.plugins.scrollTo) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 80 },
          ease: 'power3.inOut',
        });
      } else {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  });
});

/* === FORM VALIDATION FEEDBACK === */
const forms = document.querySelectorAll('form');
forms.forEach((form) => {
  const inputs = form.querySelectorAll('input, textarea');

  inputs.forEach((input) => {
    // Add focus styling
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
      if (input.value) {
        input.classList.add('has-value');
      } else {
        input.classList.remove('has-value');
      }
    });
  });
});

/* === VIDEO PLACEHOLDERS - PLAY ON CLICK === */
document.querySelectorAll('.video-placeholder').forEach((placeholder) => {
  placeholder.addEventListener('click', () => {
    // This is a placeholder for video playback functionality
    // In production, this would open a video modal or navigate to video page
    console.log('Video placeholder clicked - implement video playback');
  });
});

/* === PREFERS REDUCED MOTION === */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable GSAP animations if user prefers reduced motion
  if (typeof gsap !== 'undefined') {
    gsap.globalTimeline.pause();
  }

  // Remove animation classes
  document.querySelectorAll('.fade-in').forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}
