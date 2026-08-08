"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function TourFilter({ currentCategory, currentSort }: { currentCategory: string, currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all' && value !== 'default') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sticky top-24">
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900 border-b border-gray-100 pb-2">Danh mục</h3>
        <div className="flex flex-col gap-2">
          <FilterRadio 
            label="Tất cả Tours" 
            checked={currentCategory === 'all'} 
            onChange={() => updateFilters('category', 'all')} 
          />
          <FilterRadio 
            label="Tour Việt Nam" 
            checked={currentCategory === 'vietnam'} 
            onChange={() => updateFilters('category', 'vietnam')} 
          />
          <FilterRadio 
            label="Tour Đông Nam Á" 
            checked={currentCategory === 'southeast-asia'} 
            onChange={() => updateFilters('category', 'southeast-asia')} 
          />
          <FilterRadio 
            label="Tour Quốc Tế" 
            checked={currentCategory === 'international'} 
            onChange={() => updateFilters('category', 'international')} 
          />
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-4 text-gray-900 border-b border-gray-100 pb-2">Sắp xếp theo</h3>
        <select 
          className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] block p-2.5 outline-none"
          value={currentSort}
          onChange={(e) => updateFilters('sort', e.target.value)}
        >
          <option value="default">Mặc định</option>
          <option value="price-asc">Giá: Thấp đến Cao</option>
          <option value="price-desc">Giá: Cao đến Thấp</option>
          <option value="rating">Đánh giá cao nhất</option>
        </select>
      </div>
    </div>
  );
}

function FilterRadio({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${checked ? 'border-[var(--color-primary)]' : 'border-gray-300 group-hover:border-[var(--color-primary-light)]'}`}>
        {checked && <div className="w-2.5 h-2.5 bg-[var(--color-primary)] rounded-full"></div>}
      </div>
      <span className={`text-sm ${checked ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>{label}</span>
    </label>
  );
}
