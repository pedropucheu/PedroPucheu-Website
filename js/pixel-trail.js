(() => {
  if (!matchMedia('(hover: hover)').matches) return;
  if (document.body.classList.contains('page--light')) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'pixelTrail';
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:1;pointer-events:none;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const CELL = 20;
  let cols, rows, grid;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.ceil(canvas.width / CELL);
    rows = Math.ceil(canvas.height / CELL);
    grid = new Float32Array(cols * rows);
  }
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', (e) => {
    const cx = Math.floor(e.clientX / CELL);
    const cy = Math.floor(e.clientY / CELL);
    if (cx >= 0 && cx < cols && cy >= 0 && cy < rows) {
      grid[cy * cols + cx] = 1.0;
      // Adjacent cells
      if (cx > 0) grid[cy * cols + cx - 1] = Math.max(grid[cy * cols + cx - 1], 0.5);
      if (cx < cols - 1) grid[cy * cols + cx + 1] = Math.max(grid[cy * cols + cx + 1], 0.5);
      if (cy > 0) grid[(cy - 1) * cols + cx] = Math.max(grid[(cy - 1) * cols + cx], 0.5);
      if (cy < rows - 1) grid[(cy + 1) * cols + cx] = Math.max(grid[(cy + 1) * cols + cx], 0.5);
    }
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 8;

    for (let i = 0; i < grid.length; i++) {
      if (grid[i] > 0.01) {
        const b = grid[i];
        const col = i % cols;
        const row = (i - col) / cols;
        ctx.fillStyle = `rgba(0, 212, 255, ${b * 0.3})`;
        ctx.shadowColor = `rgba(0, 212, 255, ${b * 0.5})`;
        ctx.fillRect(col * CELL, row * CELL, CELL, CELL);
        grid[i] -= 0.03;
      }
    }

    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
