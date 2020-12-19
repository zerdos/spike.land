import { config } from "https://deno.land/x/dotenv/mod.ts";
//import { memo } from "react";
// import { getHash } from "./maintenence.ts";
// import { asyncLimit } from "./asyncLimit.js";
// import
import { sha256 } from "./sha256.js";
// import { keys } from "./data/keys.ts";
const env = config();

// //@ts-ignore
// const checkHashLimit = asyncLimit(checkHash, 1);
let memory: string[] = [];
// async function checkHash(hash: string) {
//   const text = Deno.readTextFileSync(`./data/${hash}.json`);
//   memory.push(text);

//   // console.log( sha256(text));
// }

// keys.filter((x) => x.length < 9).map(checkHash);

// const mmm: string[] = []
// for (const dirEntry in Deno.readDirSync("./data/90")) {
// // console.log(file);
// console.log(dirEntry);

// }

for (const dirEntry of Deno.readDirSync("./data/10")) {
  //   console.log(dirEntry.name);
  memory.push(Deno.readTextFileSync("./data/10/" + dirEntry.name));
}

// /\*\*\*[0-9a-f]{8}\*\*\*/gm[Symbol.match](memory[0])
// let j=0
// while(j<3){
// let re = new RegExp(
// console.log(re[Symbol.match](memory[0]))

let hashmap: {
  [key: string]: string;
} = {};
memory.map((x) => hashmap[sha256(x)] = x);

// console.log(memory.length)

// ///@ts-ignore
let round = 0;
const decompress = (val: string): string => {
  let res = val;
  /\*\*\*[0-9a-f]{8}\*\*\*/gm[Symbol.match](val)?.map(
    (x) => x.substr(3, 8),
  ).filter((x) => hashmap[x]).map((x) => {
    res = res.replace(`***${x}***`, hashmap[x]);
    hashmap[sha256(res)] = res;
  });

  if (val === res) return res;
  console.log("ROUND", round++);
  return decompress(res);
};

memory = memory.map(decompress);
console.log(memory);

// console.log(memory);

// console.log(decompress(memory[1]))

// let h="";
// /\*\*\*[0-9a-f]{8}\*\*\*/gm[Symbol.match](memory[0])?.map(
//     x=>x.substr(3,8)
// ).map(x=>h = x);

// console.log(memory[0].replace(`***${h}***`,hashmap[h]));

// let replaced = 0;
// Object.keys(hashmap).map( i=> {

//         const count = memory.filter(x=>x.indexOf("***"+i+"***")>-1).length;
//         if (count===1) {
//             const s = memory.filter(x=>x.indexOf("***"+i+"***")>-1)
//             console.log(count,i, hashmap[i], s[0])
//         }

// })
// j++;
// }
