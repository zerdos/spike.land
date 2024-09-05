import { Md5 } from "ts-md5";

export const md5 = (input: string | object): string => {
  let key = generateDeterministicKey(JSON.stringify(input));

  while (Number(key[0]).toString() === key[0]) key = key.slice(1);

  return key.slice(0, 8);
};

const generateDeterministicKey = (input: string): string => {
  const hash = Md5.hashStr(input).toString();
  const validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < hash.length; i++) {
    const charCode = hash.charCodeAt(i);
    result += validChars[charCode % validChars.length];
  }

  return result;
};
