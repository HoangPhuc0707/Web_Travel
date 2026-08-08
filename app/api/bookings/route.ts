import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate basic data
    if (!data.tourId || !data.customerName || !data.customerEmail || !data.customerPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newBooking = await prisma.booking.create({
      data: {
        tourId: data.tourId,
        tourName: data.tourName,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        adults: Number(data.adults || 1),
        children: Number(data.children || 0),
        totalPrice: Number(data.totalPrice),
        note: data.note || '',
        status: 'PENDING',
      }
    });

    // Return success response with booking ID (useful for generating QR if needed)
    return NextResponse.json({ 
      success: true, 
      message: 'Booking received successfully',
      bookingId: newBooking.id
    }, { status: 201 });

  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
