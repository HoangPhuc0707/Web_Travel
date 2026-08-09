export const dynamic = 'force-dynamic';
import React from 'react';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import AdminBlogsClient from './AdminBlogsClient';

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <AdminBlogsClient blogs={blogs} />;
}
