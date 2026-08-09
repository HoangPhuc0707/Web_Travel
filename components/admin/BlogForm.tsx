'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Upload, X, Bold, Italic, Heading2, List, Link2, Image as ImageIcon, AlignLeft } from 'lucide-react';

const CATEGORIES = ['Du lịch', 'Kinh nghiệm', 'Ẩm thực', 'Văn hóa', 'Khám phá', 'Tin tức'];

const generateSlug = (text: string) =>
  text.toString().toLowerCase()
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

interface BlogFormProps {
  initialData?: any;
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function BlogForm({ initialData, onClose, onSuccess }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    author: initialData?.author || 'Admin',
    category: initialData?.category || 'Du lịch',
    date: initialData?.date || new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    image: initialData?.image || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: !initialData ? generateSlug(title) : prev.slug,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setFormData(prev => ({ ...prev, image: data.secure_url }));
    } catch (err: any) {
      setError('Lỗi upload ảnh: ' + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const insertAtCursor = (before: string, after = '') => {
    const ta = contentRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = ta.value.substring(start, end);
    const newVal = ta.value.substring(0, start) + before + selected + after + ta.value.substring(end);
    setFormData(prev => ({ ...prev, content: newVal }));
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, label: 'In đậm', action: () => insertAtCursor('<strong>', '</strong>') },
    { icon: Italic, label: 'In nghiêng', action: () => insertAtCursor('<em>', '</em>') },
    { icon: Heading2, label: 'Tiêu đề H2', action: () => insertAtCursor('<h2>', '</h2>') },
    { icon: List, label: 'Danh sách', action: () => insertAtCursor('<ul>\n  <li>', '</li>\n</ul>') },
    { icon: Link2, label: 'Link', action: () => insertAtCursor('<a href="URL">', '</a>') },
    { icon: ImageIcon, label: 'Hình ảnh', action: () => insertAtCursor('<img src="URL" alt="Mô tả" />', '') },
    { icon: AlignLeft, label: 'Đoạn văn', action: () => insertAtCursor('<p>', '</p>') },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = initialData ? `/api/blogs/${initialData.slug}` : '/api/blogs';
      const method = initialData ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Có lỗi xảy ra');
      }
      onSuccess?.();
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        {onClose && (
          <button type="button" onClick={onClose} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Huỷ
          </button>
        )}
        <div className="flex items-center gap-3 ml-auto">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2 bg-[var(--color-primary)] text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Đang lưu...' : initialData ? 'Cập nhật bài viết' : 'Đăng bài'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button type="button" onClick={() => setError('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tiêu đề bài viết *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              required
              placeholder="Nhập tiêu đề bài viết..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (URL)</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder="ten-bai-viet"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-gray-50"
            />
            <p className="text-xs text-gray-400 mt-1">URL: /blog/<span className="font-medium text-gray-600">{formData.slug || 'ten-bai-viet'}</span></p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tóm tắt *</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Viết tóm tắt ngắn cho bài viết (hiển thị ở trang danh sách)..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nội dung bài viết *</label>
            <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 border border-gray-200 border-b-0 rounded-t-xl flex-wrap">
              {toolbarButtons.map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  type="button"
                  onClick={action}
                  title={label}
                  className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
              <div className="h-4 w-px bg-gray-300 mx-1" />
              <span className="text-xs text-gray-400 ml-1">Hỗ trợ HTML</span>
            </div>
            <textarea
              ref={contentRef}
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={18}
              placeholder="<p>Nội dung bài viết của bạn...</p>"
              className="w-full px-4 py-3 border border-gray-200 rounded-b-xl text-sm text-gray-700 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-y bg-white"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Ảnh bìa</label>
            {formData.image ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.image} alt="Cover" className="w-full h-40 object-cover rounded-xl border border-gray-200" />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[var(--color-primary)] hover:bg-blue-50 transition-all group">
                <Upload className="w-8 h-8 text-gray-300 group-hover:text-[var(--color-primary)] mb-2 transition-colors" />
                <span className="text-sm text-gray-400 group-hover:text-[var(--color-primary)] transition-colors">
                  {uploadingImage ? 'Đang upload...' : 'Click để chọn ảnh'}
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
              </label>
            )}
            <div className="mt-3">
              <input
                type="url"
                placeholder="Hoặc nhập URL ảnh..."
                value={formData.image}
                onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Thông tin bài viết</h3>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Danh mục</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Tác giả</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Ngày đăng</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
