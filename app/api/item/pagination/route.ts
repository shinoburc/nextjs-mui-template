import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import type { Item } from '@/app/_repositories/Item';
import { ItemRepository } from '@/app/_repositories/Item';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query") ?? undefined;
  const skip = Number(request.nextUrl.searchParams.get("skip"));
  const take = Number(request.nextUrl.searchParams.get("take"));

  //console.log(query);
  //console.log(skip);
  //console.log(take);

  const items = await ItemRepository.search(query, skip, take);
  return NextResponse.json(items);
}