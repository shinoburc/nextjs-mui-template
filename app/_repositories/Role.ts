import { prisma } from '@/app/_utils/prismaSingleton';
import { Role } from '@prisma/client';

export namespace RoleRepository {
  export async function findMany() {
    const users = await prisma.role.findMany();
    return users;
  }

  export async function create(role: Role) {
    const createdRole = await prisma.role.create({
      data: role,
    });
    return createdRole;
  }
}
