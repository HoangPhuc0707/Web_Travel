'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export default function DeleteBlogButton({ slug, title }: { slug: string; title: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Bạn có chắc muốn xóa bài viết "${title}"?\nHành động này không thể hoàn tác.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        alert('Lỗi xóa bài viết: ' + (err.error || 'Unknown error'));
        return;
      }
      router.refresh();
    } catch {
      alert('Có lỗi xảy ra khi xóa bài viết');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Xóa bài viết"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
