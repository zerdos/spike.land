export const workboxLoader = async () => {
  if (
    "serviceWorker" in window.navigator &&
    window.location.origin === "https://code.zed-vision.workers.dev"
  ) {
    fetch("https://code.zed-vision.workers.dev/check").then((x) => x.json()).then((x) =>
      x.missing
    ).then((missingArray) =>
      import("./ipfsClient.mjs").then(({ ipfsCat }) =>
        Promise.all(
          missingArray.map((cid) =>
            ipfsCat(cid).then((content) =>
              fetch(`https://code.zed-vision.workers.dev/add/${cid}`, {
                method: "POST",
                body: content,
              })
            )
          ),
        )
      )
    );

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
