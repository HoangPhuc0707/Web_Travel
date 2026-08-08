const tours = require('../js/data/tours-data.js');

module.exports = (req, res) => {
  // Allow CORS so the API can be accessed from anywhere
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Hỗ trợ lọc data qua query parameters (VD: /api/tours?category=vietnam)
  let filteredTours = tours;
  const { id, slug, category, isNew, featured } = req.query;
  
  if (id) filteredTours = filteredTours.filter(t => t.id == id);
  if (slug) filteredTours = filteredTours.filter(t => t.slug === slug);
  if (category) filteredTours = filteredTours.filter(t => t.category === category);
  if (isNew) filteredTours = filteredTours.filter(t => t.isNew === (isNew === 'true'));
  if (featured) filteredTours = filteredTours.filter(t => t.featured === (featured === 'true'));
  
  // Trả về data (nếu query id hoặc slug cụ thể và chỉ có 1 kết quả thì có thể trả về object, nhưng mặc định trả về mảng)
  if ((id || slug) && filteredTours.length === 1) {
      return res.status(200).json(filteredTours[0]);
  }
  
  res.status(200).json(filteredTours);
};
