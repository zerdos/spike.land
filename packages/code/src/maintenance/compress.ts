import { config } from "https://deno.land/x/dotenv/mod.ts";
import { sha256 } from "./sha256.ts";
import { keys } from "./data/keys.ts";
const env = config();

// //@ts-ignore
// const checkHashLimit = asyncLimit(checkHash, 1);
let memory: string[] = [];
async function checkHash(hash: string) {
  const text = Deno.readTextFileSync(`./data/${hash}.json`);
  memory.push(text);

  //   // console.log( sha256(text));
}

keys.filter((x) => x.length < 9).map(checkHash);

// const mmm: string[] = []
// for (const dirEntry in Deno.readDirSync("./data/90")) {
// // console.log(file);
// console.log(dirEntry);

// }

// for (const dirEntry of Deno.readDirSync("./data/880")) {
//   console.log(dirEntry.name);
//   memory.push(Deno.readTextFileSync("./data/880/" + dirEntry.name));
// }
function shuffle(arr: string[]) {
  var currentIndex = arr.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}
memory = shuffle(memory);
// console.log(mmm)

// console.log(memory.filter((c) => c.indexOf("***") > -1).length);
//console.log(memory[0]);
let iters = 0;

while (iters < 10000) {
  let length = 15;
  let num = -1;
  let oldST = "";
  let newMemory: string[] = [];
  const mem = memory.shift() as string;
  for (let i = 1; i + length < mem.length; i++) {
    const st = mem.substr(i, length);

    const oldNum = num;
    num = memory.findIndex((x) => x.indexOf(st) > -1);

    if (num > 0) {
      oldST = st;
      i--;
      length++;

      let st2 = mem.substr(i, length + 20);
      if (memory.findIndex((x) => x.indexOf(st2) > -1) > -1) length += 20;

      let st3 = mem.substr(i, length + 10);
      if (memory.findIndex((x) => x.indexOf(st3) > -1) > -1) length += 10;

      let st4 = mem.substr(i, length + 3);
      if (memory.findIndex((x) => x.indexOf(st4) > -1) > -1) length += 3;
    } else if (oldNum > 0 && num === -1) {
      i = i + oldST.length - 15;
      newMemory.push(oldST);
      length = 15;
    }
    // console.log(i, length);
  }
  newMemory.push(mem);
  const hashMem = newMemory.map((s) => sha256(s));
  Deno.mkdirSync("./data/" + iters);
  newMemory.map((x) =>
    Deno.writeTextFileSync(`./data/${iters}/` + sha256(x) + ".json", x)
  );
  memory = memory.map((t) => {
    let k = t;
    newMemory.map((v, i) => {
      k = k.replace(v, "***" + hashMem[i] + "***");
    });
    if (k !== t) {
      const hash = sha256(k);
      Deno.writeTextFileSync(`./data/${iters}/${hash}.json`, k);
    }
    return k;
  });
  memory = [...memory, ...newMemory];
  console.log(iters, memory.length);
  if (iters % 10 === 0) {
    memory.map((x) =>
      Deno.writeTextFileSync("./data/" + iters + "/" + sha256(x) + ".json", x)
    );
  }
  iters++;
}
