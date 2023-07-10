'use client';

import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { testFormSchema, TestFormData } from '@/app/_formSchema/test_schema';
import React from 'react';
import { Search, Delete } from '@mui/icons-material';

export function GridTest() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm({
    resolver: yupResolver(testFormSchema),
  });
  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
  });

  // A Numbers mock
  const AMockList = [
    { id: '1', number: '10023866' },
    { id: '2', number: '100234964' },
    { id: '3', number: '151854622' },
  ];
  // B Numbers mock
  const B_numbers = [
    { id: '1', label: 'A - 1230006' },
    { id: '2', label: 'A - 1230007' },
    { id: '3', label: 'B - 1530006' },
  ];
  // C mock
  const C = [
    { id: '1', label: 'test1' },
    { id: '2', label: 'test2' },
    { id: '3', label: 'test3' },
  ];

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ flexGrow: 1 }}>
        {/* Header Input Form */}
        <Grid container spacing={2} margin={0}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <Autocomplete
                {...register('a')}
                // プルダウンから値が選択されたときに実行される。
                // 次の入力項目にフォーカスを当てる
                onChange={(e) => {
                  setFocus('b');
                  //setFocus('b', { shouldSelect: true });
                }}
                // (プルダウン選択時、手入力時両方で)値が更新されたときに実行される。
                // Autocomple で入力された値が react-hook-form の値として
                // セットされないため、手動で値をセットしている。
                onInputChange={(e, newValue) => {
                  setValue('a', newValue);
                }}
                disablePortal
                // 直接入力を可能にする
                freeSolo
                // AMockList のプロパティ名を number から label に変更している。
                options={AMockList.map((obj) => ({
                  id: obj.id,
                  label: obj.number,
                }))}
                // リストの key を設定するために、
                // 値選択プルダウンをどのように表示するか設定している。
                renderOption={(props, option) => {
                  return (
                    <MenuItem {...props} key={option.id}>
                      {option.label}
                    </MenuItem>
                  );
                }}
                // 手入力時のコンポーネントを TextField として設定している。
                renderInput={(params) => (
                  <TextField
                    helperText={errors.a?.message}
                    {...params}
                    label={'a'}
                    variant='standard'
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <Autocomplete
                {...register('b')}
                onChange={(e) => {
                  setFocus('c');
                }}
                onInputChange={(e, newValue) => {
                  setValue('b', newValue);
                  //setFocus('c');
                }}
                openOnFocus
                disablePortal
                freeSolo
                options={B_numbers}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.label}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    helperText={errors.b?.message}
                    {...params}
                    label={'b'}
                    variant='standard'
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1.5}>
            <FormControl fullWidth>
              <Autocomplete
                {...register('c')}
                onChange={(e) => {
                  setFocus('d');
                }}
                onInputChange={(e, newValue) => {
                  setValue('c', newValue);
                }}
                openOnFocus
                disablePortal
                freeSolo
                options={AMockList.map((obj) => ({
                  id: obj.id,
                  label: obj.number,
                }))}
                renderOption={(props, option) => {
                  return (
                    <MenuItem {...props} key={option.id}>
                      {option.label}
                    </MenuItem>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    helperText={errors.c?.message}
                    {...params}
                    label={'c'}
                    variant='standard'
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1.5}>
            <FormControl fullWidth>
              <Autocomplete
                {...register('d')}
                onChange={(e) => {}}
                onInputChange={(e, newValue) => {
                  setValue('d', newValue);
                }}
                openOnFocus
                disablePortal
                freeSolo
                options={AMockList.map((obj) => ({
                  id: obj.id,
                  label: obj.number,
                }))}
                renderOption={(props, option) => {
                  return (
                    <MenuItem {...props} key={option.id}>
                      {option.label}
                    </MenuItem>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    helperText={errors.d?.message}
                    {...params}
                    label={'d'}
                    variant='standard'
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <span>Info1</span>
          </Grid>
        </Grid>

        {/* Header Input Form */}
        <Grid container spacing={2} margin={0}>
          <Grid item xs={1}>
            <span>Info3</span>
          </Grid>
        </Grid>

        {/* Item Header Part */}
        <Grid container spacing={2} margin={0}>
          <Grid item xs={3}>
            {/* Box 以外のアイテムヘッダに適したコンポーネントがあるかもしれない */}
            <Box>E</Box>
          </Grid>
          <Grid item xs={3}>
            <Box>F</Box>
          </Grid>
          <Grid item xs={1.5}>
            <Box>G</Box>
          </Grid>
          <Grid item xs={1.5}>
            <Box>H</Box>
          </Grid>
          <Grid item xs={1}>
            <Box>I</Box>
          </Grid>
          <Grid item xs={1}>
            <Box>J</Box>
          </Grid>
          <Grid item xs={1}>
            <Delete />
          </Grid>
        </Grid>

        {/* Item Input Part */}
        <Grid container spacing={2} margin={0}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>message here</InputLabel>
              <Input
                startAdornment={
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>

        {/* Submit */}
        <Grid container spacing={2} margin={0}>
          <Grid item xs={1}>
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
