// ============================================================
//  PTX TRAVEL — Tours Page JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const PER_PAGE = 6;
  let currentPage = 1;
  let filtered = [];

  // ── Collect filter state ──────────────────────────────────
  function getFilters() {
    const search    = document.getElementById('tour-search')?.value.toLowerCase() || '';
    const cats      = [...document.querySelectorAll('#filter-sidebar input[type=checkbox]:checked')].filter(c => ['vietnam','southeast-asia','international'].includes(c.value)).map(c => c.value);
    const durations = [...document.querySelectorAll('#filter-sidebar input[type=checkbox]:checked')].filter(c => ['short','medium','long'].includes(c.value)).map(c => c.value);
    const maxPriceMil = parseInt(document.getElementById('price-range')?.value || 50, 10);
    const sort      = document.getElementById('tours-sort')?.value || 'popular';
    return { search, cats, durations, maxPriceMil, sort };
  }

  // ── Duration bucket ───────────────────────────────────────
  function durBucket(days) {
    if (days <= 3) return 'short';
    if (days <= 7) return 'medium';
    return 'long';
  }

  // ── Apply filters & sort ──────────────────────────────────
  function applyFilters() {
    const { search, cats, durations, maxPriceMil, sort } = getFilters();
    const maxPrice = maxPriceMil * 1000000;

    filtered = TOURS_DATA.filter(t => {
      if (cats.length && !cats.includes(t.category)) return false;
      if (durations.length && !durations.includes(durBucket(t.days))) return false;
      if (maxPriceMil < 50 && t.price > maxPrice) return false;
      if (search && !t.title.toLowerCase().includes(search) && !t.location.toLowerCase().includes(search)) return false;
      return true;
    });

    switch (sort) {
      case 'price-asc':  filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating':     filtered.sort((a, b) => b.rating - a.rating); break;
      case 'new':        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default:           filtered.sort((a, b) => b.reviews - a.reviews);
    }

    currentPage = 1;
    render();
  }

  // ── Render grid ───────────────────────────────────────────
  function render() {
    const grid  = document.getElementById('tours-grid');
    const count = document.getElementById('tours-found-count');
    const pager = document.getElementById('pagination');
    if (!grid) return;

    count.textContent = filtered.length;

    const start = (currentPage - 1) * PER_PAGE;
    const page  = filtered.slice(start, start + PER_PAGE);
    const totalPages = Math.ceil(filtered.length / PER_PAGE);

    if (page.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);">
        <div style="font-size:48px;margin-bottom:16px;">🔍</div>
        <h3 style="margin-bottom:8px;">Không tìm thấy tour phù hợp</h3>
        <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
      </div>`;
      pager.innerHTML = '';
      return;
    }

    grid.innerHTML = page.map(t => `
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
              ${t.priceOriginal ? `<span style="font-size:11px;color:var(--text-light);text-decoration:line-through;">₫ ${(t.priceOriginal/1000000).toFixed(1)} Tr</span>` : ''}
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

    // Pagination
    pager.innerHTML = '';
    if (totalPages <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.textContent = '‹';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => { currentPage--; render(); window.scrollTo({ top: 200, behavior: 'smooth' }); });
    pager.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.className = `page-btn${i === currentPage ? ' active' : ''}`;
      btn.textContent = i;
      btn.addEventListener('click', () => { currentPage = i; render(); window.scrollTo({ top: 200, behavior: 'smooth' }); });
      pager.appendChild(btn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.textContent = '›';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => { currentPage++; render(); window.scrollTo({ top: 200, behavior: 'smooth' }); });
    pager.appendChild(nextBtn);
  }

  // ── Event Listeners ───────────────────────────────────────
  document.getElementById('tour-search')?.addEventListener('input', applyFilters);
  document.getElementById('tours-sort')?.addEventListener('change', applyFilters);
  document.querySelectorAll('#filter-sidebar input[type=checkbox]').forEach(cb => cb.addEventListener('change', applyFilters));
  document.getElementById('filter-reset')?.addEventListener('click', () => {
    document.getElementById('tour-search').value = '';
    document.querySelectorAll('#filter-sidebar input[type=checkbox]').forEach(cb => cb.checked = true);
    document.getElementById('price-range').value = 50;
    document.getElementById('price-max-label').textContent = '50+ triệu';
    document.getElementById('tours-sort').value = 'popular';
    applyFilters();
  });

  const priceRange = document.getElementById('price-range');
  if (priceRange) {
    priceRange.addEventListener('input', () => {
      const v = priceRange.value;
      document.getElementById('price-max-label').textContent = v >= 50 ? '50+ triệu' : `${v} triệu`;
      applyFilters();
    });
  }

  // ── Handle URL param (search query from home) ─────────────
  const params = new URLSearchParams(window.location.search);
  const qParam = params.get('q');
  const catParam = params.get('cat');
  if (qParam && document.getElementById('tour-search')) {
    document.getElementById('tour-search').value = qParam;
  }
  if (catParam) {
    document.querySelectorAll('#filter-sidebar input[type=checkbox]').forEach(cb => {
      if (['vietnam','southeast-asia','international'].includes(cb.value)) cb.checked = (cb.value === catParam);
    });
  }

  applyFilters();
});
