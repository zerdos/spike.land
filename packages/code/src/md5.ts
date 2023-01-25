import { Md5 } from "ts-md5";
// const cache = globalThis.md5cac
export const md5 = (code: string | object) =>
  // cache.get(code) || cache.set(
  // code,
  md5FULL(typeof code === "string" ? code : JSON.stringify(code)).split("0")
    .join("k")
    .split("1").join("g")
    .split("2").join("j")
    .split("3").join("k")
    .split("4").join("b")
    .split("5").join("n")
    .split("6").join("o")
    .split("7").join("x")
    .split("8").join("q")
    .split("9").join("z")
    .slice(0, 8);
// ).get(code);

function md5FULL(inputString: string) {
  return Md5.hashStr(inputString);
}
