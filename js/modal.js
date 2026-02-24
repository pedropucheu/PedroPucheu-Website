/* Project modal */
(function () {
  const PROJECT_DATA = {
    'moving-voice': { title: 'Moving Voice', category: 'commercial', year: '2025', desc: 'A community-driven brand film for Moving Voice, a spoken word and movement collective based in London. Directed and produced end to end — capturing the raw energy of live performance and the voices behind the movement.' },
    'delphine': { title: 'Delphine', category: 'commercial', year: '2024', desc: 'A fashion and beauty campaign exploring themes of transformation and identity. Two pieces — "Conversion" and "Love" — shot with a cinematic, editorial sensibility.' },
    'homegrwn': { title: 'HomeGrwn', category: 'commercial', year: '2023', desc: 'Commercial content for HomeGrwn, a London-based food brand celebrating homegrown culture. Shot on location with a focus on warmth, community and authentic taste.' },
    'streetvox': { title: 'StreetVox', category: 'commercial', year: '2026', desc: 'An editorial short for StreetVox — capturing the pulse of London\'s street culture through candid interviews and observational filmmaking.' },
    'wedding-eve-james': { title: 'Eve & James Wedding', category: 'commercial', year: '2025', desc: 'A cinematic wedding film for Eve and James. Shot across a full day — from the quiet morning preparations to the last dance — with an emphasis on emotion and atmosphere.' },
    'able-physiotherapy': { title: 'Able Physiotherapy', category: 'commercial', year: '2025', desc: 'A 4K brand tour for Able Physiotherapy. Designed to showcase their space, team and approach to patient care through clean, professional visuals.' },
    'frankie': { title: 'Frankie', category: 'narrative', year: '2024', desc: 'A narrative short film following Frankie through a day of quiet revelations. A character-driven piece exploring identity, routine and the moments in between.' },
    'celebration-of-life': { title: 'A Celebration of Life', category: 'narrative', year: '2024', desc: 'A short documentary celebrating life\'s defining moments — told through a tapestry of intimate interviews and observational footage.' },
    'responsibility': { title: 'Responsibility', category: 'narrative', year: '2024', desc: 'A narrative short film examining the weight of personal responsibility. Dark, atmospheric and character-driven.' },
    'yan-texeira': { title: 'Yan Texeira', category: 'narrative', year: '2025', desc: 'A documentary portrait of Yan Texeira — tracing his journey, craft and vision. An intimate look at an artist at work.' }
  };

  const overlay = document.getElementById('projectModal');
  if (!overlay) return;

  const titleEl = overlay.querySelector('.modal-title');
  const metaEl = overlay.querySelector('.modal-meta');
  const descEl = overlay.querySelector('.modal-desc');
  const closeBtn = overlay.querySelector('.modal-close');
  const backBtn = overlay.querySelector('.modal-back');
  const content = overlay.querySelector('.modal-content');

  function openModal(slug) {
    const data = PROJECT_DATA[slug];
    if (!data) return;

    titleEl.textContent = data.title;
    metaEl.textContent = data.category + ' · ' + data.year;
    descEl.textContent = data.desc;

    document.body.style.overflow = 'hidden';
    overlay.style.display = 'flex';
    // trigger reflow for transition
    overlay.offsetHeight;
    overlay.classList.add('modal-overlay--open');
    window.location.hash = slug;
  }

  function closeModal() {
    overlay.classList.remove('modal-overlay--open');
    document.body.style.overflow = '';
    history.replaceState(null, '', window.location.pathname + window.location.search);
    setTimeout(function () {
      if (!overlay.classList.contains('modal-overlay--open')) {
        overlay.style.display = 'none';
      }
    }, 500);
  }

  // Card clicks
  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card.dataset.slug);
    });
  });

  // Close handlers
  closeBtn.addEventListener('click', closeModal);
  backBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (!content.contains(e.target)) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('modal-overlay--open')) closeModal();
  });

  // Auto-open from hash or query param
  function checkAutoOpen() {
    var slug = window.location.hash.replace('#', '');
    if (!slug) {
      var params = new URLSearchParams(window.location.search);
      slug = params.get('project');
    }
    if (slug && PROJECT_DATA[slug]) openModal(slug);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAutoOpen);
  } else {
    checkAutoOpen();
  }
})();
