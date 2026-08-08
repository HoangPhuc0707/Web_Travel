// ============================================================
//  PTX TRAVEL — Tours Filter & Dynamic Rendering
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const TOURS = [
    {
      id: 1,
      title: 'Vịnh Hạ Long 3N2Đ — Hành Trình Kỳ Quan',
      titleEn: 'Ha Long Bay 3D2N — Natural Wonder Journey',
      img: 'assets/tour_halong.png',
      category: 'vietnam',
      location: 'Quảng Ninh, Việt Nam',
      duration: '3N2Đ',
      people: '2-15 người',
      rating: 4.9,
      reviews: 248,
      price: 3200000,
      badge: 'hot',
      badgeText: '🔥 Hot',
    },
    {
      id: 2,
      title: 'Sa Pa Mùa Lúa Vàng — Trekking Fansipan',
      titleEn: 'Sa Pa Golden Rice — Fansipan Trekking',
      img: 'assets/tour_sapa.png',
      category: 'vietnam',
      location: 'Lào Cai, Việt Nam',
      duration: '4N3Đ',
      people: '2-12 người',
      rating: 4.8,
      reviews: 186,
      price: 4500000,
      badge: 'new',
      badgeText: '✨ Mới',
    },
    {
      id: 3,
      title: 'Hội An — Đà Nẵng Phố Cổ Đèn Lồng',
      titleEn: 'Hoi An — Da Nang Lantern Town',
      img: 'assets/tour_hoian.png',
      category: 'vietnam',
      location: 'Quảng Nam, Việt Nam',
      duration: '3N2Đ',
      people: '2-20 người',
      rating: 4.7,
      reviews: 312,
      price: 2800000,
      badge: 'sale',
      badgeText: '💰 Giảm 20%',
    },
    {
      id: 4,
      title: 'Paris — City of Light Romantic Tour',
      titleEn: 'Paris — City of Light Romantic Tour',
      img: 'assets/tour_paris.png',
      category: 'international',
      location: 'Paris, Pháp',
      duration: '7N6Đ',
      people: '2-10 người',
      rating: 4.9,
      reviews: 94,
      price: 32000000,
      badge: 'hot',
      badgeText: '🔥 Bán Chạy',
    },
    {
      id: 5,
      title: 'Singapore — Lion City Xanh & Hiện Đại',
      titleEn: 'Singapore — Lion City Green & Modern',
      img: 'assets/tour_singapore.png',
      category: 'southeast-asia',
      location: 'Singapore',
      duration: '5N4Đ',
      people: '2-15 người',
      rating: 4.8,
      reviews: 167,
      price: 18500000,
      badge: '',
      badgeText: '',
    },
    {
      id: 6,
      title: 'Nhật Bản — Hoa Anh Đào Mùa Xuân',
      titleEn: 'Japan — Spring Cherry Blossom',
      img: 'assets/tour_japan.png',
      category: 'international',
      location: 'Tokyo, Nhật Bản',
      duration: '8N7Đ',
      people: '2-12 người',
      rating: 5.0,
      reviews: 73,
      price: 45000000,
      badge: 'premium',
      badgeText: '👑 Premium',
    },
  ];

  let filtered  = [...TOURS];
  let activeTag = 'all';

  const toursGrid = document.getElementById('tours-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // ── Render Tours ─────────────────────────────────────────
  function formatPrice(price, lang = 'vi') {
    if (lang === 'en') {
      return '$' + (price / 23000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return (price / 1000000).toFixed(1) + ' Tr';
  }

  function renderStars(rating) {
    const full  = Math.floor(rating);
    const half  = rating % 1 >= 0.5;
    let html = '';
    for (let i = 0; i < full; i++) html += '★';
    if (half) html += '☆';
    return html;
  }

  function renderTours(list) {
    if (!toursGrid) return;

    toursGrid.innerHTML = list.map(t => `
      <div class="tour-card reveal stagger-children" data-id="${t.id}">
        <div class="tour-img">
          <img src="${t.img}" alt="${t.title}" loading="lazy" onerror="this.src='assets/hero_banner.png'">
          <div class="tour-img-badge">
            ${t.badge ? `<span class="badge badge-${t.badge === 'hot' ? 'red' : t.badge === 'sale' ? 'red' : t.badge === 'premium' ? 'blue' : 'green'}">${t.badgeText}</span>` : ''}
          </div>
          <button class="tour-wishlist" aria-label="Yêu thích">🤍</button>
        </div>
        <div class="tour-body">
          <div class="tour-location">
            <span>📍</span>
            <span>${t.location}</span>
          </div>
          <h3 class="tour-title">${t.title}</h3>
          <div class="tour-meta">
            <div class="tour-meta-item">🕐 ${t.duration}</div>
            <div class="tour-meta-item">👥 ${t.people}</div>
          </div>
          <div class="tour-footer">
            <div class="tour-price">
              <span class="tour-price-label">Giá từ</span>
              <span class="tour-price-value">
                <span class="tour-price-currency">₫ </span>${formatPrice(t.price)}
              </span>
            </div>
            <div>
              <div class="stars">${renderStars(t.rating)}</div>
              <span style="font-size:12px;color:var(--text-muted)">${t.rating} (${t.reviews})</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Re-observe reveals
    document.querySelectorAll('#tours-grid .reveal').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), 50);
    });

    // Re-attach wishlist
    document.querySelectorAll('.tour-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('liked');
        btn.textContent = btn.classList.contains('liked') ? '❤️' : '🤍';
      });
    });
  }

  // ── Filter Buttons ────────────────────────────────────────
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTag = btn.dataset.filter;

      if (activeTag === 'all') {
        filtered = [...TOURS];
      } else {
        filtered = TOURS.filter(t => t.category === activeTag);
      }

      renderTours(filtered);
    });
  });

  // ── Search ─────────────────────────────────────────────
  const searchInput = document.getElementById('hero-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const res = TOURS.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q)
      );
      renderTours(res);
      // Scroll to tours section
      if (q.length > 1) {
        document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Initial render
  renderTours(TOURS);

});
