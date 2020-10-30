export const importScript = async (src: string) =>
  new Promise(function (resolve, reject) {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
