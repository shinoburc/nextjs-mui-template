import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import type { Item } from '@/app/_repositories/Item';
import { ItemRepository } from '@/app/_repositories/Item';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const user = await ItemRepository.findUnique(params.id);
  return NextResponse.json(user);
}