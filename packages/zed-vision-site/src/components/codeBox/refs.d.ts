import { CSSObject } from "@emotion/react";

declare module "gatsby";
declare module "@zedvision/qrious" {
  interface IQROptions {
    element: HTMLCanvasElement;
    size: number;
    foregroundAlpha: number;
    foreground: string;
    padding: number;
    backgroundAlpha: number;
    background: string;
    value: string;
  }
  export class QRious {
    constructor(opts: IQROptions);
    value: string;
    get: () => IQROptions;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    css?: CSSObject;
  }
}
