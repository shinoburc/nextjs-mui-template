import { prisma } from '@/app/_utils/prismaSingleton';
import { Prisma } from '@prisma/client';

// ThanksCardRepository.findMany(ThanksCardとUser(from, to)をjoinした結果) が返すリストの型から
// Promise を取り省いた型を export する
export type ThanksCardWithFromToList = Prisma.PromiseReturnType<
  typeof ThanksCardRepository.findMany
>;

export namespace ThanksCardRepository {
  export async function findMany() {
    return await prisma.thanksCard.findMany({
      include: {
        from: true,
        to: true,
      },
    });
  }

  export async function findUnique(id: string) {
    return await prisma.thanksCard.findUnique({
      include: {
        from: true,
        to: true,
      },
      where: {
        id: id,
      },
    });
  }
}
