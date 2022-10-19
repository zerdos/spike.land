//@ts-expect-error
export { Fragment } from "react/jsx-runtime";
import { jsx as jsxEmotion } from "@emotion/react";
import { jsx as jsxReact } from "react/jsx-runtime";

function jsx(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return jsxReact(type, props, key);
  }

  return jsxEmotion(type, props, key);
}
function jsxs(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return jsxReact(type, props, key);
  }

  return jsxEmotion(type, props, key);
}

export { jsx, jsxs };
