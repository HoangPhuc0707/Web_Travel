// ============================================================
//  PTX TRAVEL — Hero Slider + Testimonials Carousel
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Hero Slider ──────────────────────────────────────────
  const slides     = document.querySelectorAll('.hero-slide');
  const dots       = document.querySelectorAll('.hero-dot');
  let   current    = 0;
  let   autoTimer  = null;

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function nextSlide() { goToSlide(current + 1); }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(nextSlide, 5000);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  if (slides.length > 0) {
    slides[0].classList.add('active');
    dots[0]?.classList.add('active');

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        startAuto();
      });
    });

    startAuto();

    // Pause on hover
    const heroEl = document.getElementById('hero');
    heroEl?.addEventListener('mouseenter', stopAuto);
    heroEl?.addEventListener('mouseleave', startAuto);
  }

  // ── Testimonials Carousel ────────────────────────────────
  const track     = document.querySelector('.testimonials-track');
  const prevBtn   = document.getElementById('testi-prev');
  const nextBtn   = document.getElementById('testi-next');
  const cards     = document.querySelectorAll('.testimonial-card');
  let   testiIdx  = 0;
  let   perView   = 3;

  function getPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function updateCarousel() {
    perView = getPerView();
    const maxIdx = Math.max(0, cards.length - perView);
    testiIdx = Math.min(testiIdx, maxIdx);

    if (track) {
      const pct = (100 / perView) * testiIdx;
      track.style.transform = `translateX(-${pct}%)`;
    }

    if (prevBtn) prevBtn.disabled = testiIdx === 0;
    if (nextBtn) nextBtn.disabled = testiIdx >= cards.length - perView;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      testiIdx = Math.max(0, testiIdx - 1);
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      perView = getPerView();
      testiIdx = Math.min(cards.length - perView, testiIdx + 1);
      updateCarousel();
    });
  }

  window.addEventListener('resize', updateCarousel);
  updateCarousel();

  // ── Tour Card Hover 3D Tilt ───────────────────────────────
  document.querySelectorAll('.tour-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5;
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      const tiltX  = y * -8;
      const tiltY  = x *  8;
      card.style.transform = `translateY(-8px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
