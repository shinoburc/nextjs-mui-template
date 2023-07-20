'use client';

import { useRouter } from 'next/navigation';

import type { HeaderWithItems } from '@/app/_repositories/Header';
import { Delete } from '@mui/icons-material';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { ItemsList } from './items-list';

type Props = {
  headers: HeaderWithItems[];
};

export function HeaderItemsList(props: Props) {
  const router = useRouter();

  const onDelete = async (id: string) => {
    const response = await fetch(`/api/header-items/${id}`, {
      method: 'DELETE',
    });
    router.refresh();
  };

  return (
    <>
      <span>WIP: HeaderItemsList</span>
      {props.headers.map((header, index) => (
        <Grid key={index} border={1} container spacing={2} margin={0}>
          <Grid item xs={3}>
            <Box>{header.header_attr1}</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>{header.header_attr2}</Box>
          </Grid>
          <Grid item xs={1.5}>
            <Box>{header.header_attr3}</Box>
          </Grid>
          <Grid item xs={1.5}>
            <Box>{header.header_attr4}</Box>
          </Grid>
          <Grid item xs={1.5}>
            <ItemsList items={header.items} />
          </Grid>
          <Grid item xs={1.0}>
            <IconButton
              onClick={() => {
                onDelete(header.id);
              }}
            >
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </>
  );
}
