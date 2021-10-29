try {
  start();
} catch (error) {
  console.error({ error });
  fetch("https://code.spike.land/error", {
    method: "POST",
    body: JSON.stringify({ error }),
  });
}

async function start() {

    const { run } = await import(
      location.host.includes("spike.land") ? "./reactLoader.mjs" : "./reactLoader.mjs"
    );
    run("window");
 
  setTimeout(async () => {
    const { workboxLoader } = await import("./workboxLoader.mjs");
    workboxLoader();
  }, 3000);
}
