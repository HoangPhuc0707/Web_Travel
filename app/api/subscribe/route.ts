import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Upsert to handle unique email gracefully
    await prisma.subscriber.upsert({
      where: { email: data.email },
      update: {},
      create: { email: data.email }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Subscribed successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Subscribe API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
