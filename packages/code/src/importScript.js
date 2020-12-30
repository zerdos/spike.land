/**
 * 
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
      s.onload = (() => {
        if (res.length === 0) {
          resolve(window);
        }
        const ret = {};

        res.forEach(
          //@ts-ignore
          (x) => Object.assign(ret, window[x]),
        );
        resolve(ret);
      });

      s.onerror = reject;
      window.document.head.appendChild(s);
    });
  // }
};
