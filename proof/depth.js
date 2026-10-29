// Small, reversible motion prototype; no production animation dependency.
(() => {
  const frame = document.querySelector('[data-depth-frame]');
  const subject = document.querySelector('[data-depth-subject]');
  const button = document.querySelector('[data-motion-toggle]');
  if (!frame || !subject || !button) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let paused = false;
  let visible = true;
  let raf = null;
  let previous = 0;
  let elapsed = 0;
  let pointerX = 0;
  let pointerY = 0;
  let x = 0;
  let y = 0;
  const active = () => !paused && !reduced.matches && !document.hidden && visible;

  function tick(now) {
    raf = null;
    if (!active()) { sync(); return; }
    const dt = previous ? Math.min((now - previous) / 1000, .05) : 0;
    previous = now;
    elapsed += dt;
    const scale = frame.clientWidth / 460;
    const targetX = (Math.sin(elapsed * .48) * 1.8 + pointerX * 1.2) * scale;
    const targetY = (Math.sin(elapsed * .36) * 1.1 + pointerY * .8) * scale;
    const ease = 1 - Math.exp(-dt * 4);
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    subject.style.transform = `translate3d(${x.toFixed(3)}px,${y.toFixed(3)}px,0)`;
    raf = requestAnimationFrame(tick);
  }

  function sync() {
    button.disabled = reduced.matches;
    button.textContent = reduced.matches ? 'Motion off' : paused ? 'Play motion' : 'Pause motion';
    button.setAttribute('aria-pressed', String(paused || reduced.matches));
    if (raf !== null) cancelAnimationFrame(raf);
    raf = null;
    previous = 0;
    if (reduced.matches) {
      x = y = 0;
      subject.style.transform = 'none';
    }
    if (active()) raf = requestAnimationFrame(tick);
  }

  button.addEventListener('click', () => { paused = !paused; sync(); });
  frame.addEventListener('pointermove', event => {
    if (!fine.matches || event.pointerType === 'touch') return;
    const r = frame.getBoundingClientRect();
    pointerX = Math.max(-1, Math.min(1, (event.clientX - r.left) / r.width * 2 - 1));
    pointerY = Math.max(-1, Math.min(1, (event.clientY - r.top) / r.height * 2 - 1));
  });
  frame.addEventListener('pointerleave', () => { pointerX = pointerY = 0; });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }).observe(frame);
  button.hidden = false;
  sync();
})();
