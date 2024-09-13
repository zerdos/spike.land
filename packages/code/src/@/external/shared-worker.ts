// src/index.ts
const SharedWorkerSupported = typeof SharedWorker !== "undefined";

let ActualWorker: typeof Worker;
let ActualSharedWorker: typeof SharedWorker;

if (typeof Worker !== "undefined") {
  ActualWorker = Worker;
  ActualSharedWorker = SharedWorker;
} else {
  // Use dynamic import for the mock
  import("./worker-mock").then((module) => {
    ActualWorker = module.MockWorker;
    ActualSharedWorker = module.MockSharedWorker;
  });
}

class SharedWorkerPolyfill {
  /**
   * The actual worker that is used, depending on browser support it can be either a `SharedWorker` or a normal `Worker`.
   */
  private ActualWorker: SharedWorker | Worker;

  constructor(url: string | URL, opts?: WorkerOptions) {
    if (SharedWorkerSupported) {
      this.ActualWorker = new ActualSharedWorker(url, opts);
    } else {
      this.ActualWorker = new ActualWorker(url, opts);
    }
  }

  /**
   * An EventListener called when MessageEvent of type message is fired on the port—that is, when the port receives a message.
   */
  get onmessage(): ((ev: MessageEvent) => any) | null {
    if (SharedWorkerSupported) {
      return (this.ActualWorker as SharedWorker).port.onmessage;
    } else {
      return (this.ActualWorker as Worker).onmessage;
    }
  }

  set onmessage(value: ((ev: MessageEvent) => any) | null) {
    if (SharedWorkerSupported) {
      (this.ActualWorker as SharedWorker).port.onmessage = value;
    } else {
      (this.ActualWorker as Worker).onmessage = value;
    }
  }

  /**
   * An EventListener called when a MessageEvent of type MessageError is fired—that is, when it receives a message that cannot be deserialized.
   */
  get onmessageerror(): ((ev: MessageEvent) => any) | null {
    if (SharedWorkerSupported) {
      return (this.ActualWorker as SharedWorker).port.onmessageerror;
    } else {
      return (this.ActualWorker as Worker).onmessageerror;
    }
  }

  set onmessageerror(value: ((ev: MessageEvent) => any) | null) {
    if (SharedWorkerSupported) {
      (this.ActualWorker as SharedWorker).port.onmessageerror = value;
    } else {
      (this.ActualWorker as Worker).onmessageerror = value;
    }
  }

  /**
   * Starts the sending of messages queued on the port (only needed when using EventTarget.addEventListener; it is implied when using MessagePort.onmessage.)
   */
  start(): void {
    if (SharedWorkerSupported) {
      (this.ActualWorker as SharedWorker).port.start();
    }
  }

  /**
   * Clones message and transmits it to worker's global environment. transfer can be passed as a list of objects that are to be transferred rather than cloned.
   */
  postMessage(message: any, options?: StructuredSerializeOptions): void {
    if (SharedWorkerSupported) {
      (this.ActualWorker as SharedWorker).port.postMessage(message, options);
    } else {
      (this.ActualWorker as Worker).postMessage(message, options);
    }
  }

  /**
   * Immediately terminates the worker. This does not let worker finish its operations; it is halted at once. ServiceWorker instances do not support this method.
   */
  terminate(): void {
    if (SharedWorkerSupported) {
      (this.ActualWorker as SharedWorker).port.close();
    } else {
      (this.ActualWorker as Worker).terminate();
    }
  }

  /**
   * Disconnects the port, so it is no longer active.
   */
  close(): void {
    this.terminate();
  }

  /**
   * Returns a MessagePort object used to communicate with and control the shared worker.
   */
  get port(): MessagePort {
    return SharedWorkerSupported
      ? (this.ActualWorker as SharedWorker).port
      : (this.ActualWorker as unknown as MessagePort);
  }

  /**
   * Is an EventListener that is called whenever an ErrorEvent of type error event occurs.
   */
  get onerror(): ((this: AbstractWorker, ev: ErrorEvent) => any) | null {
    return this.ActualWorker.onerror;
  }

  set onerror(value: ((this: AbstractWorker, ev: ErrorEvent) => any) | null) {
    this.ActualWorker.onerror = value;
  }

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {
    if (SharedWorkerSupported && type !== "error") {
      (this.ActualWorker as SharedWorker).port.addEventListener(type, listener, options);
    } else {
      this.ActualWorker.addEventListener(type, listener, options);
    }
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void {
    if (SharedWorkerSupported && type !== "error") {
      (this.ActualWorker as SharedWorker).port.removeEventListener(type, listener, options);
    } else {
      this.ActualWorker.removeEventListener(type, listener, options);
    }
  }

  /**
   * Dispatches an event to this EventTarget.
   */
  dispatchEvent(event: Event): boolean {
    return this.ActualWorker.dispatchEvent(event);
  }
}

export { SharedWorkerPolyfill, SharedWorkerSupported };
export default SharedWorkerPolyfill;
