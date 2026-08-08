// ============================================================
//  PTX TRAVEL — Footer Component
// ============================================================

(function () {
  function renderFooter() {
    const footer = document.createElement('footer');
    footer.id = 'footer';
    footer.setAttribute('aria-label', 'Footer');
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <!-- Brand -->
          <div class="footer-brand">
            <div class="footer-logo">
              <div class="footer-logo-icon">P</div>
              <div class="footer-logo-text">
                <strong>PTX Travel</strong>
                <span>Phú Thọ Xanh Tourist</span>
              </div>
            </div>
            <p class="footer-desc">
              Công ty du lịch uy tín hàng đầu tại Phú Thọ. Chuyên cung cấp tour du lịch trong nước và quốc tế với dịch vụ chuyên nghiệp, giá cạnh tranh.
            </p>
            <div class="footer-socials">
              <a href="#" class="social-btn" aria-label="Facebook">f</a>
              <a href="#" class="social-btn" aria-label="Instagram">📷</a>
              <a href="#" class="social-btn" aria-label="YouTube">▶</a>
              <a href="#" class="social-btn" aria-label="TikTok">♪</a>
              <a href="#" class="social-btn" aria-label="Zalo">Z</a>
            </div>
          </div>

          <!-- Tour Links -->
          <div class="footer-col">
            <h4>Tour Du Lịch</h4>
            <nav class="footer-links" aria-label="Tour links">
              <a href="tours.html?cat=vietnam">Tour Việt Nam</a>
              <a href="tours.html?cat=southeast-asia">Tour Đông Nam Á</a>
              <a href="tours.html?cat=international">Tour Châu Âu</a>
              <a href="tours.html?cat=international">Tour Nhật Bản</a>
              <a href="tours.html">Tour Honeymoon</a>
              <a href="tours.html">Tour Gia Đình</a>
            </nav>
          </div>

          <!-- Services -->
          <div class="footer-col">
            <h4>Dịch Vụ</h4>
            <nav class="footer-links" aria-label="Service links">
              <a href="about.html#services">Đặt Vé Máy Bay</a>
              <a href="about.html#services">Đặt Khách Sạn</a>
              <a href="about.html#services">Xin Visa</a>
              <a href="about.html#services">Thuê Xe</a>
              <a href="about.html#services">Bảo Hiểm</a>
              <a href="contact.html">Tư Vấn Tour</a>
            </nav>
          </div>

          <!-- Newsletter -->
          <div class="footer-col">
            <h4>Đăng Ký Nhận Ưu Đãi</h4>
            <p style="font-size:13px;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:16px;">
              Nhận ngay ưu đãi 10% cho tour đầu tiên khi đăng ký newsletter của PTX Travel.
            </p>
            <form class="newsletter-form" aria-label="Đăng ký newsletter">
              <input type="email" placeholder="Nhập email của bạn..." aria-label="Email" />
              <button type="submit" aria-label="Đăng ký">→</button>
            </form>
            <div style="margin-top:24px;">
              <p style="font-size:12px;color:rgba(255,255,255,0.4);margin-bottom:8px;">GCNKD: 2600000XXX | Sở KHĐT tỉnh Phú Thọ</p>
              <p style="font-size:12px;color:rgba(255,255,255,0.4);">GPKD Lữ Hành Quốc Tế: 01-GPLHQT-XXX</p>
            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <p>© 2026 PTX Travel — Phú Thọ Xanh Tourist. Bảo lưu mọi quyền.</p>
          <div class="footer-bottom-links">
            <a href="#">Chính Sách Bảo Mật</a>
            <a href="#">Điều Khoản</a>
            <a href="#">Chính Sách Hủy Tour</a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(footer);

    // Floating buttons
    const floatHTML = `
      <div class="float-contact" aria-label="Liên hệ nhanh">
        <a href="tel:02103825678" class="float-btn phone" aria-label="Gọi điện">📞</a>
        <a href="https://zalo.me/0912345678" class="float-btn zalo" aria-label="Zalo" target="_blank" rel="noopener">💬</a>
      </div>
      <button id="scroll-top" aria-label="Lên đầu trang">↑</button>
    `;
    document.body.insertAdjacentHTML('beforeend', floatHTML);

    // Newsletter
    const newsletterForm = footer.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        if (input.value) {
          input.value = '';
          input.placeholder = '✓ Đã đăng ký thành công!';
          setTimeout(() => { input.placeholder = 'Nhập email của bạn...'; }, 3000);
        }
      });
    }

    // Scroll to top
    const scrollBtn = document.getElementById('scroll-top');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFooter);
  } else {
    renderFooter();
  }
})();
