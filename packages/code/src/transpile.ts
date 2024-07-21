import { build as esmBuild, BuildOptions, initialize, transform } from "esbuild-wasm";
import { wasmFile } from "./esbuildWASM";
import { fetchPlugin } from "./fetchPlugin.mjs";
import { importMapReplace } from "./importMapReplace";
import { writeFile } from "./memfs";

declare const self:
  & ServiceWorkerGlobalScope
  & {
    mod: {
      init: boolean | Promise<boolean>;
      initialize: (
        wasmModule: WebAssembly.Module,
      ) => Promise<boolean> | boolean;
    };
  };

const mod = self.mod = self.mod
  || {
    init: false as (boolean | Promise<void> | NodeJS.Timeout),
    initialize: (wasmModule: WebAssembly.Module) =>
      (self.mod.init as boolean) || initialize({
        wasmModule,
        worker: false,
      }).then(() => self.mod.init = true) as Promise<boolean> | NodeJS.Timeout,
  };

export const cjs = async (code: string) => {
  const { code: cjs } = await transform(code, {
    loader: "tsx",
    format: "cjs",
    treeShaking: true,
    platform: "browser",
    minify: false,
    charset: "utf8",
    //   globalName: md5(code),
    keepNames: true,
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
        jsxFragmentFactory: "Fragment",
        jsxImportSource: "@emotion/react",
      },
    },
    target: "es2022",
  });
  return cjs;
};

 const decorateCodeStr= `
//** someHack **/
import {
  CacheProvider,
  createCache,
  createRoot,
} from "/renderHelpers.mjs";

export const renderApp = async ()=>{
  
    let root = document.getElementById("root")!;
    if (!root) {
        root = document.createElement("div");
        root.id = "root";
        document.body.appendChild(root);
        
    }
    const App  = module.default;
    const rRoot = createRoot(root);
    const cache = createCache({ key: "css", speedy: false });
    globalThis.cssCache = cache;
  
    rRoot.render(
      <CacheProvider value={cache}>
       <App
              width={ window.innerWidth}
              height={ window.innerHeight}
              top={ 0}
              left={ 0}
            />
      </CacheProvider>);

}
//** someHack **/
  `;


const offLoadToServer = async (code: string) => {
  const resp = await fetch(`https://js.spike.land?v=${swVersion}`, {
    method: "POST",
    body: code,
    headers: { TR_ORIGIN: origin },
  });
  if (!resp.ok) {
    return "JS spike land: api call error";
  }

  const transpiled = await resp.text();
  if (transpiled === "") return "";

  return "/** js.spike.land */" + transpiled;
};

export const transpile = async (
  code: string,
  origin: string,
  wasmModule?: WebAssembly.Module,
) => {
  if (wasmModule) {
    const initFinished = mod.initialize(wasmModule);

    if (initFinished !== true) await initFinished;
  } else {
    mod.init = mod.init || initialize({
      wasmURL: `/${wasmFile}`,
      worker: false,
    }).then(() => {
      return mod.init = true;
    });

    // if (mod.init !== true) await wait(1000);
    if (mod.init !== true) return offLoadToServer(code);
  }

  return transform( decorateCodeStr + code.replace(`export default `, `const module = {}; 
    module.default = `) + `


// Export the module object
export default module.default;

// Named export for accessing the module object
export { module };`, {
    loader: "tsx",
    format: "esm",
    treeShaking: true,
    platform: "browser",
    minify: false,
    charset: "utf8",
    //   globalName: md5(code),
    keepNames: true,
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
        jsxFragmentFactory: "Fragment",
        jsxImportSource: "@emotion/react",
      },
    },
    target: "es2022",
  }).then((x) => importMapReplace(x.code, origin)).catch(() => {
    console.log("offloading to server");

    return offLoadToServer(code);
  });
};

Object.assign(self, { transpile });

export const build = async (
  { codeSpace, origin, wasmModule }: {
    codeSpace: string;
    origin: string;
    wasmModule?: WebAssembly.Module;
  },
) => {
  if (wasmModule) {
    const initFinished = mod.initialize(wasmModule);

    if (initFinished !== true) await initFinished;
  } else {
    mod.init = mod.init || initialize({
      wasmURL: `/${wasmFile}`,
      worker: false,
    }).then(() => {
      return mod.init = true;
    });
  }

  const makeEnv = (environment: string) => ({
    "process.env.NODE_ENV": `"${environment}"`,
    "process.env.NODE_DEBUG": JSON.stringify(false),
    "process.browser": JSON.stringify(true),
    "process.env.DEBUG": JSON.stringify(false),
    "isBrowser": JSON.stringify(true),
    "isJest": JSON.stringify(false),
    "process.env.version": "\"1.1.1\"",
    global: "globalThis",

    "WORKER_DOM_DEBUG": JSON.stringify(false),
    "process.env.DUMP_SESSION_KEYS": JSON.stringify(false),
    // "libFileMap": JSON.stringify({}),
    process: JSON.stringify({
      version: "v19.5.0",
      versions: {
        node: "v19.5.0",
      },
      cwd: JSON.stringify(() => "/"),

      env: {
        NODE_ENV: `${environment}`,
        version: "v19.5.0",
        cwd: JSON.stringify(() => "/"),
        browser: true,
        isWebworker: true,
        NODE_DEBUG: false,
        DEBUG: false,
        isBrowser: true,
        versions: {
          node: "v19.5.0",
        },
      },
      browser: true,
    }),
  });
  const define = makeEnv("production");
  const defaultOpts: BuildOptions = {
    resolveExtensions: [
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".d.ts",
      ".css",
      ".json",
      ".mjs",
      ".js",
      ".wasm",
      ".ttf",
    ],
    loader: {
      ".js": "js",
      ".mjs": "js",
      ".json": "json",
      ".tsx": "tsx",
      ".css": "css",
      ".ttf": "dataurl",
    },
    outExtension: { ".js": ".mjs" },
    write: false,

    // metafile: false,
    // alias: {
    //  ...importMap.imports,
    // },

    target: "es2022",
    outdir: `${origin}/live/${codeSpace}/`,
    treeShaking: true,
    bundle: true,
    define,

    keepNames: false,
    ignoreAnnotations: true,

    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: false,

    splitting: false,

    format: "esm",
    platform: "browser",
    entryPoints: [
      `${origin}/live/${codeSpace}/index.js`, 
    ],
    packages: "external",

    plugins: [fetchPlugin],
  };

  return esmBuild(defaultOpts).then((x) => importMapReplace(x.outputFiles![0].text, origin)).then(async (x) => {
    await writeFile(`/live/${codeSpace}/index.mjs`, x);
    await fetch(`${origin}/live/${codeSpace}/index.mjs`, {
      method: "PUT",
      body: x,
      headers: {
        "Content-Type": "application/javascript",
        "TR_ORIGIN": `origin`,
        "TR_BUNDLE": `true`,
      },
    });
    return x;
  });
};

Object.assign(self, { transpile, build });
