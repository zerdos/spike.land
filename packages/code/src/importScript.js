export const importScript = (src, res=[]) =>
  window.document.querySelector(`script[src="${src}"]`) ||
  new Promise(function (resolve, reject) {
    const s = window.document.createElement("script");
    s.src = src;
    s.onload = (() => {
      if (res.length===0) {
        resolve(window);
      }
      const ret = {};
      res.forEach(x=>Object.assign(ret, window[x]) );
      resolve(ret);
    });

    s.onerror = reject;
    window.document.head.appendChild(s);
  });
