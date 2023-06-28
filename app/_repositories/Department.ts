import { prisma } from '@/app/_utils/prismaSingleton';
import { Department } from '@prisma/client';

export namespace DepartmentRepository {
  export async function findMany() {
    const users = await prisma.department.findMany();
    return users;
  }

  export async function create(department: Department) {
    const createdDepartment = await prisma.department.create({
      data: department,
    });
    return createdDepartment;
  }
}
