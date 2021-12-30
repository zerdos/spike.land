interface ILaztCom {
  name: string;
  html: string;
  transpiled: string;
  hash: number;
}

export const LazySpikeLandComponent = (
  { name, html, hash, transpiled }: ILaztCom,
) => {
  const [hashCode, setHash] = React.useState(hash);

  React.useEffect(() => {
    const intervalHandler = setInterval(async () => {
      const resp = await fetch(
        `https://code.spike.land/api/room/${name}/hashCodeSession`,
      );
      const text = await resp.text();
      setHash(Number(text));
    }, 69_000);
    return () => {
      console.log("INTERVAL CLEARED");
      clearInterval(intervalHandler);
    };
  }, []);

  React.useEffect(() => {
    (async () => {
      const resp = await fetch(
        `https://code.spike.land/api/room/${name}/session`,
      );
      const { html, css, transpiled } = await resp.json();
      setHtmlCss({
        html:
          `<div id="root"><style>${css}</style><div id="zbody">${html}</div></div>`,
        LazyComponent: await getApp(transpiled),
      });
    })();
  }, [hashCode]);

  const LazyStarter = () =>
    transpiled ? React.lazy(() => getApp(transpiled)) : <div></div>;

  const [fallCont, setHtmlCss] = React.useState({
    html,
    LazyComponent: LazyStarter, // transpiled?  ,
  });

  const { LazyComponent } = fallCont;

  return (
    <React.Suspense
      key={hashCode}
      fallback={<div dangerouslySetInnerHTML={{ __html: fallCont.html }}></div>}
    >
      <LazyComponent key={hashCode} />
    </React.Suspense>
  );

  function createJsBlob(code) {
    const blob = new Blob([code], { type: "application/javascript" });

    return URL.createObjectURL(blob);
  }

  async function getApp(transpiled) {
    const objUrl = createJsBlob(transpiled);

    const App = (await import(objUrl)).default;

    URL.revokeObjectURL(objUrl);

    return App;
  }
};
export default (props: { transpiled: string; hash: number; html: string }) => (
  <LazySpikeLandComponent {...props}></LazySpikeLandComponent>
);
