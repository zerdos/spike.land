import { lazy, Suspense, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";

interface ILaztCom {
  name: string;
  html: string;
  css: string;
  hash: number;
  children: React.ReactNode;

  startApp: FC<{ children: React.ReactNode }>;
}

const LazyComponentInit = (transpiled: string) => lazy(async () => import(createJsBlob(transpiled)));

export const LazySpikeLandComponent: FC<ILaztCom> = ({
  name,
  html,
  hash,
  css,
  startApp,
  children,
}) => {
  const st = (hashCode: string, html: string, css: string) => ({
    htmlContent: `<div><style>${css}</style><div id="z-body">xxxxxxxx${html}</div></div>`,
    hashCode,
  });

  const [{ htmlContent, hashCode }, setHtmlCss] = useState(st(hash, html, css));

  useEffect(() => {
    const intervalHandler = setInterval(async () => {
      const resp = await fetch(
        `https://spike.land/live/${name}/hashCodeSession`,
      );
      const text = await resp.text();
      if (hashCode === Number(text)) return;
      setHtmlCss((st) => ({ ...st, hashCode: Number(text) }));
    }, 69_000);

    return () => {
      console.log("INTERVAL CLEARED");
      clearInterval(intervalHandler);
    };
  }, []);

  // Const LazyStarter = () => lazy(() => getApp(transpiled)) : <div></div>;

  const LazyComponent = startApp;
  // const LazyComponentInit = lazy(()=>import(createJsBlob(transpiled)))

  return (
    <Suspense
      key={hashCode}
      fallback={<div dangerouslySetInnerHTML={{ __html: "bpo" + htmlContent }}></div>}
    >
      <LazyComponent key={hashCode}>
        <>{children}</>
      </LazyComponent>
    </Suspense>
  );
};

async function getApp(transpiled: string) {
  const objectUrl = createJsBlob(transpiled);

  const App = (await import(objectUrl)).default;

  URL.revokeObjectURL(objectUrl);

  return App;
}

function createJsBlob(code: string) {
  const file = new File([code], "index.tsx", {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
  // const actualUrl =
}

export const LoadRoom: FC<{ room: string; children: ReactNode }> = ({
  room,
  children,
}) => {
  const [{ transpiled, css, html, hashCode, App }, setState] = useState({
    css: "",
    html: "",
    transpiled: "",
    hashCode: 0,
    App: () => <></>,
  });

  useEffect(() => {
    const reload = async () => {
      const resp = await fetch(`https://spike.land/live/${room}/mST`);
      const state = await resp.json();
      console.log({ state });

      const { transpiled, css, html } = state.mST;
      const { hashCode } = state;
      const App = await getApp(transpiled);
      setApps({ [hashCode]: App });
      setState({
        transpiled,
        css,
        html,
        hashCode,
        App,
      });
    };

    reload();
  }, []);

  const [apps, setApps] = useState(
    {} as { [key: typeof hashCode]: typeof App },
  );

  useEffect(() => {
    const bc = new BroadcastChannel("spike.land");

    bc.onmessage = async (event) => {
      if (
        event.data.roomName === room
        && event.data.sess.transpiled !== transpiled
      ) {
        const { transpiled, css, html } = event.data.sess;
        const hashCode = event.data.hashCode as number;

        if (apps[hashCode]) {
          setState((h) => ({ ...h, hashCode }));
          return;
        }

        const App = await getApp(transpiled);

        setApps((a) => ({ ...a, [hashCode]: App }));

        setState((h) => ({ ...h, hashCode, App }));
      }
    };
  }, []);

  if (!hashCode) return <></>;
  if (!apps[hashCode]) return <></>;

  return (
    <LazySpikeLandComponent
      key={hashCode}
      css={css}
      html={html}
      name={room}
      startApp={apps[hashCode]}
      hash={hashCode}
    >
      {children}
    </LazySpikeLandComponent>
  );
};

export default () => (
  <LoadRoom room="zoli">
    <h1>yo</h1>
  </LoadRoom>
);
