import * as yup from 'yup';

export const testFormSchema = yup.object().shape({
  header: yup.object({
    header_attr1: yup.string().required(),
    header_attr2: yup.string().required(),
    header_attr3: yup.string().required(),
    header_attr4: yup.string().required(),
  }),
  items: yup.array(
    yup.object({
      items_attr1: yup.string(),
      items_attr2: yup.string(),
    })
  ),
  memo: yup.object({
    message: yup.string(),
  }),
});
export type TestFormData = yup.InferType<typeof testFormSchema>;
