import { config } from "https://deno.land/x/dotenv/mod.ts";

import { getHash } from "./maintenence.ts";

const env = config();

const hash = "e3170f66";
const str = JSON.stringify(await getHash(hash));
await Deno.writeTextFile(`./data/${hash}.json`, str);
