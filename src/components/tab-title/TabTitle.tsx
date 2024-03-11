import { Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export type TabTitleProps = {};

export const TabTitle = ({}: TabTitleProps) => {
  const [tabsCount, setTabsCount] = useState<number | null>(null);
  const [tabNumber, setTabNumber] = useState<number | null>(null);

  useEffect(() => {
    const worker = new SharedWorker(new URL("./counter.ts", import.meta.url));
    worker.port.postMessage({ type: "connect" });
    worker.port.onmessage = (e) => {
      setTabsCount(e.data.tabsCount);
      setTabNumber(e.data.tabNumber);
    };

    const unloadHandler = () => {
      worker.port.postMessage({ type: "disconnect" });
      worker.port.close();
    };

    window.addEventListener("beforeunload", unloadHandler);

    return () => {
      unloadHandler();
      window.removeEventListener("beforeunload", unloadHandler);
    };
  }, []);

  return (
    <Typography variant="h5">
      Вкладка{" "}
      {tabNumber ?? <Skeleton sx={{ display: "inline-block" }} width={15} />} из{" "}
      {tabsCount ?? <Skeleton sx={{ display: "inline-block" }} width={15} />}
    </Typography>
  );
};
