import { config } from "https://deno.land/x/dotenv/mod.ts";

import { getKeys } from "./maintenence.ts";

const env = config();

console.log(await getKeys(env.API_KEY, "a"));
env.API_KEY;
