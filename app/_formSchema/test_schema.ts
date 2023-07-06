import * as yup from 'yup';

export const testFormSchema = yup.object().shape({
  a: yup.string().required(),
  b: yup.string().required(),
  c: yup.string().required(),
  d: yup.string().required(),
});
export type TestFormData = yup.InferType<typeof testFormSchema>;
