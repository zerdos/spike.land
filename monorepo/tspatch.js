var x = Object.create;
var n = Object.defineProperty;
var a = Object.getOwnPropertyDescriptor;
var d = Object.getOwnPropertyNames;
var g = Object.getPrototypeOf, h = Object.prototype.hasOwnProperty;
var m = (r) => n(r, "__esModule", { value: !0 });
var v = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports);
var y = (r, e, f, t) => {
    if (e && typeof e == "object" || typeof e == "function") {
      for (let s of d(e)) {
        !h.call(r, s) && (f || s !== "default") && n(r, s, {
          get: () => e[s],
          enumerable: !(t = a(e, s)) || t.enumerable,
        });
      }
    }
    return r;
  },
  b = (r, e) =>
    y(
      m(n(
        r != null
          ? x(g(r))
          : {},
        "default",
        !e && r && r.__esModule
          ? { get: () => r.default, enumerable: !0 }
          : { value: r, enumerable: !0 },
      )),
      r,
    );
var i = v((k, c) => {
  "use strict";
  c.exports = function (r, e) {
    for (var f = "", t = 0, s = 0; s < e.length; s++) {
      var o = e[s], p = o[0], l = o[1];
      p == -1 ? t += l : p == 0 ? f += r.slice(t, t += l) : f += l;
    }
    return f;
  };
});
var u = b(i(), 1), q = u.default;
export { q as default };
