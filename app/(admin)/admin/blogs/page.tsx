export const dynamic = 'force-dynamic';
import React from 'react';
import prisma from '@/lib/prisma';
import AdminBlogsClient from './AdminBlogsClient';

export default async function AdminBlogsPage() {
  let blogs: any[] = [];
  try {
    blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
  return <AdminBlogsClient blogs={blogs} />;
}

