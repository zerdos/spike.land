/** @jsxImportSource @emotion/react */

import { FC, Fragment, lazy, Suspense } from "react";

import type {} from "react-dom/next";
import { createRoot } from "react-dom/client";

import { mST } from "./session";
import { md5 } from "./md5";

const apps: { [key: string]: FC } = {};

Object.assign(window, {esmsInitOptions: {
  shimMode: true,
  polyfillEnable: ['css-modules', 'json-modules'] // default empty
}});

const {assets} = window;

const init = async ()=> window.importShim || await import("es-module-shims").then(()=>importShim.addImportMap({
  "imports": {
    // ...imap,
    "framer-motion": location.origin +  "/" + assets["framer-motion.mjs"],
    "@emotion/react": location.origin +  "/" +assets["emotion.mjs"],
    "react": location.origin +  "/" +assets["react.mjs"],
    "react-dom": location.origin +  "/" +assets["react.mjs"],
    "react-dom/client": location.origin +  "/" +assets["react.mjs"],
    "react-dom/server": location.origin +  "/" +assets["react.mjs"],
    "react/jsx-runtime":location.origin +  "/" + assets["react.mjs"]
    // "preact": "https://ga.jspm.io/npm:preact@10.8.2/dist/preact.module.js",
    // "preact-render-to-string": "https://ga.jspm.io/npm:preact-render-to-string@5.2.0/dist/index.mjs",
    // "preact/compat": "https://ga.jspm.io/npm:preact@10.8.2/compat/dist/compat.module.js",
    // "preact/jsx-runtime": "https://ga.jspm.io/npm:preact@10.8.2/jsx-runtime/dist/jsxRuntime.module.js"
  },
}));




let App: FC = () => <></>

export const AutoUpdateApp: FC<{ hash: number }> = ({ hash }) => {
  
  const result = md5(mST().transpiled);

  if (apps[result]) {
    App = apps[result];
    return <App />
  }


const FallbackApp = App;
 const AppLazy = lazy(() => appFactory(mST().transpiled).then((App) =>({default: App})));

  return (
    <Suspense
      fallback={<FallbackApp />}
    >
      <AppLazy />
    </Suspense>
  );
};


export const appFactory = async (transpiled: string): Promise<FC> => {
 
  const result = md5(transpiled);
  // return lazy(>import(`/live/${codeSpace}/js#${result}`));
  // if (globalThis.transpiled === transpiled) return globalThis.App;
  // globalThis.transpiled = transpiled;

  // hash.update(transpiled);
  // const resultU8Arr = await hash.digest();

  //new TextDecoder().decode(resultU8Arr);
  // if (globalThis.App && globalThis.App === apps[result]) {
  //   globalThis.setCh && globalThis.setCh(globalThis.App);
  //   return;
  // }

  if (!apps[result]) {
    await init();
    apps[result] = (await importShim(createJsBlob(transpiled)))
      .default as unknown as FC;
  }
  
  App = apps[result];
  return apps[result];
};

export const appRoot = createRoot(
  document.getElementById("root") || (() => {
    const root = document.createElement("div");
    document.body.append(root);
    return root;
  })(),
);

export const renderApp = (App: FC) => {
  // const key = "css";
  // const cache = createCache({ key });

  // const { App } = globalThis;
  console.log("render App");
  try {
    appRoot.render(
      // <CacheProvider value={cache}>
      <Fragment>
        <Suspense
          fallback={<div dangerouslySetInnerHTML={{ __html: mST().html }} />}
        >
          <App />
        </Suspense>
      </Fragment>,
      // </CacheProvider>,
    );
  } catch (err) {
    appRoot.render(
      <Fragment>
        <p>error</p>
      </Fragment>,
    );
  }
};

export function createJsBlob(code: string) {
  const file = new File([code], "index.mjs", {
    type: "application/javascript",
  });
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
  // const actualUrl = new URL(blobUrl,'//live/');

  // return actualUrl;
}
