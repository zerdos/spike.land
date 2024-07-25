import { stat, unlink, writeFile } from "./memfs";
import { build, transpile } from "./shared";
import {enhancedFetch } from './enhancedFetch'
// Extend the global object with build and transpile functions

const codeSpace = getCodeSpace();

Object.assign(globalThis, {
  enhancedFetch ,
  myATA: async()=>{

    const {myATA} = await import('./my-ata');
    return  myATA(cSess.session.code);

  },
  build: async () => {
    const file = await build({ codeSpace, origin: location.origin, format: "esm" });

    await writeFile(`/live/${codeSpace}/index.mjs`, file);
    await fetch(`${origin}/live/${codeSpace}/index.mjs`, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": "application/javascript",
        "TR_ORIGIN": origin,
        "TR_BUNDLE": "true",
      },
    });
  },
  transpile,
});

``;

const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

// Runner session to keep track of current state
const runnerSession = {
  i: 0,
  codeSpace,
  counterMax: 0,
  transpiled: "",
  code: "",
};

/**
 * The runner f qunction compiles and builds the code and handles the session state.
 * @param {object} params - The parameters for the runner function.
 * @param {string} params.code - The code to transpile and build.
 * @param {number} params.counter - The current counter value.
 * @param {AbortSignal} params.signal - The abort signal to handle cancellation.
 */
export async function runner({ code, counter, signal }: {
  code: string;
  codeSpace: string;
  counter: number;
  signal: AbortSignal;
}) {
  console.log({ counter });

  if (counter <= runnerSession.counterMax || signal.aborted) return;

  runnerSession.counterMax = counter;
  runnerSession.i = counter;
  runnerSession.code = code;

  try {
    if (signal.aborted) return;

    // Remove existing index.js file if it exists
    await cleanupFiles();

    // Transpile the code
    const transpiled = await transpile({ code, originToUse: location.origin });
    if (signal.aborted) return;
    await writeFile(`/live/${codeSpace}/index.js`, transpiled);
    console.log({ transpiled });
    if (!transpiled) return;

    // await cleanupFiles();
    // Write the transpiled code to index.js and build if bundle exists
    // if (bundleExists) {
    //   try {
    //     await writeFile(`/live/${codeSpace}/index.js`, transpiled);
    //     await build({ codeSpace, origin: location.origin });
    //   } catch (error) {
    //     console.error("Error during build:", error);

    //   }
    // }

    if (signal.aborted) return;

    // Send message to the iframe with the transpiled code
    BC.postMessage({ code, transpiled, i: counter, sender: 'RUnner' });

    // document.querySelector("iframe")?.contentWindow?.postMessage({
    //   code,
    //   i: counter,
    //   type: "prerender",
    //   t  ranspiled: transpiled,
    // });
  } catch (error) {
    console.error("Error during runner execution:", error);
  }
}

/**
 * Get the code space from the current URL.
 * @returns {string} The code space.
 */
function getCodeSpace(): string {
  return location.pathname.slice(1).split("/")[1];
}

/**
 * Cleanup function to remove index.js and index.mjs files if they exist.
 */
async function cleanupFiles() {
  try {
    if (await stat(`/live/${codeSpace}/index.js`)) {
      await unlink(`/live/${codeSpace}/index.js`);
    }
    if (await stat(`/live/${codeSpace}/index.mjs`)) {
      await unlink(`/live/${codeSpace}/index.mjs`);
    }
    await fetch(`${origin}/live/${codeSpace}/index.mjs`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/javascript",
        "TR_ORIGIN": `origin`,
        "TR_BUNDLE": `true`,
      },
    });
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
}
