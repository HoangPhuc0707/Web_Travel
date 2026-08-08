'use client';

import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteTourButton({ slug, title }: { slug: string, title: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tour "${title}" không? Hành động này không thể hoàn tác.`)) {
      setIsDeleting(true);
      try {
        const res = await fetch(`/api/tours/${slug}`, {
          method: 'DELETE',
        });
        
        if (!res.ok) {
          throw new Error('Lỗi khi xoá tour');
        }

        router.refresh();
      } catch (error) {
        console.error(error);
        alert('Có lỗi xảy ra khi xoá tour.');
        setIsDeleting(false);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" 
      title="Xóa"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
