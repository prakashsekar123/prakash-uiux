/** Wraps a function so it runs at most once per animation frame, no matter
 *  how many times it's called — the standard way to keep a scroll/resize
 *  listener from doing layout work on every single event. */
export function rafThrottle(fn) {
  let ticking = false;
  return (...args) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      fn(...args);
      ticking = false;
    });
  };
}
