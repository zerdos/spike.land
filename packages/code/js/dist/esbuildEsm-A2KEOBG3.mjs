// ../../node_modules/async-mutex/index.mjs
var E_TIMEOUT = new Error("timeout while waiting for mutex to become available");
var E_ALREADY_LOCKED = new Error("mutex already locked");
var E_CANCELED = new Error("request for lock canceled");
var __awaiter$2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var Semaphore = class {
  constructor(_maxConcurrency, _cancelError = E_CANCELED) {
    this._maxConcurrency = _maxConcurrency;
    this._cancelError = _cancelError;
    this._queue = [];
    this._waiters = [];
    if (_maxConcurrency <= 0) {
      throw new Error("semaphore must be initialized to a positive value");
    }
    this._value = _maxConcurrency;
  }
  acquire() {
    const locked = this.isLocked();
    const ticketPromise = new Promise((resolve, reject) => this._queue.push({ resolve, reject }));
    if (!locked)
      this._dispatch();
    return ticketPromise;
  }
  runExclusive(callback) {
    return __awaiter$2(this, void 0, void 0, function* () {
      const [value, release] = yield this.acquire();
      try {
        return yield callback(value);
      } finally {
        release();
      }
    });
  }
  waitForUnlock() {
    return __awaiter$2(this, void 0, void 0, function* () {
      if (!this.isLocked()) {
        return Promise.resolve();
      }
      const waitPromise = new Promise((resolve) => this._waiters.push({ resolve }));
      return waitPromise;
    });
  }
  isLocked() {
    return this._value <= 0;
  }
  release() {
    if (this._maxConcurrency > 1) {
      throw new Error("this method is unavailable on semaphores with concurrency > 1; use the scoped release returned by acquire instead");
    }
    if (this._currentReleaser) {
      const releaser = this._currentReleaser;
      this._currentReleaser = void 0;
      releaser();
    }
  }
  cancel() {
    this._queue.forEach((ticket) => ticket.reject(this._cancelError));
    this._queue = [];
  }
  _dispatch() {
    const nextTicket = this._queue.shift();
    if (!nextTicket)
      return;
    let released = false;
    this._currentReleaser = () => {
      if (released)
        return;
      released = true;
      this._value++;
      this._resolveWaiters();
      this._dispatch();
    };
    nextTicket.resolve([this._value--, this._currentReleaser]);
  }
  _resolveWaiters() {
    this._waiters.forEach((waiter) => waiter.resolve());
    this._waiters = [];
  }
};
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var Mutex = class {
  constructor(cancelError) {
    this._semaphore = new Semaphore(1, cancelError);
  }
  acquire() {
    return __awaiter$1(this, void 0, void 0, function* () {
      const [, releaser] = yield this._semaphore.acquire();
      return releaser;
    });
  }
  runExclusive(callback) {
    return this._semaphore.runExclusive(() => callback());
  }
  isLocked() {
    return this._semaphore.isLocked();
  }
  waitForUnlock() {
    return this._semaphore.waitForUnlock();
  }
  release() {
    this._semaphore.release();
  }
  cancel() {
    return this._semaphore.cancel();
  }
};

// js/esbuildEsm.mjs
import * as esbuild from "https://unpkg.com/esbuild-wasm@0.14.9/esm/browser.min.js";
var init = esbuild.initialize({
  wasmURL: "https://unpkg.com/esbuild-wasm@0.14.9/esbuild.wasm"
});
var initFinished = false;
var mutex = new Mutex();
var transform2 = async (code) => {
  var startTime = performance.now();
  await mutex.waitForUnlock();
  if (!initFinished) {
    initFinished = true;
  }
  const result = await esbuild.transform(code, {
    loader: "tsx",
    target: "es2018"
  });
  var endTime = performance.now();
  console.log(`esbuildEsmTransform: took ${endTime - startTime} milliseconds`);
  return result.code;
};
export {
  transform2 as transform
};
//# sourceMappingURL=esbuildEsm-A2KEOBG3.mjs.map
