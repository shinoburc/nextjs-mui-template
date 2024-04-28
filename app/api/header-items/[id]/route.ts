import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { HeaderRepository } from '@/app/_repositories/Header';
import type { HeaderItemsFormData } from '@/app/_formSchema/header_items_schema';

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const header_items: HeaderItemsFormData = await request.json();
    const updatedHeader = await HeaderRepository.update(params.id, header_items);
    return NextResponse.json(updatedHeader);
  } catch (e) {
    console.log(e);
    //return NextResponse.next({ status: 500 });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deletedHeader = await HeaderRepository.remove(params.id);
    return NextResponse.json(deletedHeader);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
