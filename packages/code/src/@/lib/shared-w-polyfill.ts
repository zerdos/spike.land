const sharedWorkerSupported = typeof SharedWorker !== "undefined";

import { tryCatch } from "./try-catch"; // Added import

class SharedWorkerPolyfill {
  private worker: Worker | null = null; // Can be null if construction fails
  public port: MessagePort = null!; // Will be initialized if worker is created

  constructor(url: string, opts?: WorkerOptions) {
    if (process.env.VI_TEST) {
      // Mock worker for tests
      this.worker = {
        postMessage: () => {},
        terminate: () => {},
        onmessage: null,
        onmessageerror: null,
        onerror: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      } as unknown as Worker;
      this.initializeWorker();
    } else {
      // Attempt to create the real worker
      try {
        // Synchronous new Worker() can throw, so wrap it.
        // However, tryCatch is for Promises. For synchronous errors, a standard try/catch is fine.
        // Let's assume for now that new Worker() itself doesn't throw in a way that needs tryCatch,
        // but rather errors might occur during its lifecycle (onerror).
        // If new Worker() itself can throw and we want to use tryCatch, we'd need to wrap its instantiation
        // in a Promise, which is a bit artificial for a constructor.
        // Sticking to standard try/catch for constructor-level errors.
        this.worker = new Worker(url, opts);
        this.initializeWorker();
      } catch (error) {
        console.error("Failed to construct Worker:", error);
        // Worker remains null, port will not be initialized.
        // Consumers of this class should check if `this.worker` or `this.port` is null.
        // Or, we could re-throw or set an error state.
        // For now, let's allow it to proceed with worker as null.
      }
    }
  }

  private initializeWorker() {
    if (!this.worker) { // Guard against null worker
        console.warn("Worker not initialized, cannot initialize port.");
        // Initialize port to a mock or throw, to avoid errors if accessed later
        this.port = {
            onmessage: null, onmessageerror: null, close: () => {},
            postMessage: () => {}, start: () => {}, addEventListener: () => {},
            removeEventListener: () => {}, dispatchEvent: () => false,
        } as unknown as MessagePort;
        return;
    }
    if (process.env.VI_TEST) {
      // Create a mock MessagePort for tests
      this.port = {
        onmessage: null,
        onmessageerror: null,
        close: () => {},
        postMessage: () => {},
        start: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      } as unknown as MessagePort;
    } else {
      this.port = this.worker as unknown as MessagePort; // Safe now due to the guard
      // Send port2 to the worker
      const message = { type: "init" };
      this.worker.postMessage(message);

      // Forward error events from the worker to the port
      // The `this.worker &&` check is redundant due to the guard above
      if ("onerror" in this.worker) {
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
    if (this.worker) {
      this.worker.terminate();
    }
    // port.close() should be safe even if port is a mock,
    // but good practice to check if it's truly initialized if worker failed.
    if (this.port && typeof this.port.close === 'function') {
      this.port.close();
    }
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
    if (this.worker && "onerror" in this.worker) {
      return this.worker.onerror;
    }
    return null;
  }

  set onerror(value: ((this: AbstractWorker, ev: ErrorEvent) => void) | null) {
    if (this.worker && "onerror" in this.worker) {
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
