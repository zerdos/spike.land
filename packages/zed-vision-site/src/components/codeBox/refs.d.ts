import { CSSObject } from "@emotion/react";

declare module "gatsby";
declare namespace JSX {
  interface IntrinsicElements {
    css?: CSSObject;
  }
}
