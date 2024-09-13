// src/index.ts
var SharedWorkerSupported = "SharedWorker" in globalThis;
var SharedWorkerPolyfill = class {
  /**
   * The actual worker that is used, depending on browser support it can be either a `SharedWorker` or a normal `Worker`.
   */
  ActualWorker;
  constructor(url, opts) {
    if (SharedWorkerSupported) {
      this.ActualWorker = new SharedWorker(url, opts);
    } else {
      this.ActualWorker = new Worker(url, opts);
    }
  }
  /**
   * An EventListener called when MessageEvent of type message is fired on the port—that is, when the port receives a message.
   */
  get onmessage() {
    if (SharedWorkerSupported) {
      return this.ActualWorker?.port.onmessage;
    } else {
      return this.ActualWorker.onmessage;
    }
  }
  set onmessage(value) {
    if (SharedWorkerSupported) {
      this.ActualWorker.port.onmessage = value;
    } else {
      this.ActualWorker.onmessage = value;
    }
  }
  /**
   * An EventListener called when a MessageEvent of type MessageError is fired—that is, when it receives a message that cannot be deserialized.
   */
  get onmessageerror() {
    if (SharedWorkerSupported) {
      return this.ActualWorker?.port.onmessageerror;
    } else {
      return this.ActualWorker.onmessageerror;
    }
  }
  set onmessageerror(value) {
    if (SharedWorkerSupported) {
      this.ActualWorker.port.onmessageerror = value;
    } else {
      this.ActualWorker.onmessageerror = value;
    }
  }
  /**
   * Starts the sending of messages queued on the port (only needed when using EventTarget.addEventListener; it is implied when using MessagePort.onmessage.)
   */
  start() {
    if (SharedWorkerSupported) {
      return this.ActualWorker?.port.start();
    }
  }
  /**
   * Clones message and transmits it to worker's global environment. transfer can be passed as a list of objects that are to be transferred rather than cloned.
   */
  postMessage(message, transfer) {
    if (SharedWorkerSupported) {
      return this.ActualWorker?.port.postMessage(message, transfer);
    } else {
      return this.ActualWorker.postMessage(message, transfer);
    }
  }
  /**
   * Immediately terminates the worker. This does not let worker finish its operations; it is halted at once. ServiceWorker instances do not support this method.
   */
  terminate() {
    if (SharedWorkerSupported) {
      return this.ActualWorker?.port.close();
    } else {
      return this.ActualWorker.terminate();
    }
  }
  /**
   * Disconnects the port, so it is no longer active.
   */
  close() {
    return this.terminate();
  }
  /**
   * Returns a MessagePort object used to communicate with and control the shared worker.
   */
  get port() {
    return SharedWorkerSupported ? this.ActualWorker.port : this.ActualWorker;
  }
  /**
   * Is an EventListener that is called whenever an ErrorEvent of type error event occurs.
   */
  get onerror() {
    return this.ActualWorker.onerror;
  }
  set onerror(value) {
    this.ActualWorker.onerror = value;
  }
  addEventListener(type, listener, options) {
    if (SharedWorkerSupported && type !== "error") {
      return this.ActualWorker?.port.addEventListener(type, listener, options);
    } else {
      return this.ActualWorker.addEventListener(type, listener, options);
    }
  }
  removeEventListener(type, listener, options) {
    if (SharedWorkerSupported && type !== "error") {
      return this.ActualWorker?.port.removeEventListener(type, listener, options);
    } else {
      return this.ActualWorker.removeEventListener(type, listener, options);
    }
  }
  /**
   * Dispatches an event to this EventTarget.
   */
  dispatchEvent(event) {
    return this.ActualWorker.dispatchEvent(event);
  }
};
var src_default = SharedWorkerPolyfill;
export { SharedWorkerPolyfill, SharedWorkerSupported, src_default as default };
// # sourceMappingURL=index.js.map
