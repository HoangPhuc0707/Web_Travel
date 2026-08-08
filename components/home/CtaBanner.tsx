"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Phone, CalendarCheck } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="py-20 relative overflow-hidden bg-[linear-gradient(135deg,var(--color-primary)_0%,#0083FF_100%)]">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-white/10 translate-x-1/3 translate-y-1/3 blur-xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-6 leading-tight">
            Sẵn Sàng Bắt Đầu <br className="hidden md:block" /> Chuyến Đi Trong Mơ Của Bạn?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Liên hệ ngay với PTX Travel để nhận tư vấn miễn phí và ưu đãi đặc biệt cho lịch trình của riêng bạn.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="red" size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-[0_8px_24px_rgba(232,25,44,0.4)]" asChild>
              <Link href="/contact">
                <CalendarCheck className="w-5 h-5 mr-2" /> Đặt Tour Ngay
              </Link>
            </Button>
            <Button 
              size="lg" 
              className="w-full sm:w-auto h-14 px-8 text-base bg-white/10 text-white border-2 border-white/30 hover:bg-white hover:text-[var(--color-primary)] hover:border-white shadow-none"
              asChild
            >
              <a href="tel:02103825678">
                <Phone className="w-5 h-5 mr-2" /> 0210 382 5678
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
