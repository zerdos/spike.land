export const getMonaco = async () => {
  const importScript = (src, res = []) => {
    if (typeof window === "undefined") return {};
    const prefix = src.slice(0, 8);
    if (prefix === "https://") {
      return window.document.head.querySelector(`script[src="${src}"]`) ||
        new Promise(function (resolve, reject) {
          const s = window.document.createElement("script");
          s.src = src;
          s.async = "async";
          s.type = "application/javascript";
          s.onload = (() => {
            if (res.length === 0) {
              resolve(window);
            }
            const ret = {};
            res.forEach((x) => Object.assign(ret, window[x]));
            resolve(ret);
          });

          s.onerror = reject;
          window.document.head.appendChild(s);
        });
    } else if (prefix === "@zedvisi") {
      // if (!cache[src]) cache[src] = import(`https://unpkg.com/${src}`);
      // return cache[src];
    }
  };

  const vsPath = `https://unpkg.com/@zedvision/monaco-editor@11.10.25/min/vs`;

  const { require } = await importScript(
    `${vsPath}/loader.js`,
  );

  require.config({ paths: { "vs": vsPath } });
  const monaco = await new Promise((resolve) =>
    require(["vs/editor/editor.main"], (_m) => resolve(_m))
  );
  return monaco;
};
