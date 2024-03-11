import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import deepEqual from "deep-equal";
import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useFormChannel } from "../../providers/form-channel";
import { FormSum } from "./FormSum";
import { FormUpdater } from "./FormUpdater";
import { Group, initProduct } from "./Group";
import { FormSchemaFields, formSchema } from "./schema";

function initGroup(id: number) {
  return { id, sum: 1, products: [initProduct(0)] };
}

function initDefaultValues(): FormSchemaFields {
  const rawData = localStorage.getItem("data");
  const groups: FormSchemaFields["groups"] = rawData ? JSON.parse(rawData) : [];

  return { sum: 0, groups };
}

export type FormProps = {};

export const Form = ({}: FormProps) => {
  const channel = useFormChannel();

  const form = useForm<FormSchemaFields>({
    resolver: zodResolver(formSchema),
    defaultValues: initDefaultValues(),
  });
  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: "groups",
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!deepEqual(form.getValues("groups"), event.data)) {
        form.reset({ sum: 0, groups: event.data });
      }
    };
    channel.addEventListener("message", handleMessage);
    return () => {
      channel.removeEventListener("message", handleMessage);
    };
  }, [form.setValue]);

  const handleAddGroup = () => {
    append(initGroup(fields.length));
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <Stack alignItems="center" spacing="20px">
          <Stack width="100%" maxWidth="800px" spacing="10px">
            {fields.map(({ id }, index) => (
              <Group key={id} groupId={index} onRemove={() => remove(index)} />
            ))}
          </Stack>
          <Button variant="outlined" onClick={handleAddGroup}>
            Добавить группу
          </Button>
          <FormSum form={form} />
          <Button variant="contained" type="submit">
            Отправить
          </Button>
        </Stack>
        <FormUpdater />
      </form>
    </FormProvider>
  );
};
