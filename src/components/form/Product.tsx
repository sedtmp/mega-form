import { Box, Button, Stack, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { ProductSum } from "./ProductSum";
import { FormSchemaFields } from "./schema";

export type ProductProps = {
  groupId: number;
  productId: number;
  onRemove: () => void;
};

export const Product = ({ groupId, productId, onRemove }: ProductProps) => {
  const { control } = useFormContext<FormSchemaFields>();

  return (
    <Stack direction="row" spacing="5px">
      <Controller
        name={`groups.${groupId}.products.${productId}.name`}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            type="text"
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value}
            label="Названиe"
            size="small"
          />
        )}
      />
      <Controller
        name={`groups.${groupId}.products.${productId}.price`}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            type="number"
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value}
            inputProps={{
              min: 0.01,
              step: "0.01",
            }}
            label="Цена"
            size="small"
          />
        )}
      />
      <Controller
        name={`groups.${groupId}.products.${productId}.count`}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            type="number"
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value}
            inputProps={{
              min: 1,
            }}
            label="Кол-во"
            size="small"
          />
        )}
      />
      <ProductSum groupId={groupId} productId={productId} />
      <Box>
        <Button variant="contained" onClick={onRemove} size="medium">
          Удалить
        </Button>
      </Box>
    </Stack>
  );
};
