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
    // SQL(値は含まない)を出力する場合は以下のように設定する
    //log: ["query"],

    // SQL(値も含む)を出力する場合は以下のように設定し、
    // さらに、下部でコメントアウトしている `prisma.$on...` も有効にする
    /*
    log: [
      {
        emit: "event",
        level: "query",
      },
    ],
    */
  });

// SQL(値も含む)を出力する
/*
// @ts-ignore
prisma.$on("query", async (e: any) => {
  console.dir(`${e.query} ${e.params}`)
});
*/

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
