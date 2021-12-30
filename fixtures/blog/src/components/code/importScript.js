const cache = {};

export const importModule = async (src) =>
  (cache &&
    cache[src]) || await fetch(src)
    .then((resp) => resp.text())
    .then(async (text) => {
      const moduleCache = cache || {};
      const url = URL.createObjectURL(
        new Blob([text], { type: "application/javascript" }),
      );
      const mod = await (new Function(`return import("${url}")`)());
      if (typeof (mod.default) !== "undefined") {
        moduleCache[src] = mod.default;
      } else {
        moduleCache[src] = mod;
      }

      return moduleCache[src];
    });

export const importScript = (src, res = []) => {
  if (typeof window === "undefined") return {};
  const prefix = src.slice(0, 8);
  if (prefix === "https://") {
    return document.head.querySelector(`script[src="${src}"]`) ||
      new Promise(function (resolve, reject) {
        const s = document.createElement("script");
        s.src = src;
        s.async = "async";
        s.type = "application/javascript";
        s.onload = () => {
          if (res.length === 0) {
            resolve(window);
          }
          const ret = {};
          res.forEach((x) => Object.assign(ret, window[x]));
          resolve(ret);
        };

        s.onerror = reject;
        document.head.appendChild(s);
      });
  } else if (prefix === "@zedvisi") {
    // if (!cache[src]) cache[src] = import(`https://unpkg.com/${src}`);
    // return cache[src];
  }
};
