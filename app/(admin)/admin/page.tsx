import React from 'react';
import { Users, Map, ShoppingBag, FileText, ArrowUpRight, TrendingUp } from 'lucide-react';
import { getTours, getBlogs } from '@/lib/data';

export default async function AdminDashboard() {
  const tours = await getTours();
  const blogs = await getBlogs();
  
  // Stats calculation
  const totalTours = tours.length;
  const activeTours = tours.filter(t => !t.isHidden).length;
  const totalBlogs = blogs.length;
  
  const stats = [
    { title: 'Tổng số Tours', value: totalTours.toString(), change: '+12%', icon: Map, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Bookings mới', value: '45', change: '+5%', icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Khách hàng', value: '1,204', change: '+18%', icon: Users, color: 'text-violet-600', bg: 'bg-violet-100' },
    { title: 'Bài viết (Blogs)', value: totalBlogs.toString(), change: '+2%', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Tổng quan hoạt động kinh doanh PTX Travel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              <div className="flex items-center gap-1 mt-2 text-sm text-emerald-600 font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>{stat.change}</span>
              </div>
            </div>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Booking Mới Nhất</h2>
            <button className="text-sm font-medium text-[var(--color-primary)] hover:underline">Xem tất cả</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="pb-3 font-medium">Khách Hàng</th>
                  <th className="pb-3 font-medium">Tour</th>
                  <th className="pb-3 font-medium">Ngày Đặt</th>
                  <th className="pb-3 font-medium">Trạng Thái</th>
                  <th className="pb-3 font-medium text-right">Tổng Tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[1, 2, 3, 4, 5].map((_, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3">
                      <div className="font-medium text-gray-900">Nguyễn Văn A</div>
                      <div className="text-gray-500 text-xs">0912 345 678</div>
                    </td>
                    <td className="py-3 text-gray-600">Vịnh Hạ Long 3N2Đ</td>
                    <td className="py-3 text-gray-500">08/08/2026</td>
                    <td className="py-3">
                      <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Chờ thanh toán</span>
                    </td>
                    <td className="py-3 text-right font-bold text-gray-900">6.400.000đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Popular Tours */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Tour Phổ Biến</h2>
          <div className="flex flex-col gap-5">
            {tours.slice(0, 4).map((tour) => (
              <div key={tour.id} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm truncate">{tour.title}</h4>
                  <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                    <span>{tour.duration}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{new Intl.NumberFormat('vi-VN').format(Number(tour.price))}đ</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
            Quản lý tất cả Tour
          </button>
        </div>
      </div>
    </div>
  );
}
