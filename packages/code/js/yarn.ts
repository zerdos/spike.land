import pnpPlugin from '@yarnpkg/esbuild-plugin-pnp';
import {build, initialize} from "esbuild-wasm"

import wasmURL from "esbuild-wasm/esbuild.wasm";

await initialize(
    {
      wasmURL: new URL(wasmURL, import.meta.url).toString()
    });

   await build({
        plugins: [pnpPlugin()
        ]
    })