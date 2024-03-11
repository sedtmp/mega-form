import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FormChannelContext = createContext<BroadcastChannel | null>(null);

export type FormChannelProviderProps = PropsWithChildren;
export const FormChannelProvider = ({ children }: FormChannelProviderProps) => {
  const [channel, setChannel] = useState<BroadcastChannel | null>(null);

  useEffect(() => {
    const channel = new BroadcastChannel("formValues");
    setChannel(channel);
    return () => channel.close();
  }, []);

  if (!channel) {
    return null;
  }

  return (
    <FormChannelContext.Provider value={channel}>
      {children}
    </FormChannelContext.Provider>
  );
};

export function useFormChannel() {
  const channel = useContext(FormChannelContext);

  if (!channel) {
    throw Error("FormChannelProvider not found.");
  }

  return channel;
}
