import { NextResponse } from 'next/server';

import { ThanksCardRepository } from '@/app/_repositories/ThanksCard';

export async function GET() {
  const thanksCards = await ThanksCardRepository.findMany();
  return NextResponse.json(thanksCards);
}
