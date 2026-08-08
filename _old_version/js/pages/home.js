// ============================================================
//  PTX TRAVEL — Home Page JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Hero Slider ──────────────────────────────────────────
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  let current  = 0, timer = null;

  function goTo(i) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function startAuto() { timer = setInterval(() => goTo(current + 1), 5000); }
  function stopAuto()  { clearInterval(timer); }

  if (slides.length) {
    slides[0].classList.add('active');
    dots[0]?.classList.add('active');
    dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); stopAuto(); startAuto(); }));
    startAuto();
    const hero = document.getElementById('hero');
    hero?.addEventListener('mouseenter', stopAuto);
    hero?.addEventListener('mouseleave', startAuto);
  }

  // ── Testimonial Carousel ─────────────────────────────────
  const track  = document.querySelector('.testimonials-track');
  const cards  = document.querySelectorAll('.testimonial-card');
  let   ti     = 0;

  function getPerView() {
    return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  }

  function updateCarousel() {
    const pv  = getPerView();
    const max = Math.max(0, cards.length - pv);
    ti = Math.min(ti, max);
    if (track) track.style.transform = `translateX(-${(100 / pv) * ti}%)`;
    const prevBtn = document.getElementById('testi-prev');
    const nextBtn = document.getElementById('testi-next');
    if (prevBtn) prevBtn.disabled = ti === 0;
    if (nextBtn) nextBtn.disabled = ti >= cards.length - pv;
  }

  document.getElementById('testi-prev')?.addEventListener('click', () => { ti = Math.max(0, ti - 1); updateCarousel(); });
  document.getElementById('testi-next')?.addEventListener('click', () => { const pv = getPerView(); ti = Math.min(cards.length - pv, ti + 1); updateCarousel(); });
  window.addEventListener('resize', updateCarousel);
  updateCarousel();

  // ── Render Featured Tours (6) ────────────────────────────
  const grid = document.getElementById('home-tours-grid');
  if (grid && typeof TOURS_DATA !== 'undefined') {
    let display = TOURS_DATA.slice(0, 6);

    function render(list) {
      grid.innerHTML = list.map(t => `
        <a href="tour-detail.html?id=${t.id}" class="tour-card reveal" style="text-decoration:none;">
          <div class="tour-img">
            <img src="${t.img}" alt="${t.title}" loading="lazy" onerror="this.src='assets/hero_banner.png'">
            <div class="tour-img-badge">${t.badge ? `<span class="badge badge-${t.badge==='hot'?'red':t.badge==='premium'?'blue':'green'}">${t.badgeText}</span>` : ''}</div>
            <button class="tour-wishlist" onclick="event.preventDefault()">🤍</button>
          </div>
          <div class="tour-body">
            <div class="tour-location"><span>📍</span><span>${t.location}</span></div>
            <h3 class="tour-title">${t.title}</h3>
            <div class="tour-meta">
              <div class="tour-meta-item">🕐 ${t.duration}</div>
              <div class="tour-meta-item">👥 ${t.people}</div>
            </div>
            <div class="tour-footer">
              <div class="tour-price">
                <span class="tour-price-label">Giá từ</span>
                <span class="tour-price-value"><span class="tour-price-currency">₫ </span>${(t.price/1000000).toFixed(1)} Tr</span>
              </div>
              <div>
                <div class="stars">${'★'.repeat(Math.floor(t.rating))}${t.rating%1>=0.5?'☆':''}</div>
                <span style="font-size:12px;color:var(--text-muted)">${t.rating} (${t.reviews})</span>
              </div>
            </div>
          </div>
        </a>
      `).join('');

      setTimeout(() => {
        grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        if (window.initWishlists) window.initWishlists();
      }, 80);
    }

    render(display);

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        render(f === 'all' ? TOURS_DATA.slice(0, 6) : TOURS_DATA.filter(t => t.category === f).slice(0, 6));
      });
    });
  }

  // ── Render Blog Preview (3) ───────────────────────────────
  const blogGrid = document.getElementById('home-blog-grid');
  if (blogGrid && typeof BLOG_DATA !== 'undefined') {
    blogGrid.innerHTML = BLOG_DATA.slice(0, 3).map(b => `
      <a href="blog-detail.html?id=${b.id}" class="tour-card reveal" style="text-decoration:none;">
        <div class="tour-img">
          <img src="${b.img}" alt="${b.title}" loading="lazy" onerror="this.src='assets/hero_banner.png'">
          <div class="tour-img-badge"><span class="badge badge-blue">${b.categoryLabel}</span></div>
        </div>
        <div class="tour-body">
          <div class="tour-location"><span>📅</span><span>${b.date}</span></div>
          <h3 class="tour-title">${b.title}</h3>
          <div class="tour-meta">
            <div class="tour-meta-item">⏱ ${b.readTime} phút đọc</div>
            <div class="tour-meta-item">👁 ${(b.views/1000).toFixed(1)}k lượt</div>
          </div>
          <div class="tour-footer" style="justify-content:flex-end;">
            <span style="font-size:13px;color:var(--primary);font-weight:600;">Đọc tiếp →</span>
          </div>
        </div>
      </a>
    `).join('');
    setTimeout(() => blogGrid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')), 100);
  }

  // ── Search Redirect ───────────────────────────────────────
  document.getElementById('hero-search-btn')?.addEventListener('click', (e) => {
    const q = document.getElementById('hero-search-input')?.value;
    if (q) { e.preventDefault(); window.location.href = `tours.html?q=${encodeURIComponent(q)}`; }
  });

});
