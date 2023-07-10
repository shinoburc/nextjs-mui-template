import { prisma } from '@/app/_utils/prismaSingleton';
import type { Prisma } from '@prisma/client';

export type Department = Exclude<
  Prisma.PromiseReturnType<typeof DepartmentRepository.findUnique>,
  null
>;

export namespace DepartmentRepository {
  export async function findMany() {
    const users = await prisma.department.findMany();
    return users;
  }

  export async function findUnique(id: string) {
    return await prisma.department.findUnique({
      where: {
        id: id,
      },
    });
  }

  export async function create(department: Department) {
    const createdDepartment = await prisma.department.create({
      data: department,
    });
    return createdDepartment;
  }
}
