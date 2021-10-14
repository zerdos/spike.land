import { CSSObject } from "@emotion/react";

declare namespace JSX {
  interface IntrinsicElements {
    css?: CSSObject;
  }
}
