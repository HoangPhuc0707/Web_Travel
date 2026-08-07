// ============================================================
//  PTX TRAVEL — Blog Page JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const PER_PAGE = 6;
  let currentPage = 1;
  let filtered = [...BLOG_DATA];

  function applyFilters() {
    const q   = document.getElementById('blog-search')?.value.toLowerCase() || '';
    const cat = document.querySelector('#blog-cat-filters .filter-btn.active')?.dataset.cat || 'all';

    filtered = BLOG_DATA.filter(b => {
      if (cat !== 'all' && b.category !== cat) return false;
      if (q && !b.title.toLowerCase().includes(q) && !b.excerpt.toLowerCase().includes(q)) return false;
      return true;
    });

    currentPage = 1;
    renderGrid();
  }

  function renderGrid() {
    const grid = document.getElementById('blog-grid');
    const pager = document.getElementById('blog-pagination');
    if (!grid) return;

    const start = (currentPage - 1) * PER_PAGE;
    const page  = filtered.slice(start, start + PER_PAGE);
    const total = Math.ceil(filtered.length / PER_PAGE);

    if (page.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">
        <div style="font-size:48px;margin-bottom:16px;">🔍</div>
        <p>Không tìm thấy bài viết phù hợp</p>
      </div>`;
      pager.innerHTML = '';
      return;
    }

    grid.innerHTML = page.map(b => `
      <a href="blog-detail.html?id=${b.id}" class="tour-card reveal" style="text-decoration:none;">
        <div class="tour-img" style="aspect-ratio:16/9;">
          <img src="${b.img}" alt="${b.title}" loading="lazy" onerror="this.src='assets/hero_banner.png'"/>
          <div class="tour-img-badge"><span class="badge badge-blue">${b.categoryLabel}</span></div>
        </div>
        <div class="tour-body">
          <div class="tour-location"><span>📅</span><span>${b.date}</span></div>
          <h3 class="tour-title">${b.title}</h3>
          <p style="font-size:13px;color:var(--text-muted);line-height:1.6;margin-bottom:var(--space-md);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${b.excerpt}</p>
          <div class="tour-footer">
            <div class="tour-meta">
              <div class="tour-meta-item">⏱ ${b.readTime} phút</div>
              <div class="tour-meta-item">👁 ${(b.views/1000).toFixed(1)}k</div>
            </div>
            <span style="font-size:13px;color:var(--primary);font-weight:600;">Đọc tiếp →</span>
          </div>
        </div>
      </a>
    `).join('');

    setTimeout(() => grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')), 80);

    // Pagination
    pager.innerHTML = '';
    if (total <= 1) return;

    const prev = document.createElement('button');
    prev.className = 'page-btn'; prev.textContent = '‹'; prev.disabled = currentPage === 1;
    prev.addEventListener('click', () => { currentPage--; renderGrid(); window.scrollTo({ top: 200, behavior: 'smooth' }); });
    pager.appendChild(prev);

    for (let i = 1; i <= total; i++) {
      const btn = document.createElement('button');
      btn.className = `page-btn${i === currentPage ? ' active' : ''}`;
      btn.textContent = i;
      btn.addEventListener('click', () => { currentPage = i; renderGrid(); window.scrollTo({ top: 200, behavior: 'smooth' }); });
      pager.appendChild(btn);
    }

    const next = document.createElement('button');
    next.className = 'page-btn'; next.textContent = '›'; next.disabled = currentPage === total;
    next.addEventListener('click', () => { currentPage++; renderGrid(); window.scrollTo({ top: 200, behavior: 'smooth' }); });
    pager.appendChild(next);
  }

  // ── Sidebar: Popular Posts ────────────────────────────────
  const popular = document.getElementById('popular-posts');
  if (popular) {
    const top3 = [...BLOG_DATA].sort((a, b) => b.views - a.views).slice(0, 3);
    popular.innerHTML = top3.map(b => `
      <a href="blog-detail.html?id=${b.id}" class="blog-card-sm" style="text-decoration:none;display:flex;gap:var(--space-md);align-items:center;padding:var(--space-sm) 0;border:none;border-bottom:1px solid var(--border);">
        <div class="blog-thumb" style="width:64px;height:50px;border-radius:var(--radius-sm);overflow:hidden;flex-shrink:0;">
          <img src="${b.img}" alt="${b.title}" onerror="this.src='assets/hero_banner.png'" style="width:100%;height:100%;object-fit:cover;"/>
        </div>
        <div>
          <div style="font-size:13px;font-weight:600;color:var(--text);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${b.title}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">👁 ${(b.views/1000).toFixed(1)}k</div>
        </div>
      </a>
    `).join('');
  }

  // ── Sidebar: Tag Cloud ────────────────────────────────────
  const tagCloud = document.getElementById('tag-cloud');
  if (tagCloud) {
    const allTags = [...new Set(BLOG_DATA.flatMap(b => b.tags))];
    tagCloud.innerHTML = allTags.map(tag => `<span class="blog-tag">${tag}</span>`).join('');
    tagCloud.querySelectorAll('.blog-tag').forEach(t => {
      t.addEventListener('click', () => {
        const search = document.getElementById('blog-search');
        if (search) { search.value = t.textContent; applyFilters(); }
      });
    });
  }

  // ── Events ────────────────────────────────────────────────
  document.getElementById('blog-search')?.addEventListener('input', applyFilters);

  document.querySelectorAll('#blog-cat-filters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#blog-cat-filters .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  document.getElementById('blog-newsletter')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input.value) { input.value = ''; input.placeholder = '✓ Đã đăng ký!'; setTimeout(() => { input.placeholder = 'Email của bạn...'; }, 3000); }
  });

  renderGrid();
});
