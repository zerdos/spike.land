try {
  start();
} catch (error) {
  console.error({ error });
  fetch("https://spike.land/error", {
    method: "POST",
    body: JSON.stringify({ error }),
  });
}

async function start() {
  try {
    const { run } = await import(location.host.includes("spike.land")? "../build.mjs": "../dev.mjs");
    run("window");
  } catch (e) {
    throw e;
    console.error("error", { e });
    //        const { run } = await import("https://unpkg.com/@zedvision/code@13.0.16/js/codeLoader.mjs");
    //      run("window");
  }
  setTimeout(async () => {
    const { workboxLoader } = await import("./workboxLoader.mjs");
    workboxLoader();
  }, 3000);
}
