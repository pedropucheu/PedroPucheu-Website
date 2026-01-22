/* ============================================
   GSAP SCROLLTRIGGER ANIMATIONS
   Pedro Pucheu Website - Ollie Studio Style
   ============================================ */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initTextReveal();
  initAboutTextReveal();
  initRotatingBox();
  initFadeAnimations();
  initStaggerAnimations();
  initParallax();
  initNavScrollBehavior();
  initWorkItemAnimations();
});

/* === TEXT REVEAL ANIMATION (Ollie Style - Gray to Black) === */
function initTextReveal() {
  const textRevealElements = document.querySelectorAll('.text-reveal');

  textRevealElements.forEach((el) => {
    // Split text into characters
    const text = el.textContent;
    el.innerHTML = '';

    // Create spans for each character
    text.split('').forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      el.appendChild(span);
    });

    const chars = el.querySelectorAll('.char');

    // Animate characters on scroll
    ScrollTrigger.create({
      trigger: el.closest('section'),
      start: 'top 80%',
      end: 'bottom 20%',
      onUpdate: (self) => {
        const progress = self.progress;
        const revealCount = Math.floor(progress * chars.length);

        chars.forEach((char, i) => {
          if (i < revealCount) {
            char.classList.add('revealed');
          } else {
            char.classList.remove('revealed');
          }
        });
      },
    });
  });
}

/* === ABOUT TEXT WITH INLINE IMAGES REVEAL === */
function initAboutTextReveal() {
  const aboutTextElements = document.querySelectorAll('.about-text-reveal');

  aboutTextElements.forEach((el) => {
    // Get all child nodes (text and elements)
    const childNodes = Array.from(el.childNodes);
    el.innerHTML = '';

    childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        // Split text into characters
        const text = node.textContent;
        text.split('').forEach((char) => {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = char === ' ' ? '\u00A0' : char;
          el.appendChild(span);
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Keep inline images as-is
        el.appendChild(node.cloneNode(true));
      }
    });

    const chars = el.querySelectorAll('.char');

    // Animate characters on scroll
    ScrollTrigger.create({
      trigger: el.closest('section'),
      start: 'top 70%',
      end: 'bottom 30%',
      onUpdate: (self) => {
        const progress = self.progress;
        const revealCount = Math.floor(progress * chars.length);

        chars.forEach((char, i) => {
          if (i < revealCount) {
            char.classList.add('revealed');
          } else {
            char.classList.remove('revealed');
          }
        });
      },
    });
  });
}

/* === ROTATING BOX ANIMATION === */
function initRotatingBox() {
  const rotatingBoxes = document.querySelectorAll('.rotating-box');

  rotatingBoxes.forEach((box) => {
    gsap.fromTo(
      box,
      {
        rotateY: -90,
        scale: 0.8,
        opacity: 0,
      },
      {
        rotateY: 0,
        scale: 1,
        opacity: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: box.closest('section'),
          start: 'top 60%',
          end: 'center center',
          scrub: 1,
        },
      }
    );
  });
}

/* === FADE-IN ANIMATIONS === */
function initFadeAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');

  fadeElements.forEach((el) => {
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

/* === STAGGERED GRID ANIMATIONS === */
function initStaggerAnimations() {
  const grids = document.querySelectorAll('.grid-stagger');

  grids.forEach((grid) => {
    const items = grid.querySelectorAll('.grid-item');

    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Project cards stagger
  const projectGrids = document.querySelectorAll('.projects-grid');

  projectGrids.forEach((grid) => {
    const cards = grid.querySelectorAll('.project-card, .project-card-visible');

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Gallery items stagger
  const galleryGrids = document.querySelectorAll('.gallery-grid');

  galleryGrids.forEach((grid) => {
    const items = grid.querySelectorAll('.gallery-item');

    gsap.fromTo(
      items,
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Service cards stagger
  const serviceGrids = document.querySelectorAll('.services-grid');

  serviceGrids.forEach((grid) => {
    const cards = grid.querySelectorAll('.service-card, .service-item');

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

/* === WORK ITEM ANIMATIONS (Ollie Style Large Cards) === */
function initWorkItemAnimations() {
  const workItems = document.querySelectorAll('.work-item');

  workItems.forEach((item, index) => {
    const image = item.querySelector('.work-item-image');
    const info = item.querySelector('.work-item-info');

    // Determine direction based on alignment
    const isLeft = item.classList.contains('align-left');
    const isRight = item.classList.contains('align-right');
    const xOffset = isLeft ? -50 : isRight ? 50 : 0;

    gsap.fromTo(
      image,
      {
        opacity: 0,
        x: xOffset,
        scale: 0.95,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      info,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

/* === PARALLAX EFFECTS === */
function initParallax() {
  const parallaxBg = document.querySelector('.parallax-bg');

  if (parallaxBg) {
    gsap.to(parallaxBg, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.section-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Hero content fade out on scroll
  const heroContent = document.querySelector('.hero-content');

  if (heroContent) {
    gsap.to(heroContent, {
      opacity: 0,
      y: -30,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: '.section-hero',
        start: 'top top',
        end: '40% top',
        scrub: true,
      },
    });
  }

  // Scroll indicator fade
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (scrollIndicator) {
    gsap.to(scrollIndicator, {
      opacity: 0,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: '.section-hero',
        start: '5% top',
        end: '20% top',
        scrub: true,
      },
    });
  }
}

/* === NAVIGATION SCROLL BEHAVIOR === */
function initNavScrollBehavior() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScroll = 0;

  ScrollTrigger.create({
    start: 'top -100',
    onUpdate: (self) => {
      const currentScroll = window.scrollY;

      if (currentScroll < lastScroll) {
        // Scrolling up
        nav.classList.remove('nav-hidden');
      } else {
        // Scrolling down
        if (currentScroll > 200) {
          nav.classList.add('nav-hidden');
        }
      }

      lastScroll = currentScroll;
    },
  });

  // Add scrolled class on scroll
  ScrollTrigger.create({
    start: 'top -50',
    onEnter: () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled'),
  });
}

/* === HEADLINE REVEAL ANIMATION === */
function initHeadlineReveal() {
  const headlines = document.querySelectorAll('.reveal-headline');

  headlines.forEach((headline) => {
    // Split text into words
    const text = headline.textContent;
    headline.innerHTML = '';

    text.split(' ').forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.style.display = 'inline-block';
      span.style.overflow = 'hidden';

      const inner = document.createElement('span');
      inner.className = 'word-inner';
      inner.style.display = 'inline-block';
      inner.textContent = word + ' ';

      span.appendChild(inner);
      headline.appendChild(span);
    });

    const words = headline.querySelectorAll('.word-inner');

    gsap.fromTo(
      words,
      {
        y: '100%',
      },
      {
        y: '0%',
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headline,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

/* === VIDEO AUTOPLAY ON SCROLL === */
function initVideoAutoplay() {
  const videos = document.querySelectorAll('video[data-autoplay]');

  videos.forEach((video) => {
    ScrollTrigger.create({
      trigger: video,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => video.play(),
      onLeave: () => video.pause(),
      onEnterBack: () => video.play(),
      onLeaveBack: () => video.pause(),
    });
  });
}

/* === REFRESH SCROLLTRIGGER ON RESIZE === */
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});

/* === CLEANUP ON PAGE UNLOAD === */
window.addEventListener('beforeunload', () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
