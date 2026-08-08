"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { User, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export function BookingForm() {
  const searchParams = useSearchParams();
  const tourSlug = searchParams.get('tour');
  
  const [tourDetails, setTourDetails] = useState<any>(null);
  const [loadingTour, setLoadingTour] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    adults: 1,
    children: 0,
    note: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);

  useEffect(() => {
    if (tourSlug) {
      fetch('/api/tours')
        .then(res => res.json())
        .then(tours => {
          const found = tours.find((t: any) => t.slug === tourSlug);
          if (found) setTourDetails(found);
          setLoadingTour(false);
        });
    } else {
      setLoadingTour(false);
    }
  }, [tourSlug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const totalPrice = tourDetails 
    ? (Number(tourDetails.price) * formData.adults) + (Number(tourDetails.price) * 0.7 * formData.children) 
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourId: tourDetails?.slug || 'custom-tour',
          tourName: tourDetails?.title || 'Custom Tour',
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          adults: formData.adults,
          children: formData.children,
          totalPrice,
          note: formData.note
        })
      });

      const data = await res.json();
      if (res.ok) {
        setBookingSuccess({
          id: data.bookingId,
          amount: totalPrice
        });
      } else {
        alert('Có lỗi xảy ra, vui lòng thử lại!');
      }
    } catch (error) {
      alert('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingTour) {
    return <div className="text-center py-10 animate-pulse bg-gray-50 rounded-2xl">Đang tải thông tin tour...</div>;
  }

  if (bookingSuccess) {
    // Generate VietQR
    const qrUrl = `https://img.vietqr.io/image/970436-0912345678-compact2.png?amount=${bookingSuccess.amount}&addInfo=${bookingSuccess.id}&accountName=PTX TRAVEL`;

    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Đặt Tour Thành Công!</h2>
        <p className="text-gray-600 mb-8">
          Mã đặt tour của bạn là <strong className="text-gray-900">{bookingSuccess.id}</strong>. <br />
          Vui lòng thanh toán theo mã QR bên dưới để giữ chỗ. Nhân viên của PTX Travel sẽ liên hệ lại trong vòng 30 phút.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-2xl inline-block mb-8">
          <Image src={qrUrl} alt="QR Thanh toán" width={250} height={300} className="rounded-xl mx-auto" />
          <div className="mt-4 text-sm text-gray-600">
            Số tiền: <strong className="text-[var(--color-red)] text-lg">{new Intl.NumberFormat('vi-VN').format(bookingSuccess.amount)}đ</strong><br/>
            Nội dung: <strong>{bookingSuccess.id}</strong>
          </div>
        </div>
        
        <Button variant="outline" size="lg" className="w-full" onClick={() => window.location.href = '/'}>
          Về Trang Chủ
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Form */}
      <div className="w-full lg:w-2/3 bg-white rounded-3xl p-6 md:p-8 shadow-[var(--shadow-md)] border border-gray-100">
        <h2 className="font-heading font-bold text-2xl mb-6 text-gray-900 border-b border-gray-100 pb-4">Thông tin liên hệ</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Họ và tên *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all bg-gray-50/50" placeholder="Nguyễn Văn A" />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Số điện thoại *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all bg-gray-50/50" placeholder="0912 345 678" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Email *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all bg-gray-50/50" placeholder="nguyenvana@gmail.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Số người lớn</label>
              <input type="number" min="1" name="adults" value={formData.adults} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all bg-gray-50/50" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Số trẻ em (Dưới 12 tuổi)</label>
              <input type="number" min="0" name="children" value={formData.children} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all bg-gray-50/50" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-4">
            <label className="text-sm font-semibold text-gray-700">Ghi chú (Tùy chọn)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
              <textarea name="note" value={formData.note} onChange={handleChange} rows={4} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all bg-gray-50/50 resize-none" placeholder="Yêu cầu đặc biệt về khẩu phần ăn, khách sạn..."></textarea>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full mt-6 h-14 text-lg" disabled={isSubmitting}>
            {isSubmitting ? 'Đang Xử Lý...' : 'Xác Nhận Đặt Tour'}
          </Button>
        </form>
      </div>

      {/* Summary Sidebar */}
      <div className="w-full lg:w-1/3">
        <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 sticky top-24">
          <h3 className="font-heading font-bold text-xl mb-6 text-gray-900">Chi tiết thanh toán</h3>
          
          {tourDetails ? (
            <>
              <div className="flex gap-4 mb-6 border-b border-gray-200 pb-6">
                <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0">
                  <Image src={tourDetails.image} alt={tourDetails.title} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 leading-tight mb-1 line-clamp-2">{tourDetails.title}</h4>
                  <span className="text-sm text-gray-500">{tourDetails.duration}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Người lớn (x{formData.adults})</span>
                  <span className="font-semibold">{new Intl.NumberFormat('vi-VN').format(Number(tourDetails.price) * formData.adults)}đ</span>
                </div>
                {formData.children > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Trẻ em (x{formData.children})</span>
                    <span className="font-semibold">{new Intl.NumberFormat('vi-VN').format(Number(tourDetails.price) * 0.7 * formData.children)}đ</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end">
                <span className="text-gray-900 font-bold">Tổng cộng</span>
                <span className="text-2xl font-extrabold text-[var(--color-red)]">{new Intl.NumberFormat('vi-VN').format(totalPrice)}đ</span>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-sm">Đang chờ bạn chọn tour phù hợp...</p>
          )}
        </div>
      </div>
    </div>
  );
}
