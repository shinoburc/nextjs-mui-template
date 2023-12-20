'use client'

//import { useEffect, useState } from 'react'

import useSWR from 'swr';
import type { SWRConfiguration } from 'swr';

import UserList from '@/app/user/_components/user-list';
import type { UserWithRoleDepartment } from '@/app/_repositories/User';
import { fetcher }  from '@/app/_utils/fetcher';

export default function RevalidateData() {

  const config: SWRConfiguration = {
    // 5000ミリ秒(5秒)間隔で API をポーリングし、データが更新されていれば、
    // データを再取得し、画面に再描画される。
    refreshInterval: 5000,

    // fallbackDataでサーバー側でレンダリング(SSR)する際のデータを指定できる。
    // サーバーでレンダリングされたHTMLをブラウザが読み込んで表示するので、APIをリクエストする前に表示が完了する。
    // https://swr.vercel.app/ja/docs/with-nextjs#pre-rendering-with-default-data
    fallbackData: [], 
  };
  const { data: users } = useSWR<UserWithRoleDepartment[]>('/api/user', fetcher, config);

  // users がまだ取得できていなければ、画面描画を行わない。
  if (!users) return;

  return (
    <main>
      <div>
        <p>Revalidate Data</p>
        <UserList users={users} />
      </div>
    </main>
  );
}