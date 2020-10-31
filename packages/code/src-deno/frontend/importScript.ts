export const importScript = async (src: string) =>
  new Promise(function (resolve, reject) {
    const s = window.document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    window.document.head.appendChild(s);
  });
