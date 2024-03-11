import { TextField } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { FormSchemaFields } from "./schema";

export type ProductSumProps = {
  groupId: number;
  productId: number;
};

export const ProductSum = ({ groupId, productId }: ProductSumProps) => {
  const { control } = useFormContext<FormSchemaFields>();
  const { count, price } = useWatch({
    control,
    name: `groups.${groupId}.products.${productId}`,
  });

  return (
    <TextField
      type="number"
      value={(+count * +price).toFixed(2)}
      label="Сумма"
      size="small"
      disabled
    />
  );
};
