'use client';

import { Button, Dialog } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

import { InfinityScrollListDialog } from '@/app/infinity-scroll/_components/infinity-scroll-list-dialog';

type InfinityScrollPageProps = {
}

export default function InfinityScrollPage(props: InfinityScrollPageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  }

  return (
    <>
      <Button variant='outlined' onClick={handleDialogOpen}>Open Infinity Scroll Dialog</Button>
      {/*
      {isDialogOpen && (
        <InfinityScrollListDialog open={isDialogOpen} onClose={handleDialogClose} />
      )}
      */}
      <InfinityScrollListDialog open={isDialogOpen} onClose={handleDialogClose} />
    </>
  );
}