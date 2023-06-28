import { PrismaClient } from '@prisma/client';

// ページがリロードされるたびに PrismaClient インスタンスが生成され、
// それらが DB 接続をして「 FATAL: too many connections」となることを抑制するため
// PrismaClient のインスタンスをシングルトンにするための処理。

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    //log: ["query"],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
