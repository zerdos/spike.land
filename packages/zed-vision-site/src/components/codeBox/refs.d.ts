import { CSSObject } from "@emotion/react";

declare module "@zedvision/code/src/hash";
declare namespace JSX {
  interface IntrinsicElements {
    css?: CSSObject;
  }
}
