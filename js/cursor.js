(() => {
  if (!matchMedia('(hover: hover)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const label = document.createElement('span');
  label.className = 'custom-cursor__label';
  cursor.appendChild(label);
  document.body.appendChild(cursor);

  const style = document.createElement('style');
  style.textContent = `
    .custom-cursor {
      position: fixed;
      top: 0;
      left: 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #fff;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: width var(--duration-fast) var(--ease-out-expo),
                  height var(--duration-fast) var(--ease-out-expo),
                  background var(--duration-fast) var(--ease-out-expo),
                  border var(--duration-fast) var(--ease-out-expo),
                  backdrop-filter var(--duration-fast) var(--ease-out-expo);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 0 solid transparent;
    }
    .custom-cursor__label {
      font-family: var(--font-body);
      font-size: 10px;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0;
      white-space: nowrap;
      transition: opacity var(--duration-fast) var(--ease-out-expo);
    }
    .custom-cursor--hero {
      width: 80px;
      height: 80px;
      background: transparent;
      border: 1px solid rgba(255,255,255,0.5);
      backdrop-filter: blur(2px);
    }
    .custom-cursor--hero .custom-cursor__label { opacity: 1; }
    .custom-cursor--project {
      width: 60px;
      height: 60px;
      background: transparent;
      border: 1px solid rgba(255,255,255,0.5);
      backdrop-filter: blur(2px);
    }
    .custom-cursor--project .custom-cursor__label { opacity: 1; }
  `;
  document.head.appendChild(style);

  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function tick() {
    x += (targetX - x) * 0.15;
    y += (targetY - y) * 0.15;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
    requestAnimationFrame(tick);
  }
  tick();

  // Hero hover
  const hero = document.querySelector('.section-hero');
  if (hero) {
    hero.addEventListener('mouseenter', () => {
      cursor.classList.add('custom-cursor--hero');
      cursor.classList.remove('custom-cursor--project');
      label.textContent = 'PLAY REEL';
    });
    hero.addEventListener('mouseleave', () => {
      cursor.classList.remove('custom-cursor--hero');
      label.textContent = '';
    });
  }

  // Project card hover
  document.querySelectorAll('.featured-card, .project-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      cursor.classList.add('custom-cursor--project');
      cursor.classList.remove('custom-cursor--hero');
      label.textContent = 'VIEW';
    });
    card.addEventListener('mouseleave', () => {
      cursor.classList.remove('custom-cursor--project');
      label.textContent = '';
      // Restore hero state if still inside hero
      if (hero && hero.matches(':hover')) {
        cursor.classList.add('custom-cursor--hero');
        label.textContent = 'PLAY REEL';
      }
    });
  });
})();
