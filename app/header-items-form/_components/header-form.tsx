'use client';

import { Autocomplete, FormControl, Grid, MenuItem, TextField } from '@mui/material';

import { useFormContext } from 'react-hook-form';

import { HeaderItemsFormData } from '@/app/_formSchema/header_items_schema';
import React from 'react';

export function HeaderForm() {
  const methods = useFormContext<HeaderItemsFormData>();

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
    <>
      <Grid container spacing={2} margin={0}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <Autocomplete
              {...methods.register('header.header_attr1')}
              // プルダウンから値が選択されたときに実行される。
              // 次の入力項目にフォーカスを当てる
              onChange={(e) => {
                methods.setFocus('header.header_attr2');
                //setFocus('header.header2', { shouldSelect: true });
              }}
              // (プルダウン選択時、手入力時両方で)値が更新されたときに実行される。
              // Autocomple で入力された値が react-hook-form の値として
              // セットされないため、手動で値をセットしている。
              onInputChange={(e, newValue) => {
                methods.setValue('header.header_attr1', newValue);
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
                  helperText={methods.formState.errors.header?.header_attr1?.message}
                  {...params}
                  label={'header.header_attr1'}
                  variant='standard'
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <Autocomplete
              {...methods.register('header.header_attr2')}
              onChange={(e) => {
                methods.setFocus('header.header_attr3');
              }}
              onInputChange={(e, newValue) => {
                methods.setValue('header.header_attr2', newValue);
                //setFocus('c');
              }}
              openOnFocus
              disablePortal
              freeSolo
              options={B_numbers}
              renderOption={(props, option) => {
                return (
                  <MenuItem {...props} key={option.id}>
                    {option.label}
                  </MenuItem>
                );
              }}
              renderInput={(params) => (
                <TextField
                  helperText={methods.formState.errors.header?.header_attr2?.message}
                  {...params}
                  label={'header.header_attr2'}
                  variant='standard'
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1.5}>
          <FormControl fullWidth>
            <Autocomplete
              {...methods.register('header.header_attr3')}
              onChange={(e) => {
                methods.setFocus('header.header_attr4');
              }}
              onInputChange={(e, newValue) => {
                methods.setValue('header.header_attr3', newValue);
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
                  helperText={methods.formState.errors.header?.header_attr3?.message}
                  {...params}
                  label={'header.header_attr3'}
                  variant='standard'
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1.5}>
          <FormControl fullWidth>
            <Autocomplete
              {...methods.register('header.header_attr4')}
              onChange={(e) => {
                //setFocus('header.header5');
              }}
              onInputChange={(e, newValue) => {
                methods.setValue('header.header_attr4', newValue);
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
                  helperText={methods.formState.errors.header?.header_attr4?.message}
                  {...params}
                  label={'header.header_attr4'}
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
    </>
  );
}
