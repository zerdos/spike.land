import { run } from "./reactLoader.mjs";
import {loadMonaco} from "@spike.land/smart-monaco-editor"
import { workboxLoader } from "./workboxLoader.mjs";

workboxLoader();
loadMonaco();
run("window");

// try {
//   start();
// } catch (error) {
//   console.error({ error });
//   fetch("https://code.spike.land/error", {
//     method: "POST",
//     body: JSON.stringify({ error }),
//   });
// }

// async function start() {
//   import('./reactLoader.mjs').then(({run})=>run("window"));
//   import("./workboxLoader.mjs").then(({workboxLoader})=>workboxLoader());
// }
