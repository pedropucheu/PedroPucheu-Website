/**
 * Pedro Pucheu Portfolio - Main JavaScript
 * Modern, cinematic portfolio interactions
 */

// ============================================
// DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  initPageLoader();
  initNavigation();
  initScrollAnimations();
  initLightbox();
  initGalleryFilter();
  initProjectFilter();
  initSmoothScroll();
  initVideoPlayers();
  initContactForm();
});

// ============================================
// Page Loader
// ============================================
function initPageLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  window.addEventListener('load', function() {
    setTimeout(function() {
      loader.classList.add('hidden');
      // Trigger initial animations after loader hides
      triggerVisibleAnimations();
    }, 500);
  });

  // Fallback: hide loader after 3 seconds max
  setTimeout(function() {
    loader.classList.add('hidden');
  }, 3000);
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
  const nav = document.getElementById('mainNav');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  // Scroll behavior for navigation
  if (nav) {
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      // Add scrolled class when past hero
      if (currentScroll > 100) {
        nav.classList.add('scrolled');
      } else {
        // Only remove if not on a page that starts with scrolled nav
        if (!nav.classList.contains('scrolled') || currentScroll === 0) {
          nav.classList.remove('scrolled');
        }
      }

      lastScroll = currentScroll;
    });
  }

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');

      // Animate hamburger to X
      const spans = navToggle.querySelectorAll('span');
      if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }
}

// ============================================
// Scroll Animations (Fade In)
// ============================================
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length === 0) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  fadeElements.forEach(function(element) {
    observer.observe(element);
  });
}

function triggerVisibleAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(function(element) {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      element.classList.add('visible');
    }
  });
}

// ============================================
// Lightbox
// ============================================
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!lightbox || galleryItems.length === 0) return;

  galleryItems.forEach(function(item) {
    item.addEventListener('click', function() {
      const img = item.querySelector('img');
      if (img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImage.src = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// ============================================
// Gallery Filter (Stills Page)
// ============================================
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.gallery-category-btn');
  const galleryGrid = document.getElementById('galleryGrid');

  if (filterButtons.length === 0 || !galleryGrid) return;

  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const filter = this.dataset.filter;

      // Update active button
      filterButtons.forEach(function(btn) {
        btn.classList.remove('active');
      });
      this.classList.add('active');

      // Filter items
      const items = galleryGrid.querySelectorAll('.gallery-item');
      items.forEach(function(item) {
        const category = item.dataset.category;

        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(function() {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(function() {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ============================================
// Project Filter (Motion Page)
// ============================================
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectsGrid = document.getElementById('projectsGrid');

  if (filterButtons.length === 0 || !projectsGrid) return;

  // Check if we're on a page with gallery filter (stills page)
  if (document.getElementById('galleryGrid')) return;

  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const filter = this.dataset.filter;

      // Update active button
      filterButtons.forEach(function(btn) {
        btn.classList.remove('active');
      });
      this.classList.add('active');

      // Filter projects
      const projects = projectsGrid.querySelectorAll('.project-card');
      projects.forEach(function(project) {
        const category = project.dataset.category;

        if (filter === 'all' || category === filter) {
          project.style.display = 'block';
          setTimeout(function() {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
          }, 50);
        } else {
          project.style.opacity = '0';
          project.style.transform = 'translateY(20px)';
          setTimeout(function() {
            project.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  scrollLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// Video Players
// ============================================
function initVideoPlayers() {
  const playButtons = document.querySelectorAll('.btn-play[data-video]');

  playButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      const videoId = this.dataset.video;
      const section = document.getElementById(videoId + '-section');

      if (section) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Project card click handler
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
      // If clicking on play button, let the play button handler manage it
      if (e.target.closest('.btn-play')) return;

      const playButton = this.querySelector('.btn-play[data-video]');
      if (playButton) {
        playButton.click();
      }
    });
  });
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
  const form = document.getElementById('contactForm');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    // Basic validation
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    let valid = true;

    if (!name.value.trim()) {
      highlightError(name);
      valid = false;
    } else {
      removeError(name);
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
      highlightError(email);
      valid = false;
    } else {
      removeError(email);
    }

    if (!message.value.trim()) {
      highlightError(message);
      valid = false;
    } else {
      removeError(message);
    }

    if (!valid) {
      e.preventDefault();
    }
  });

  function highlightError(input) {
    input.style.borderColor = 'var(--color-accent)';
    input.style.animation = 'shake 0.5s ease';
    setTimeout(function() {
      input.style.animation = '';
    }, 500);
  }

  function removeError(input) {
    input.style.borderColor = '';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function() {
        inThrottle = false;
      }, limit);
    }
  };
}

// Add CSS for shake animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

// ============================================
// Parallax Effect (Optional - for hero)
// ============================================
function initParallax() {
  const hero = document.querySelector('.hero');
  const heroVideo = document.querySelector('.hero-video');

  if (!hero || !heroVideo) return;

  window.addEventListener('scroll', throttle(function() {
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
      const translateY = scrolled * 0.5;
      heroVideo.style.transform = `translateY(${translateY}px)`;
    }
  }, 16));
}

// Initialize parallax
initParallax();

// ============================================
// Lazy Loading Images
// ============================================
function initLazyLoad() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    return;
  }

  // Fallback for browsers that don't support native lazy loading
  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(function(img) {
    imageObserver.observe(img);
  });
}

// Initialize lazy loading
initLazyLoad();

// ============================================
// Video Modal for Projects
// ============================================
function createVideoModal() {
  // Create modal elements
  const modal = document.createElement('div');
  modal.className = 'video-modal';
  modal.id = 'videoModal';
  modal.innerHTML = `
    <div class="video-modal-content">
      <button class="video-modal-close">&times;</button>
      <div class="video-modal-container">
        <iframe id="modalVideo" src="" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  `;

  // Add styles
  const modalStyles = document.createElement('style');
  modalStyles.textContent = `
    .video-modal {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.95);
      z-index: 3000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    .video-modal.active {
      opacity: 1;
      visibility: visible;
    }
    .video-modal-content {
      width: 90%;
      max-width: 1200px;
      position: relative;
    }
    .video-modal-close {
      position: absolute;
      top: -50px;
      right: 0;
      width: 40px;
      height: 40px;
      background: none;
      border: none;
      color: white;
      font-size: 2rem;
      cursor: pointer;
      transition: color 0.3s ease;
    }
    .video-modal-close:hover {
      color: var(--color-accent);
    }
    .video-modal-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
    }
    .video-modal-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `;

  document.head.appendChild(modalStyles);
  document.body.appendChild(modal);

  // Close functionality
  const closeBtn = modal.querySelector('.video-modal-close');
  closeBtn.addEventListener('click', closeVideoModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeVideoModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeVideoModal();
  });
}

function openVideoModal(videoUrl) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('modalVideo');

  if (!modal || !iframe) return;

  iframe.src = videoUrl;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('modalVideo');

  if (!modal || !iframe) return;

  modal.classList.remove('active');
  iframe.src = '';
  document.body.style.overflow = '';
}

// Create video modal on load
createVideoModal();

// ============================================
// Cursor Effect (Optional - for desktop)
// ============================================
function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch devices

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';

  const cursorStyles = document.createElement('style');
  cursorStyles.textContent = `
    .custom-cursor {
      width: 20px;
      height: 20px;
      border: 2px solid var(--color-accent);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.15s ease, opacity 0.15s ease;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
    .custom-cursor.visible {
      opacity: 1;
    }
    .custom-cursor.hover {
      transform: translate(-50%, -50%) scale(1.5);
      background: rgba(229, 9, 20, 0.1);
    }
    a, button, .project-card, .gallery-item {
      cursor: none;
    }
  `;

  document.head.appendChild(cursorStyles);
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.classList.add('visible');
  });

  document.addEventListener('mouseleave', function() {
    cursor.classList.remove('visible');
  });

  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .project-card, .gallery-item');
  hoverElements.forEach(function(el) {
    el.addEventListener('mouseenter', function() {
      cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', function() {
      cursor.classList.remove('hover');
    });
  });
}

// Uncomment to enable custom cursor:
// initCustomCursor();

console.log('Pedro Pucheu Portfolio - Loaded Successfully');
