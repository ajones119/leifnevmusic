// Decorative progressive enhancement: no script leaves the original still grass.
const grass = document.querySelector<HTMLElement>('[data-bird-grass]');
const trigger = document.querySelector<HTMLButtonElement>('[data-bird-trigger]');
const layer = document.querySelector<HTMLElement>('[data-bird-layer]');
const template = document.querySelector<HTMLTemplateElement>('#grass-bird');

if (grass && trigger && layer && template && 'IntersectionObserver' in window && 'animate' in Element.prototype) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set<Animation>();
  let visible = false;
  let active = false;
  let readyAt = 0;
  let generation = 0;
  const random = (min: number, max: number) => min + Math.random() * (max - min);

  function clear() {
    generation++;
    for (const animation of animations) animation.cancel();
    animations.clear();
    layer!.replaceChildren();
    active = false;
    trigger!.removeAttribute('aria-busy');
  }

  function sync() {
    trigger!.disabled = reduced.matches;
    if (reduced.matches || document.hidden || !visible) {
      if (active) readyAt = performance.now() + 1000;
      clear();
    }
  }

  trigger.hidden = false;
  const release = async (clientX?: number) => {
    if (active || !visible || reduced.matches || document.hidden || performance.now() < readyAt) return;
    const rect = grass.getBoundingClientRect();
    const width = document.documentElement.clientWidth;
    const x = clientX === undefined ? rect.left + rect.width / 2 : Math.max(0, Math.min(width, clientX));
    // Start within the painted grass, even when tapping the transparent upper edge.
    const y = Math.min(innerHeight - 8, rect.bottom - Math.min(rect.height * .3, 48));
    const direction = x < width / 2 ? -1 : 1;
    const exitX = direction < 0 ? -64 : width + 64;
    const flightId = ++generation;
    active = true;
    trigger.setAttribute('aria-busy', 'true');
    const flights: Promise<Animation>[] = [];
    let delay = 0;

    for (let i = 0; i < 4; i++) {
      if (i) delay += random(80, 160);
      const bird = template.content.firstElementChild!.cloneNode(true) as HTMLElement;
      bird.style.setProperty('--bird-size', `${random(22, 31)}px`);
      bird.style.setProperty('--bird-direction', String(direction));
      const startX = Math.max(8, Math.min(width - 32, x + random(-24, 24)));
      const startY = y + random(-5, 8);
      const lift = random(170, 255);
      layer.append(bird);
      // Sample a cubic curve so takeoff bends smoothly into outward flight.
      const controlX = startX + direction * 28;
      const controlY = startY - lift * .8;
      const farX = exitX - direction * 60;
      const farY = startY - lift - 20;
      const endY = startY - lift - 65;
      const path = Array.from({ length: 33 }, (_, step) => {
        const t = step / 32, u = 1 - t;
        const px = u ** 3 * startX + 3 * u ** 2 * t * controlX + 3 * u * t ** 2 * farX + t ** 3 * exitX;
        const py = u ** 3 * startY + 3 * u ** 2 * t * controlY + 3 * u * t ** 2 * farY + t ** 3 * endY;
        const dx = 3 * u ** 2 * (controlX - startX) + 6 * u * t * (farX - controlX) + 3 * t ** 2 * (exitX - farX);
        const dy = 3 * u ** 2 * (controlY - startY) + 6 * u * t * (farY - controlY) + 3 * t ** 2 * (endY - farY);
        const angle = Math.max(-35, Math.min(35, Math.atan2(dy, Math.abs(dx)) * 180 / Math.PI * direction));
        return { offset: t, transform: `translate3d(${px}px,${py}px,0) rotate(${angle}deg)`, opacity: Math.min(t / .07, 1) * (.8 - t * .2) };
      });
      const flight = bird.animate(path, { duration: random(2100, 2450), delay, easing: 'linear', fill: 'both' });
      animations.add(flight);
      flights.push(flight.finished);
      const wingbeat = random(210, 280);
      for (const [index, wing] of [...bird.querySelectorAll('.bird-wing')].entries()) {
        const flap = wing.animate([
          { transform: 'scaleY(1)' },
          { transform: 'scaleY(-.55)', offset: .48 },
          { transform: 'scaleY(1)' },
        ], { duration: wingbeat, delay: delay + index * 35, iterations: Infinity, easing: 'ease-in-out' });
        animations.add(flap);
      }
      flight.onfinish = () => bird.remove();
    }

    await Promise.allSettled(flights);
    if (flightId !== generation) return;
    readyAt = performance.now() + 1000;
    clear();
  };

  trigger.addEventListener('click', event => {
    void release(event.detail === 0 ? undefined : event.clientX);
  });

  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  }).observe(grass);
  // This observer is discarded after the first arrival, so refresh is the reset.
  const bottom = document.querySelector<HTMLElement>('[data-bird-bottom]');
  if (bottom) {
    const firstArrival = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      firstArrival.disconnect();
      visible = true;
      void release();
    });
    firstArrival.observe(bottom);
  }
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('resize', () => {
    if (active) readyAt = performance.now() + 1000;
    clear();
  });
  window.addEventListener('pagehide', clear);
  sync();
}

export {};
