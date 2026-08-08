const blogs = require('../js/data/blog-data.js');

module.exports = (req, res) => {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Hỗ trợ lọc data qua query parameters
  let filteredBlogs = blogs;
  const { id, slug, category } = req.query;
  
  if (id) filteredBlogs = filteredBlogs.filter(b => b.id == id);
  if (slug) filteredBlogs = filteredBlogs.filter(b => b.slug === slug);
  if (category) filteredBlogs = filteredBlogs.filter(b => b.category === category);
  
  if ((id || slug) && filteredBlogs.length === 1) {
      return res.status(200).json(filteredBlogs[0]);
  }
  
  res.status(200).json(filteredBlogs);
};
