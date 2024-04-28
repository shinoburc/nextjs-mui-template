import { NextRequest, NextResponse } from 'next/server';

import { HeaderRepository } from '@/app/_repositories/Header';

import type { HeaderItemsFormData } from '@/app/_formSchema/header_items_schema';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const header_items: HeaderItemsFormData = await request.json();
    const created_header = await HeaderRepository.create(header_items);
    return NextResponse.json(created_header);
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
