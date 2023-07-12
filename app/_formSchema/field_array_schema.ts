export interface FieldArrayFormValues {
  header: {
    header_name: string;
    header_sub1: string;
    header_sub2: string;
  };
  cart: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
}
