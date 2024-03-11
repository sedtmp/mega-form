import deepEqual from "deep-equal";
import { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useFormChannel } from "../../providers/form-channel";
import { FormSchemaFields } from "./schema";

export type FormUpdaterProps = {};

export const FormUpdater = ({}: FormUpdaterProps) => {
  const channel = useFormChannel();
  const { control } = useFormContext<FormSchemaFields>();
  const groups = useWatch({ control, name: "groups" });
  const prevDataRef = useRef<typeof groups | null>(null);

  useEffect(() => {
    if (!prevDataRef.current) {
      prevDataRef.current = groups;
      return;
    }

    if (!deepEqual(prevDataRef.current, groups)) {
      channel.postMessage(groups);
      localStorage.setItem("data", JSON.stringify(groups));
      prevDataRef.current = groups;
    }
  }, [groups, channel]);

  return null;
};
