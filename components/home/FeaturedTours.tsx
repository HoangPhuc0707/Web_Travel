"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { TourCard } from '@/components/tours/TourCard';
import Link from 'next/link';

export function FeaturedTours() {
  const [tours, setTours] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tours?featured=true')
      .then(res => res.json())
      .then(data => {
        setTours(data);
        setLoading(false);
      });
  }, []);

  const filteredTours = tours.filter(tour => {
    if (filter === 'all') return true;
    return tour.category === filter;
  });

  return (
    <section className="section bg-white" id="featured-tours">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          label="Tour Nổi Bật"
          title={<>Những <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--color-primary)_0%,#0083FF_100%)]">Hành Trình</span> Đáng Nhớ</>}
          subtitle="Khám phá bộ sưu tập tour được yêu thích nhất từ Việt Nam đến quốc tế."
        />

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>🌍 Tất Cả</FilterBtn>
          <FilterBtn active={filter === 'vietnam'} onClick={() => setFilter('vietnam')}>🇻🇳 Việt Nam</FilterBtn>
          <FilterBtn active={filter === 'southeast-asia'} onClick={() => setFilter('southeast-asia')}>🌏 Đông Nam Á</FilterBtn>
          <FilterBtn active={filter === 'international'} onClick={() => setFilter('international')}>✈️ Quốc Tế</FilterBtn>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[420px] bg-gray-100 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredTours.slice(0, 6).map((tour, idx) => (
              <motion.div
                key={tour.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <TourCard tour={tour} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="group" asChild>
            <Link href="/tours">
              Xem Tất Cả Tours <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FilterBtn({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
        active 
          ? 'bg-[var(--color-primary)] text-white shadow-md' 
          : 'bg-[var(--color-bg-alt)] text-[var(--color-primary)] border border-[var(--color-primary-light)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)]'
      }`}
    >
      {children}
    </button>
  );
}
