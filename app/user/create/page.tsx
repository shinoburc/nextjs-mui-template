import UserForm from '@/app/user/_components/user-form';
import { DepartmentRepository } from '@/app/_repositories/Department';
import { RoleRepository } from '@/app/_repositories/Role';

export const dynamic = 'force-dynamic';

export default async function UserCreate() {
  const roles = await RoleRepository.findMany();
  const departments = await DepartmentRepository.findMany();

  return <UserForm departments={departments} roles={roles} onSuccessUrl='/user/' />;
}
