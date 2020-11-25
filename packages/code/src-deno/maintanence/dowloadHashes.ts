import { config } from "https://deno.land/x/dotenv/mod.ts";
import { getHash } from "./maintenence.ts";
import { keys } from "./data/keys.ts";
const env = config();

async function saveHash(hash: string) {
  //  Deno.readFileSync(`./data/${hash}.json`);
  if (hash.length > 8) {
    console.log("HASH?", hash);
    return;
  }
  const file = await getHash(hash);

  await Deno.writeTextFile(`./data/${hash}.json`, file);
}

// const keys2 = keys.filter(h=>h>"400");

// for (let i=0; i<keys2.length; i++) {
//     await saveHash(keys2[i]);
//     console.log(keys2[i])
// }

//console.log(keys)
const hash = {} as { [key: string]: number };

keys.map((k: string) => k.substr(0, 1)).forEach((element: string) => {
  hash[element] = hash[element] === undefined ? 1 : (hash[element] + 1);
});

console.log(hash);
