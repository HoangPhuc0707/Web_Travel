'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';

export default function TourForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'Trong nước',
    location: initialData?.location || '',
    destination: initialData?.destination || '',
    duration: initialData?.duration || '3N2Đ',
    price: initialData?.price || '',
    originalPrice: initialData?.originalPrice || '',
    slots: initialData?.slots || '',
    image: initialData?.image || '',
    description: initialData?.description || '',
    isHidden: initialData?.isHidden || false,
    isNew: initialData?.isNew || false,
    featured: initialData?.featured || false,
    rating: initialData?.rating || 5.0,
    reviews: initialData?.reviews || 0,
  });

  const [includes, setIncludes] = useState<string[]>(
    initialData?.includes ? (typeof initialData.includes === 'string' ? JSON.parse(initialData.includes) : initialData.includes) : []
  );
  
  const [itinerary, setItinerary] = useState<{day: string, title: string, content: string}[]>(
    initialData?.itinerary ? (typeof initialData.itinerary === 'string' ? JSON.parse(initialData.itinerary) : initialData.itinerary) : []
  );

  const generateSlug = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
      .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
      .replace(/đ/gi, 'd')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: !initialData ? generateSlug(title) : prev.slug
    }));
  };

  const addInclude = () => setIncludes([...includes, '']);
  const updateInclude = (index: number, value: string) => {
    const newIncludes = [...includes];
    newIncludes[index] = value;
    setIncludes(newIncludes);
  };
  const removeInclude = (index: number) => {
    setIncludes(includes.filter((_, i) => i !== index));
  };

  const addItineraryDay = () => setItinerary([...itinerary, { day: `Ngày ${itinerary.length + 1}`, title: '', content: '' }]);
  const updateItinerary = (index: number, field: string, value: string) => {
    const newItin = [...itinerary];
    newItin[index] = { ...newItin[index], [field]: value };
    setItinerary(newItin);
  };
  const removeItineraryDay = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        includes,
        itinerary,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        slots: formData.slots ? Number(formData.slots) : null,
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
      };

      const url = initialData ? `/api/tours/${initialData.slug}` : '/api/tours';
      const method = initialData ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Có lỗi xảy ra');
      }

      router.push('/admin/tours');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Đang lưu...' : (initialData ? 'Cập nhật' : 'Lưu Tour mới')}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Thông tin cơ bản</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên Tour *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="VD: Phú Quốc — Đảo Ngọc Biển Tây"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Đường dẫn (Slug) *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tổng quan chuyến đi</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  placeholder="Mô tả hấp dẫn về tour..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Quyền lợi / Tiện ích (Includes)</h2>
            <div className="space-y-3">
              {includes.map((inc, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={inc}
                    onChange={(e) => updateInclude(idx, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="VD: Cam kết giá tốt nhất"
                  />
                  <button type="button" onClick={() => removeInclude(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addInclude} className="inline-flex items-center text-sm font-medium text-[var(--color-primary)] hover:text-blue-700">
                <Plus className="w-4 h-4 mr-1" /> Thêm quyền lợi
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Lịch trình chi tiết (Itinerary)</h2>
            <div className="space-y-6">
              {itinerary.map((day, idx) => (
                <div key={idx} className="p-4 border border-gray-100 bg-gray-50 rounded-xl space-y-3 relative group">
                  <button type="button" onClick={() => removeItineraryDay(idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Ngày (VD: Ngày 1)</label>
                      <input
                        type="text"
                        value={day.day}
                        onChange={(e) => updateItinerary(idx, 'day', e.target.value)}
                        className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Tiêu đề (VD: Bay Phú Quốc)</label>
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) => updateItinerary(idx, 'title', e.target.value)}
                        className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Nội dung chi tiết</label>
                    <textarea
                      rows={2}
                      value={day.content}
                      onChange={(e) => updateItinerary(idx, 'content', e.target.value)}
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                </div>
              ))}
              <button type="button" onClick={addItineraryDay} className="inline-flex items-center px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary)] w-full justify-center">
                <Plus className="w-4 h-4 mr-2" /> Thêm Ngày Lịch Trình
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Meta & Categorization */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Phân loại & Chi tiết</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh (URL) *</label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm"
                  placeholder="https://..."
                />
                {formData.image && (
                  <div className="mt-2 w-full h-32 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="Trong nước">Trong nước</option>
                    <option value="Quốc tế">Quốc tế</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    placeholder="4N3Đ"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm (Vị trí)</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  placeholder="Phú Quốc, Kiên Giang"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Điểm đến</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  placeholder="Phú Quốc"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Giá & Tình trạng</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán (VNĐ) *</label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg font-bold text-[var(--color-red)]"
                  placeholder="5500000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giá gốc (VNĐ)</label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-500"
                  placeholder="6000000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số chỗ trống</label>
                <input
                  type="number"
                  value={formData.slots}
                  onChange={(e) => setFormData({...formData, slots: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  placeholder="Để trống nếu không giới hạn"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                    className="w-4 h-4 text-[var(--color-primary)] rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Đánh dấu Tour Mới (New)</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="w-4 h-4 text-[var(--color-primary)] rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Tour Nổi bật (Trang chủ)</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.isHidden}
                    onChange={(e) => setFormData({...formData, isHidden: e.target.checked})}
                    className="w-4 h-4 text-red-500 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-red-600">Ẩn Tour này</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">SEO & Khác</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Điểm đánh giá</label>
                <input
                  type="number"
                  step="0.1"
                  min="0" max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số lượt đánh giá</label>
                <input
                  type="number"
                  value={formData.reviews}
                  onChange={(e) => setFormData({...formData, reviews: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}
