/**
 * AbortController/AbortSignal polyfills for environments without native support.
 * Provides minimal implementations that work with LRUCache.fetch().
 */

import { emitSimplifiedWarning } from "./utils";

let AC = globalThis.AbortController;
let AS = globalThis.AbortSignal;

/* c8 ignore start */
if (typeof AC === "undefined") {
  // @ts-expect-error Polyfill for environments without AbortSignal
  AS = class AbortSignal {
    onabort?: (...a: unknown[]) => unknown;
    _onabort: Array<(...a: unknown[]) => unknown> = [];
    reason?: unknown;
    aborted = false;
    addEventListener(_: string, fn: (...a: unknown[]) => unknown) {
      this._onabort.push(fn);
    }
  };

  AC = class AbortController {
    signal: InstanceType<typeof AS>;
    constructor() {
      this.signal = new AS() as InstanceType<typeof AS>;
      emitSimplifiedWarning(
        "AbortController is not defined. A minimal polyfill is provided for use by LRUCache.fetch(). " +
          "This polyfill may not be fully spec-compliant. " +
          "If using in an environment without native AbortController, consider a full polyfill for broader compatibility.",
        "NO_ABORT_CONTROLLER",
      );
    }
    abort(reason: unknown) {
      const signal = this.signal as InstanceType<typeof AS> & {
        aborted: boolean;
        reason: unknown;
        _onabort: Array<(reason: unknown) => void>;
        onabort?: (reason: unknown) => void;
      };
      if (signal.aborted) return;
      signal.reason = reason;
      signal.aborted = true;
      for (const fn of signal._onabort) {
        fn(reason);
      }
      if (typeof signal.onabort === "function") {
        signal.onabort(reason);
      }
    }
  };
}
/* c8 ignore stop */

export { AC, AS };
