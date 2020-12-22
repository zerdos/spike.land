// @flow
import memoize from '@zedvision/emotion-memoize'
import reactPropsRegexStr from "./props"

const reactPropsRegex = new RegExp(reactPropsRegexStr);

// https://esbench.com/bench/5bfee68a4cd7e6009ef61d23
const isPropValid = /* #__PURE__ */ memoize(
  (prop) =>
    reactPropsRegex.test(prop) ||
    (prop.charCodeAt(0) === 111 /* o */ &&
      prop.charCodeAt(1) === 110 /* n */ &&
      prop.charCodeAt(2) < 91) /* Z+1 */
)

export default isPropValid
