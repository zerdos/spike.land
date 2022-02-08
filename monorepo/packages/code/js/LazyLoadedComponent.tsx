/** @jsx jsx */
import { jsx } from "@emotion/react";
import { FC, lazy, Suspense, useEffect, useState } from "react";
interface ILaztCom {
  name: string;
  html: string;
  transpiled: string;
  hash: number;
}

export const LazySpikeLandComponent: FC<ILaztCom> = (
  { name, html, hash, transpiled },
) => {
  const [hashCode, setHash] = useState(hash);

  useEffect(() => {
    const intervalHandler = setInterval(async () => {
      const resp = await fetch(
        `https://spike.land/api/room/${name}/hashCodeSession`,
      );
      const text = await resp.text();
      setHash(Number(text));
    }, 69_000);
    return () => {
      console.log("INTERVAL CLEARED");
      clearInterval(intervalHandler);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const resp = await fetch(
        `https://spike.land/api/room/${name}/session`,
      );
      const { html, css, transpiled } = await resp.json();
      setHtmlCss({
        htmlContent:
          `<div id="root"><style>${css}</style><div id="zbody">${html}</div></div>`,
        LazyComponent: await getApp(transpiled),
      });
    })();
  }, [hashCode]);

  // Const LazyStarter = () => lazy(() => getApp(transpiled)) : <div></div>;

  const LazyComponentInit = lazy(async () => import(createJsBlob(transpiled)));

  const [{ htmlContent, LazyComponent }, setHtmlCss] = useState({
    htmlContent: html,
    LazyComponent: LazyComponentInit, // Transpiled?  ,
  });

  // Const { LazyComponent } = fallCont;

  // const LazyComponentInit = React.lazy(()=>import(createJsBlob(transpiled)))

  return (
    <Suspense
      key={hashCode}
      fallback={<div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>}
    >
      <LazyComponent key={hash} />
    </Suspense>
  );

  function createJsBlob(code: string) {
    const blob = new Blob([code], { type: "application/javascript" });

    return URL.createObjectURL(blob);
  }

  async function getApp(transpiled: string) {
    const objectUrl = createJsBlob(transpiled);

    const App = (await import(objectUrl)).default;

    URL.revokeObjectURL(objectUrl);

    return App;
  }
};

export default (
  props: { transpiled: string; hash: number; html: string; name: string },
) => <LazySpikeLandComponent {...props}></LazySpikeLandComponent>;
