import { updateSearchReplace as up } from "@/lib/chat-utils";

const SEARCH = "<<<<<<< SEARCH";
const REPLACE = ">>>>>>> REPLACE";

// Debug function
const debug = (message: string, ...args: unknown[]) => {
  console.log(`[DEBUG] ${message}`, ...args);
};

export const updateSearchReplace = async (
  { instructions, code }: { instructions: string; code: string },
): Promise<{ result: string; transpiled?: string; len: number }> => {
  debug("Function called with instructions length:", instructions.length);
  debug("Code length:", code.length);

  if (instructions.includes(SEARCH) && !instructions.includes(REPLACE)) {
    debug("SEARCH found without REPLACE");
    const rAll = up(instructions, code);
    const rAllWithExtra = up(instructions + "\nfooo dooo baf   ", code);

    if (code === rAll || rAll !== rAllWithExtra) {
      debug("Replace block not finished");
      return { result: code, len: 0 };
    }

    debug("Replace block finished");
    return { result: rAll, len: instructions.length };
  }

  if (instructions.includes(REPLACE)) {
    debug("REPLACE found");
    const trimmedInstructions = instructions.slice(0, instructions.indexOf(REPLACE) + REPLACE.length);
    const rAll = up(trimmedInstructions, code);
    debug("Trimmed instructions length:", trimmedInstructions.length);
    return { result: rAll, len: trimmedInstructions.length };
  }

  const rAll = up(instructions, code);
  if (rAll === code) {
    debug("No changes in code");
    return { result: rAll, len: instructions.length };
  }

  debug("Searching for minimum instructions to change code");
  let low = 0;
  let high = instructions.length;
  while (low < high) {
    const mid = Math.floor((low + high + 1) / 2);
    debug("Binary search - low:", low, "high:", high, "mid:", mid);
    if (code === up(instructions.slice(0, mid), code)) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }
  const len = high + 1;
  const rMin = up(instructions.slice(0, len), code);
  debug("Minimum instructions length found:", len);

  return { result: rMin, len };
};

Object.assign(globalThis, { updateSearchReplace });
debug("chat-utils.worker.ts initialization complete");
