declare module global {
  interface MonacoEnvironment {
  }
  interface Crypto {
    randomUUID: () => string;
  }
}

declare module "textdiff-create" {
  const createDelta: (str1: string, str2: string) => Object[];
  export default createDelta;
}

declare module "textdiff-patch" {
  const applyPatch: (str: string, obj: JSON) => string;
  export default applyPatch;
}

declare module "*.workerJS" {
  const dataUrl: string;
  export default dataUrl;
}
