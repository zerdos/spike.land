declare global {
  interface Crypto {
    randomUUID: () => string;
  }
}

declare module "textdiff-create" {
  const createDelta = (str1: string, str2: string) => Object < unknown > [];
  export default createDelta;
}

declare module "textdiff-patch" {
  export default (str: string) => string;
}
