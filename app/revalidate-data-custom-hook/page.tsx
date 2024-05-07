'use client'

import { useSWRPolling } from '@/app/_utils/hooks/useSWRPolling';

import UserList from '@/app/user/_components/user-list';
import type { UserWithRoleDepartment } from '@/app/_repositories/User';

export default function RevalidateDataCustomHook() {

  const { data: users } = useSWRPolling<UserWithRoleDepartment[]>('/api/user');

  // users がまだ取得できていなければ、画面描画を行わない。
  if (!users) return;

  return (
    <main>
      <div>
        <p>Revalidate Data Custom Hook</p>
        <UserList users={users} />
      </div>
    </main>
  );
}