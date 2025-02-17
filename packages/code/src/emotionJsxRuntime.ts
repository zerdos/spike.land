export { jsxDEV } from "@emotion/react/jsx-dev-runtime";
import * as EJsx from "@emotion/react/jsx-runtime";
import * as Jsx from "react/jsx-runtime";

const JSX = { ...Jsx, ...EJsx };

export default JSX;

export const { jsx, jsxs, Fragment } = JSX;
