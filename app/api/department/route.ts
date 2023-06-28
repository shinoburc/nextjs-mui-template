import { NextResponse } from 'next/server';

import { prisma } from '@/app/_utils/prismaSingleton';

export async function GET() {
  const departments = await prisma.department.findMany();
  return NextResponse.json(departments, { status: 200 });
}
