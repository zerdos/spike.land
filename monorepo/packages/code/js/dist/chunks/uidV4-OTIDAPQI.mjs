import "./chunk-JUCU63GK.mjs";

// js/uidV4.mjs
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var __default = /^(?:[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}|0{8}-(?:0{4}-){3}0{12})$/i;
function validate(uuid) {
  return typeof uuid === "string" && __default.test(uuid);
}
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function stringify(array) {
  const offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  const uuid = (byteToHex[array[offset + 0]] + byteToHex[array[offset + 1]] + byteToHex[array[offset + 2]] + byteToHex[array[offset + 3]] + "-" + byteToHex[array[offset + 4]] + byteToHex[array[offset + 5]] + "-" + byteToHex[array[offset + 6]] + byteToHex[array[offset + 7]] + "-" + byteToHex[array[offset + 8]] + byteToHex[array[offset + 9]] + "-" + byteToHex[array[offset + 10]] + byteToHex[array[offset + 11]] + byteToHex[array[offset + 12]] + byteToHex[array[offset + 13]] + byteToHex[array[offset + 14]] + byteToHex[array[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw new TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i1 = 0; i1 < 16; ++i1) {
      buf[offset + i1] = rnds[i1];
    }
    return buf;
  }
  return stringify(rnds);
}
export {
  v4 as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdWlkVjQubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJsZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5mdW5jdGlvbiBybmcoKSB7XG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmXG4gICAgICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pIHx8XG4gICAgICB0eXBlb2YgbXNDcnlwdG8gIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdHlwZW9mIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKTtcbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcImNyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkXCIsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufVxuXG5jb25zdCBfX2RlZmF1bHQgPVxuICAvXig/OltcXGRhLWZdezh9LVtcXGRhLWZdezR9LVsxLTVdW1xcZGEtZl17M30tWzg5YWJdW1xcZGEtZl17M30tW1xcZGEtZl17MTJ9fDB7OH0tKD86MHs0fS0pezN9MHsxMn0pJC9pO1xuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09IFwic3RyaW5nXCIgJiYgX19kZWZhdWx0LnRlc3QodXVpZCk7XG59XG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDI1NikudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFycmF5KSB7XG4gIGNvbnN0IG9mZnNldCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkXG4gICAgPyBhcmd1bWVudHNbMV1cbiAgICA6IDA7XG4gIGNvbnN0IHV1aWQgPSAoYnl0ZVRvSGV4W2FycmF5W29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJheVtvZmZzZXQgKyAxXV0gK1xuICAgIGJ5dGVUb0hleFthcnJheVtvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyYXlbb2Zmc2V0ICsgM11dICsgXCItXCIgK1xuICAgIGJ5dGVUb0hleFthcnJheVtvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyYXlbb2Zmc2V0ICsgNV1dICsgXCItXCIgK1xuICAgIGJ5dGVUb0hleFthcnJheVtvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyYXlbb2Zmc2V0ICsgN11dICsgXCItXCIgK1xuICAgIGJ5dGVUb0hleFthcnJheVtvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyYXlbb2Zmc2V0ICsgOV1dICsgXCItXCIgK1xuICAgIGJ5dGVUb0hleFthcnJheVtvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycmF5W29mZnNldCArIDExXV0gK1xuICAgIGJ5dGVUb0hleFthcnJheVtvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycmF5W29mZnNldCArIDEzXV0gK1xuICAgIGJ5dGVUb0hleFthcnJheVtvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycmF5W29mZnNldCArIDE1XV0pXG4gICAgLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAxNSB8IDY0O1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDYzIHwgMTI4O1xuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG4gICAgZm9yIChsZXQgaTEgPSAwOyBpMSA8IDE2OyArK2kxKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaTFdID0gcm5kc1tpMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiBzdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCB7IHY0IGFzIGRlZmF1bHQgfTtcbiJdLAogICJtYXBwaW5ncyI6ICI7OztBQUFBLElBQUk7QUFDSixJQUFNLFFBQVEsSUFBSSxXQUFXO0FBQzdCLGVBQWU7QUFDYixNQUFJLENBQUMsaUJBQWlCO0FBQ3BCLHNCQUFrQixPQUFPLFdBQVcsZUFBZSxPQUFPLG1CQUN0RCxPQUFPLGdCQUFnQixLQUFLLFdBQzlCLE9BQU8sYUFBYSxlQUNsQixPQUFPLFNBQVMsb0JBQW9CLGNBQ3BDLFNBQVMsZ0JBQWdCLEtBQUs7QUFDbEMsUUFBSSxDQUFDLGlCQUFpQjtBQUNwQixZQUFNLElBQUksTUFDUjtBQUFBO0FBQUE7QUFLTixTQUFPLGdCQUFnQjtBQUFBO0FBR3pCLElBQU0sWUFDSjtBQUNGLGtCQUFrQixNQUFNO0FBQ3RCLFNBQU8sT0FBTyxTQUFTLFlBQVksVUFBVSxLQUFLO0FBQUE7QUFHcEQsSUFBTSxZQUFZO0FBQ2xCLFNBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFLEdBQUc7QUFDNUIsWUFBVSxLQUFNLEtBQUksS0FBSyxTQUFTLElBQUksTUFBTTtBQUFBO0FBRzlDLG1CQUFtQixPQUFPO0FBQ3hCLFFBQU0sU0FBUyxVQUFVLFNBQVMsS0FBSyxVQUFVLE9BQU8sU0FDcEQsVUFBVSxLQUNWO0FBQ0osUUFBTSxPQUFRLFdBQVUsTUFBTSxTQUFTLE1BQU0sVUFBVSxNQUFNLFNBQVMsTUFDcEUsVUFBVSxNQUFNLFNBQVMsTUFBTSxVQUFVLE1BQU0sU0FBUyxNQUFNLE1BQzlELFVBQVUsTUFBTSxTQUFTLE1BQU0sVUFBVSxNQUFNLFNBQVMsTUFBTSxNQUM5RCxVQUFVLE1BQU0sU0FBUyxNQUFNLFVBQVUsTUFBTSxTQUFTLE1BQU0sTUFDOUQsVUFBVSxNQUFNLFNBQVMsTUFBTSxVQUFVLE1BQU0sU0FBUyxNQUFNLE1BQzlELFVBQVUsTUFBTSxTQUFTLE9BQU8sVUFBVSxNQUFNLFNBQVMsT0FDekQsVUFBVSxNQUFNLFNBQVMsT0FBTyxVQUFVLE1BQU0sU0FBUyxPQUN6RCxVQUFVLE1BQU0sU0FBUyxPQUFPLFVBQVUsTUFBTSxTQUFTLE1BQ3hEO0FBQ0gsTUFBSSxDQUFDLFNBQVMsT0FBTztBQUNuQixVQUFNLElBQUksVUFBVTtBQUFBO0FBR3RCLFNBQU87QUFBQTtBQUdULFlBQVksU0FBUyxLQUFLLFFBQVE7QUFDaEMsWUFBVSxXQUFXO0FBQ3JCLFFBQU0sT0FBTyxRQUFRLFVBQVcsU0FBUSxPQUFPO0FBQy9DLE9BQUssS0FBSyxLQUFLLEtBQUssS0FBSztBQUN6QixPQUFLLEtBQUssS0FBSyxLQUFLLEtBQUs7QUFDekIsTUFBSSxLQUFLO0FBQ1AsYUFBUyxVQUFVO0FBQ25CLGFBQVMsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLElBQUk7QUFDOUIsVUFBSSxTQUFTLE1BQU0sS0FBSztBQUFBO0FBRzFCLFdBQU87QUFBQTtBQUdULFNBQU8sVUFBVTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=
