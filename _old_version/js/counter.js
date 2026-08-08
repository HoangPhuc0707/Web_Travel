// ============================================================
//  PTX TRAVEL — Animated Number Counters
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const counters = document.querySelectorAll('[data-count]');

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 2000; // ms
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    let   start    = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed  = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.floor(easeOut(progress) * target);
      el.textContent = prefix + value.toLocaleString('vi-VN') + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toLocaleString('vi-VN') + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // Start when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));

});
