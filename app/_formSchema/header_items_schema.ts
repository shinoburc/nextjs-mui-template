import * as yup from 'yup';

export const headerItemsFormSchema = yup.object().shape({
  header: yup.object({
    header_attr1: yup.string().required(),
    header_attr2: yup.string().required(),
    header_attr3: yup.string().required(),
    header_attr4: yup.string().required(),
  }),
  items: yup
    .array(
      yup
        .object({
          items_attr1: yup.string(),
          items_attr2: yup.string(),
        })
        .required()
    )
    .required(),
  memo: yup.object({
    message: yup.string(),
  }),
});
export type HeaderItemsFormData = yup.InferType<typeof headerItemsFormSchema>;
