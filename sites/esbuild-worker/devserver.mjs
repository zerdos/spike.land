import { KVPlugin, Log, LogLevel, Miniflare } from "miniflare";

const run = async () => {
  const port = 8000;

  consty;
  const mf = new Miniflare({
    envPath: true,
    packagePath: true,
    wranglerConfigPath: true,

    kvNamespaces: ["__STATIC_CONTENT"],

    buildCommand: "npm run build",
    open: true,

    // Below options are optional
    // buildBasePath: "./build",
    scriptPath: "./dist/worker.mjs",
    sourceMap: true,
    log: new Log(LogLevel.INFO),
    liveReload: true,
    modules: true,
    watch: true,
    wranglerConfigEnv: "dev",
    https: true,
    port,
    buildWatchPaths: ["src", "public/static"], // Defaults to "src" if command set
  });

  const server = await mf.startServer();
  console.log(`https://0.0.0.0:${port}`);
};

run();

async function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

//   await mf.dispose();
