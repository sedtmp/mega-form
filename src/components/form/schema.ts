import { z } from "zod";

const productSchema = z.object({
  id: z.coerce.number().int(),
  name: z.string().min(1, "Введите название продукта"),
  count: z.coerce
    .number({ required_error: "Введите число" })
    .int("Должно быть целым числом")
    .positive("Должно быть положительным числом"),
  price: z.coerce
    .number({ required_error: "Введите число" })
    .gt(0, "Должно быть положительным числом"),
  sum: z.coerce.number(),
});

const groupSchema = z
  .object({
    id: z.coerce.number().int(),
    sum: z.coerce.number(),
    products: productSchema.array(),
  })
  .superRefine(({ products }, ctx) => {
    const uniqueNames = new Set<string>();
    for (let { id, name } of products) {
      if (uniqueNames.has(name)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Должно быть уникальным`,
          path: ["products", id, "name"],
        });
      } else {
        uniqueNames.add(name);
      }
    }
  });

export const formSchema = z.object({
  sum: z.coerce.number(),
  groups: groupSchema.array(),
});

export type FormSchemaFields = z.infer<typeof formSchema>;
