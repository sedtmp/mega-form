import { TextField } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { FormSchemaFields } from "./schema";

export type GroupSumProps = {
  groupId: number;
};

export const GroupSum = ({ groupId }: GroupSumProps) => {
  const { control } = useFormContext<FormSchemaFields>();
  const products = useWatch({
    control,
    name: `groups.${groupId}.products`,
  });

  return (
    <TextField
      value={products
        .reduce((acc, { count, price }) => acc + +count * +price, 0)
        .toFixed(2)}
      label={`Сумма`}
      size="small"
      disabled
    />
  );
};
