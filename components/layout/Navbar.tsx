"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '/tours', label: 'Tour Du Lịch' },
  { href: '/destinations', label: 'Điểm Đến' },
  { href: '/about', label: 'Về Chúng Tôi' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Liên Hệ' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[linear-gradient(135deg,var(--color-primary)_0%,#0083FF_100%)] text-white flex items-center justify-center font-heading font-bold text-xl shadow-md group-hover:-translate-y-1 transition-transform">
              P
            </div>
            <div className="flex flex-col">
              <strong className="text-[17px] font-bold text-gray-900 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                PTX Travel
              </strong>
              <span className="text-[12px] text-gray-500 uppercase tracking-wider font-semibold">
                Phú Thọ Xanh Tourist
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-full font-semibold text-[15px] transition-colors ${
                      isActive
                        ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)]'
                        : 'text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outline" size="default" className="py-2 px-4 text-sm" asChild>
              <a href="tel:02103825678">
                <Phone className="w-4 h-4" /> Hotline
              </a>
            </Button>
            <Button variant="red" size="default" className="py-2 px-4 text-sm" asChild>
              <Link href="/booking">Đặt Tour</Link>
            </Button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-[80px] px-6 flex flex-col h-[100dvh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-bold py-4 border-b border-gray-100 ${
                    isActive ? 'text-[var(--color-primary)]' : 'text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          
          <div className="mt-8 flex flex-col gap-4 pb-8">
            <Button variant="outline" className="w-full justify-center" asChild>
              <a href="tel:02103825678">
                <Phone className="w-5 h-5" /> 0210 382 5678
              </a>
            </Button>
            <Button variant="red" className="w-full justify-center" asChild>
              <Link href="/booking">Đặt Tour Ngay</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
