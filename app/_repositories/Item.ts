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
