'use client';

import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';

import { InfinityScrollListDialog } from '@/app/infinity-scroll/_components/infinity-scroll-list-dialog';
import { useRouter } from 'next/navigation';

import type { Item } from '@/app/_repositories/Item';

type InfinityScrollDialogPageProps = {
}

export default function InfinityScrollDialogPage(props: InfinityScrollDialogPageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  }

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
        {/*
        {isDialogOpen && (
          <InfinityScrollListDialog open={isDialogOpen} onClose={handleDialogClose} />
        )}
        */}
        <Typography variant='h4'>Selected Item id: {selectedItem?.id}</Typography>
        <Typography variant='h4'>Selected Item items_attr1: {selectedItem?.items_attr1}</Typography>
        <Button variant='outlined' onClick={handleDialogOpen}>Open Infinity Scroll Dialog</Button>
        <InfinityScrollListDialog open={isDialogOpen} onClose={handleDialogClose} onSelect={handleItemSelect}/>
      </Box>
    </>
  );
}