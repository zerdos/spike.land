declare module "qrious-core" {
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
