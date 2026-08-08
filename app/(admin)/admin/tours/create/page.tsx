"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, Save, X, Image as ImageIcon } from 'lucide-react';

export default function CreateTourPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Mô phỏng tính năng upload ảnh lên Cloudinary
  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setImageUrl('/assets/tour_halong.png'); // Fake uploaded image
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/tours" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thêm Tour Mới</h1>
          <p className="text-gray-500 text-sm mt-1">Điền thông tin chi tiết cho tour du lịch mới</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-8">
        {/* Section 1: Basic Info */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">Thông Tin Cơ Bản</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Tên Tour *</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="Vịnh Hạ Long 3N2Đ - Hành Trình Tuyệt Vời..." />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Giá bán (VNĐ) *</label>
              <input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="3200000" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Giá gốc (VNĐ)</label>
              <input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="4000000" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Thời gian</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="3N2Đ" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Địa điểm</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] outline-none" placeholder="Quảng Ninh, Việt Nam" />
            </div>
          </div>
        </div>

        {/* Section 2: Image Upload Simulation */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 mb-4">Hình Ảnh Đại Diện (Cloudinary Mock)</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50 flex flex-col items-center justify-center">
            {imageUrl ? (
              <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageUrl} alt="Uploaded" className="w-full h-full object-cover" />
                <button onClick={() => setImageUrl('')} className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-blue-100 text-[var(--color-primary)] rounded-full flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <p className="text-gray-600 font-medium mb-1">Kéo thả ảnh hoặc click để chọn ảnh</p>
                <p className="text-gray-400 text-xs mb-6">Định dạng hỗ trợ: JPG, PNG, WEBP (Tối đa 5MB)</p>
                
                {/* Fake Upload Button */}
                <button 
                  onClick={handleSimulateUpload}
                  disabled={isUploading}
                  className="px-6 py-2.5 bg-white border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isUploading ? (
                    <span className="animate-pulse">Đang tải lên Cloudinary...</span>
                  ) : (
                    <><Upload className="w-4 h-4" /> Chèn ảnh</>
                  )}
                </button>
                <div className="mt-4 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded border border-amber-200 inline-block">
                  Lưu ý: Tính năng upload đang được giả lập. Cần cấu hình API Key của Cloudinary để hoạt động thật.
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-100 pt-6 flex items-center justify-end gap-4">
          <Link href="/admin/tours" className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Hủy
          </Link>
          <button className="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <Save className="w-4 h-4" />
            Lưu Tour
          </button>
        </div>

      </div>
    </div>
  );
}
