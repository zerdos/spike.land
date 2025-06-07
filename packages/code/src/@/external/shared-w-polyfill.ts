const sharedWorkerSupported = typeof SharedWorker !== "undefined";

class SharedWorkerPolyfill {
  private worker: Worker = null!;
  public port: MessagePort = null!;

  constructor(url: string, opts?: WorkerOptions) {
    if (process.env["VI_TEST"]) {
      import("worker_threads").then(({ Worker: Worker2 }) => {
        // if url has ? then strip it
        this.worker = new Worker2(url) as unknown as Worker;
        this.initializeWorker();
      });
    } else {
      this.worker = new Worker(url, opts);
      this.initializeWorker();
    }
  }

  private initializeWorker() {
    this.port = this.worker as unknown as MessagePort;
    // Send port2 to the worker

    const message = { type: "init" };
    this.worker.postMessage(
      message,
    );

    // Forward error events from the worker to the port
    if (this.worker && "onerror" in this.worker) {
      this.worker.onerror = (event: ErrorEvent) => {
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
  }

  /**
   * An EventListener called when MessageEvent of type 'message' is fired on the port—that is, when the port receives a message.
   */
  get onmessage(): ((this: MessagePort, ev: MessageEvent) => void) | null {
    return this.port.onmessage;
  }

  set onmessage(value: ((this: MessagePort, ev: MessageEvent) => void) | null) {
    this.port.onmessage = value;
  }

  /**
   * An EventListener called when a MessageEvent of type 'messageerror' is fired—that is, when it receives a message that cannot be deserialized.
   */
  get onmessageerror(): ((this: MessagePort, ev: MessageEvent) => void) | null {
    return this.port.onmessageerror;
  }

  set onmessageerror(
    value: ((this: MessagePort, ev: MessageEvent) => void) | null,
  ) {
    this.port.onmessageerror = value;
  }

  /**
   * Clones message and transmits it to worker's global environment.
   */
  postMessage = (
    message: unknown,
    transfer?: Transferable[],
  ) => (transfer
    ? this.port.postMessage(message, transfer)
    : this.port.postMessage(message));

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
  get onerror(): ((this: AbstractWorker, ev: ErrorEvent) => void) | null {
    return "onerror" in this.worker ? this.worker.onerror : null;
  }

  set onerror(value: ((this: AbstractWorker, ev: ErrorEvent) => void) | null) {
    if ("onerror" in this.worker) {
      this.worker.onerror = value;
    }
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

const WorkerToExport = sharedWorkerSupported
  ? SharedWorker
  : SharedWorkerPolyfill;

export default WorkerToExport;
