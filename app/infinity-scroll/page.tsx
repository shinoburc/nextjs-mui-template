'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

type InfinityScrollPageProps = {
}

export default function InfinityScrollPage(props: InfinityScrollPageProps) {
  const router = useRouter();

  return (
    <>
      <Button variant='outlined' onClick={() => router.push('/infinity-scroll/normal')}>Infinity Scroll List Normal</Button>
      <Button variant='outlined' onClick={() => router.push('/infinity-scroll/dialog')}>Infinity Scroll List Dialog</Button>
    </>
  );
}