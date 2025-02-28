const animateScrollToTop = (duration = 2500) => {
  const start = window.pageYOffset;
  const startTime = performance.now();

  const scrollStep = (timestamp) => {
    const currentTime = timestamp - startTime;
    const progress = Math.min(currentTime / duration, 1);
    const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t); // Quadratic easing

    window.scrollTo(0, start * (1 - ease(progress)));

    if (currentTime < duration) {
      requestAnimationFrame(scrollStep);
    }
  };

  requestAnimationFrame(scrollStep);
};
