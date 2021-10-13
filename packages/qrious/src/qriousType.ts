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

export interface IQRious {
  constructor: (opts: IQROptions) => {};
  use: (BrowserElementService: any) => {};
  value: string;
  get: () => IQROptions;
}
