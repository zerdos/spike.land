// src/index.ts
const sharedWorkerSupported = typeof SharedWorker !== "undefined";

class SharedWorkerPolyfill {
  private worker: SharedWorker | Worker;

  constructor(url: string | URL, opts?: WorkerOptions) {
    if (sharedWorkerSupported) {
      this.worker = new SharedWorker(url, opts);
    } else {
      this.worker = new Worker(url, opts);
    }
  }

  /**
   * An EventListener called when MessageEvent of type message is fired on the port—that is, when the port receives a message.
   */
  get onmessage(): ((ev: MessageEvent) => any) | null {
    if (this.worker instanceof SharedWorker) {
      return this.worker.port.onmessage;
    } else {
      return this.worker.onmessage;
    }
  }

  set onmessage(value: ((ev: MessageEvent) => any) | null) {
    if (this.worker instanceof SharedWorker) {
      this.worker.port.onmessage = value;
    } else {
      this.worker.onmessage = value;
    }
  }

  /**
   * An EventListener called when a MessageEvent of type MessageError is fired—that is, when it receives a message that cannot be deserialized.
   */
  get onmessageerror(): ((ev: MessageEvent) => any) | null {
    if (this.worker instanceof SharedWorker) {
      return this.worker.port.onmessageerror;
    } else {
      return this.worker.onmessageerror;
    }
  }

  set onmessageerror(value: ((ev: MessageEvent) => any) | null) {
    if (this.worker instanceof SharedWorker) {
      this.worker.port.onmessageerror = value;
    } else {
      this.worker.onmessageerror = value;
    }
  }

  /**
   * Starts the sending of messages queued on the port (only needed when using EventTarget.addEventListener; it is implied when using MessagePort.onmessage.)
   */
  start(): void {
    if (this.worker instanceof SharedWorker) {
      this.worker.port.start();
    }
  }

  /**
   * Clones message and transmits it to worker's global environment. transfer can be passed as a list of objects that are to be transferred rather than cloned.
   */
  postMessage(message: any, options?: StructuredSerializeOptions): void {
    if (this.worker instanceof SharedWorker) {
      this.worker.port.postMessage(message, options);
    } else {
      this.worker.postMessage(message, options);
    }
  }

  /**
   * Immediately terminates the worker. This does not let worker finish its operations; it is halted at once. ServiceWorker instances do not support this method.
   */
  terminate(): void {
    if (this.worker instanceof SharedWorker) {
      this.worker.port.close();
    } else {
      this.worker.terminate();
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
    return this.worker instanceof SharedWorker
      ? this.worker.port
      : (this.worker as unknown as MessagePort);
  }

  /**
   * Is an EventListener that is called whenever an ErrorEvent of type error event occurs.
   */
  get onerror(): ((this: AbstractWorker, ev: ErrorEvent) => any) | null {
    return this.worker.onerror;
  }

  set onerror(value: ((this: AbstractWorker, ev: ErrorEvent) => any) | null) {
    this.worker.onerror = value;
  }

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {
    if (this.worker instanceof SharedWorker && type !== "error") {
      this.worker.port.addEventListener(type, listener, options);
    } else {
      this.worker.addEventListener(type, listener, options);
    }
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void {
    if (this.worker instanceof SharedWorker && type !== "error") {
      this.worker.port.removeEventListener(type, listener, options);
    } else {
      this.worker.removeEventListener(type, listener, options);
    }
  }

  /**
   * Dispatches an event to this EventTarget.
   */
  dispatchEvent(event: Event): boolean {
    return this.worker.dispatchEvent(event);
  }
}

const WorkerToExport = sharedWorkerSupported ? SharedWorker : SharedWorkerPolyfill;

export default WorkerToExport;
