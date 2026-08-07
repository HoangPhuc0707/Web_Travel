// ============================================================
//  PTX TRAVEL — Blog Detail Page JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id     = parseInt(params.get('id'), 10);
  const post   = BLOG_DATA.find(b => b.id === id);
  const root   = document.getElementById('blog-detail-root');

  if (!post || !root) {
    root.innerHTML = `<div class="container" style="padding:80px 20px;text-align:center;">
      <div style="font-size:64px;margin-bottom:16px;">😔</div>
      <h2>Không tìm thấy bài viết</h2>
      <a href="blog.html" class="btn btn-primary" style="margin-top:20px;">← Xem tất cả bài viết</a>
    </div>`;
    return;
  }

  document.getElementById('page-title').textContent = `${post.title} — PTX Travel Blog`;
  document.getElementById('page-desc').content = post.excerpt;

  const related = BLOG_DATA.filter(b => b.category === post.category && b.id !== post.id).slice(0, 3);

  // Extract h2 headings for TOC
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = post.content;
  const headings = [...tempDiv.querySelectorAll('h2')].map((h, i) => ({
    id: `heading-${i}`,
    text: h.textContent
  }));

  // Add IDs to headings in content
  let contentHTML = post.content;
  headings.forEach((h, i) => {
    contentHTML = contentHTML.replace(`<h2>${h.text}</h2>`, `<h2 id="heading-${i}">${h.text}</h2>`);
  });

  root.innerHTML = `
    <!-- Page Hero -->
    <div class="page-hero">
      <div class="page-hero-bg"><img src="${post.img}" alt="${post.title}"/></div>
      <div class="page-hero-overlay"></div>
      <div class="container page-hero-content">
        <div class="breadcrumb">
          <a href="index.html">Trang chủ</a><span class="sep">›</span>
          <a href="blog.html">Blog</a><span class="sep">›</span>
          <span class="current">${post.categoryLabel}</span>
        </div>
        <h1 style="font-size:clamp(22px,3vw,38px);">${post.title}</h1>
        <div class="breadcrumb" style="margin-top:12px;">
          <span>✍️ ${post.author}</span>
          <span class="sep">|</span>
          <span>📅 ${post.date}</span>
          <span class="sep">|</span>
          <span>⏱ ${post.readTime} phút đọc</span>
          <span class="sep">|</span>
          <span>👁 ${(post.views/1000).toFixed(1)}k lượt xem</span>
        </div>
      </div>
    </div>

    <div class="container" style="padding-bottom:var(--space-3xl);">
      <div class="blog-detail-layout">
        <!-- Article -->
        <article>
          <!-- TOC -->
          ${headings.length ? `
            <div class="toc reveal">
              <div class="toc-title">📋 Mục Lục</div>
              <ol class="toc-list">
                ${headings.map(h => `<li><a href="#${h.id}">${h.text}</a></li>`).join('')}
              </ol>
            </div>
          ` : ''}

          <!-- Content -->
          <div class="article-content reveal">${contentHTML}</div>

          <!-- Tags -->
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:var(--space-xl);padding-top:var(--space-lg);border-top:1px solid var(--border);">
            <span style="font-size:14px;font-weight:600;color:var(--text-muted);padding-top:2px;">🏷️ Tags:</span>
            ${post.tags.map(tag => `<a href="blog.html" class="blog-tag">${tag}</a>`).join('')}
          </div>

          <!-- Share -->
          <div class="article-share reveal">
            <span class="share-label">📢 Chia sẻ bài viết:</span>
            <a class="share-btn facebook" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener">Facebook</a>
            <a class="share-btn twitter"  href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}" target="_blank" rel="noopener">Twitter</a>
            <a class="share-btn zalo"    href="#">Zalo</a>
          </div>

          <!-- Author Box -->
          <div class="reveal" style="display:flex;align-items:center;gap:var(--space-lg);background:var(--bg-soft);border-radius:var(--radius-lg);padding:var(--space-xl);border:1px solid var(--border);margin-top:var(--space-xl);">
            <div style="width:72px;height:72px;border-radius:50%;background:var(--grad-primary);display:flex;align-items:center;justify-content:center;color:white;font-family:var(--font-heading);font-size:28px;font-weight:800;flex-shrink:0;">${post.author[0]}</div>
            <div>
              <div style="font-family:var(--font-heading);font-size:18px;font-weight:700;color:var(--text);margin-bottom:4px;">${post.author}</div>
              <div style="font-size:13px;color:var(--primary);font-weight:600;margin-bottom:8px;">Chuyên gia Du lịch PTX Travel</div>
              <p style="font-size:14px;color:var(--text-muted);line-height:1.6;">Chuyên viên tư vấn du lịch với nhiều năm kinh nghiệm, đam mê khám phá và chia sẻ những bí kíp du lịch bổ ích.</p>
            </div>
          </div>

          <!-- Related Posts -->
          ${related.length ? `
            <div style="margin-top:var(--space-2xl);" class="reveal">
              <h3 style="font-family:var(--font-heading);font-size:22px;font-weight:700;color:var(--text);margin-bottom:var(--space-lg);">📚 Bài Viết Liên Quan</h3>
              <div style="display:flex;flex-direction:column;gap:var(--space-md);">
                ${related.map(b => `
                  <a href="blog-detail.html?id=${b.id}" style="display:flex;gap:var(--space-md);align-items:center;padding:var(--space-md);background:white;border:1px solid var(--border);border-radius:var(--radius-md);text-decoration:none;transition:all var(--t-med);" onmouseover="this.style.borderColor='var(--primary)';this.style.background='var(--primary-light)';" onmouseout="this.style.borderColor='var(--border)';this.style.background='white';">
                    <div style="width:80px;height:60px;border-radius:var(--radius-sm);overflow:hidden;flex-shrink:0;">
                      <img src="${b.img}" alt="${b.title}" onerror="this.src='assets/hero_banner.png'" style="width:100%;height:100%;object-fit:cover;"/>
                    </div>
                    <div>
                      <div style="font-size:14px;font-weight:600;color:var(--text);line-height:1.4;">${b.title}</div>
                      <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">📅 ${b.date} • ⏱ ${b.readTime} phút</div>
                    </div>
                  </a>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </article>

        <!-- Sidebar -->
        <aside class="blog-sidebar">
          <!-- Featured Tour CTA -->
          <div class="blog-sidebar-widget" style="background:var(--grad-primary);color:white;border-color:transparent;text-align:center;">
            <div style="font-size:36px;margin-bottom:12px;">✈️</div>
            <h4 style="font-size:18px;font-weight:700;margin-bottom:8px;">Sẵn Sàng Lên Đường?</h4>
            <p style="font-size:13px;opacity:.85;line-height:1.6;margin-bottom:16px;">Liên hệ PTX Travel để được tư vấn tour phù hợp với bài viết này.</p>
            <a href="tours.html" class="btn" style="background:white;color:var(--primary);font-weight:700;width:100%;justify-content:center;padding:12px;">🗺️ Xem Tours</a>
          </div>

          <!-- Categories -->
          <div class="blog-sidebar-widget">
            <div class="widget-title">📂 Danh Mục</div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${['Tất Cả','Du Lịch Trong Nước','Đông Nam Á','Quốc Tế'].map((cat, i) => {
                const count = i === 0 ? BLOG_DATA.length : BLOG_DATA.filter(b => b.categoryLabel === cat).length;
                return `<a href="blog.html" style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);font-size:14px;color:var(--text);text-decoration:none;transition:color var(--t-fast);" onmouseover="this.style.color='var(--primary)';" onmouseout="this.style.color='var(--text)';">${cat}<span style="background:var(--primary-light);color:var(--primary);font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;">${count}</span></a>`;
              }).join('')}
            </div>
          </div>

          <!-- Tags -->
          <div class="blog-sidebar-widget">
            <div class="widget-title">🏷️ Tags</div>
            <div class="tag-cloud">
              ${[...new Set(BLOG_DATA.flatMap(b => b.tags))].slice(0, 15).map(tag => `<a href="blog.html" class="blog-tag">${tag}</a>`).join('')}
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;

  setTimeout(() => root.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')), 100);
});
