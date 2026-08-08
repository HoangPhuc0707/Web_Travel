// ============================================================
//  PTX TRAVEL — main.js (Shared Utilities)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Loading Screen ──────────────────────────────────────
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 1200);
  }

  // ── Scroll Reveal ────────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // ── Animated Counters ─────────────────────────────────────
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(easeOut(p) * target).toLocaleString('vi-VN') + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('vi-VN') + suffix;
    }
    requestAnimationFrame(step);
  }
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObserver.unobserve(e.target); } });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  // ── Wishlist ──────────────────────────────────────────────
  function initWishlists() {
    document.querySelectorAll('.tour-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('liked');
        btn.textContent = btn.classList.contains('liked') ? '❤️' : '🤍';
      });
    });
  }
  initWishlists();
  // expose for dynamic content
  window.initWishlists = initWishlists;

  // ── Smooth Scroll ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ── Page Header Parallax ──────────────────────────────────
  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const bg = pageHero.querySelector('.page-hero-bg');
      if (bg) bg.style.transform = `translateY(${scrolled * 0.4}px)`;
    }, { passive: true });
  }

});
