import * as shaWorker from "./sha256/sha256.worker.ts";
const hashTable = {};

const { sha256 } = ((typeof window !== "undefined") &&
  (shaWorker as unknown as () => typeof shaWorker)()) as typeof shaWorker;

export const hash = async (input: string | unknown) => {
  const strInput = typeof input !== "string" ? JSON.stringify(input) : input;

  const hash = await sha256(strInput);

  const shorterHash = shortener(hash);

  hashTable[hash] = input;

  return shorterHash;
  function shortener(hash: string) {
    for (let i = 4; i < 64; i++) {
      const shorterHash = hash.substr(0, i);
      if (hashTable[shorterHash] === undefined) {
        hashTable[shorterHash] = hash;
        return shorterHash;
      }

      if (hashTable[shorterHash] === hash) return shorterHash;
    }
    return hash;
  }
};

export const unHash = async (hash: string) => hashTable[hashTable[hash]];
