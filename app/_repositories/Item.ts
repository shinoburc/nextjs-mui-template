import { prisma } from '@/app/_utils/prismaSingleton';
import type { Prisma } from '@prisma/client';
import type { Item as _Item } from '@prisma/client';

export type Item = _Item;

export namespace ItemRepository {
  export async function findMany() {
    return await prisma.item.findMany();
  }

  export async function findUnique(id: string) {
    return await prisma.item.findUnique({
      where: {
        id: id,
      },
    });
  }

  /**
   * 
   * @param query 検索クエリ
   * @param skip? 読み込みをスキップする件数。省略時は0と同様。
   * @param take? 読み込む件数。省略時は全件取得。
   * @returns 
   */
  export async function search(query?: string, skip?: number, take?: number) {
    const where: Prisma.ItemWhereInput = query ? {
      OR: [
        {
          items_attr1: {
            contains: query,
          },
        },
        {
          items_attr2: {
            contains: query,
          },
        },
      ],
    } : {};

    return await prisma.item.findMany({
      skip,
      take,
      where
    });
  }

  export async function countByQuery(query?: string) {
    const where: Prisma.ItemWhereInput = query ? {
      OR: [
        {
          items_attr1: {
            contains: query,
          },
        },
        {
          items_attr2: {
            contains: query,
          },
        },
      ],
    } : {};

    return await prisma.item.count({
      where
    });
  }

  export async function create(item: Prisma.ItemCreateInput) {
    return await prisma.item.create({
      data: item,
    });
  }

  export async function update(id: string, item: Item) {
    return await prisma.item.update({
      where: {
        id: id,
      },
      data: {
        ...item,
      },
    });
  }

  export async function remove(id: string) {
    return await prisma.item.delete({
      where: {
        id: id,
      },
    });
  }
}
