/**
 * @param {string} src
 * @param {*} res
 */
export const importScript = (src, res = []) =>
  document.head.querySelector(`script[src="${src}"]`) ||
  new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    // S.async = "async";
    // s.type = "application/javascript";
    s.addEventListener("load", () => {
      if (res.length === 0) {
        resolve(window);
      }

      const returnValue = {};

      for (const x of res) {
        Object.assign(returnValue, window[x]);
      }

      resolve(returnValue);
    });

    s.addEventListener("error", reject);
    document.head.append(s);
  }); // }

/**
 * @param {string} src
 * @param {string} cssId
 */
export const importCss = (src, cssId) => {
  if (!document.getElementById(cssId)) {
    const head = document.querySelectorAll("head")[0];
    const link = document.createElement("link");
    link.id = cssId;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = src;
    link.media = "all";
    head.append(link);
  }

  return true;
};
