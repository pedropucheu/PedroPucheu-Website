/* Filter pills for work page */
(function () {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.project-card');

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('filter-pill--active'); });
      pill.classList.add('filter-pill--active');

      var filter = pill.dataset.filter;

      cards.forEach(function (card) {
        var show = filter === 'all' || card.dataset.category === filter;
        if (show) {
          card.classList.remove('project-card--hidden');
        } else {
          card.classList.add('project-card--hidden');
        }
      });
    });
  });
})();
