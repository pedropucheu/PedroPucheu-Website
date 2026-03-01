/* Main initialisation for Pedro Pucheu portfolio */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initLoader();
  initIntroHighlight();
  initScrollAnimations();
  initImageLoading();
  initLightbox();
  initLiveTime();
  initShowreelModal();
});

/* === NAVIGATION === */
function initNav() {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');

  if (!nav) return;

  // Mobile drawer
  if (toggle && drawer) {
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
      expanded ? closeDrawer() : openDrawer();
    });

    links.forEach((link) => link.addEventListener('click', closeDrawer));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });
  }

  // Scroll: solid bg + hide on scroll down
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

/* === LOADER (index page only) === */
function initLoader() {
  const overlay = document.getElementById('loaderOverlay');
  const wordsContainer = document.getElementById('loaderWords');

  if (!overlay || !wordsContainer) return;

  // Skip if already shown this session
  if (sessionStorage.getItem('loaderShown') === 'true') {
    overlay.style.display = 'none';
    return;
  }

  // Need GSAP for the loader animation
  if (typeof gsap === 'undefined') {
    overlay.style.display = 'none';
    return;
  }

  const words = ['VIDEO', 'FILM', 'DOCUMENTARY', 'COMMERCIALS', 'STORYTELLING', 'PEDRO PUCHEU'];

  wordsContainer.innerHTML = '';
  const wordSpans = words.map((word) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.cssText = "display:block; font-family:var(--font-display); font-size:clamp(3rem,8vw,6rem); letter-spacing:var(--tracking-tight); text-transform:uppercase; opacity:0;";
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
        onComplete: () => { overlay.style.display = 'none'; },
      });
    },
  });

  wordSpans.forEach((span, index) => {
    const isLast = index === wordSpans.length - 1;
    tl.fromTo(span, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    if (!isLast) {
      tl.to(span, { opacity: 0, y: -20, duration: 0.3, ease: 'power3.in' });
    } else {
      tl.to(span, { scale: 1.05, duration: 0.8, ease: 'power3.out' });
    }
  });
}

/* === INTRO TEXT HIGHLIGHT ON SCROLL === */
function initIntroHighlight() {
  const intro = document.getElementById('introText');
  const aboutCta = document.getElementById('aboutCta');

  if (!intro || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

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

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: intro,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
    },
  });

  tl.to(spans, { color: 'var(--text-primary)', stagger: { each: 0.05 } });

  if (aboutCta) {
    // Remove data-animate so IntersectionObserver doesn't fight GSAP
    aboutCta.removeAttribute('data-animate');
    gsap.set(aboutCta, { opacity: 0, y: 16 });
    tl.to(aboutCta, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.2');
  }
}

/* === SCROLL-TRIGGERED FADE-IN ANIMATIONS === */
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
    { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
  );

  animated.forEach((el) => observer.observe(el));

  // Immediately reveal elements already in viewport (e.g. hero content)
  requestAnimationFrame(() => {
    animated.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-visible');
        observer.unobserve(el);
      }
    });
  });
}

/* === IMAGE LOADING === */
function initImageLoading() {
  document.querySelectorAll('img').forEach((img) => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
      img.addEventListener('error', () => img.classList.add('loaded'));
    }
  });
}

/* === LIGHTBOX (stills page) === */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const prevBtn = document.querySelector('.lightbox__prev');
  const nextBtn = document.querySelector('.lightbox__next');
  const galleryItems = document.querySelectorAll('.stills-grid__item, .gallery-item');

  if (!lightbox || !lightboxImage || !galleryItems.length) return;

  let currentIndex = 0;
  const images = Array.from(galleryItems);

  function openLightbox(index) {
    currentIndex = index;
    const img = images[index].querySelector('img');
    if (!img) return;
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add('lightbox--open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    const img = images[currentIndex].querySelector('img');
    if (img) {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
    }
  }

  images.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));

  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('lightbox--open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}

/* === LIVE TIME (about page) === */
function initLiveTime() {
  const timeEl = document.getElementById('currentTime');
  if (!timeEl) return;

  function updateTime() {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString('en-GB', {
      timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    });
  }
  updateTime();
  setInterval(updateTime, 1000);
}

/* === SHOWREEL MODAL === */
function initShowreelModal() {
  const playBtn = document.getElementById('playReelButton');
  if (!playBtn) return;

  const modal = document.createElement('div');
  modal.id = 'showreelModal';
  modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.92);align-items:center;justify-content:center;cursor:pointer;';
  modal.innerHTML = '<div style="position:relative;width:90%;max-width:960px;" onclick="event.stopPropagation()"><video id="showreelModalVideo" src="assets/video/showreel.mp4" controls playsinline style="width:100%;border-radius:4px;"></video><button style="position:absolute;top:-40px;right:0;background:none;border:none;color:#fff;font-size:1.5rem;cursor:pointer" aria-label="Close">\u2715</button></div>';
  document.body.appendChild(modal);

  const video = modal.querySelector('video');
  const closeBtn = modal.querySelector('button');

  function open() { modal.style.display = 'flex'; video.currentTime = 0; video.play(); document.body.style.overflow = 'hidden'; }
  function close() { modal.style.display = 'none'; video.pause(); document.body.style.overflow = ''; }

  playBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display === 'flex') close(); });
}

/* === SMOOTH SCROLL FOR ANCHOR LINKS === */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* === FORM VALIDATION FEEDBACK === */
document.querySelectorAll('form').forEach((form) => {
  form.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('focus', () => input.parentElement?.classList.add('focused'));
    input.addEventListener('blur', () => {
      input.parentElement?.classList.remove('focused');
      input.value ? input.classList.add('has-value') : input.classList.remove('has-value');
    });
  });
});

/* === PREFERS REDUCED MOTION === */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  if (typeof gsap !== 'undefined') gsap.globalTimeline.pause();
  document.querySelectorAll('[data-animate]').forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}

/* === BTS CAROUSEL (about page) === */
(function initBtsCarousel() {
  const track = document.getElementById('btsTrack');
  const prevBtn = document.querySelector('.bts-arrow--prev');
  const nextBtn = document.querySelector('.bts-arrow--next');
  if (!track || !prevBtn || !nextBtn) return;

  let index = 0;
  const items = track.querySelectorAll('.bts-carousel__item');
  const total = items.length;

  function getVisible() {
    return window.innerWidth >= 768 ? 3 : 1;
  }

  function update() {
    const visible = getVisible();
    const itemW = track.parentElement.offsetWidth / visible;
    const gap = 16; // 1rem
    const offset = index * (itemW + gap);
    track.style.transform = 'translateX(-' + offset + 'px)';
  }

  prevBtn.addEventListener('click', function() {
    index = Math.max(0, index - 1);
    update();
  });

  nextBtn.addEventListener('click', function() {
    const visible = getVisible();
    index = Math.min(total - visible, index + 1);
    update();
  });

  window.addEventListener('resize', update);
})();
