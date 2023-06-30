'use client';

import {
  Autocomplete,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { InputAndSelect } from './_components/input-and-select';

export default function BasicGrid() {
  // A Numbers mock
  const A_numbers = [
    { label: '10023866' },
    { label: '100234964' },
    { label: '151854622' },
  ];
  // B Numbers mock
  const B_numbers = [
    { label: 'A - 1230006' },
    { label: 'A - 1230007' },
    { label: 'B - 1530006' },
  ];
  // C mock
  const C = [
    { label: 'test1' },
    { label: 'test2' },
    { label: 'test3' },
  ];
  // D mock
  const D = [
    { label: 'test1' },
    { label: 'test2' },
    { label: 'test3' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Label */}
      <Grid container spacing={2} margin={0}>
        <Grid item xs={3} border={1}>
          <span>Work Order Number</span>
        </Grid>
        <Grid item xs={3} border={1}>
          <span>Task Card Number</span>
        </Grid>
        <Grid item xs={1} border={1}>
          <span>Zone</span>
        </Grid>
        <Grid item xs={1} border={1}>
          <span>RSN</span>
        </Grid>
        <Grid item xs={1} border={1}>
          <span></span>
        </Grid>
        <Grid item xs={1} border={1}>
          <span></span>
        </Grid>
        <Grid item xs={1} border={1}>
          <span></span>
        </Grid>
      </Grid>

      {/* Header Input Form */}
      <Grid container spacing={2} margin={0}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputAndSelect label='A Number' options={A_numbers} />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputAndSelect label='B Number' options={B_numbers} />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <FormControl fullWidth>
            <InputAndSelect label='C' options={C} />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <FormControl fullWidth>
            <InputAndSelect label='D' options={D} />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <span>Info1</span>
        </Grid>
        <Grid item xs={1}>
          <span>Info2</span>
        </Grid>
      </Grid>
      {/* Header Input Form */}
      <Grid container spacing={2} margin={0}>
        <Grid item xs={1}>
          <span>Info3</span>
        </Grid>
      </Grid>
    </Box>
  );
}
