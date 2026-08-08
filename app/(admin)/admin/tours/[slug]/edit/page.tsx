import React from 'react';
import TourForm from '@/components/admin/TourForm';
import { getTours } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function EditTourPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const tours = await getTours();
  const tour = tours.find((t) => t.slug === slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa Tour</h1>
        <p className="text-gray-500 text-sm mt-1">Cập nhật thông tin chuyến đi: {tour.title}</p>
      </div>
      <TourForm initialData={tour} />
    </div>
  );
}
