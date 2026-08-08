"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

interface StickyCTAProps {
  tour: any;
}

export function StickyBookingCTA({ tour }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hiện CTA khi scroll qua một khoảng nhất định (ví dụ 400px)
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-50 py-3 lg:hidden"
        >
          <div className="container mx-auto px-4 flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Giá chỉ từ</span>
              <strong className="text-lg font-bold text-[var(--color-red)] leading-none">
                {formatPrice(tour.price)}
              </strong>
            </div>
            
            <Button variant="red" size="default" className="px-6 whitespace-nowrap shadow-md" asChild>
              <Link href={`/booking?tour=${tour.slug}`}>
                <Calendar className="w-4 h-4 mr-1.5" /> Đặt Ngay
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
