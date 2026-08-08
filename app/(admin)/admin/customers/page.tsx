import React from 'react';
import prisma from '@/lib/prisma';
import { Search, Mail, Phone, MessageSquare } from 'lucide-react';

export default async function AdminCustomersPage() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Khách Hàng (CRM)</h1>
          <p className="text-gray-500 text-sm mt-1">Thông tin liên hệ, phản hồi và Subscribers</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm khách hàng..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="bg-white border border-gray-200 rounded-lg text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              <option value="">Loại thông tin</option>
              <option value="contact">Lời nhắn liên hệ</option>
              <option value="subscriber">Email nhận tin</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Khách Hàng</th>
                <th className="px-6 py-4 font-medium">Thông tin liên lạc</th>
                <th className="px-6 py-4 font-medium">Tiêu đề / Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Ngày gửi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Chưa có tin nhắn liên hệ nào. (Chức năng lưu Contact từ trang Customer chưa gọi API)
                  </td>
                </tr>
              ) : contacts.map((contact: any) => (
                <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{contact.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400" /> {contact.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{contact.subject || 'Không có tiêu đề'}</div>
                    <div className="text-gray-500 mt-1 flex items-center gap-1 text-xs">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span className="line-clamp-1 max-w-xs">{contact.message}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-right">
                    {new Date(contact.createdAt).toLocaleDateString('vi-VN')}
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
