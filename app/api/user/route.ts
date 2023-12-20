import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import type { User } from '@/app/_repositories/User';
import { UserRepository } from '@/app/_repositories/User';

export async function GET(request: NextRequest) {
  const users = await UserRepository.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  try {
    const user: User = await request.json();
    const createdUser = UserRepository.create(user);
    return NextResponse.json(createdUser);
  } catch (e) {
    //return NextResponse.next({ status: 500 });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
