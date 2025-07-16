import { hash } from "immutable";
import { Md5 } from "ts-md5";

const shortHashCache = new Map<string, string>();

export function md5(input: object | string): string {
  if (!input) input = "empty";

  const strInput = typeof input === "string" ? input : JSON.stringify(input);

  // Check cache
  if (shortHashCache.has(strInput)) {
    return shortHashCache.get(strInput)!;
  }

  // Compute numeric hash
  const hashedValue = hash(Md5.hashStr(strInput));
  let shortKey = intToString(hashedValue);

  // Ensure minimum length of 8
  while (shortKey.length < 8) {
    shortKey += shortKey;
  }
  shortKey = shortKey.slice(0, 8);

  // Store in cache
  shortHashCache.set(strInput, shortKey);

  return shortKey;
}

function intToString(n: number): string {
  // Adjust negative
  if (n < 0) {
    n += 2 ** 31;
  }

  if (n > 2 ** 31) {
    throw new Error("Input must be a 32-bit unsigned integer");
  }

  let num = n;
  const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphanumeric = alpha + "0123456789";

  let base62 = "";
  do {
    base62 = alphanumeric[num % 62] + base62;
    num = Math.floor(num / 62);
  } while (num > 0);

  if (base62.length === 0 || !alpha.includes(base62[0] || "")) {
    base62 = "a" + base62;
  }

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
