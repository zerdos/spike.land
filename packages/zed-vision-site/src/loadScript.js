export function loadScript(src) {
  return new Promise(function (resolve, reject) {
    var s;
    s = window.document.createElement("script");
    s.src = src;
    s.onload = () => resolve(window);
    s.onerror = reject;
    window.document.head.appendChild(s);
  });
}
