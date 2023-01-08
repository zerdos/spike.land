import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import * as esbuild from "https://deno.land/x/esbuild@v0.11.16/mod.js";
const ts = "let hasProcess: boolean = typeof process != \"null\"";
const result = await esbuild.build(ts, {
  loader: "ts",
  logLevel: "warning",
});
console.log("result:", result);
esbuild.stop();
