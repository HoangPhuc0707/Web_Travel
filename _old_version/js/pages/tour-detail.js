// ============================================================
//  PTX TRAVEL — Tour Detail Page JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id     = parseInt(params.get('id'), 10);
  const tour   = TOURS_DATA.find(t => t.id === id);
  const root   = document.getElementById('tour-detail-root');

  if (!tour || !root) {
    root.innerHTML = `<div class="container" style="padding:80px 20px;text-align:center;">
      <div style="font-size:64px;margin-bottom:16px;">😔</div>
      <h2 style="font-family:var(--font-heading);margin-bottom:8px;">Không tìm thấy tour</h2>
      <p style="color:var(--text-muted);margin-bottom:24px;">Tour này không tồn tại hoặc đã hết chỗ.</p>
      <a href="tours.html" class="btn btn-primary">← Xem tất cả tours</a>
    </div>`;
    return;
  }

  // Update meta
  document.getElementById('page-title').textContent = `${tour.title} — PTX Travel`;
  document.getElementById('page-desc').content = tour.title;

  // Related tours (same category, different id)
  const related = TOURS_DATA.filter(t => t.category === tour.category && t.id !== tour.id).slice(0, 3);

  // ── Build HTML ─────────────────────────────────────────────
  root.innerHTML = `
    <!-- Page Hero -->
    <div class="page-hero">
      <div class="page-hero-bg"><img src="${tour.img}" alt="${tour.title}"/></div>
      <div class="page-hero-overlay"></div>
      <div class="container page-hero-content">
        <div class="breadcrumb">
          <a href="index.html">Trang chủ</a><span class="sep">›</span>
          <a href="tours.html">Tour Du Lịch</a><span class="sep">›</span>
          <span class="current">${tour.title}</span>
        </div>
        <h1>${tour.title}</h1>
        <p>📍 ${tour.location} &nbsp;|&nbsp; 🕐 ${tour.duration} &nbsp;|&nbsp; ⭐ ${tour.rating}/5 (${tour.reviews} đánh giá)</p>
      </div>
    </div>

    <!-- Main Layout -->
    <div class="container">
      <div class="tour-detail-layout">
        <!-- Left Column -->
        <div>
          <!-- Gallery -->
          <div class="tour-gallery reveal">
            <div class="gallery-main" id="gallery-main">
              <img src="${tour.gallery[0]}" alt="${tour.title}" id="gallery-main-img"/>
            </div>
            <div class="gallery-thumbs">
              ${tour.gallery.map((img, i) => `
                <div class="gallery-thumb${i===0?' active':''}" data-img="${img}" data-idx="${i}">
                  <img src="${img}" alt="Ảnh ${i+1}" onerror="this.src='assets/hero_banner.png'"/>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Highlights -->
          <div class="reveal" style="background:var(--primary-light);border-radius:var(--radius-lg);padding:var(--space-lg);margin-bottom:var(--space-xl);border:1px solid rgba(0,87,184,0.15);">
            <h3 style="font-family:var(--font-heading);font-size:18px;font-weight:700;color:var(--primary);margin-bottom:var(--space-md);">✨ Điểm Nổi Bật</h3>
            <ul style="list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              ${tour.highlights.map(h => `<li style="display:flex;align-items:flex-start;gap:8px;font-size:14px;color:var(--text);"><span style="color:var(--primary);font-weight:700;flex-shrink:0;">✓</span>${h}</li>`).join('')}
            </ul>
          </div>

          <!-- Tabs -->
          <div class="detail-tabs reveal">
            <button class="detail-tab active" data-tab="itinerary">📅 Lịch Trình</button>
            <button class="detail-tab" data-tab="includes">✅ Bao Gồm</button>
            <button class="detail-tab" data-tab="notes">📝 Lưu Ý</button>
            <button class="detail-tab" data-tab="reviews">⭐ Đánh Giá</button>
          </div>

          <!-- Tab: Itinerary -->
          <div class="detail-panel active reveal" id="tab-itinerary">
            <div style="margin-bottom:var(--space-lg);" id="itinerary-list">
              ${tour.itinerary.map(d => `
                <div class="itinerary-day">
                  <div class="day-num">D${d.day}</div>
                  <div class="day-content">
                    <div class="day-title">${d.title}</div>
                    <div class="day-desc">${d.content}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Tab: Includes -->
          <div class="detail-panel" id="tab-includes">
            <div class="inc-exc-grid">
              <div class="inc-exc-box">
                <h4>✅ Dịch Vụ Bao Gồm</h4>
                <ul class="inc-exc-list inc-list">${tour.includes.map(i => `<li>${i}</li>`).join('')}</ul>
              </div>
              <div class="inc-exc-box">
                <h4>❌ Không Bao Gồm</h4>
                <ul class="inc-exc-list exc-list">${tour.excludes.map(e => `<li>${e}</li>`).join('')}</ul>
              </div>
            </div>
          </div>

          <!-- Tab: Notes -->
          <div class="detail-panel" id="tab-notes">
            <div style="background:var(--bg-soft);border-radius:var(--radius-md);padding:var(--space-lg);border:1px solid var(--border);">
              <h4 style="font-weight:700;margin-bottom:var(--space-md);color:var(--text);">📝 Lưu Ý Quan Trọng</h4>
              <ul style="list-style:none;display:flex;flex-direction:column;gap:12px;">
                <li style="display:flex;gap:8px;font-size:14px;color:var(--text-muted);"><span>📌</span>Hủy trước 15 ngày: hoàn 100% | 7–14 ngày: hoàn 70% | Dưới 7 ngày: hoàn 0%</li>
                <li style="display:flex;gap:8px;font-size:14px;color:var(--text-muted);"><span>📌</span>Trẻ em dưới 2 tuổi miễn phí (không tính chỗ ngồi riêng)</li>
                <li style="display:flex;gap:8px;font-size:14px;color:var(--text-muted);"><span>📌</span>Mang theo CMND/Hộ chiếu bản gốc</li>
                <li style="display:flex;gap:8px;font-size:14px;color:var(--text-muted);"><span>📌</span>Lịch trình có thể thay đổi tùy điều kiện thời tiết</li>
                <li style="display:flex;gap:8px;font-size:14px;color:var(--text-muted);"><span>📌</span>Khởi hành đúng giờ — quý khách đến trước 15 phút</li>
                <li style="display:flex;gap:8px;font-size:14px;color:var(--text-muted);"><span>📌</span>Nhóm từ 10 người trở lên được giảm thêm 5%</li>
              </ul>
            </div>
          </div>

          <!-- Tab: Reviews -->
          <div class="detail-panel" id="tab-reviews">
            <div style="display:flex;align-items:center;gap:var(--space-xl);padding:var(--space-lg);background:var(--bg-soft);border-radius:var(--radius-lg);border:1px solid var(--border);margin-bottom:var(--space-lg);">
              <div style="text-align:center;">
                <div style="font-family:var(--font-heading);font-size:64px;font-weight:800;color:var(--primary);line-height:1;">${tour.rating}</div>
                <div class="stars" style="font-size:20px;justify-content:center;margin-top:4px;">${'★'.repeat(Math.floor(tour.rating))}</div>
                <div style="font-size:13px;color:var(--text-muted);margin-top:4px;">${tour.reviews} đánh giá</div>
              </div>
              <div style="flex:1;">
                ${[5,4,3,2,1].map(star => `
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                    <span style="font-size:13px;color:var(--text-muted);width:40px;">${star} ★</span>
                    <div style="flex:1;height:8px;background:var(--border);border-radius:99px;overflow:hidden;">
                      <div style="height:100%;background:${star>=4?'#F59E0B':'var(--border)'};border-radius:99px;width:${star===5?'78%':star===4?'15%':star===3?'5%':'1%'};"></div>
                    </div>
                    <span style="font-size:13px;color:var(--text-muted);width:30px;">${star===5?'78%':star===4?'15%':star===3?'5%':'1%'}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <!-- Sample Reviews -->
            <div style="display:flex;flex-direction:column;gap:var(--space-md);">
              ${[
                {name:'Nguyễn Thị Mai', loc:'Hà Nội', stars:5, date:'15/07/2026', text:'Tour rất tuyệt vời! Hướng dẫn viên nhiệt tình, khách sạn sạch sẽ. Sẽ đặt lại lần sau!'},
                {name:'Trần Văn Hùng', loc:'TP.HCM', stars:5, date:'10/07/2026', text:'Tổ chức chu đáo từ A đến Z. Giá cả hợp lý, dịch vụ chuyên nghiệp.'},
                {name:'Lê Phương', loc:'Đà Nẵng', stars:4, date:'05/07/2026', text:'Tour đẹp, ăn ngon. Trừ 1 sao vì xe hơi muộn giờ khởi hành 15 phút. Nhìn chung hài lòng!'}
              ].map(r => `
                <div style="background:white;border:1px solid var(--border);border-radius:var(--radius-md);padding:var(--space-lg);">
                  <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                    <div style="width:44px;height:44px;border-radius:50%;background:var(--grad-primary);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:18px;flex-shrink:0;">${r.name[0]}</div>
                    <div>
                      <div style="font-weight:700;color:var(--text);">${r.name} <span style="font-size:12px;color:var(--text-muted);font-weight:400;">📍 ${r.loc}</span></div>
                      <div style="display:flex;align-items:center;gap:8px;">
                        <span style="color:#F59E0B;font-size:14px;">${'★'.repeat(r.stars)}</span>
                        <span style="font-size:12px;color:var(--text-muted);">${r.date}</span>
                      </div>
                    </div>
                  </div>
                  <p style="font-size:14px;color:var(--text-muted);line-height:1.6;">${r.text}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div><!-- end left -->

        <!-- Booking Sidebar -->
        <div>
          <div class="booking-sidebar reveal">
            <div class="booking-sidebar-header">
              <div class="booking-price-label">Giá từ / người</div>
              <div class="booking-price-big">
                <span class="currency">₫ </span>${(tour.price/1000000).toFixed(1)} Tr
              </div>
              ${tour.priceOriginal ? `<div class="booking-price-original">₫ ${(tour.priceOriginal/1000000).toFixed(1)} Tr</div>` : ''}
              <div class="stars" style="justify-content:center;margin-top:8px;font-size:18px;">${'★'.repeat(Math.floor(tour.rating))}</div>
            </div>
            <div class="booking-sidebar-body">
              <div class="booking-info-item"><span class="bi-icon">📅</span><span class="bi-label">Thời gian</span><span class="bi-value">${tour.duration}</span></div>
              <div class="booking-info-item"><span class="bi-icon">👥</span><span class="bi-label">Số người</span><span class="bi-value">${tour.people}</span></div>
              <div class="booking-info-item"><span class="bi-icon">📍</span><span class="bi-label">Điểm đến</span><span class="bi-value">${tour.destination}</span></div>
              <div class="booking-info-item"><span class="bi-icon">🌍</span><span class="bi-label">Xuất phát</span><span class="bi-value">Hà Nội / HCM</span></div>

              <label class="departure-select-label">🗓️ Chọn ngày khởi hành</label>
              <select class="departure-select" id="departure-select">
                ${tour.departures.map(d => `<option>${d}</option>`).join('')}
              </select>

              <div style="margin-bottom:var(--space-md);">
                <label class="departure-select-label">👥 Số người tham gia</label>
                <select class="departure-select">
                  <option>2 người</option><option>3 người</option>
                  <option>4 người</option><option>5 người</option>
                  <option>6–10 người (giảm 5%)</option><option>10+ người (giảm 10%)</option>
                </select>
              </div>

              <button class="booking-cta-btn" id="book-now-btn">
                🚀 Đặt Tour Ngay
              </button>

              <div style="margin-top:var(--space-md);">
                <a href="contact.html" class="btn btn-outline" style="width:100%;justify-content:center;padding:12px;">
                  💬 Tư Vấn Miễn Phí
                </a>
              </div>

              <div class="booking-guarantee">
                🔒 Đảm bảo hoàn tiền 100% nếu không hài lòng<br>
                📞 Hỗ trợ 24/7: <strong>0210 382 5678</strong>
              </div>
            </div>
          </div>
        </div>
      </div><!-- end layout -->

      <!-- Related Tours -->
      ${related.length ? `
        <div style="margin-top:var(--space-3xl);" class="reveal">
          <div class="section-header" style="margin-bottom:var(--space-xl);">
            <div class="section-label">Có Thể Bạn Thích</div>
            <h2 class="section-title">Tour <span>Liên Quan</span></h2>
          </div>
          <div class="tours-grid">
            ${related.map(t => `
              <a href="tour-detail.html?id=${t.id}" class="tour-card" style="text-decoration:none;">
                <div class="tour-img"><img src="${t.img}" alt="${t.title}" loading="lazy" onerror="this.src='assets/hero_banner.png'"><div class="tour-img-badge">${t.badge?`<span class="badge badge-${t.badge==='hot'?'red':'green'}">${t.badgeText}</span>`:''}</div></div>
                <div class="tour-body">
                  <div class="tour-location"><span>📍</span><span>${t.location}</span></div>
                  <h3 class="tour-title">${t.title}</h3>
                  <div class="tour-footer"><div class="tour-price"><span class="tour-price-label">Giá từ</span><span class="tour-price-value"><span class="tour-price-currency">₫ </span>${(t.price/1000000).toFixed(1)} Tr</span></div><div class="stars">${'★'.repeat(Math.floor(t.rating))}</div></div>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // ── Gallery Logic ──────────────────────────────────────────
  const mainImg  = document.getElementById('gallery-main-img');
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  let   activeThumb = 0;

  document.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      mainImg.src = thumb.dataset.img;
      activeThumb = i;
    });
  });

  document.getElementById('gallery-main')?.addEventListener('click', () => {
    lbImg.src = mainImg.src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── Tabs Logic ─────────────────────────────────────────────
  document.querySelectorAll('.detail-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.detail-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`)?.classList.add('active');
    });
  });

  // ── Book Now → redirect to contact with tour info ──────────
  document.getElementById('book-now-btn')?.addEventListener('click', () => {
    const dep = document.getElementById('departure-select')?.value || '';
    window.location.href = `contact.html?tour=${encodeURIComponent(tour.title)}&date=${encodeURIComponent(dep)}`;
  });

  // Reveal
  setTimeout(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')), 100);
});
