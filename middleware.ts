// reference: https://next-auth.js.org/configuration/nextjs#middleware
export { default } from 'next-auth/middleware';

/*
// 特定のページにのみ認証を要求する場合。
export const config = {
  matcher: "/user/:path*",
};
*/

import { Logger } from '@/app/_utils/logger';
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  Logger.info("logging point, " + request.nextUrl.pathname);
  Logger.info(request.nextUrl.toString());
}

