'use client';

import { useRouter } from 'next/navigation';

import type { Item } from '@/app/_repositories/Item';
import { Close, Delete } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Toolbar,
} from '@mui/material';
import { useState } from 'react';

type Props = {
  items: Item[];
};

export function ItemsList(props: Props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Show Items
      </Button>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
              <Close />
            </IconButton>
            <Box>Items List</Box>
          </Toolbar>
        </AppBar>
        {props.items.map((item, index) => (
          <Grid key={index} border={1} container spacing={2} margin={0}>
            <Grid item xs={3}>
              <Box>{item.id}</Box>
            </Grid>
            <Grid item xs={3}>
              <Box>{item.items_attr1}</Box>
            </Grid>
            <Grid item xs={3}>
              <Box>{item.items_attr2}</Box>
            </Grid>
          </Grid>
        ))}
        {/*
        <DialogActions>
          <Button onClick={() => handleClose()}>CLOSE</Button>
        </DialogActions>
        */}
      </Dialog>
    </>
  );
}
