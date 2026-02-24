/* ============================================
   Gallery lightbox for stills page
   ============================================ */
(function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightboxImage');
  const btnClose = lightbox.querySelector('.lightbox__close');
  const btnPrev = lightbox.querySelector('.lightbox__prev');
  const btnNext = lightbox.querySelector('.lightbox__next');

  const images = Array.from(document.querySelectorAll('.stills-grid__item img'));
  let currentIndex = 0;

  function open(index) {
    currentIndex = index;
    show(currentIndex);
    lightbox.classList.add('lightbox--open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('lightbox--open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function show(index) {
    const img = images[index];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    // Preload adjacent
    if (images[index - 1]) new Image().src = images[index - 1].src;
    if (images[index + 1]) new Image().src = images[index + 1].src;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    show(currentIndex);
  }

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
    show(currentIndex);
  }

  // Click handlers
  images.forEach(function (img, i) {
    img.addEventListener('click', function () { open(i); });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  // Click outside image closes
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox__image-wrapper')) {
      close();
    }
  });

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('lightbox--open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();
