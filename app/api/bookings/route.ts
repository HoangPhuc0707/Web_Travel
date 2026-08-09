import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.customerName || !data.customerPhone) {
      return NextResponse.json({ error: 'Thiếu họ tên hoặc số điện thoại' }, { status: 400 });
    }

    // Resolve tourId: có thể nhận id thật hoặc slug
    let tourId: string | null = null;
    let tourName: string = data.tourName || 'Tour tùy chọn';

    if (data.tourId) {
      // Thử tìm bằng id trước
      let tour = await prisma.tour.findUnique({ where: { id: data.tourId } });

      // Nếu không có, thử tìm bằng slug
      if (!tour && data.tourSlug) {
        tour = await prisma.tour.findUnique({ where: { slug: data.tourSlug } });
      }

      if (tour) {
        tourId = tour.id;
        tourName = tour.title;
      }
    }

    if (!tourId) {
      return NextResponse.json(
        { error: 'Không tìm thấy tour. Vui lòng chọn lại tour từ trang danh sách.' },
        { status: 400 }
      );
    }

    const newBooking = await prisma.booking.create({
      data: {
        tourId,
        tourName,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail || null,
        adults: Number(data.adults || 1),
        children: Number(data.children || 0),
        totalPrice: Number(data.totalPrice || 0),
        note: data.note || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Đặt tour thành công!',
      bookingId: newBooking.id,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: 'Có lỗi xảy ra, vui lòng thử lại sau.' }, { status: 500 });
  }
}

