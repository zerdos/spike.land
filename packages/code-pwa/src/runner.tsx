import { stat, unlink, writeFile } from "./memfs";
import { build, transpile } from "./shared";

// Extend the global object with build and transpile functions
Object.assign(globalThis, { build, transpile });

const codeSpace = getCodeSpace();

// Runner session to keep track of current state
const runnerSession = {
  i: 0,
  codeSpace,
  counterMax: 0,
  transpiled: "",
  code: "",
};

/**
 * The runner function compiles and builds the code and handles the session state.
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
    if (await stat(`/live/${codeSpace}/index.js`)) {
      await unlink(`/live/${codeSpace}/index.js`);
    }

    // Check if index.mjs exists
    const bundleExists = await stat(`/live/${codeSpace}/index.mjs`);

    // Transpile the code
    const transpiled = await transpile({ code, originToUse: location.origin });
    if (!transpiled) return;

    // Write the transpiled code to index.js and build if bundle exists
    if (bundleExists) {
      try {
        await writeFile(`/live/${codeSpace}/index.js`, transpiled);
        await build({ codeSpace, origin: location.origin });
      } catch (error) {
        console.error("Error during build:", error);
        await cleanupFiles();
      }
    }

    if (signal.aborted) return;

    // Send message to the iframe with the transpiled code
    document.querySelector("iframe")?.contentWindow?.postMessage({
      code,
      i: counter,
      type: "prerender",
      transpiled: transpiled,
    });
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
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
}
