export const importScript = async (src) =>
  document.querySelector(`script[src="${src}"]`) ||
  new Promise(function (resolve, reject) {
    const s = window.document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    window.document.head.appendChild(s);
  });
