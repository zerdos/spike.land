import { Md5 } from "ts-md5";

const characterMap: { [key: string]: string } = {
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

export const md5 = (input: string | object): string => {
  const inputString = typeof input === "string" ? input : JSON.stringify(input);
  const fullHash = Md5.hashStr(inputString).toString();
  const hashWithoutZeros = fullHash.replace(/0/g, "");
  const modifiedHash = hashWithoutZeros.split("").map(char => {
    if (characterMap[char]) return characterMap[char];
    return char;
  }).join("");
  return modifiedHash.slice(0, 8);
};

// Now using a object to map characters that need to be replaced,
// and refactored the code to remove the commented out cache functionality
// and added some variable names to improve readability.
