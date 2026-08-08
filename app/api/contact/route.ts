import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newContact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject || '',
        message: data.message,
        status: 'NEW',
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Contact received successfully',
      contactId: newContact.id
    }, { status: 201 });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
