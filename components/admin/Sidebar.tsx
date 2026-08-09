"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Map, ShoppingBag, FileText, Users, Settings, LogOut } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Quản lý Tour', href: '/admin/tours', icon: Map },
  { name: 'Quản lý Booking', href: '/admin/bookings', icon: ShoppingBag },
  { name: 'Bài viết (Blog)', href: '/admin/blogs', icon: FileText },
  { name: 'Khách hàng', href: '/admin/customers', icon: Users },
  { name: 'Cài đặt', href: '/admin/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col fixed left-0 top-0 border-r border-slate-800 z-50">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 shrink-0">
        <Link href="/admin" className="flex items-center text-white">
          <Image 
            src="/assets/Logo/2.png" 
            alt="PTX Admin" 
            width={150} 
            height={40} 
            className="h-8 w-auto object-contain"
          />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu chính</div>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[var(--color-primary)] text-white' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
