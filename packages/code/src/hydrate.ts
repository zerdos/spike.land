// Import necessary modules
import { Workbox } from "workbox-window";
import { getPort, init } from "./shared";

import { getTransferables, hasTransferables } from "transferables";
import { mkdir } from "./memfs";


// Set up service worker version
const { swVersion } = self;
export const sw = new Workbox(`/sw.js`);
init(swVersion, null);
const port = getPort();

// Set up service worker event listeners
sw.getSW().then((sw) => {
  const swPort = new MessageChannel();
  port.addEventListener(
    "message",
    ({ data }) =>
      swPort.port1.postMessage(
        data,
        (hasTransferables(data)
          ? getTransferables(data)
          : undefined) as unknown as Transferable[],
      ),
  );
  swPort.port1.addEventListener(
    "message",
    ({ data }) =>
      swPort.port1.postMessage(
        data,
        (hasTransferables(data)
          ? getTransferables(data)
          : undefined) as unknown as Transferable[],
      ),
  );
  sw.postMessage({ type: "sharedworker", sharedWorkerPort: swPort.port1 }, [
    swPort.port1,
  ]);
});

// Register service worker
if ("serviceWorker" in navigator) {
  sw.register().then(() =>
    navigator.serviceWorker.register("/sw.js").then((sw) => {
      navigator.serviceWorker.getRegistrations().then(
        (workers) =>
          Promise.all(
            workers.filter(
              (x) => x !== sw,
            ).map((x) => x.unregister()),
          ),
      );
    })
  );
}

// Create directories for the code space
const paths = location.pathname.split("/");
const codeSpace = paths[2];
mkdir("/live").then(() => mkdir(`/live/${codeSpace}`));

// Check if on live page, and if so, run the code
if (location.pathname === `/live/${codeSpace}`) {
  import("./ws").then(({run})=>run());
} else if (location.pathname === `/live/${codeSpace}/dehydrated`) {
  const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

  // Update HTML and CSS on message received
  BC.onmessage = ({ data }) => {
    const { html, css } = data;
    document.getElementById("root")!.innerHTML = [
      `<div id="${codeSpace}-css" style="height:100%;">`,
      "<style>",
      css,
      "</style>",
      html,
      "</div>",
    ].join("");
  };
} else {
  // Render the code
  //import { render } from "./render";
  import("./render").then(({render})=>render(
    document.getElementById(`${codeSpace}-css`)!,
    codeSpace,
  ));
}
