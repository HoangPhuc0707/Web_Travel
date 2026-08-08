import React, { Suspense } from 'react';
import { BookingForm } from '@/components/booking/BookingForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đặt Tour',
  description: 'Đặt tour du lịch nhanh chóng và thanh toán tiện lợi qua mã QR.',
};

export default function BookingPage() {
  return (
    <>
      <div className="bg-slate-900 pt-24 pb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Xác Nhận <span className="text-[var(--color-primary)]">Đặt Tour</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Vui lòng điền thông tin để chúng tôi có thể phục vụ bạn tốt nhất. Đừng quên bạn đang được hỗ trợ 24/7!
          </p>
        </div>
      </div>

      <section className="section bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <Suspense fallback={<div className="text-center py-20">Đang tải biểu mẫu...</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
