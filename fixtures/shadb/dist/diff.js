"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assemble = exports.isDiff = exports.diff = void 0;
const diff_1 = require("diff");
const ipfs_only_hash_1 = require("ipfs-only-hash");
const diff = async (str1, str2) => {
  const sha1Str1 = ipfs_only_hash_1.default.of(str1);
  const res = (0, diff_1.diffChars)(str1, str2);
  return {
    b: await sha1Str1,
    c: res.map((x) => x.added ? x.value : x.removed ? -x.count : x.count),
  };
};
exports.diff = diff;
const isDiff = (str) => {
  if (str.length < 10) {
    return false;
  }
  const isKey =
    [...(str.slice(0, 8))].filter((x) => x < "0" || x > "f").length === 0;
  const maybeInst = str.slice(8);
  if (
    isKey && maybeInst[0] === "[" && maybeInst[maybeInst.length - 1] === "]"
  ) {
    try {
      return JSON.parse(maybeInst).length > 1;
    } catch (_a) {
      return false;
    }
  }
  return false;
};
exports.isDiff = isDiff;
const assemble = (oldValue, instructions) => {
  const instArr = JSON.parse(instructions);
  let old = oldValue.slice();
  let ret = "";
  instArr.forEach((element) => {
    if (Number(element) === element) {
      const absNum = Math.abs(element);
      const currentString = old.slice(0, absNum);
      old = old.slice(absNum);
      if (element > 0) {
        ret += String(currentString);
      }
    } else {
      ret += String(element);
    }
  });
  return ret;
};
exports.assemble = assemble;
