// ============================================================
//  PTX TRAVEL — Booking Form Handler
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const form       = document.getElementById('booking-form');
  const successMsg = document.getElementById('form-success');

  if (!form) return;

  // ── Field Validation ───────────────────────────────────
  function validateField(field) {
    const val = field.value.trim();
    field.style.borderColor = '';

    if (field.required && !val) {
      setError(field, 'Vui lòng điền thông tin này');
      return false;
    }

    if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setError(field, 'Email không hợp lệ');
      return false;
    }

    if (field.type === 'tel' && val && !/^[\d\s\+\-\(\)]{9,}$/.test(val)) {
      setError(field, 'Số điện thoại không hợp lệ');
      return false;
    }

    clearError(field);
    return true;
  }

  function setError(field, msg) {
    field.style.borderColor = 'var(--red)';
    field.style.boxShadow   = '0 0 0 4px rgba(232,25,44,0.1)';
    const existingMsg = field.parentElement.querySelector('.field-error');
    if (!existingMsg) {
      const err = document.createElement('span');
      err.className = 'field-error';
      err.style.cssText = 'font-size:12px;color:var(--red);font-weight:500;margin-top:2px;display:block;';
      err.textContent = msg;
      field.parentElement.appendChild(err);
    }
  }

  function clearError(field) {
    field.style.borderColor = '';
    field.style.boxShadow   = '';
    const err = field.parentElement.querySelector('.field-error');
    if (err) err.remove();
  }

  // Live validation
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => clearError(field));
  });

  // ── Submit Handler ─────────────────────────────────────
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll('input, select, textarea');
    let valid = true;

    fields.forEach(f => {
      if (!validateField(f)) valid = false;
    });

    if (!valid) return;

    // Simulate sending
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span style="display:inline-block;animation:spin 1s linear infinite">⏳</span> Đang gửi...';
    submitBtn.disabled  = true;

    setTimeout(() => {
      form.style.display = 'none';
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.innerHTML = `
          <div class="success-icon">🎉</div>
          <h3 style="font-family:var(--font-heading);font-size:22px;color:var(--text);margin-bottom:8px;">
            Đặt Tour Thành Công!
          </h3>
          <p style="color:var(--text-muted);font-size:15px;line-height:1.6;">
            Cảm ơn bạn đã liên hệ PTX Travel.<br>
            Chúng tôi sẽ phản hồi trong vòng <strong>30 phút</strong>.
          </p>
          <div style="margin-top:20px;">
            <a href="tel:02103825678" class="btn btn-primary">📞 Gọi ngay cho chúng tôi</a>
          </div>
        `;
      }
    }, 1800);
  });

});
