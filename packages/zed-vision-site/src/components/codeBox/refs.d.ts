declare module "gatsby";
declare module "@zedvision/qrious" {
  interface IQROptions {
    element: Element;
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
    set: (opts: IQROptions) => void;
    get: () => IQROptions;
  }
}
