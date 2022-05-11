/** @jsxImportSource @emotion/react */

import { lazy, Suspense, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';

interface ILaztCom {
  name: string;
  html: string;
  css: string;
  transpiled: string;
  hash: number;
  children: React.ReactNode;
  
  startApp: FC<{ children: React.ReactNode }>;
}

export const LazySpikeLandComponent: FC<ILaztCom> = ({
  name,
  html,
  hash,
  css,
  transpiled,
  startApp,
  children,
}) => {
  const LazyComponentInit = (transpiled: string) =>
    lazy(async () => import(createJsBlob(transpiled)));

  const st = (hashCode: number, html: string, css: string, transpiled: string) => ({
    htmlContent: `<div><style>${css}</style><div id="zbody">${html}</div></div>`,
    hashCode,
    transpiled,
  });

  const [apps, setApps] = useState({ [hash]: startApp });

  const [{ htmlContent, hashCode }, setHtmlCss] = useState(
    st(hash, html, css, transpiled),
  );

  useEffect(() => {
    const bc = new BroadcastChannel('spike.land');

    bc.onmessage = async (event) => {
      console.log({ event });

      if (event.data.roomName === name && event.data.sess.transpiled !== transpiled) {
        const { transpiled, css, html } = event.data.sess;
        const hashCode = event.data;

        if (apps[hashCode]) {
          setHtmlCss((h) => ({ ...h, hashCode }));
          return;
        }

        const App = await getApp(transpiled);

        if (apps[hashCode]) setHtmlCss;
        setApps((a) => ({ ...a, [hashCode]: App }));

        setHtmlCss(st(hashCode, html, css, transpiled));
      }
    };
  }, []);

  useEffect(() => {
    const intervalHandler = setInterval(async () => {
      const resp = await fetch(`https://spike.land/live/${name}/hashCodeSession`);
      const text = await resp.text();
      setHtmlCss((st) => ({ ...st, hashCode: Number(text) }));
    }, 69_000);
    return () => {
      console.log('INTERVAL CLEARED');
      clearInterval(intervalHandler);
    };
  }, []);

  // Const LazyStarter = () => lazy(() => getApp(transpiled)) : <div></div>;

  const LazyComponent = apps[hashCode];

  // const LazyComponentInit = lazy(()=>import(createJsBlob(transpiled)))

  return (
    <Suspense
      key={hashCode}
      fallback={<div dangerouslySetInnerHTML={{ __html: 'bpo' + htmlContent }}></div>}>
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
  const file = new File([code], 'index.tsx', {
    type: 'application/javascript',
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
    css: '',
    html: '',
    transpiled: '',
    hashCode: 0,
    App: ()=><></>
  });

  useEffect(() => {
    const reload = async () => {
      const resp = await fetch(`https://spike.land/live/${room}/mST`);
      const state = await resp.json();
      console.log({ state });

      const { transpiled, css, html } = state.mST;
      const { hashCode } = state;
      const App = await getApp(transpiled);
      setState({
        transpiled,
        css,
        html,
        hashCode,
        App,
      });
    };

    reload();

    const bc = new BroadcastChannel('spike.land');

    bc.onmessage = async (event) => {
      console.log({ event });

      if (event.data.roomName === room && event.data.sess.transpiled !== transpiled) {
        const { transpiled, css, html } = event.data.sess;
        const App = await getApp(transpiled);

        setState({ App, transpiled, css, html, hashCode: event.data.hashCode });
      }
    };
  }, []);

  if (!hashCode) return <></>;

  return (
    <LazySpikeLandComponent
      key={hashCode}
      css={css}
      html={html}
      name={room}
      transpiled={transpiled}
      startApp={App}
      hash={hashCode}>
      {children}
    </LazySpikeLandComponent>
  );
};

export default () => (
  <LoadRoom room="formatted">
    <h1>1s31</h1>
  </LoadRoom>
);
