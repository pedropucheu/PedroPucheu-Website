/* ============================================
   PEDRO PUCHEU PORTFOLIO - MAIN JS
   Jorge Style - Minimalist, Professional
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Page Loader - Luca Style Animation
  initPageLoader();

  // Navigation
  initNavigation();

  // Scroll Animations
  initScrollAnimations();

  // Image Loading
  initImageLoading();

  // Gallery Filter
  initGalleryFilter();

  // Lightbox
  initLightbox();

  // Team Carousel
  initTeamCarousel();

  // Live Time
  initLiveTime();

  // Showreel Video
  initShowreel();
});

/* Page Loader - Luca Style Image Expansion */
function initPageLoader() {
  const pageLoader = document.getElementById('pageLoader');
  if (!pageLoader) return;

  const hasImageLoader = pageLoader.querySelector('.loader-image-container');

  if (hasImageLoader) {
    // Add loading class to body
    document.body.classList.add('loading-active');

    // Luca-style image expansion animation
    const loaderImage = pageLoader.querySelector('.loader-image');

    // Wait for image to load
    if (loaderImage.complete) {
      startLoaderAnimation();
    } else {
      loaderImage.addEventListener('load', startLoaderAnimation);
    }

    function startLoaderAnimation() {
      // Start expansion after brief delay
      setTimeout(() => {
        pageLoader.classList.add('expanding');
      }, 300);

      // Hide loader on scroll, click, or timeout
      let loaderDismissed = false;

      function dismissLoader() {
        if (loaderDismissed) return;
        loaderDismissed = true;
        pageLoader.classList.add('hidden');
        document.body.style.overflow = '';
        document.body.classList.remove('loading-active');
        document.body.classList.add('loading-complete');
      }

      // Prevent scroll while loader is visible
      document.body.style.overflow = 'hidden';

      // Auto-dismiss after animation completes
      setTimeout(() => {
        // Add click/scroll listeners after expansion
        pageLoader.addEventListener('click', dismissLoader, { once: true });
        window.addEventListener('wheel', dismissLoader, { once: true });
        window.addEventListener('touchstart', dismissLoader, { once: true });

        // Auto-dismiss after 3.5 seconds total
        setTimeout(dismissLoader, 2000);
      }, 1500);
    }
  } else {
    // Simple text loader fallback
    setTimeout(() => {
      pageLoader.classList.add('hidden');
    }, 800);
  }
}

/* Navigation */
function initNavigation() {
  const nav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  // Scroll behavior
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Mobile toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }
}

/* Scroll Animations - Jorge Style */
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => observer.observe(el));
}

/* Image Loading Animation */
function initImageLoading() {
  const images = document.querySelectorAll('img');

  images.forEach((img) => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
      // Handle error case - still show image if load fails
      img.addEventListener('error', () => {
        img.classList.add('loaded');
      });
    }
  });
}

/* Gallery Filter */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      galleryItems.forEach((item) => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* Lightbox */
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
        lightboxImage.src = img.src;
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

/* Team Carousel */
function initTeamCarousel() {
  const carousel = document.getElementById('teamCarousel');
  const prevBtn = document.getElementById('teamPrev');
  const nextBtn = document.getElementById('teamNext');

  if (!carousel || !prevBtn || !nextBtn) return;

  const scrollAmount = 300;

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  });

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  });
}

/* Live Time */
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

/* Showreel Video Player */
function initShowreel() {
  const container = document.getElementById('showreelContainer');
  const video = document.getElementById('showreelVideo');

  if (!container || !video) return;

  container.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      container.classList.add('playing');
    } else {
      video.pause();
      container.classList.remove('playing');
    }
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
          container.classList.remove('playing');
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(container);
}

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  });
});
