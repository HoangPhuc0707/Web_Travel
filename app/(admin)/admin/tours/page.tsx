import React from 'react';
import { getTours } from '@/lib/data';
import Link from 'next/link';
import { Plus, Search, Edit, Eye } from 'lucide-react';
import DeleteTourButton from '@/components/admin/DeleteTourButton';

export default async function AdminToursPage() {
  const tours = await getTours();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Tour</h1>
          <p className="text-gray-500 text-sm mt-1">Xem, thêm, sửa, xóa các tour du lịch</p>
        </div>
        <Link 
          href="/admin/tours/create" 
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Thêm Tour Mới
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm tour..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="bg-white border border-gray-200 rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              <option value="">Tất cả danh mục</option>
              <option value="vietnam">Việt Nam</option>
              <option value="international">Quốc Tế</option>
            </select>
            <select className="bg-white border border-gray-200 rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              <option value="">Trạng thái</option>
              <option value="active">Đang hiển thị</option>
              <option value="hidden">Đã ẩn</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium w-12">#</th>
                <th className="px-6 py-4 font-medium">Hình ảnh & Tên Tour</th>
                <th className="px-6 py-4 font-medium">Thời gian</th>
                <th className="px-6 py-4 font-medium">Giá bán</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tours.map((tour, idx) => (
                <tr key={tour.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 relative border border-gray-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 line-clamp-1">{tour.title}</div>
                        <div className="text-gray-500 text-xs mt-1">{tour.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{tour.duration}</td>
                  <td className="px-6 py-4 font-bold text-[var(--color-red)]">
                    {new Intl.NumberFormat('vi-VN').format(Number(tour.price))}đ
                  </td>
                  <td className="px-6 py-4">
                    {tour.isHidden ? (
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">Đã ẩn</span>
                    ) : (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium border border-emerald-200">Hiển thị</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/tours/${tour.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-[var(--color-primary)] hover:bg-blue-50 rounded-lg transition-colors" title="Xem trên web">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link href={`/admin/tours/${tour.slug}/edit`} className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Chỉnh sửa">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <DeleteTourButton slug={tour.slug} title={tour.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>Hiển thị 1 - {tours.length} của {tours.length} tours</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded text-gray-400 cursor-not-allowed">Trước</button>
            <button className="px-3 py-1 border border-[var(--color-primary)] bg-[var(--color-primary)] text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded text-gray-400 cursor-not-allowed">Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
}
