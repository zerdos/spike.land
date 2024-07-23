import { Md5 } from "ts-md5";
const characterMap = {
  "0": "k",
  "1": "g",
  "2": "j",
  "3": "k",
  "4": "b",
  "5": "n",
  "6": "o",
  "7": "x",
  "8": "q",
  "9": "z",
};
export const md5 = (input) => {
  const inputString = typeof input === "string"
    ? input
    : JSON.stringify(input) || "";
  const fullHash = Md5.hashStr(inputString).toString();
  const hashWithoutZeros = fullHash.replace(/0/g, "");
  const modifiedHash = hashWithoutZeros.split("").map((char) => {
    if (characterMap[char]) {
      return characterMap[char];
    }
    return char;
  }).join("") + "aaaaaaaa";
  return modifiedHash.slice(0, 8);
};
