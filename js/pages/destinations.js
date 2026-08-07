// ============================================================
//  PTX TRAVEL — Destinations Page JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  const DESTINATIONS = [
    { name: 'Vịnh Hạ Long', country: 'Việt Nam', region: 'vietnam', img: 'assets/tour_halong.png', tours: 12, cat: 'vietnam', desc: 'Kỳ quan thiên nhiên thế giới' },
    { name: 'Sa Pa',         country: 'Việt Nam', region: 'vietnam', img: 'assets/tour_sapa.png',   tours: 9,  cat: 'vietnam', desc: 'Ruộng bậc thang & Fansipan' },
    { name: 'Hội An',        country: 'Việt Nam', region: 'vietnam', img: 'assets/tour_hoian.png',  tours: 8,  cat: 'vietnam', desc: 'Phố cổ đèn lồng' },
    { name: 'Phú Quốc',      country: 'Việt Nam', region: 'vietnam', img: 'assets/tour_halong.png', tours: 7,  cat: 'vietnam', desc: 'Đảo ngọc biển Tây' },
    { name: 'Mũi Né',        country: 'Việt Nam', region: 'vietnam', img: 'assets/hero_banner.png', tours: 6,  cat: 'vietnam', desc: 'Cồn cát & biển xanh' },
    { name: 'Singapore',     country: 'Singapore', region: 'southeast-asia', img: 'assets/tour_singapore.png', tours: 5, cat: 'southeast-asia', desc: 'Đảo quốc sư tử' },
    { name: 'Bangkok',       country: 'Thái Lan',  region: 'southeast-asia', img: 'assets/tour_singapore.png', tours: 8, cat: 'southeast-asia', desc: 'Vàng son rực rỡ' },
    { name: 'Bali',          country: 'Indonesia', region: 'southeast-asia', img: 'assets/hero_banner.png',    tours: 4, cat: 'southeast-asia', desc: 'Đảo thần linh' },
    { name: 'Tokyo',         country: 'Nhật Bản',  region: 'east-asia', img: 'assets/tour_japan.png',        tours: 6, cat: 'international', desc: 'Thành phố tương lai & truyền thống' },
    { name: 'Seoul',         country: 'Hàn Quốc',  region: 'east-asia', img: 'assets/tour_singapore.png',    tours: 5, cat: 'international', desc: 'K-pop & ẩm thực' },
    { name: 'Paris',         country: 'Pháp',       region: 'europe', img: 'assets/tour_paris.png',           tours: 5, cat: 'international', desc: 'Thành phố ánh sáng & tình yêu' },
    { name: 'Rome',          country: 'Ý',          region: 'europe', img: 'assets/tour_paris.png',           tours: 4, cat: 'international', desc: 'Thành phố vĩnh cửu' },
  ];

  const grid = document.getElementById('dest-grid');

  function render(list) {
    if (!grid) return;
    grid.innerHTML = list.map(d => `
      <a href="tours.html?cat=${d.cat}&q=${encodeURIComponent(d.name)}" class="dest-page-card reveal">
        <img src="${d.img}" alt="${d.name}" loading="lazy" onerror="this.src='assets/hero_banner.png'"/>
        <div class="dest-page-overlay">
          <div class="dest-page-country">${d.country}</div>
          <h3 class="dest-page-name">${d.name}</h3>
          <div class="dest-page-meta">✈️ ${d.tours} tour có sẵn &nbsp;|&nbsp; ${d.desc}</div>
        </div>
        <div class="dest-page-arrow">→</div>
      </a>
    `).join('');
    setTimeout(() => grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')), 80);
  }

  render(DESTINATIONS);

  document.querySelectorAll('#dest-filters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#dest-filters .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      render(f === 'all' ? DESTINATIONS : DESTINATIONS.filter(d => d.region === f));
    });
  });
});
