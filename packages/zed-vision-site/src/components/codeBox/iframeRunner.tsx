import * as React from "react";
import { unHash } from "../utils/sha.ts";
import { ITransformed } from "./codeboxComponents.tsx";

export const IframeRunner: React.FC<
  {
    transformed: ITransformed[];
  }
> = (
  {
    transformed,
  },
) => {
  const [events, setEvents] = React.useState<unknown[]>([]);

  React.useEffect(() => {
    window.addEventListener("message", iframeEventListener);
    return () => window.removeEventListener("message", iframeEventListener);

    function iframeEventListener(event: { data: { events?: unknown[] } }) {
      if (
        event.data && event.data.events
      ) {
        setEvents(event.data.events);
      }
    }
  });

  const [iframeUrl, setIframeUrl] = React.useState("");

  const [targetURL, setTarget] = React.useState("");

  React.useEffect(() => {
    const run = async () => {
      setEvents([]);
      const codeToRun = await unHash(transformed[0].hash);
      const iframeUrl = createSourceBlob(codeToRun, events, false);
      setIframeUrl(iframeUrl);
    };
    run();
  }, [transformed[0].code]);

  React.useEffect(() => {
    const run = async () => {
      const codeToRun = await unHash(transformed[transformed.length - 1].hash);
      const iframeUrl = createSourceBlob(codeToRun, events, true);
      setTarget(iframeUrl);
      //  console.log(events);
    };
    run();
  }, [transformed[0].code, events]);

  return <>
    <iframe src={iframeUrl} />
    <div>{iframeUrl}</div>

    <iframe width="400px" height="400px" src={targetURL} />
    <code>{JSON.stringify(events).toString()}</code>
  </>;
};

function createSourceBlob(codeToRun: any, events: unknown[], replay: boolean) {
  const blob = new Blob([`
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <script crossorigin src="https://unpkg.com/react@17.0.0.1/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.development.js"></script>
  <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js"></script>
  <style>
  body{
    background-color: white;
  }

  </style>
</head>

<body>
  <div id="zbody"></div>
  
  <script>



  ${codeToRun}
  ReactDOM.render(React.createElement(Counter, {}, {}), document.getElementById("zbody"));


    
    

       
       const replay = ${replay}

   if (!replay){

    let events = []
   
    rrweb.record({
        emit(event) {

            events.push(event);
      //      console.log(events.length);
          window.parent.postMessage({events})
        },
        checkoutEveryNth: 20
    });

    

  
}
else {
    const events = ${JSON.stringify(events)};

    const replayer = new rrweb.Replayer(events, {skipInactive: true, speed: 3});
replayer.play();
}

    </script>

</html>
`], { type: "text/html" });

  const iframeUrl = window.URL.createObjectURL(blob);
  return iframeUrl;
}
