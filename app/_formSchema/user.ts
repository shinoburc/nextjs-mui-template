import * as yup from 'yup';

export const userFormSchema = yup
  .object()
  .shape({
    // Prismaが生成する型と整合性を取るために nullable() を追加している
    // TODO: FIXME: nullable() -> required() に変更してみました。
    name: yup.string().nullable(),
    email: yup.string().email('Invalid mail format.').required('email is a required field'),
    password: yup.string().min(4).required('password is a required field'),
    roleId: yup.string().required(),
    departmentId: yup.string().required(),
  })
  .required();
export type UserFormData = yup.InferType<typeof userFormSchema>;

// Same as...
/*
type UserFormData = {
  name: string | null | undefined;
  email: string;
  password: string;
  roleId: string;
  departmentId: string;
};
*/
