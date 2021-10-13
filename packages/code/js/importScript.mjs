/**
 * @param {string} src
 * @param {*} res
 */
export const importScript = (src, res = []) => {
  const prefix = src.slice(0, 8);
  // if (prefix === "https://") {
  return window.document.head.querySelector(`script[src="${src}"]`) ||
    new Promise(function (resolve, reject) {
      const s = window.document.createElement("script");
      s.src = src;
      // s.async = "async";
      // s.type = "application/javascript";
      s.onload = () => {
        if (res.length === 0) {
          resolve(window);
        }
        const ret = {};

        res.forEach(
          // deno-lint-ignore ban-ts-comment
          //@ts-ignore
          (x) => Object.assign(ret, window[x]),
        );
        resolve(ret);
      };

      s.onerror = reject;
      window.document.head.appendChild(s);
    });
  // }
};

/**
 * @param {string} src
 * @param {string} cssId
 */
export const importCss = (src, cssId) => {
  if (!window.document.getElementById(cssId)) {
    const head = window.document.getElementsByTagName("head")[0];
    const link = window.document.createElement("link");
    link.id = cssId;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = src;
    link.media = "all";
    head.appendChild(link);
  }
  return true;
};
