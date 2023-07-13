'use client';

import { Box, Button, Grid, IconButton } from '@mui/material';

import { AddCircle } from '@mui/icons-material';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { testFormSchema } from '@/app/_formSchema/grid_test_schema';

import { HeaderForm } from './header-form';
import { ItemsFormLabel } from './items-form-label';
import { ItemsForm } from './items-form';
import { yupResolver } from '@hookform/resolvers/yup';

export function FormMain() {
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
          {fields.map((field, index) => {
            return <ItemsForm key={index} field={field} index={index} remove={remove} />;
          })}

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
            <Grid item xs={1}>
              <Button type='submit' variant='contained' color='primary'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
}
