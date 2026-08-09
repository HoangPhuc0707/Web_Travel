'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Search, Edit, Eye, X } from 'lucide-react';
import BlogForm from '@/components/admin/BlogForm';
import DeleteBlogButton from '@/components/admin/DeleteBlogButton';

const CATEGORY_COLORS: Record<string, string> = {
  'Du lịch': 'bg-blue-100 text-blue-700',
  'Kinh nghiệm': 'bg-green-100 text-green-700',
  'Ẩm thực': 'bg-orange-100 text-orange-700',
  'Văn hóa': 'bg-purple-100 text-purple-700',
  'Khám phá': 'bg-teal-100 text-teal-700',
  'Tin tức': 'bg-gray-100 text-gray-700',
};

export default function AdminBlogsClient({ blogs: initialBlogs }: { blogs: any[] }) {
  const router = useRouter();
  const [blogs, setBlogs] = useState(initialBlogs);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  const filtered = blogs.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleSuccess = () => {
    setModal(null);
    setEditingBlog(null);
    router.refresh();
  };

  const openEdit = (blog: any) => {
    setEditingBlog(blog);
    setModal('edit');
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Bài Viết</h1>
            <p className="text-gray-500 text-sm mt-1">Quản lý nội dung tin tức, kinh nghiệm du lịch</p>
          </div>
          <button
            onClick={() => { setEditingBlog(null); setModal('create'); }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Viết Bài Mới
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Tìm kiếm bài viết..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <p className="text-sm text-gray-500 shrink-0">{filtered.length} / {blogs.length} bài viết</p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg font-medium mb-1">Không tìm thấy bài viết</p>
                <p className="text-sm">Hãy tạo bài viết mới hoặc thay đổi từ khóa tìm kiếm</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-medium w-12">#</th>
                    <th className="px-6 py-4 font-medium">Hình ảnh & Tiêu đề</th>
                    <th className="px-6 py-4 font-medium">Danh mục</th>
                    <th className="px-6 py-4 font-medium">Tác giả</th>
                    <th className="px-6 py-4 font-medium">Ngày Đăng</th>
                    <th className="px-6 py-4 font-medium text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((blog, idx) => (
                    <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 relative border border-gray-200">
                            {blog.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-400 text-xs font-bold">
                                Blog
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 line-clamp-1 max-w-sm">{blog.title}</div>
                            <div className="text-gray-500 text-xs mt-1 line-clamp-1 max-w-sm">{blog.excerpt}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${CATEGORY_COLORS[blog.category] || 'bg-gray-100 text-gray-600'}`}>
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{blog.author}</td>
                      <td className="px-6 py-4 text-gray-500">{blog.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-[var(--color-primary)] hover:bg-blue-50 rounded-lg transition-colors"
                            title="Xem trên web"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => openEdit(blog)}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <DeleteBlogButton slug={blog.slug} title={blog.title} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { setModal(null); setEditingBlog(null); }} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-6 p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {modal === 'create' ? 'Viết Bài Mới' : 'Chỉnh Sửa Bài Viết'}
              </h2>
              <button
                onClick={() => { setModal(null); setEditingBlog(null); }}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <BlogForm
              initialData={modal === 'edit' ? editingBlog : undefined}
              onClose={() => { setModal(null); setEditingBlog(null); }}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      )}
    </>
  );
}
