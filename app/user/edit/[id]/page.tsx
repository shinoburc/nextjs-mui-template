import UserForm from '@/app/user/_components/user-form';
import { UserRepository } from '@/app/_repositories/User';
import { DepartmentRepository } from '@/app/_repositories/Department';
import { RoleRepository } from '@/app/_repositories/Role';

// Dynamic Segments (/user/edit/[id]) から [id] を取得する
type Props = {
  id: string;
};

export default async function UserEdit({ params }: { params: Props }) {
  const user = await UserRepository.findUnique(params.id);
  const roles = await RoleRepository.findMany();
  const departments = await DepartmentRepository.findMany();

  return <UserForm user={user} departments={departments} roles={roles} onSuccessUrl='/user/' />;
}
