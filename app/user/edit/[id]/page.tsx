'use client'

import UserForm from '@/app/user/_components/user-form';
import type { UserWithRoleDepartment } from '@/app/_repositories/User';
import type { Department } from '@/app/_repositories/Department';
import type { Role } from '@/app/_repositories/Role';
import { fetcher } from '@/app/_utils/fetcher';
import useSWR from 'swr';

// Dynamic Segments (/user/edit/[id]) から [id] を取得する
type Props = {
  id: string;
};

export default function UserEdit({ params }: { params: Props }) {
  const { data: departments } = useSWR<Department[]>(`/api/department`, fetcher);
  const { data: roles } = useSWR<Role[]>(`/api/role`, fetcher);
  const { data: user } = useSWR<UserWithRoleDepartment>(`/api/user/${params.id}`, fetcher);

  if(!departments) return;
  if(!roles) return;
  if(!user) return;

  return <UserForm user={user} departments={departments} roles={roles} onSuccessUrl='/user/' />;
}
