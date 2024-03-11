let tabs: MessagePort[] = [];

// @ts-ignore
self.addEventListener("connect", (e: MessageEvent) => {
  const port = e.ports[0];

  port.onmessage = (e) => {
    if (e.data.type === "connect") {
      tabs.push(port);
    } else if (e.data.type === "disconnect") {
      tabs = tabs.filter((tab) => tab !== port);
    }

    tabs.forEach((tab, index) =>
      tab.postMessage({
        type: "updateNumber",
        tabNumber: index + 1,
        tabsCount: tabs.length,
      })
    );
  };
});
