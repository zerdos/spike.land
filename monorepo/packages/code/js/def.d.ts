declare module "textdiff-create" {
  const create = (str1: string, str2: string) => ({ str1, str2 }) as unknown;
  const createDelta: typeof create;
  export default createDelta;
}

declare module "textdiff-patch" {
  const applyPatch = (str: string, obj: JSON) => `${str} ${obj}`;
  export default applyPatch;
}
