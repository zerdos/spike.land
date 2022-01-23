import "./chunk-YUAS5IZ4.mjs";

// js/renderToString.tsx
import { jsx } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/emotion-react.mjs";
import createCache from "https://ga.jspm.io/npm:@emotion/cache@11.7.1/dist/emotion-cache.browser.esm.js";
import { CacheProvider } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/emotion-react.mjs";
import { renderToString } from "https://ga.jspm.io/npm:react-dom@18.0.0-rc.0-next-fe905f152-20220107/server.browser.js";
var getHtmlAndCss = (MyComponent) => {
  const key = "foo";
  const cache = createCache({ key });
  let cssText = "";
  cache.sheet.insert = (rule) => {
    cssText += rule;
  };
  const markup = renderToString(/* @__PURE__ */ jsx(CacheProvider, {
    value: cache
  }, /* @__PURE__ */ jsx(MyComponent, null)));
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
        <meta charset="UTF-8">
        <style>${cssText}</style>
    </head>
    <body>
        <div>${markup}</div>
    </body>
  </html>
`;
  return {
    html: markup,
    css: cssText
  };
};
export {
  getHtmlAndCss
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVuZGVyVG9TdHJpbmcudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IGNyZWF0ZUNhY2hlIGZyb20gXCJAZW1vdGlvbi9jYWNoZVwiO1xuaW1wb3J0IHsgQ2FjaGVQcm92aWRlciB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tIFwicmVhY3QtZG9tL3NlcnZlclwiO1xuXG5leHBvcnQgY29uc3QgZ2V0SHRtbEFuZENzcyA9IChNeUNvbXBvbmVudDogKCkgPT4gSlNYLkVsZW1lbnQpID0+IHtcbiAgY29uc3Qga2V5ID0gXCJmb29cIjtcbiAgY29uc3QgY2FjaGUgPSBjcmVhdGVDYWNoZSh7IGtleSB9KTtcbiAgbGV0IGNzc1RleHQgPSBcIlwiO1xuICBjYWNoZS5zaGVldC5pbnNlcnQgPSAocnVsZSkgPT4ge1xuICAgIGNzc1RleHQgKz0gcnVsZTtcbiAgfTtcblxuICBjb25zdCBtYXJrdXAgPSByZW5kZXJUb1N0cmluZyhcbiAgICA8Q2FjaGVQcm92aWRlciB2YWx1ZT17Y2FjaGV9PlxuICAgICAgPE15Q29tcG9uZW50IC8+XG4gICAgPC9DYWNoZVByb3ZpZGVyPixcbiAgKTtcblxuICBjb25zdCBodG1sID0gYFxuICA8IURPQ1RZUEUgaHRtbD5cbiAgPGh0bWw+XG4gICAgPGhlYWQ+XG4gICAgICAgIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiPlxuICAgICAgICA8c3R5bGU+JHtjc3NUZXh0fTwvc3R5bGU+XG4gICAgPC9oZWFkPlxuICAgIDxib2R5PlxuICAgICAgICA8ZGl2PiR7bWFya3VwfTwvZGl2PlxuICAgIDwvYm9keT5cbiAgPC9odG1sPlxuYDtcblxuICByZXR1cm4ge1xuICAgIGh0bWw6IG1hcmt1cCxcbiAgICBjc3M6IGNzc1RleHQsXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFTyxJQUFNLGdCQUFnQixDQUFDLGdCQUFtQztBQUMvRCxRQUFNLE1BQU07QUFDWixRQUFNLFFBQVEsWUFBWSxFQUFFO0FBQzVCLE1BQUksVUFBVTtBQUNkLFFBQU0sTUFBTSxTQUFTLENBQUMsU0FBUztBQUM3QixlQUFXO0FBQUE7QUFHYixRQUFNLFNBQVMsZUFDYixvQkFBQyxlQUFEO0FBQUEsSUFBZSxPQUFPO0FBQUEsS0FDcEIsb0JBQUMsYUFBRDtBQUlKLFFBQU0sT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBS0U7QUFBQTtBQUFBO0FBQUEsZUFHRjtBQUFBO0FBQUE7QUFBQTtBQUtiLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=
