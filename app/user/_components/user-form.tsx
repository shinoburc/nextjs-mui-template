'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';

import { userFormSchema, UserFormData } from '@/app/_formSchema/user';

import type { User } from '@/app/_repositories/User';
import type { Role } from '@/app/_repositories/Role';
import type { Department } from '@/app/_repositories/Department';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

type Props = {
  user?: User | null;
  roles: Role[];
  departments: Department[];
  onSuccessUrl: string;
};

export default function UserForm(props: Props) {
  const user = props.user;
  const roles = props.roles;
  const departments = props.departments;
  const onSuccessUrl = props.onSuccessUrl;

  const router = useRouter();

  // props.user が与えられていれば「編集モード(edit)」とする。
  // props.user が与えられていなれば「作成モード(create)」とする。
  let mode: 'edit' | 'create';
  if (user) {
    mode = 'edit';
  } else {
    mode = 'create';
  }

  const [postError, setPostError] = React.useState<string>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    //  } = useForm<IFormInputs>({
  } = useForm({
    resolver: yupResolver(userFormSchema),
    defaultValues: { ...user },
  });

  // フォームに初期値を入力する
  /*
  React.useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [reset, user]);
  */

  const onSubmit = handleSubmit(async (formData) => {
    let response: Response;
    if (mode == 'edit') {
      response = await fetch(`/api/user/${user?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } else {
      // mode == 'create'
      response = await fetch(`/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    }
    if (response.ok) {
      //const response_json = await response.json();
      router.refresh();
      router.push(onSuccessUrl);
    } else {
      setPostError('server error');
    }
  });

  return (
    <>
      <span className='error'>{postError}</span>
      <form onSubmit={onSubmit}>
        <FormControl fullWidth error={'name' in errors}>
          <TextField
            label='Name'
            variant='standard'
            helperText={errors.name?.message}
            {...register('name')}
          />
        </FormControl>
        <FormControl fullWidth error={'email' in errors}>
          <TextField
            label='Email'
            variant='standard'
            required
            helperText={errors.email?.message}
            {...register('email')}
          />
        </FormControl>
        <FormControl fullWidth error={'password' in errors}>
          <TextField
            label='Password'
            variant='standard'
            type='password'
            required
            helperText={errors.password?.message}
            {...register('password')}
          />
        </FormControl>
        <FormControl fullWidth error={'roleId' in errors}>
          <InputLabel>Role</InputLabel>
          <Select
            label='role'
            required
            defaultValue={user ? user.roleId : ''}
            {...register('roleId')}
          >
            {roles?.map((role) => {
              return (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText error={true}>{errors.roleId?.message}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={'departmentId' in errors}>
          <InputLabel>Department</InputLabel>
          <Select
            label='department'
            required
            defaultValue={user ? user.departmentId : ''}
            {...register('departmentId')}
          >
            {departments?.map((department) => {
              return (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText error={true}>{errors.departmentId?.message}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={'joinningDate' in errors}>
          {/* reference: 
                MUI x-DatePicker 6: use dayjs instead of moment for react-hook-form
                https://medium.com/@david.zhao.blog/mui-x-datepicker-6-use-dayjs-instead-of-moment-for-react-hook-form-d590f5d62023
          */}
          <Controller
            name={"joinningDate"}
            control={control}
            render={({ field: { onChange, value } }) => (
                <DatePicker
                  label="Joinning Date"
                  format="YYYY/MM/DD"
                  onChange={onChange}
                  value={value ? dayjs(value) : undefined}
                  defaultValue={user ? dayjs(user.joinningDate) : undefined}
                />
            )}
          />
        </FormControl>
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </>
  );
}
