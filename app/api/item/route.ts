import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { ItemRepository } from '@/app/_repositories/Item';

// 強制的に dynamic にする
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const item = await ItemRepository.findUnique(params.id);
  return NextResponse.json(item);
}