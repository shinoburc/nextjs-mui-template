'use client';

import { Box, Grid } from '@mui/material';

import Image from 'next/image';

export function ItemsFormLabel() {
  return (
    <>
      <Grid container spacing={2} margin={0}>
        <Grid item xs={3}>
          {/* Box 以外のアイテムヘッダに適したコンポーネントがあるかもしれない */}
          <Box>L1</Box>
        </Grid>
        <Grid item xs={3}>
          <Box>L2</Box>
        </Grid>
        <Grid item xs={1.0}>
          <Box>L3</Box>
        </Grid>
        <Grid item xs={1.0}>
          <Box>
            L4 &nbsp;
            <Image
              src='/images/logos/h1_logo01.gif'
              alt='OCC Logo'
              width={30}
              height={18}
              priority
            />
          </Box>
        </Grid>
        <Grid item xs={1.0}>
          <Box>
            L5 &nbsp;
            <Image
              src='/images/logos/h1_logo01.gif'
              alt='OCC Logo'
              width={30}
              height={18}
              priority
            />
          </Box>
        </Grid>
        <Grid item xs={1.0}>
          <Box>L6</Box>
        </Grid>
        <Grid item xs={0.5}>
          <Box>L7</Box>
        </Grid>
      </Grid>
    </>
  );
}
