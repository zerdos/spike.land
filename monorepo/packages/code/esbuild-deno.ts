import * as esbuild from "https://deno.land/x/esbuild@v0.14.39/mod.js";
import { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.5.0/mod.ts";

await esbuild.build({
  plugins: [
    denoPlugin({ importMapURL: new URL("https://spike.land/importmap.json") }),
  ],
  entryPoints: ["https://spike.land/ws.mjs"],
  outfile: "./monorepo/sites/spike.land/public/bundle.mjs",
  bundle: true,
  format: "esm",
});
esbuild.stop();
