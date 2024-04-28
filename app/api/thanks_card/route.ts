import { NextResponse } from 'next/server';

import { ThanksCardRepository } from '@/app/_repositories/ThanksCard';

export const dynamic = 'force-dynamic';

export async function GET() {
  const thanksCards = await ThanksCardRepository.findMany();
  return NextResponse.json(thanksCards);
}
