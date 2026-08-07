// ============================================================
//  PTX TRAVEL — Navbar Component
//  Injects navbar into every page automatically
// ============================================================

(function () {
  const NAV_LINKS = [
    { href: 'tours.html',        label: 'Tour Du Lịch',  labelEn: 'Tours',        icon: '✈️' },
    { href: 'destinations.html', label: 'Điểm Đến',      labelEn: 'Destinations', icon: '🗺️' },
    { href: 'about.html',        label: 'Về Chúng Tôi',  labelEn: 'About Us',     icon: '🏢' },
    { href: 'blog.html',         label: 'Blog',           labelEn: 'Blog',         icon: '📝' },
    { href: 'contact.html',      label: 'Liên Hệ',       labelEn: 'Contact',      icon: '📞' },
  ];

  function getCurrentPage() {
    const path = window.location.pathname;
    const file = path.split('/').pop() || 'index.html';
    return file;
  }

  function getRoot() {
    // Always link from root (all pages are at same level)
    return '';
  }

  function renderNavbar() {
    const currentPage = getCurrentPage();
    const root = getRoot();

    const linksHTML = NAV_LINKS.map(link => {
      const isActive = currentPage === link.href ? 'active' : '';
      return `<li><a href="${root}${link.href}" class="nav-link ${isActive}" data-i18n-vi="${link.label}" data-i18n-en="${link.labelEn}">${link.label}</a></li>`;
    }).join('');

    const mobileLinksHTML = NAV_LINKS.map(link => {
      return `<a href="${root}${link.href}" class="mobile-link">${link.icon} ${link.label}</a>`;
    }).join('');

    const navbar = document.createElement('nav');
    navbar.id = 'navbar';
    navbar.setAttribute('role', 'navigation');
    navbar.setAttribute('aria-label', 'Điều hướng chính');
    navbar.innerHTML = `
      <div class="container nav-inner">
        <!-- Logo -->
        <a href="${root}index.html" class="nav-logo" aria-label="PTX Travel - Trang chủ">
          <div class="nav-logo-icon" aria-hidden="true">P</div>
          <div class="nav-logo-text">
            <strong>PTX Travel</strong>
            <span>Phú Thọ Xanh Tourist</span>
          </div>
        </a>

        <!-- Desktop Links -->
        <ul class="nav-links" role="list">${linksHTML}</ul>

        <!-- Right Actions -->
        <div class="nav-cta">
          <div class="lang-toggle" role="group" aria-label="Chọn ngôn ngữ">
            <button class="lang-btn active" data-lang="vi" aria-label="Tiếng Việt">VI</button>
            <button class="lang-btn"        data-lang="en" aria-label="English">EN</button>
          </div>
          <a href="tel:02103825678" class="btn btn-outline" style="padding:10px 20px;font-size:14px;">📞 Hotline</a>
          <a href="${root}contact.html" class="btn btn-red" style="padding:10px 20px;font-size:14px;">Đặt Tour</a>
        </div>

        <!-- Hamburger -->
        <button id="nav-hamburger" class="nav-hamburger" aria-label="Mở menu" aria-expanded="false">
          <span class="ham-line"></span>
          <span class="ham-line"></span>
          <span class="ham-line"></span>
        </button>
      </div>
    `;

    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.setAttribute('role', 'dialog');
    mobileMenu.setAttribute('aria-label', 'Menu di động');
    mobileMenu.innerHTML = `
      ${mobileLinksHTML}
      <div style="margin-top:16px;display:flex;gap:8px;">
        <a href="tel:02103825678" class="btn btn-outline" style="flex:1;justify-content:center;">📞 Hotline</a>
        <a href="${root}contact.html" class="btn btn-red" style="flex:1;justify-content:center;">Đặt Tour</a>
      </div>
    `;

    document.body.insertBefore(mobileMenu, document.body.firstChild);
    document.body.insertBefore(navbar, mobileMenu);

    // ── Scroll Effect ──────────────────────────────────────
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');

      const scrollBtn = document.getElementById('scroll-top');
      if (scrollBtn) {
        if (window.scrollY > 400) scrollBtn.classList.add('visible');
        else scrollBtn.classList.remove('visible');
      }
    }, { passive: true });

    // ── Mobile Menu ────────────────────────────────────────
    const hamburger = document.getElementById('nav-hamburger');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // ── Language Toggle ────────────────────────────────────
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const lang = btn.dataset.lang;
        document.querySelectorAll('[data-i18n-vi]').forEach(el => {
          el.textContent = lang === 'en' ? el.dataset.i18nEn : el.dataset.i18nVi;
        });
      });
    });
  }

  // Inject on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavbar);
  } else {
    renderNavbar();
  }
})();
