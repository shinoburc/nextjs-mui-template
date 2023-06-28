import { NextResponse } from 'next/server';

import { prisma } from '@/app/_utils/prismaSingleton';

export async function GET() {
  const roles = await prisma.role.findMany();
  return NextResponse.json(roles, { status: 200 });
}
