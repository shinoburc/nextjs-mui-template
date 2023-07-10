import { prisma } from '@/app/_utils/prismaSingleton';
import type { Prisma } from '@prisma/client';
import type { User as _User } from '@prisma/client';

export type User = _User;

export type UserWithRoleDepartment = Exclude<
  Prisma.PromiseReturnType<typeof UserRepository.findUnique>,
  null
>;

export namespace UserRepository {
  export async function findMany() {
    return await prisma.user.findMany({
      include: {
        role: true,
        department: true,
      },
    });
  }

  export async function findUnique(id: string) {
    return await prisma.user.findUnique({
      include: {
        role: true,
        department: true,
      },
      where: {
        id: id,
      },
    });
  }

  export async function create(user: User) {
    return await prisma.user.create({
      data: user,
    });
  }

  export async function update(id: string, user: User) {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...user,
      },
    });
  }

  export async function remove(id: string) {
    return await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
