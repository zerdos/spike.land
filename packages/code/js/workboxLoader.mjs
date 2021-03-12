export const workboxLoader = async () => {
  if (
    "serviceWorker" in window.navigator &&
    window.location.origin === "https://code.zed.vision"
  ) {
    fetch("https://code.zed.vision/check").then((x) => x.json()).then((x) =>
      x.missing
    ).then((x) => {
      if (x.length) {
        import("./ipfsClient.mjs").then(({ ipfsCat }) => {
          x.map((cid) =>
            ipfsCat(cid).then((content) =>
              fetch(`https://code.zed.vision/add/${cid}`, {
                method: "POST",
                body: content,
              })
            )
          );
        });
      }
    });

    const { Workbox } = await import(
      "https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-window.prod.mjs"
    );
    const wb = new Workbox(`./generated-sw.js`);

    wb.addEventListener("activated", (event) => {
      if (!event.isUpdate && !window.monaco) {
        console.log("Service worker activated for the first time!");
      }
    });

    return wb.register();
  }
};
