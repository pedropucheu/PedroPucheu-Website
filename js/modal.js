/* Project modal */
(function () {
  const PROJECT_DATA = {
    'moving-voice': {
      title: 'Moving Voice', category: 'commercial', year: '2025',
      desc: 'A community-driven brand film for Moving Voice, a spoken word and movement collective based in London. Directed and produced end to end — capturing the raw energy of live performance and the voices behind the movement.',
      gallery: []
    },
    'delphine': {
      title: 'Delphine', category: 'commercial', year: '2024',
      desc: 'A fashion and beauty campaign exploring themes of transformation and identity. Two pieces — "Conversion" and "Love" — shot with a cinematic, editorial sensibility.',
      gallery: []
    },
    'homegrwn': {
      title: 'HomeGrwn', category: 'commercial', year: '2023',
      desc: 'Commercial content for HomeGrwn, a London-based food brand celebrating homegrown culture. Shot on location with a focus on warmth, community and authentic taste.',
      gallery: []
    },
    'streetvox': {
      title: 'StreetVox', category: 'commercial', year: '2026',
      desc: "An editorial short for StreetVox — capturing the pulse of London's street culture through candid interviews and observational filmmaking.",
      gallery: []
    },
    'wedding-eve-james': {
      title: 'Eve & James Wedding', category: 'commercial', year: '2025',
      desc: 'A cinematic wedding film for Eve and James. Shot across a full day — from the quiet morning preparations to the last dance — with an emphasis on emotion and atmosphere.',
      gallery: []
    },
    'able-physiotherapy': {
      title: 'Able Physiotherapy', category: 'commercial', year: '2025',
      desc: 'A 4K brand tour for Able Physiotherapy. Designed to showcase their space, team and approach to patient care through clean, professional visuals.',
      gallery: []
    },
    'anderson-silva': {
      title: 'Anderson Silva Event', category: 'commercial', year: '2025',
      desc: 'Event coverage for an Anderson Silva appearance — capturing the energy, atmosphere and iconic moments of the evening.',
      gallery: []
    },
    'battle-ready': {
      title: 'Battle Ready', category: 'commercial', year: '2025',
      desc: 'A high-intensity brand film for Battle Ready — built around performance, preparation and the relentless pursuit of excellence.',
      gallery: []
    },
    'frankie': {
      title: 'Frankie', category: 'narrative', year: '2024',
      desc: 'A narrative short film following Frankie through a day of quiet revelations. A character-driven piece exploring identity, routine and the moments in between.',
      gallery: [
        'assets/photos/projects/frankie/Screenshot 2026-02-25 111423.png',
        'assets/photos/projects/frankie/Screenshot 2026-02-25 111447.png',
        'assets/photos/projects/frankie/Screenshot 2026-02-25 111507.png',
        'assets/photos/projects/frankie/Screenshot 2026-02-25 111524.png'
      ]
    },
    'celebration-of-life': {
      title: 'A Celebration of Life', category: 'narrative', year: '2024',
      desc: "A short documentary celebrating life's defining moments — told through a tapestry of intimate interviews and observational footage.",
      gallery: [
        'assets/photos/projects/celebration-of-life/Screenshot 2023-03-19 144456.jpg',
        'assets/photos/projects/celebration-of-life/Screenshot 2023-03-19 144634.jpg',
        'assets/photos/projects/celebration-of-life/Screenshot 2023-03-19 144717.jpg',
        'assets/photos/projects/celebration-of-life/Screenshot 2023-03-19 150337.jpg'
      ]
    },
    'responsibility': {
      title: 'Responsibility', category: 'narrative', year: '2024',
      desc: 'A narrative short film examining the weight of personal responsibility. Dark, atmospheric and character-driven.',
      gallery: [
        'assets/photos/projects/responsibility/Screenshot 2026-02-25 110044.png',
        'assets/photos/projects/responsibility/Screenshot 2026-02-25 110119.png',
        'assets/photos/projects/responsibility/Screenshot 2026-02-25 110149.png',
        'assets/photos/projects/responsibility/Screenshot 2026-02-25 110253.png'
      ]
    },
    'yan-texeira': {
      title: 'Yan Texeira', category: 'narrative', year: '2025',
      desc: 'A documentary portrait of Yan Texeira — tracing his journey, craft and vision. An intimate look at an artist at work.',
      gallery: [
        'assets/photos/projects/yan-texeira/Screenshot 2026-02-25 112506.png',
        'assets/photos/projects/yan-texeira/Screenshot 2026-02-25 112538.png',
        'assets/photos/projects/yan-texeira/Screenshot 2026-02-25 112649.png',
        'assets/photos/projects/yan-texeira/Screenshot 2026-02-25 112711.png'
      ]
    },
    'the-projectionist': {
      title: 'The Projectionist', category: 'narrative', year: '2023',
      videoSrc: 'assets/video/the-projectionist.mp4',
      desc: 'A short film exploring the quiet obsession of a projectionist — where the boundary between story and storyteller begins to blur.',
      gallery: [
        'assets/photos/projects/the-projectionist/Screenshot 2026-02-25 111954.png',
        'assets/photos/projects/the-projectionist/Screenshot 2026-02-25 112012.png',
        'assets/photos/projects/the-projectionist/Screenshot 2026-02-25 112053.png',
        'assets/photos/projects/the-projectionist/Screenshot 2026-02-25 112119.png'
      ]
    },
    'an-unknown-reality': {
      title: 'An Unknown Reality', category: 'narrative', year: '2023',
      videoSrc: 'assets/video/an-unknown-reality.mp4',
      desc: 'A short film probing the nature of memory and perception — what we choose to remember, and what we cannot escape.',
      gallery: []
    },
    'day-one': {
      title: 'Day One', category: 'narrative', year: '2024',
      videoSrc: 'assets/video/day-one.mp4',
      desc: 'A narrative short following the first day of a new beginning — capturing the fragile optimism of starting over.',
      gallery: [
        'assets/photos/projects/day-one/Screenshot 2026-02-25 110613.png',
        'assets/photos/projects/day-one/Screenshot 2026-02-25 110657.png',
        'assets/photos/projects/day-one/Screenshot 2026-02-25 110900.png',
        'assets/photos/projects/day-one/Screenshot 2026-02-25 110922.png'
      ]
    }
  };

  const overlay = document.getElementById('projectModal');
  if (!overlay) return;

  const titleEl = overlay.querySelector('.modal-title');
  const metaEl = overlay.querySelector('.modal-meta');
  const descEl = overlay.querySelector('.modal-desc');
  const galleryEl = overlay.querySelector('.modal-gallery');
  const closeBtn = overlay.querySelector('.modal-close');
  const backBtn = overlay.querySelector('.modal-back');
  const content = overlay.querySelector('.modal-content');

  function openModal(slug) {
    const data = PROJECT_DATA[slug];
    if (!data) return;

    titleEl.textContent = data.title;
    metaEl.textContent = data.category + ' · ' + data.year;
    descEl.textContent = data.desc;

    if (galleryEl) {
      galleryEl.innerHTML = '';
      if (data.gallery && data.gallery.length > 0) {
        data.gallery.forEach(function(src) {
          var img = document.createElement('img');
          img.src = src;
          img.alt = data.title + ' still';
          img.loading = 'lazy';
          galleryEl.appendChild(img);
        });
      }
    }

    // Render video
    const videoArea = overlay.querySelector('.modal-video');
    if (videoArea) {
      if (data.videoSrc) {
        videoArea.innerHTML = '<video src="' + data.videoSrc + '" controls playsinline style="width:100%;height:100%;border-radius:var(--border-radius);"></video>';
      } else {
        videoArea.innerHTML = '<span style="color:var(--text-muted);font-size:var(--text-small)">Video coming soon</span>';
      }
    }

    document.body.style.overflow = 'hidden';
    overlay.style.display = 'flex';
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

  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card.dataset.slug);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  backBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (!content.contains(e.target)) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('modal-overlay--open')) closeModal();
  });

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
