"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';

const DESTINATIONS = [
  {
    id: 1,
    title: 'Hạ Long',
    image: '/assets/tour_halong.png',
    toursCount: 12,
    className: 'md:col-span-2 md:row-span-2 h-[400px]',
  },
  {
    id: 2,
    title: 'Sa Pa',
    image: '/assets/tour_sapa.png',
    toursCount: 8,
    className: 'md:col-span-1 md:row-span-1 h-[192px]',
  },
  {
    id: 3,
    title: 'Phú Quốc',
    image: '/assets/tour_halong.png', // Fallback image for now
    toursCount: 15,
    className: 'md:col-span-1 md:row-span-1 h-[192px]',
  },
  {
    id: 4,
    title: 'Đà Nẵng',
    image: '/assets/tour_sapa.png', // Fallback
    toursCount: 10,
    className: 'md:col-span-2 md:row-span-1 h-[192px]',
  },
];

export function DestinationsGrid() {
  return (
    <section className="section bg-[var(--color-bg-soft)]">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          label="Điểm Đến Hot"
          title={<>Tới Những Chân Trời <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--color-primary)_0%,#0083FF_100%)]">Mới Lạ</span></>}
          subtitle="Khám phá các điểm đến được yêu thích nhất trong và ngoài nước."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-2xl overflow-hidden group ${dest.className}`}
            >
              <Link href={`/tours?destination=${dest.title}`} className="block w-full h-full">
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-heading font-bold mb-1">{dest.title}</h3>
                  <span className="text-sm text-gray-300">{dest.toursCount} Tours</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
