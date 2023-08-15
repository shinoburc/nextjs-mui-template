'use client';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';

import { AddCircle, EditCalendar, EditNote, Launch, Print, Save } from '@mui/icons-material';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { HeaderItemsFormData, headerItemsFormSchema } from '@/app/_formSchema/header_items_schema';
import type { HeaderWithItems } from '@/app/_repositories/Header';

import { HeaderForm } from './header-form';
import { ItemsFormLabel } from './items-form-label';
import { ItemsForm } from './items-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  header?: HeaderWithItems | null;
};

export function FormMain(props: Props) {
  const header = props.header;

  const router = useRouter();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // props.user が与えられていれば「編集モード(edit)」とする。
  // props.user が与えられていなれば「作成モード(create)」とする。
  let mode: 'edit' | 'create';
  if (header) {
    mode = 'edit';
  } else {
    mode = 'create';
  }
  // TODO: organizationMode により表示する項目を変更できるようにする。
  //type organizationMode = 'A' | 'B' | 'C';

  let defaultValues: HeaderItemsFormData;
  if (header) {
    defaultValues = {
      header: {
        ...header,
      },
      items: header?.items.map((item) => {
        const { id, headerId, ...withoutId } = item;
        return withoutId;
      }),
      memo: {
        message: '',
      },
    };
  } else {
    const emptyFormData = {} as HeaderItemsFormData;
    defaultValues = {
      ...emptyFormData,
      // items フォームをデフォルトで5つ表示する。
      items: [...Array(5)].map(() => ({})),
      // 上記は以下と同じ意味となる。
      /*
      items: [
        {},
        {},
        {},
        {},
        {},
      ]
      */
      memo: {
        message: '',
      },
    };
  }
  const methods = useForm({
    resolver: yupResolver(headerItemsFormSchema),
    defaultValues: defaultValues,
  });

  // useFieldArray を使用することで items 任意の数扱うことができる。
  // append で items 入力フォームが生成され、
  // remove で入力フォームを削除する。
  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control: methods.control,
  });

  const onSubmit = methods.handleSubmit(async (formData) => {
    let response: Response;
    if (mode == 'edit') {
      response = await fetch(`/api/header-items/${header?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } else {
      // mode == 'create'
      response = await fetch('/api/header-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    }
    if (response.ok) {
      console.log(await response.json());
      router.refresh();
      router.push('/header-items-list');
    } else {
      // TODO:
      //setPostError('server error');
    }
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
          {fields.map((field, index) => (
            <ItemsForm key={index} field={field} index={index} remove={remove} />
          ))}

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
              <Button variant='contained' color='primary' startIcon={<Print />}>
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
            <Grid item xs={2.0}></Grid>
            <Grid item xs={1.5}>
              <Button variant='contained' color='primary' startIcon={<EditCalendar />}>
                起票
              </Button>
            </Grid>
            <Grid item xs={2.5}>
              <Button variant='contained' color='primary' startIcon={<Launch />}>
                Direct Order
              </Button>
            </Grid>
            <Grid item xs={1.5}>
              <Button type='submit' variant='contained' color='primary' startIcon={<Save />}>
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
            <DialogContent>
              <TextField multiline rows={10} {...methods.register('memo.message')} />
            </DialogContent>
            {/* SAVE ボタンを表示する場合。*/}
            {/*
            <DialogActions>
              <Button type='submit' variant='contained' color='primary'>
                SAVE
              </Button>
            </DialogActions>
            */}
          </Dialog>
        </Box>
      </form>
    </FormProvider>
  );
}
