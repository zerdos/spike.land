import { build as esmBuild, BuildOptions, initialize, transform } from "esbuild-wasm";
import { wasmFile } from "./esbuildWASM";
import { fetchPlugin } from "./fetchPlugin.mjs";
import { importMapReplace } from "./importMapReplace";

declare const self:
  & {
    swVersion: string;
  }
  & {
    mod: {
      init: boolean | Promise<boolean>;
      initialize: (wasmModule: WebAssembly.Module) => Promise<boolean> | boolean;
    };
  };

const { swVersion } = self;

const mod = self.mod = self.mod || {
  init: false as boolean | Promise<boolean>,
  initialize: async (wasmModule: WebAssembly.Module) => {
    if (self.mod.init === true) return true;
    await initialize({ wasmModule, worker: false });
    return self.mod.init = true;
  },
};

export const cjs = async (code: string) => {
  const { code: cjs } = await transform(code, {
    loader: "tsx",
    format: "cjs",
    treeShaking: true,
    platform: "browser",
    minify: false,
    charset: "utf8",
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

const decorateCodeStr = `
// Render helpers import
import {
  CacheProvider,
  createCache,
  createRoot,
} from "/renderHelpers.mjs";

export const renderApp = async () => {
  let root = document.getElementById("root");
  if (!root) {
    root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  }
  const App = module.default;
  const rRoot = createRoot(root);
  const cache = createCache({ key: "css", speedy: false });
  globalThis.cssCache = cache;

  rRoot.render(
    <CacheProvider value={cache}>
      <App
        width={window.innerWidth}
        height={window.innerHeight}
        top={0}
        left={0}
      />
    </CacheProvider>
  );
}
`;

const offLoadToServer = async (code: string, origin: string) => {
  const resp = await fetch(`https://js.spike.land?v=${swVersion}`, {
    method: "POST",
    body: code,
    headers: { TR_ORIGIN: origin },
  });
  if (!resp.ok) {
    return "JS spike land: API call error";
  }

  const transpiled = await resp.text();
  return transpiled ? `/** js.spike.land */\n${transpiled}` : "";
};

export const transpile = async (
  code: string,
  origin: string,
  wasmModule?: WebAssembly.Module,
) => {
  try {
    if (wasmModule) {
      await mod.initialize(wasmModule);
    } else {
      mod.init = mod.init || initialize({
        wasmURL: `/${wasmFile}`,
        worker: false,
      }).then(() => true);

      if (mod.init !== true) return offLoadToServer(code, origin);
    }

    const transformedCode = await transform(
      `${decorateCodeStr}
      ${
        code.replace(
          `export default `,
          `const module = {renderApp}; 
        module.default = `,
        )
      }
      export default module.default;
      export { module };
      globalThis.module = module;`,
      {
        loader: "tsx",
        format: "esm",
        treeShaking: true,
        platform: "browser",
        minify: false,
        charset: "utf8",
        keepNames: true,
        tsconfigRaw: {
          compilerOptions: {
            jsx: "react-jsx",
            jsxFragmentFactory: "Fragment",
            jsxImportSource: "@emotion/react",
          },
        },
        target: "es2022",
      },
    );

    return importMapReplace(transformedCode.code, origin);
  } catch (error) {
    console.error("Error during transpilation:", error);
    return offLoadToServer(code, origin);
  }
};

Object.assign(self, { transpile });

export const build = async ({
  codeSpace,
  origin,
  format = "esm",
  wasmModule,
}: {
  codeSpace: string;
  format: "esm" | "iife";
  origin: string;
  wasmModule?: WebAssembly.Module;
}) => {
  if (wasmModule) {
    await mod.initialize(wasmModule);
  } else {
    mod.init = mod.init || initialize({
      wasmURL: `/${wasmFile}`,
      worker: false,
    }).then(() => true);
  }

  const makeEnv = (environment: string) => ({
    "process.env.NODE_ENV": JSON.stringify(environment),
    "process.env.NODE_DEBUG": JSON.stringify(false),
    "process.browser": JSON.stringify(true),
    "process.env.DEBUG": JSON.stringify(false),
    "isBrowser": JSON.stringify(true),
    "isJest": JSON.stringify(false),
    "process.env.version": JSON.stringify("1.1.1"),
    global: "globalThis",
    "WORKER_DOM_DEBUG": JSON.stringify(false),
    "process.env.DUMP_SESSION_KEYS": JSON.stringify(false),
    process: JSON.stringify({
      version: "v19.5.0",
      versions: { node: "v19.5.0" },
      cwd: () => "/",
      env: {
        NODE_ENV: environment,
        version: "v19.5.0",
        browser: true,
        isWebworker: true,
        NODE_DEBUG: false,
        DEBUG: false,
        isBrowser: true,
        versions: { node: "v19.5.0" },
      },
      browser: true,
    }),
  });

  const define = makeEnv("production");
  const defaultOpts: BuildOptions = {
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".d.ts", ".css", ".json", ".mjs", ".wasm", ".ttf"],
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
    target: "es2022",
    outdir: `${origin}/live/${codeSpace}/`,
    treeShaking: true,
    bundle: true,
    define,
    keepNames: false,
    ignoreAnnotations: true,
    minifySyntax: true,
    minifyIdentifiers: true,
    minifyWhitespace: true,
    splitting: false,
    format,
    platform: "browser",
    entryPoints: [`${origin}/live/${codeSpace}/index.js`],
    packages: "external",
    plugins: [fetchPlugin],
  };

  try {
    const result = await esmBuild(defaultOpts);
    // const processedCode = await importMapReplace(result.outputFiles![0].text, origin);

    return result.outputFiles![0].text;
  } catch (error) {
    console.error("Error during build:", error);
    throw error;
  }
};

Object.assign(self, { transpile, build });
