import * as React from "react";
import "@ampproject/worker-dom/dist/main";
import { unHash } from "../utils/sha.ts";

export const WorkerBox: React.FC<
  {
    codeHash: string;
  }
> = (
  {
    codeHash,
  },
) => {
  const [blob, setBlob] = React.useState("");

  React.useEffect(() => {
    const run = async () => {
      await loadScript(
        "https://cdn.jsdelivr.net/npm/@ampproject/worker-dom@0.27.4/dist/main.js",
      );

      const versionA = await unHash(codeHash);
      console.log(versionA);

      const url = await createSourceBlob(versionA);
      const iframeBlob = createHTMLSourceBlob(url);

      setBlob(iframeBlob);
    };
    run();
  }, []);

  return blob
    ? <iframe width="800" height="900" src="/demo/react-map/index.html" />
    : <div>Empty</div>;
};

async function createSourceBlob(codeToRun: any) {
  const react = await fetch(
    "https://unpkg.com/react@17.0.1/cjs/react.production.min.js",
  );
  const react_dom = await fetch(
    "https://unpkg.com/react-dom@17.0.1/cjs/react-dom.production.min.js",
  );
  const reactTEXT = await react.text();
  const reactDOM = await react_dom.text();
  const blob = new Blob([`${reactTEXT}
                         ${reactDOM}
                         ${codeToRun}`], { type: "text/javascript" });

  const iframeUrl = window.URL.createObjectURL(blob);
  return iframeUrl;
}

async function loadScript(src: string) {
  return new Promise(function (resolve, reject) {
    var s;
    s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function createHTMLSourceBlob(blobUrl: any) {
  const blob = new Blob([`
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <script src="https://cdn.jsdelivr.net/npm/@ampproject/worker-dom@0.27.4/dist/main.js"></script>
  <style>
  body{
    background-color: white;
  }

  </style>
</head>

<body>
  <div src="${blobUrl}"></div>

  <script nomodule async=false defer>
  document.addEventListener('DOMContentLoaded', function() {
    MainThread.upgradeElement(document.getElementById('upgrade-me'), './dist/worker/worker.js');
  }, false);
</script>
</html>
`], { type: "text/html" });

  const iframeUrl = window.URL.createObjectURL(blob);
  return iframeUrl;
}
