// Progressive enhancement: the painted bridge and still fish need no script.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

function enhanceDepth() {
  const frame = document.querySelector<HTMLElement>('[data-depth-frame]');
  const subject = document.querySelector<HTMLElement>('[data-depth-subject]');
  const photograph = document.querySelector<HTMLElement>('[data-depth-float]');
  if (!frame || !subject || !photograph || !('IntersectionObserver' in window)) return;

  let visible = false;
  let animation: number | undefined;
  let previous = 0;
  let elapsed = 0;
  let pointerX = 0;
  let pointerY = 0;
  let x = 0;
  let y = 0;
  const active = () => visible && !document.hidden && !reducedMotion.matches;

  function tick(now: number) {
    animation = undefined;
    if (!active()) return;
    const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
    previous = now;
    elapsed += dt;
    // Cap the desktop amplitude, scaling down further on narrow screens.
    const scale = Math.min(frame!.clientWidth / 460, 1);
    const targetX = (Math.sin(elapsed * 0.48) * 0.9 + pointerX * 0.6) * scale;
    const targetY = (Math.sin(elapsed * 0.36) * 0.55 + pointerY * 0.4) * scale;
    const ease = 1 - Math.exp(-dt * 4);
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    subject!.style.transform = `translate3d(${x.toFixed(3)}px, ${y.toFixed(3)}px, 0)`;
    // The oversized scene drifts behind a stationary clipping window and border.
    const floatX = Math.sin(elapsed * 0.39) * 2.5 * scale;
    const floatY = Math.sin(elapsed * 0.52) * 5.5 * scale;
    photograph!.style.transform = `translate3d(${floatX.toFixed(3)}px, ${floatY.toFixed(3)}px, 0)`;
    animation = requestAnimationFrame(tick);
  }

  function sync() {
    if (animation !== undefined) cancelAnimationFrame(animation);
    animation = undefined;
    previous = 0;
    if (!active()) pointerX = pointerY = 0;
    if (reducedMotion.matches) {
      x = y = 0;
      subject!.style.removeProperty('transform');
      photograph!.style.removeProperty('transform');
    }
    if (active()) animation = requestAnimationFrame(tick);
  }

  frame.addEventListener('pointermove', event => {
    if (!active() || !finePointer.matches || event.pointerType === 'touch') return;
    const rect = frame.getBoundingClientRect();
    pointerX = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    pointerY = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
  });
  frame.addEventListener('pointerleave', () => { pointerX = pointerY = 0; });
  finePointer.addEventListener('change', () => { pointerX = pointerY = 0; });
  reducedMotion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }).observe(frame);
}

function enhanceFish() {
  const container = document.querySelector<HTMLElement>('[data-fish-container]');
  const video = document.querySelector<HTMLVideoElement>('[data-fish-video]');
  const still = document.querySelector<HTMLElement>('[data-fish-still]');
  if (!container || !video || !still || !('IntersectionObserver' in window)) return;
  const source = video.dataset.src;
  if (!source) return;

  let near = false;
  let visible = false;
  let failed = false;
  let pending = false;
  let attempt = 0;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = true;
  video.preload = 'none';
  const eligible = () => visible && !document.hidden && !reducedMotion.matches && !failed;
  const showStill = () => { delete container.dataset.playing; };

  function stop() {
    attempt++;
    pending = false;
    video!.pause();
    showStill();
  }

  function sync() {
    if (reducedMotion.matches) {
      stop();
      if (video!.hasAttribute('src')) {
        video!.removeAttribute('src');
        video!.load();
      }
      return;
    }
    // The near observer attaches the URL; the visible observer starts playback.
    if (near && !document.hidden && !failed && !video!.hasAttribute('src')) {
      video!.src = source!;
    }
    if (!eligible()) {
      stop();
      return;
    }
    if (!video!.hasAttribute('src') || pending || !video!.paused) return;
    const currentAttempt = ++attempt;
    pending = true;
    video!.play().then(() => {
      if (currentAttempt !== attempt) {
        if (!eligible()) video!.pause();
        return;
      }
      pending = false;
      if (!eligible()) stop();
    }).catch(() => {
      if (currentAttempt !== attempt) return;
      pending = false;
      // A rejected autoplay or decode stays on the quiet still fallback.
      failed = true;
      stop();
    });
  }

  video.addEventListener('playing', () => {
    if (eligible()) container.dataset.playing = 'true';
    else stop();
  });
  video.addEventListener('pause', showStill);
  video.addEventListener('waiting', showStill);
  video.addEventListener('ended', showStill);
  video.addEventListener('error', () => { failed = true; stop(); });
  reducedMotion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  new IntersectionObserver(entries => {
    near = entries[0].isIntersecting;
    sync();
  }, { rootMargin: '240px 0px' }).observe(container);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }).observe(container);
  sync();
}

enhanceDepth();
enhanceFish();

export {};
