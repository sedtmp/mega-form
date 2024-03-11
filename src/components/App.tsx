import { Stack } from "@mui/material";
import { FormChannelProvider } from "../providers/form-channel";
import { Form } from "./form/Form";
import { TabTitle } from "./tab-title/TabTitle";

export const App = () => {
  return (
    <FormChannelProvider>
      <Stack alignItems="center" spacing="20px">
        <TabTitle />
        <Form />
      </Stack>
    </FormChannelProvider>
  );
};
