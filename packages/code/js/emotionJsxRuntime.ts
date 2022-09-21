import "./react-preact";
import "@emotion/cache";
import {
  c as createEmotionProps,
  E as Emotion,
  h as hasOwnProperty,
} from "../node_modules/@emotion/react/dist/emotion-element-6a883da9.browser.esm"
import "@babel/runtime/helpers/extends";
import "../node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm";
import "hoist-non-react-statics";
import hoistNonReactStatics from "../node_modules/@emotion/react/_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm";
import "@emotion/utils";
import "@emotion/serialize";
import "@emotion/use-insertion-effect-with-fallbacks";
import {
  Fragment as Fragment$1,
  jsx as jsx$1,
  jsxs as jsxs$1,
} from "./react-preact";

var Fragment = Fragment$1;
function jsx(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return jsx$1(type, props, key);
  }

  return jsx$1(Emotion, createEmotionProps(type, props), key);
}
function jsxs(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return jsxs$1(type, props, key);
  }

  return jsxs$1(Emotion, createEmotionProps(type, props), key);
}

export { Fragment, hoistNonReactStatics, jsx, jsxs };
