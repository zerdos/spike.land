export const workboxLoader = async () => {
  if (
    "serviceWorker" in window.navigator
  ) {
    fetch("https://spike.land/check").then((x) => x.json())
      .then((x) => x.missing).then((missingArray) =>
        import("./ipfsClient.mjs").then(({ ipfsCat }) =>
          Promise.all(
            missingArray.map((cid) =>
              Promise.race([
                ipfsCat(cid),
                fetch(`http://127.0.0.1:8080/ipfs/${cid}/`).then((x) =>
                  x.text()
                ),
              ]).then((content) =>
                fetch(`https://spike.land/add/${cid}`, {
                  method: "POST",
                  body: content,
                })
              )
            ),
          )
        )
      );

    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });

    try {
      const { Workbox } = await import(
        "workbox-window"
      );
      const wb = new Workbox(`./generated-sw.js`);

      wb.addEventListener("activated", (event) => {
        if (!event.isUpdate && !window.monaco) {
          console.log("Service worker activated for the first time!");
        }
      });

      return wb.register();
    } catch (e) {
      console.error(e);
    }
  }
};
