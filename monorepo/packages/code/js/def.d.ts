declare module "textdiff-create" {
  const create: (str1: string, str2: string) => ({ str1: string, str2: string });
  const createDelta: typeof create;
  export default createDelta;
}

declare module "textdiff-patch" {
  const applyPatch : (str: string, obj: JSON) => string
  export default applyPatch;
}
