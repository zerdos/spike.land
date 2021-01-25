import { CSSObject } from "@emotion/react";

declare module "@zedvision/code/js/hash";
declare namespace JSX {
  interface IntrinsicElements {
    css?: CSSObject;
  }
}
