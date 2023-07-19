import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { HeaderRepository } from '@/app/_repositories/Header';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deletedHeader = await HeaderRepository.remove(params.id);
    return NextResponse.json(deletedHeader);
  } catch (e) {
    console.log(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
