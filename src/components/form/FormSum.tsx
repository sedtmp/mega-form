import { Typography } from "@mui/material";
import { UseFormReturn, useWatch } from "react-hook-form";
import { FormSchemaFields } from "./schema";

export type FormSumProps = {
  form: UseFormReturn<FormSchemaFields>;
};

export const FormSum = ({ form }: FormSumProps) => {
  const groups = useWatch({ control: form.control, name: "groups" });

  return (
    <Typography>
      Итого:{" "}
      {groups
        .reduce(
          (acc, { products }) =>
            acc +
            products.reduce(
              (acc, { count, price }) => acc + +count * +price,
              0
            ),
          0
        )
        .toFixed(2)}
    </Typography>
  );
};
