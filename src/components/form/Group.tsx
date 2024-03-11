import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { GroupSum } from "./GroupSum";
import { Product } from "./Product";
import { FormSchemaFields } from "./schema";

export function initProduct(id: number) {
  return { id, sum: 1, name: "", count: 1, price: 1 };
}

export type GroupProps = {
  groupId: number;
  onRemove: () => void;
};

export const Group = ({ groupId, onRemove }: GroupProps) => {
  const { control } = useFormContext<FormSchemaFields>();
  const { append, remove, fields } = useFieldArray({
    control,
    name: `groups.${groupId}.products`,
  });

  const handleAddProduct = () => {
    append(initProduct(fields.length));
  };

  const handleRemoveProduct = (productId: number) => {
    if (fields.length > 1) {
      remove(productId);
    }
  };

  return (
    <Paper sx={{ padding: "10px" }}>
      <Stack spacing="20px">
        <Typography variant="h6">Группа {groupId + 1}</Typography>
        <GroupSum groupId={groupId} />
        <Box>
          <Button onClick={onRemove} variant="contained">
            Удалить группу
          </Button>
        </Box>
        {fields.map(({ id }, index) => (
          <Product
            key={id}
            groupId={groupId}
            productId={index}
            onRemove={() => handleRemoveProduct(index)}
          />
        ))}
        <Box>
          <Button variant="outlined" onClick={handleAddProduct}>
            Добавить продукт
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};
