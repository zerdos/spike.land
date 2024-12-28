declare module "*.html" {
  const value: string;
  export default value;
}

declare module "textdiff-create" {
  const computeTextDelta: (str1: string, str2: string) => object[];
  export default computeTextDelta;
}

declare module "textdiff-patch" {
  const applyPatch: (str: string, obj: JSON) => string;
  export default applyPatch;
}

declare module "*.workerJS" {
  const dataUrl: string;
  export default dataUrl;
}
