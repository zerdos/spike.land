// js/LazyLoadedComponent.tsx
var { React } = window;
var { Suspense } = React;
var LazySpikeLandComponent = ({ name, html, hash, transpiled }) => {
  const [hashCode, setHash] = React.useState(hash);
  React.useEffect(() => {
    const intervalHandler = setInterval(async () => {
      const resp = await fetch(`https://spike.land/api/room/${name}/hashCodeSession`);
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
      const resp = await fetch(`https://spike.land/api/room/${name}/session`);
      const { html: html2, css, transpiled: transpiled2 } = await resp.json();
      setHtmlCss({
        htmlContent: `<div id="root"><style>${css}</style><div id="zbody">${html2}</div></div>`,
        LazyComponent: await getApp(transpiled2)
      });
    })();
  }, [hashCode]);
  const LazyComponentInit = React.lazy(async () => import(createJsBlob(transpiled)));
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
    const objectUrl = createJsBlob(transpiled2);
    const App = (await import(objectUrl)).default;
    URL.revokeObjectURL(objectUrl);
    return App;
  }
};
var LazyLoadedComponent_default = (props) => /* @__PURE__ */ React.createElement(LazySpikeLandComponent, {
  ...props
});

export {
  LazySpikeLandComponent,
  LazyLoadedComponent_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vTGF6eUxvYWRlZENvbXBvbmVudC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IHsgUmVhY3QgfSA9IHdpbmRvdztcbmNvbnN0IHsgU3VzcGVuc2UgfSA9IFJlYWN0O1xuaW50ZXJmYWNlIElMYXp0Q29tIHtcbiAgbmFtZTogc3RyaW5nO1xuICBodG1sOiBzdHJpbmc7XG4gIHRyYW5zcGlsZWQ6IHN0cmluZztcbiAgaGFzaDogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgTGF6eVNwaWtlTGFuZENvbXBvbmVudCA9IChcbiAgeyBuYW1lLCBodG1sLCBoYXNoLCB0cmFuc3BpbGVkIH06IElMYXp0Q29tLFxuKSA9PiB7XG4gIGNvbnN0IFtoYXNoQ29kZSwgc2V0SGFzaF0gPSBSZWFjdC51c2VTdGF0ZShoYXNoKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGludGVydmFsSGFuZGxlciA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vc3Bpa2UubGFuZC9hcGkvcm9vbS8ke25hbWV9L2hhc2hDb2RlU2Vzc2lvbmAsXG4gICAgICApO1xuICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3AudGV4dCgpO1xuICAgICAgc2V0SGFzaChOdW1iZXIodGV4dCkpO1xuICAgIH0sIDY5XzAwMCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiSU5URVJWQUwgQ0xFQVJFRFwiKTtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxIYW5kbGVyKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9zcGlrZS5sYW5kL2FwaS9yb29tLyR7bmFtZX0vc2Vzc2lvbmAsXG4gICAgICApO1xuICAgICAgY29uc3QgeyBodG1sLCBjc3MsIHRyYW5zcGlsZWQgfSA9IGF3YWl0IHJlc3AuanNvbigpO1xuICAgICAgc2V0SHRtbENzcyh7XG4gICAgICAgIGh0bWxDb250ZW50OlxuICAgICAgICAgIGA8ZGl2IGlkPVwicm9vdFwiPjxzdHlsZT4ke2Nzc308L3N0eWxlPjxkaXYgaWQ9XCJ6Ym9keVwiPiR7aHRtbH08L2Rpdj48L2Rpdj5gLFxuICAgICAgICBMYXp5Q29tcG9uZW50OiBhd2FpdCBnZXRBcHAodHJhbnNwaWxlZCksXG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9LCBbaGFzaENvZGVdKTtcblxuICAvLyBDb25zdCBMYXp5U3RhcnRlciA9ICgpID0+IFJlYWN0LmxhenkoKCkgPT4gZ2V0QXBwKHRyYW5zcGlsZWQpKSA6IDxkaXY+PC9kaXY+O1xuXG4gIGNvbnN0IExhenlDb21wb25lbnRJbml0ID0gUmVhY3QubGF6eShhc3luYyAoKSA9PlxuICAgIGltcG9ydChjcmVhdGVKc0Jsb2IodHJhbnNwaWxlZCkpXG4gICk7XG5cbiAgY29uc3QgW3sgaHRtbENvbnRlbnQsIExhenlDb21wb25lbnQgfSwgc2V0SHRtbENzc10gPSBSZWFjdC51c2VTdGF0ZSh7XG4gICAgaHRtbENvbnRlbnQ6IGh0bWwsXG4gICAgTGF6eUNvbXBvbmVudDogTGF6eUNvbXBvbmVudEluaXQsIC8vIFRyYW5zcGlsZWQ/ICAsXG4gIH0pO1xuXG4gIC8vIENvbnN0IHsgTGF6eUNvbXBvbmVudCB9ID0gZmFsbENvbnQ7XG5cbiAgLy8gY29uc3QgTGF6eUNvbXBvbmVudEluaXQgPSBSZWFjdC5sYXp5KCgpPT5pbXBvcnQoY3JlYXRlSnNCbG9iKHRyYW5zcGlsZWQpKSlcblxuICByZXR1cm4gKFxuICAgIDxTdXNwZW5zZVxuICAgICAga2V5PXtoYXNoQ29kZX1cbiAgICAgIGZhbGxiYWNrPXs8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogaHRtbENvbnRlbnQgfX0+PC9kaXY+fVxuICAgID5cbiAgICAgIDxMYXp5Q29tcG9uZW50IGtleT17aGFzaH0gLz5cbiAgICA8L1N1c3BlbnNlPlxuICApO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUpzQmxvYihjb2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NvZGVdLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vamF2YXNjcmlwdFwiIH0pO1xuXG4gICAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBnZXRBcHAodHJhbnNwaWxlZDogc3RyaW5nKSB7XG4gICAgY29uc3Qgb2JqZWN0VXJsID0gY3JlYXRlSnNCbG9iKHRyYW5zcGlsZWQpO1xuXG4gICAgY29uc3QgQXBwID0gKGF3YWl0IGltcG9ydChvYmplY3RVcmwpKS5kZWZhdWx0O1xuXG4gICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xuXG4gICAgcmV0dXJuIEFwcDtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgKFxuICBwcm9wczogeyB0cmFuc3BpbGVkOiBzdHJpbmc7IGhhc2g6IG51bWJlcjsgaHRtbDogc3RyaW5nOyBuYW1lOiBzdHJpbmcgfSxcbikgPT4gPExhenlTcGlrZUxhbmRDb21wb25lbnQgey4uLnByb3BzfT48L0xhenlTcGlrZUxhbmRDb21wb25lbnQ+O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLElBQU0sRUFBRSxVQUFVO0FBQ2xCLElBQU0sRUFBRSxhQUFhO0FBUWQsSUFBTSx5QkFBeUIsQ0FDcEMsRUFBRSxNQUFNLE1BQU0sTUFBTSxpQkFDakI7QUFDSCxRQUFNLENBQUMsVUFBVSxXQUFXLE1BQU0sU0FBUztBQUUzQyxRQUFNLFVBQVUsTUFBTTtBQUNwQixVQUFNLGtCQUFrQixZQUFZLFlBQVk7QUFDOUMsWUFBTSxPQUFPLE1BQU0sTUFDakIsK0JBQStCO0FBRWpDLFlBQU0sT0FBTyxNQUFNLEtBQUs7QUFDeEIsY0FBUSxPQUFPO0FBQUEsT0FDZDtBQUNILFdBQU8sTUFBTTtBQUNYLGNBQVEsSUFBSTtBQUNaLG9CQUFjO0FBQUE7QUFBQSxLQUVmO0FBRUgsUUFBTSxVQUFVLE1BQU07QUFDcEIsSUFBQyxhQUFZO0FBQ1gsWUFBTSxPQUFPLE1BQU0sTUFDakIsK0JBQStCO0FBRWpDLFlBQU0sRUFBRSxhQUFNLEtBQUssNEJBQWUsTUFBTSxLQUFLO0FBQzdDLGlCQUFXO0FBQUEsUUFDVCxhQUNFLHlCQUF5Qiw4QkFBOEI7QUFBQSxRQUN6RCxlQUFlLE1BQU0sT0FBTztBQUFBO0FBQUE7QUFBQSxLQUcvQixDQUFDO0FBSUosUUFBTSxvQkFBb0IsTUFBTSxLQUFLLFlBQ25DLE9BQU8sYUFBYTtBQUd0QixRQUFNLENBQUMsRUFBRSxhQUFhLGlCQUFpQixjQUFjLE1BQU0sU0FBUztBQUFBLElBQ2xFLGFBQWE7QUFBQSxJQUNiLGVBQWU7QUFBQTtBQU9qQixTQUNFLG9DQUFDLFVBQUQ7QUFBQSxJQUNFLEtBQUs7QUFBQSxJQUNMLFVBQVUsb0NBQUMsT0FBRDtBQUFBLE1BQUsseUJBQXlCLEVBQUUsUUFBUTtBQUFBO0FBQUEsS0FFbEQsb0NBQUMsZUFBRDtBQUFBLElBQWUsS0FBSztBQUFBO0FBSXhCLHdCQUFzQixNQUFjO0FBQ2xDLFVBQU0sT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsTUFBTTtBQUV0QyxXQUFPLElBQUksZ0JBQWdCO0FBQUE7QUFHN0Isd0JBQXNCLGFBQW9CO0FBQ3hDLFVBQU0sWUFBWSxhQUFhO0FBRS9CLFVBQU0sTUFBTyxPQUFNLE9BQU8sWUFBWTtBQUV0QyxRQUFJLGdCQUFnQjtBQUVwQixXQUFPO0FBQUE7QUFBQTtBQUlYLElBQU8sOEJBQVEsQ0FDYixVQUNHLG9DQUFDLHdCQUFEO0FBQUEsS0FBNEI7QUFBQTsiLAogICJuYW1lcyI6IFtdCn0K
