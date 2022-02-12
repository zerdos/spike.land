import { CSSObject } from "@emotion/react";

declare module "*.webp";
declare namespace JSX {
  interface IntrinsicElements {
    css?: CSSObject;
  }
}
