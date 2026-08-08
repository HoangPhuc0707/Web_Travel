import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Về Chúng Tôi',
  description: 'Tìm hiểu về PTX Travel - Phú Thọ Xanh Tourist.',
};

export default function AboutPage() {
  return (
    <>
      <div className="bg-slate-900 pt-24 pb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Về <span className="text-[var(--color-primary)]">PTX Travel</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Hành trình 12 năm mang đến những trải nghiệm du lịch tuyệt vời nhất cho người Việt.
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl">
                <Image src="/assets/hero_banner.png" alt="PTX Travel Team" fill className="object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Sứ Mệnh & Tầm Nhìn</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Thành lập từ năm 2014, <strong>PTX Travel (Phú Thọ Xanh Tourist)</strong> tự hào là một trong những đơn vị lữ hành uy tín hàng đầu tại Việt Nam.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Chúng tôi không chỉ bán tour du lịch, chúng tôi mang đến những <strong>trải nghiệm, cảm xúc và kỷ niệm</strong> đáng nhớ cho mỗi khách hàng trên từng nẻo đường.
              </p>
              <ul className="flex flex-col gap-3 mt-6 text-gray-700">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-bold">✓</div>
                  Chất lượng dịch vụ là ưu tiên hàng đầu
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-bold">✓</div>
                  Giá cả cạnh tranh, minh bạch
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-bold">✓</div>
                  Đội ngũ hướng dẫn viên giàu kinh nghiệm, tận tâm
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
