export const dynamic = 'force-dynamic';
import React from 'react';
import prisma from '@/lib/prisma';
import { Search, Eye, CheckCircle, XCircle } from 'lucide-react';

export default async function AdminBookingsPage() {
  let bookings: any[] = [];
  try {
    bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Booking</h1>
          <p className="text-gray-500 text-sm mt-1">Quản lý danh sách khách đặt tour và thay đổi trạng thái</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm mã đặt tour, số điện thoại..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="bg-white border border-gray-200 rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              <option value="">Tất cả trạng thái</option>
              <option value="PENDING">Chờ thanh toán</option>
              <option value="PAID">Đã thanh toán</option>
              <option value="COMPLETED">Hoàn thành</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Mã Booking</th>
                <th className="px-6 py-4 font-medium">Khách Hàng</th>
                <th className="px-6 py-4 font-medium">Tên Tour</th>
                <th className="px-6 py-4 font-medium">Số Lượng</th>
                <th className="px-6 py-4 font-medium">Tổng Tiền</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Chưa có booking nào.
                  </td>
                </tr>
              ) : bookings.map((booking: any) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{booking.customerName}</div>
                    <div className="text-gray-500 text-xs">{booking.customerPhone}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="line-clamp-2 max-w-[200px]">{booking.tourName}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {booking.adults} NL {booking.children > 0 && `, ${booking.children} TE`}
                  </td>
                  <td className="px-6 py-4 font-bold text-[var(--color-red)]">
                    {new Intl.NumberFormat('vi-VN').format(booking.totalPrice)}đ
                  </td>
                  <td className="px-6 py-4">
                    {booking.status === 'PENDING' && <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Chờ thanh toán</span>}
                    {booking.status === 'PAID' && <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Đã thanh toán</span>}
                    {booking.status === 'COMPLETED' && <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Hoàn thành</span>}
                    {booking.status === 'CANCELLED' && <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Đã hủy</span>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Duyệt (Đã thanh toán)">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hủy">
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Xem chi tiết">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

