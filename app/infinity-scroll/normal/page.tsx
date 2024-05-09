'use client';

import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';

import { InfinityScrollList } from '@/app/infinity-scroll/_components/infinity-scroll-list';
import { useRouter } from 'next/navigation';

import type { Item } from '@/app/_repositories/Item';

type InfinityScrollNormalPageProps = {
}

export default function InfinityScrollNormal(props: InfinityScrollNormalPageProps) {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);

  const handleItemSelect = (selectedItem: Item) => {
    setSelectedItem(selectedItem);
  }

  return (
    <>
      <Box>
        <Button variant='outlined' onClick={() => router.push('/infinity-scroll')}>Back</Button>
      </Box>
      <Divider />
      <Box>
        <Typography variant='h4'>Selected Item id: {selectedItem?.id}</Typography>
        <Typography variant='h4'>Selected Item items_attr1: {selectedItem?.items_attr1}</Typography>
        <InfinityScrollList onSelect={handleItemSelect}/>
      </Box>
    </>
  );
}