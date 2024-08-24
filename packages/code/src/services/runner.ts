export const runner = async (code: string) => {
  return cSess.setCode(code);
};
