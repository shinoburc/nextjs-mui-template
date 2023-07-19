'use client';

import {
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material';

import { Search, Delete } from '@mui/icons-material';

import { FieldArrayWithId, UseFieldArrayRemove, useForm, useFormContext } from 'react-hook-form';

import { headerItemsFormSchema, HeaderItemsFormData } from '@/app/_formSchema/header_items_schema';
import React from 'react';

type Props = {
  field: FieldArrayWithId<HeaderItemsFormData, 'items', 'id'>;
  index: number;
  remove: UseFieldArrayRemove;
};

export function ItemsForm({ field, index, remove }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<HeaderItemsFormData>();

  return (
    <>
      {/* Item Input Part */}
      <Grid container spacing={2} margin={0}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>items_attr1</InputLabel>
            <Input
              startAdornment={
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              }
              type='text'
              {...register(`items.${index}.items_attr1`)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField
              label='items_attr2'
              variant='standard'
              type='text'
              helperText={errors.items?.[index]?.items_attr1?.message}
              {...register(`items.${index}.items_attr2`)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1.0}>
          <FormControl fullWidth>
            <TextField label='_' variant='standard' type='text' />
          </FormControl>
        </Grid>
        <Grid item xs={1.0}>
          <FormControl fullWidth>
            <TextField label='_' variant='standard' type='text' />
          </FormControl>
        </Grid>
        <Grid item xs={1.0}>
          <FormControl fullWidth>
            <TextField label='_' variant='standard' type='text' />
          </FormControl>
        </Grid>
        <Grid item xs={1.0}>
          <FormControl fullWidth>
            <TextField label='_' variant='standard' type='text' />
          </FormControl>
        </Grid>
        <Grid item xs={0.5}>
          <IconButton
            onClick={() => {
              remove(index);
            }}
          >
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
