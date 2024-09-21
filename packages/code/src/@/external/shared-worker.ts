// src/index.ts
const sharedWorkerSupported = typeof SharedWorker !== "undefined";

class SharedWorkerPolyfill {
  private worker: Worker;
  public port: MessagePort;

  constructor(url: string, opts?: WorkerOptions) {
    if ((globalThis as any).VI_TEST) {
      const Worker = require("worker_threads").Worker;
      // if url has ? then strip it

      this.worker = new Worker(__dirname + "/../../../dist/" + url.slice(0, url.indexOf("?")), opts);
    } else {
      this.worker = new Worker(url, opts);
    }
    // Create a MessageChannel
    const channel = new MessageChannel();
    this.port = channel.port1;

    // Send port2 to the worker
    this.worker.postMessage({ type: "init" }, [channel.port2]);

    // Forward error events from the worker to the port
    this.worker.onerror = (event) => {
      const errorEvent = new ErrorEvent("error", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
      });
      this.port.dispatchEvent(errorEvent);
    };
  }

  /**
   * An EventListener called when MessageEvent of type 'message' is fired on the port—that is, when the port receives a message.
   */
  get onmessage(): ((this: MessagePort, ev: MessageEvent) => any) | null {
    return this.port.onmessage;
  }

  set onmessage(value: ((this: MessagePort, ev: MessageEvent) => any) | null) {
    this.port.onmessage = value;
  }

  /**
   * An EventListener called when a MessageEvent of type 'messageerror' is fired—that is, when it receives a message that cannot be deserialized.
   */
  get onmessageerror(): ((this: MessagePort, ev: MessageEvent) => any) | null {
    return this.port.onmessageerror;
  }

  set onmessageerror(value: ((this: MessagePort, ev: MessageEvent) => any) | null) {
    this.port.onmessageerror = value;
  }

  /**
   * Clones message and transmits it to worker's global environment.
   */
  postMessage(message: any, transfer?: Transferable[]): void {
    transfer ? this.port.postMessage(message, transfer) : this.port.postMessage(message);
  }

  /**
   * Immediately terminates the worker.
   */
  terminate(): void {
    this.worker.terminate();
    this.port.close();
  }

  /**
   * Disconnects the port, so it is no longer active.
   */
  close(): void {
    this.port.close();
  }

  /**
   * Is an EventListener that is called whenever an ErrorEvent of type 'error' occurs.
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
    this.port.addEventListener(type, listener, options);
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void {
    this.port.removeEventListener(type, listener, options);
  }

  /**
   * Dispatches an event to this EventTarget.
   */
  dispatchEvent(event: Event): boolean {
    return this.port.dispatchEvent(event);
  }
}

const WorkerToExport = sharedWorkerSupported ? SharedWorker : SharedWorkerPolyfill;

export default WorkerToExport;
