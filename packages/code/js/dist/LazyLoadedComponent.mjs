// js/LazyLoadedComponent.tsx
var { React } = window;
var { Suspense } = React;
var LazySpikeLandComponent = ({ name, html, hash, transpiled }) => {
  const [hashCode, setHash] = React.useState(hash);
  React.useEffect(() => {
    const intervalHandler = setInterval(async () => {
      const resp = await fetch(`https://code.spike.land/api/room/${name}/hashCodeSession`);
      const text = await resp.text();
      setHash(Number(text));
    }, 69e3);
    return () => {
      console.log("INTERVAL CLEARED");
      clearInterval(intervalHandler);
    };
  }, []);
  React.useEffect(() => {
    (async () => {
      const resp = await fetch(`https://code.spike.land/api/room/${name}/session`);
      const { html: html2, css, transpiled: transpiled2 } = await resp.json();
      setHtmlCss({
        htmlContent: `<div id="root"><style>${css}</style><div id="zbody">${html2}</div></div>`,
        LazyComponent: await getApp(transpiled2)
      });
    })();
  }, [hashCode]);
  const LazyComponentInit = React.lazy(() => import(createJsBlob(transpiled)));
  const [{ htmlContent, LazyComponent }, setHtmlCss] = React.useState({
    htmlContent: html,
    LazyComponent: LazyComponentInit
  });
  return /* @__PURE__ */ React.createElement(Suspense, {
    key: hashCode,
    fallback: /* @__PURE__ */ React.createElement("div", {
      dangerouslySetInnerHTML: { __html: htmlContent }
    })
  }, /* @__PURE__ */ React.createElement(LazyComponent, {
    key: hash
  }));
  function createJsBlob(code) {
    const blob = new Blob([code], { type: "application/javascript" });
    return URL.createObjectURL(blob);
  }
  async function getApp(transpiled2) {
    const objUrl = createJsBlob(transpiled2);
    const App = (await import(objUrl)).default;
    URL.revokeObjectURL(objUrl);
    return App;
  }
};
var LazyLoadedComponent_default = (props) => /* @__PURE__ */ React.createElement(LazySpikeLandComponent, {
  ...props
});
export {
  LazyLoadedComponent_default as default
};
//# sourceMappingURL=LazyLoadedComponent.mjs.map
