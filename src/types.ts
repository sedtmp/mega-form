export type ProductDto = {
  id: string | number;
  name: string;
  sum: number;
  count: number;
  price: number;
};

export type GroupDto = {
  id: string | number;
  sum: number;
  products: ProductDto[];
};

export type FormDto = {
  sum: number;
  groups: GroupDto[];
};
