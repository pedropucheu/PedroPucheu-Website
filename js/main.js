/* Main initialisation for Pedro Pucheu portfolio */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initLoader();
  initIntroHighlight();
  initScrollAnimations();
});

function initNav() {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');

  if (!nav || !toggle || !drawer) return;

  const links = drawer.querySelectorAll('a');

  const closeDrawer = () => {
    drawer.classList.remove('nav__drawer--open');
    toggle.classList.remove('nav__toggle--open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openDrawer = () => {
    drawer.classList.add('nav__drawer--open');
    toggle.classList.add('nav__toggle--open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDrawer();
    }
  });

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY || window.pageYOffset;
    if (current > 40) {
      nav.classList.add('nav--solid');
    } else {
      nav.classList.remove('nav--solid');
    }

    if (current > lastScroll && current > 120) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = '';
    }
    lastScroll = current;
  });
}

function initLoader() {
  const overlay = document.getElementById('loaderOverlay');
  const wordsContainer = document.getElementById('loaderWords');

  if (!overlay || !wordsContainer) return;

  if (sessionStorage.getItem('loaderShown') === 'true') {
    overlay.style.display = 'none';
    return;
  }

  if (typeof gsap === 'undefined') {
    overlay.style.display = 'none';
    return;
  }

  const words = ['VIDEO', 'FILM', 'DOCUMENTARY', 'COMMERCIALS', 'STORYTELLING', 'PEDRO PUCHEU'];

  wordsContainer.innerHTML = '';
  const wordSpans = words.map((word) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'block';
    span.style.fontFamily = "var(--font-display)";
    span.style.fontSize = 'clamp(3rem, 8vw, 6rem)';
    span.style.letterSpacing = 'var(--tracking-tight)';
    span.style.textTransform = 'uppercase';
    wordsContainer.appendChild(span);
    return span;
  });

  const tl = gsap.timeline({
    onComplete: () => {
      sessionStorage.setItem('loaderShown', 'true');
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        onComplete: () => {
          overlay.style.display = 'none';
        },
      });
    },
  });

  wordSpans.forEach((span, index) => {
    const baseDuration = 0.8;
    const isLast = index === wordSpans.length - 1;
    tl.fromTo(
      span,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: baseDuration,
        ease: 'power3.out',
      }
    );
    tl.to(span, {
      opacity: isLast ? 1 : 0,
      y: isLast ? 0 : -20,
      scale: isLast ? 1.05 : 1,
      duration: isLast ? 1.5 : 0.6,
      ease: isLast ? 'power3.out' : 'power3.in',
    });
  });
}

function initIntroHighlight() {
  const intro = document.getElementById('introText');
  const aboutCta = document.getElementById('aboutCta');

  if (!intro || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  const text = intro.textContent || '';
  const words = text.split(' ').filter(Boolean);
  intro.textContent = '';

  const spans = words.map((word, index) => {
    const span = document.createElement('span');
    span.textContent = word + (index < words.length - 1 ? ' ' : '');
    span.style.color = 'var(--text-muted)';
    intro.appendChild(span);
    return span;
  });

  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: intro,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
    },
  });

  tl.to(spans, {
    color: 'var(--text-primary)',
    stagger: {
      each: 0.05,
    },
  });

  if (aboutCta) {
    gsap.set(aboutCta, { opacity: 0, y: 16 });
    tl.to(
      aboutCta,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
      },
      '-=0.2'
    );
  }
}

function initScrollAnimations() {
  const animated = document.querySelectorAll('[data-animate]');
  if (!animated.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  animated.forEach((el) => observer.observe(el));
}

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

/* === SHOWREEL MODAL === */
(function () {
  const playBtn = document.getElementById('playReelButton');
  if (!playBtn) return;

  // Create modal overlay
  const modal = document.createElement('div');
  modal.id = 'showreelModal';
  modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.92);align-items:center;justify-content:center;cursor:pointer;';
  modal.innerHTML = '<div style="position:relative;width:90%;max-width:960px;" onclick="event.stopPropagation()"><video id="showreelModalVideo" src="assets/video/showreel.mp4" controls playsinline style="width:100%;border-radius:4px;"></video><button style="position:absolute;top:-40px;right:0;background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer" aria-label="Close">✕</button></div>';
  document.body.appendChild(modal);

  const video = modal.querySelector('video');
  const closeBtn = modal.querySelector('button');

  function openModal() {
    modal.style.display = 'flex';
    video.currentTime = 0;
    video.play();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.style.display = 'none';
    video.pause();
    document.body.style.overflow = '';
  }

  playBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
  });
})();

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
