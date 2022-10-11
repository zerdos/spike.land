import { CacheProvider, css, Global, jsx }  from "@emotion/react";

export { CacheProvider, css, Global, jsx }
// @ts-expect-error
export {  jsxs, Fragment } from "@emotion/react/jsx-runtime"

const EmotionReact= { CacheProvider, css, Global, jsx } 
export default  EmotionReact