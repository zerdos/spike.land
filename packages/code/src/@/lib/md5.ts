import { hash } from "immutable";
import { Md5 } from "ts-md5";

export const md5 = (input: object | string): string => generateDeterministicKey(input);

const generateDeterministicKey = (input: object | string): string => {
  let str = intToString(hash(Md5.hashStr(typeof input === "string" ? input : JSON.stringify(input))));
  while (str.length < 8) {
    str = str + str;
  }
  return str.slice(0, 8);
};

function intToString(n: number): string {
  if (n < 0) {
    n += 2 ** 31;
  }

  if (n > 2 ** 31) {
    throw new Error("Input must be a 32-bit unsigned integer");
  }

  let num = n;

  // Define character sets
  const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphanumeric = alpha + "0123456789";

  // Convert to base 62 for the second part
  let base62 = "";
  do {
    base62 = alphanumeric[num % 62] + base62;
    num = Math.floor(num / 62);
  } while (num > 0);

  // Ensure at least one alphabetic character for the first part
  if (base62.length === 0 || !alpha.includes(base62[0])) {
    base62 = "a" + base62;
  }

  // Split into two parts
  let alphaPart = "";
  let alphanumericPart = "";

  for (const char of base62) {
    if (alphaPart.length === 0 || alpha.includes(char)) {
      alphaPart += char;
    } else {
      alphanumericPart += char;
    }
  }

  return alphaPart + alphanumericPart;
}
