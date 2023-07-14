'use client';

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
} from '@mui/material';

import { AddCircle, EditCalendar, EditNote, Launch, Print, Save } from '@mui/icons-material';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { testFormSchema } from '@/app/_formSchema/grid_test_schema';

import { HeaderForm } from './header-form';
import { ItemsFormLabel } from './items-form-label';
import { ItemsForm } from './items-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

export function FormMain() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const methods = useForm({
    resolver: yupResolver(testFormSchema),
    defaultValues: {
      // items フォームをデフォルトで4つ表示する。
      items: [...Array(4)].map(() => ({})),
      /*
      items: [
        {},
        {},
        {},
        {},
      ]
      */
    },
  });

  // useFieldArray を使用することで items 任意の数扱うことができる。
  // append で items 入力フォームが生成され、
  // remove で入力フォームを削除する。
  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control: methods.control,
  });

  const onSubmit = methods.handleSubmit(async (formData) => {
    console.log(formData);
  });

  // 子コンポーネントとフォーム情報を共有するために
  // FormProvider/FormContext を使用。
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          {/* Header Form */}
          <HeaderForm />

          {/* Items Form */}
          <ItemsFormLabel />
          {fields.map((field, index) => 
            <ItemsForm key={index} field={field} index={index} remove={remove} />
          )}

          {/* Submit */}
          <Grid container spacing={2} margin={0}>
            <Grid item xs={1}>
              <IconButton
                onClick={() => {
                  append({ items_attr1: '', items_attr2: '' });
                }}
              >
                <AddCircle />
              </IconButton>
            </Grid>
            <Grid item xs={1.5}>
              <Button
                variant='contained'
                color='primary'
                startIcon={<Print />}
              >
                Printer
              </Button>
            </Grid>
            <Grid item xs={1.5}>
              <Button
                variant='contained'
                color='primary'
                startIcon={<EditNote />}
                onClick={() => {
                  setDialogIsOpen(true);
                }}
              >
                メモ
              </Button>
            </Grid>
            <Grid item xs={2.0}>
            </Grid>
            <Grid item xs={1.5}>
              <Button
                variant='contained'
                color='primary'
                startIcon={<EditCalendar />}
              >
                起票
              </Button>
            </Grid>
            <Grid item xs={2.5}>
              <Button
                variant='contained'
                color='primary'
                startIcon={<Launch />}
              >
                Direct Order
              </Button>
            </Grid>
            <Grid item xs={1.5}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                startIcon={<Save />}
              >
                保存
              </Button>
            </Grid>
          </Grid>
          <Dialog
            onClose={() => {
              setDialogIsOpen(false);
            }}
            open={dialogIsOpen}
          >
            <DialogTitle>メモ</DialogTitle>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
                overflow: 'auto', // for scrollable
              }}
            >
              <TextField
                label='Memo'
                multiline
                rows={10}
                {...methods.register('memo.message')}
              />
            </Paper>
            <Button type='submit' variant='contained' color='primary'>
              SAVE
            </Button>
          </Dialog>
        </Box>
      </form>
    </FormProvider>
  );
}