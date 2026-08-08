"use client";

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 15000, suffix: '+', label: 'Khách Hàng Hài Lòng', icon: '🧳' },
  { value: 50, suffix: '+', label: 'Điểm Đến Thế Giới', icon: '🗺️' },
  { value: 12, suffix: ' Năm', label: 'Kinh Nghiệm', icon: '⭐' },
  { value: 98, suffix: '%', label: 'Tỉ Lệ Hài Lòng', icon: '💬' },
];

function Counter({ value, duration = 2 }: { value: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function: easeOutExpo
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeOut * value));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(value);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function StatsSection() {
  return (
    <div className="bg-white border-b border-gray-100 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-gray-100">
          {STATS.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center px-4"
            >
              <div className="text-4xl md:text-5xl font-heading font-extrabold text-[var(--color-primary)] mb-3 flex items-center justify-center gap-2">
                <Counter value={stat.value} />
                <span className="text-3xl md:text-4xl">{stat.suffix}</span>
              </div>
              <div className="text-gray-600 font-medium flex items-center justify-center gap-2">
                <span className="text-xl">{stat.icon}</span> {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
