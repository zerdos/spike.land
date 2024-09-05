import { Md5 } from "ts-md5";

export const md5 = (input: string): string => generateDeterministicKey(input).slice(0, 8);

const generateDeterministicKey = (input: string): string => {
  const hash = Md5.hashStr(input).toString();
  const validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < hash.length; i++) {
    const charCode = hash.charCodeAt(i);
    result += validChars[charCode % validChars.length];
  }

  return result;
};
