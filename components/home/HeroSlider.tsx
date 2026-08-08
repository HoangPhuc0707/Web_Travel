"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const SLIDES = [
  { image: '/assets/hero_banner.png', alt: 'Vẻ đẹp Việt Nam' },
  { image: '/assets/tour_halong.png', alt: 'Vịnh Hạ Long' },
  { image: '/assets/tour_sapa.png', alt: 'Sa Pa' },
  { image: '/assets/tour_paris.png', alt: 'Paris' },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] max-h-[900px] overflow-hidden flex items-center justify-center">
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={SLIDES[currentSlide].image}
              alt={SLIDES[currentSlide].alt}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"></div>
      </div>

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 text-center mt-12 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold mb-6">
            <span className="text-xl">✈</span> Khám Phá Thế Giới Cùng PTX Travel
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 drop-shadow-lg">
            Hành Trình <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,#0057B8_0%,#0083FF_100%)] drop-shadow-none">Tuyệt Vời</span><br/>Bắt Đầu Từ Đây
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 drop-shadow-md">
            Chúng tôi mang đến những trải nghiệm du lịch đáng nhớ, từ vẻ đẹp Việt Nam đến những điểm đến kỳ thú trên toàn thế giới.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = '/tours'}>
              <MapPin className="w-5 h-5" /> Khám Phá Tours
            </Button>
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-white/15 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white hover:text-black hover:border-white shadow-none"
              onClick={() => window.location.href = '/contact'}
            >
              <PhoneIcon className="w-5 h-5" /> Tư Vấn Miễn Phí
            </Button>
          </div>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl md:rounded-full p-4 md:p-3 shadow-2xl flex flex-col md:flex-row items-center gap-4 max-w-5xl mx-auto text-left"
        >
          <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full">
            <MapPin className="text-[var(--color-primary)] w-6 h-6 shrink-0" />
            <div className="w-full">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Điểm đến</label>
              <input type="text" placeholder="Tìm điểm đến, tour..." className="w-full outline-none font-semibold text-gray-900 placeholder:font-normal placeholder:text-gray-400" />
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200"></div>
          
          <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full border-t md:border-none border-gray-100 pt-4 md:pt-2">
            <Calendar className="text-[var(--color-primary)] w-6 h-6 shrink-0" />
            <div className="w-full">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Ngày khởi hành</label>
              <input type="date" className="w-full outline-none font-semibold text-gray-900" />
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200"></div>
          
          <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full border-t md:border-none border-gray-100 pt-4 md:pt-2">
            <Users className="text-[var(--color-primary)] w-6 h-6 shrink-0" />
            <div className="w-full">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Số người</label>
              <select className="w-full outline-none font-semibold text-gray-900 bg-transparent appearance-none">
                <option>2 người</option>
                <option>3-5 người</option>
                <option>6-10 người</option>
                <option>10+ người</option>
              </select>
            </div>
          </div>
          
          <Button variant="red" size="lg" className="w-full md:w-auto h-14 rounded-xl md:rounded-full px-8 shrink-0">
            <Search className="w-5 h-5" /> Tìm Tour
          </Button>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === idx ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
