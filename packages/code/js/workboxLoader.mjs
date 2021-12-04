import { Workbox } from "workbox-window";

export const workboxLoader = async () => {
  if (
    "serviceWorker" in window.navigator
  ) {
    // fetch("https://spike.land/check").then((x) => x.json())
    //   .then((x) => x.missing).then((missingArray) =>
    //     import("./ipfsClient.mjs").then(({ ipfsCat }) =>
    //       Promise.all(
    //         missingArray.map((cid) =>
    //           Promise.race([
    //             ipfsCat(cid),
    //             fetch(`http://127.0.0.1:8080/ipfs/${cid}/`).then((x) =>
    //               x.text()
    //             ),
    //           ]).then((content) =>
    //             fetch(`https://code.spike.land/add/${cid}`, {
    //               method: "POST",
    //               body: content,
    //             })
    //           )
    //         ),
    //       )
    //     )
    //   );

    // navigator.serviceWorker.getRegistrations().then(function (registrations) {
    //   for (let registration of registrations) {
    //     registration.unregister();
    //   }
    // });

    try {
      let url = "./sw.js";
      if (location.hostname.includes("spike.land")) {
        url = "https://code.spike.land/sw.js";
      }

      const wb = new Workbox(url);

      wb.addEventListener("activated", async (event) => {
        if (!event.isUpdate) {
          console.log("Service worker activated for the first time!");
        }
        const swVersion = await wb.messageSW({ type: "GET_VERSION" });
        console.log(`version: ${swVersion}`);
      });

      window.wb = wb;
      wb.register();

      // console.log('Service Worker version:', swVersion);

      // const packageJson = await wb.messageSW({type: 'GET_PACKAGE_JSON'});
      // console.log(packageJson);
    } catch (e) {
      console.error(e);
    }
  }
};
