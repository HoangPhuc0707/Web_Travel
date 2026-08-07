// ============================================================
//  PTX TRAVEL — Contact Page JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Pre-fill from URL params (from tour-detail) ───────────
  const params = new URLSearchParams(window.location.search);
  const tourParam = params.get('tour');
  const dateParam = params.get('date');
  if (tourParam) {
    const sel = document.getElementById('f-tour');
    if (sel) {
      const found = [...sel.options].find(o => o.value === tourParam || o.text.includes(tourParam.slice(0, 10)));
      if (found) found.selected = true;
      else { const opt = new Option(tourParam, tourParam, true, true); sel.add(opt); }
    }
  }
  if (dateParam) {
    const dateInput = document.getElementById('f-date');
    if (dateInput) {
      // Convert from "DD/MM/YYYY" to "YYYY-MM-DD"
      const parts = dateParam.split('/');
      if (parts.length === 3) dateInput.value = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
  }

  // ── FAQ Accordion ─────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Form Validation & Submit ──────────────────────────────
  const form       = document.getElementById('booking-form');
  const successMsg = document.getElementById('form-success');

  function setError(field, msg) {
    field.style.borderColor = 'var(--red)';
    field.style.boxShadow   = '0 0 0 4px rgba(232,25,44,0.1)';
    let err = field.parentElement.querySelector('.field-error');
    if (!err) {
      err = document.createElement('span');
      err.className = 'field-error';
      err.style.cssText = 'font-size:12px;color:var(--red);font-weight:500;margin-top:2px;display:block;';
      field.parentElement.appendChild(err);
    }
    err.textContent = msg;
  }

  function clearError(field) {
    field.style.borderColor = '';
    field.style.boxShadow   = '';
    field.parentElement.querySelector('.field-error')?.remove();
  }

  function validateField(f) {
    const v = f.value.trim();
    if (f.required && !v) { setError(f, 'Vui lòng điền thông tin này'); return false; }
    if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { setError(f, 'Email không hợp lệ'); return false; }
    if (f.type === 'tel' && v && !/^[\d\s\+\-\(\)]{9,}$/.test(v)) { setError(f, 'Số điện thoại không hợp lệ'); return false; }
    clearError(f); return true;
  }

  form?.querySelectorAll('input, select, textarea').forEach(f => {
    f.addEventListener('blur', () => validateField(f));
    f.addEventListener('input', () => clearError(f));
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = form.querySelectorAll('input, select, textarea');
    let valid = true;
    fields.forEach(f => { if (!validateField(f)) valid = false; });
    if (!valid) return;

    const submitBtn = form.querySelector('[type=submit]');
    const origText  = submitBtn.innerHTML;
    submitBtn.innerHTML = '⏳ Đang gửi...';
    submitBtn.disabled  = true;

    setTimeout(() => {
      form.style.display = 'none';
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.innerHTML = `
          <div style="text-align:center;padding:var(--space-2xl) var(--space-xl);">
            <div style="font-size:72px;margin-bottom:var(--space-lg);">🎉</div>
            <h3 style="font-family:var(--font-heading);font-size:28px;font-weight:800;color:var(--text);margin-bottom:12px;">Đặt Tour Thành Công!</h3>
            <p style="color:var(--text-muted);font-size:16px;line-height:1.7;margin-bottom:24px;">
              Cảm ơn bạn đã tin tưởng PTX Travel.<br>
              Chúng tôi sẽ liên hệ lại trong vòng <strong style="color:var(--primary);">30 phút</strong>.
            </p>
            <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
              <a href="tel:02103825678" class="btn btn-primary">📞 Gọi Ngay Cho Chúng Tôi</a>
              <a href="tours.html" class="btn btn-outline">🗺️ Xem Thêm Tours</a>
            </div>
          </div>
        `;
      }
    }, 1800);
  });
});
