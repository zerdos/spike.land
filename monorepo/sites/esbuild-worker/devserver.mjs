import { Miniflare } from "miniflare";

const run = async ()=> {

const mf = new Miniflare({
    buildCommand: "npm run build",
    // Below options are optional
    buildBasePath: "build",
    scriptPath: "dist/worker.js",
    sourceMap: true,
    liveReload: true,
    watch: true,
    buildWatchPaths: ["src", "public/static"], // Defaults to "src" if command set
  });


await wait(10000);
await  mf.dispose()
}

run ();



async function wait(delay){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  }

  
  
//   await mf.dispose();