import { config } from "https://deno.land/x/dotenv/mod.ts";
import { getHash } from "./maintenence.ts";
import { asyncLimit } from "./asynclimit.js";
// import {sha256} from "../sha256.ts"
import { sha256 } from "./sha256.ts";
import { keys } from "./data/keys.ts";
const env = config();

//@ts-ignore
const checkhashLimit = asyncLimit(checkHash, 1);
let memory: string[] = [];
async function checkHash(hash: string) {
  const text = Deno.readTextFileSync(`./data/${hash}.json`);
  memory.push(text);

  // console.log( sha256(text));
}
keys.filter((x) => x.length < 9).map(checkHash);

//console.log(memory[0]);
let iters = 0;

while (iters < 100) {
  let length = 15;
  let maxlen = 15;
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
  memory.push(mem);
  const hasmMem = newMemory.map((s) => sha256(s));
  Deno.mkdirSync("./data/" + iters);
  newMemory.map((x) =>
    Deno.writeTextFileSync(`./data/${iters}/` + sha256(x) + ".json", x)
  );
  memory = memory.map((t) => {
    let k = t;
    newMemory.map((v, i) => {
      k = k.replace(v, "***" + hasmMem[i] + "***");
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
