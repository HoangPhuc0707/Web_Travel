export const dynamic = 'force-dynamic';
import React from 'react';
import TourForm from '@/components/admin/TourForm';

export default function CreateTourPage() {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Thêm Tour Mới</h1>
        <p className="text-gray-500 text-sm mt-1">Tạo một chuyến đi mới trên hệ thống</p>
      </div>
      <TourForm />
    </div>
  );
}

