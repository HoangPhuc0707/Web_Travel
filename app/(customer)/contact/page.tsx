"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsSent(true);
        setTimeout(() => {
          setIsSent(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to submit contact:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="bg-slate-900 pt-24 pb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Liên Hệ <span className="text-[var(--color-primary)]">PTX Travel</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Đừng ngần ngại liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào. Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8">Thông Tin Liên Hệ</h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Địa chỉ</h3>
                    <p className="text-gray-600 mt-1">123 Đường Nguyễn Tất Thành, TP. Việt Trì, Tỉnh Phú Thọ</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Điện thoại</h3>
                    <p className="text-gray-600 mt-1">
                      Hotline: <a href="tel:02103825678" className="text-[var(--color-primary)] hover:underline">0210 382 5678</a><br />
                      Zalo: <a href="https://zalo.me/0912345678" className="text-[var(--color-primary)] hover:underline">0912 345 678</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Email</h3>
                    <p className="text-gray-600 mt-1">
                      <a href="mailto:contact@ptxtravel.com" className="text-[var(--color-primary)] hover:underline">contact@ptxtravel.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Gửi Tin Nhắn</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                  required type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Họ và tên *" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none" 
                />
                <input 
                  required type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="Email *" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none" 
                />
                <input 
                  required type="text" name="subject" value={formData.subject} onChange={handleChange}
                  placeholder="Tiêu đề *" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none" 
                />
                <textarea 
                  required name="message" value={formData.message} onChange={handleChange} rows={5}
                  placeholder="Nội dung tin nhắn *" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none resize-none" 
                />
                <Button type="submit" size="lg" className="w-full mt-2 h-14">
                  {isSent ? 'Đã gửi thành công!' : <><Send className="w-5 h-5 mr-2" /> Gửi Tin Nhắn</>}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
