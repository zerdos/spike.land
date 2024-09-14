// src/index.ts
const sharedWorkerSupported = typeof SharedWorker !== "undefined";

class SharedWorkerPolyfill {
  private worker: Worker;

  constructor(url: string | URL, opts?: WorkerOptions) {
    this.worker = new Worker(url, opts);
  }

  /**
   * An EventListener called when MessageEvent of type message is fired on the port—that is, when the port receives a message.
   */
  get onmessage(): ((ev: MessageEvent) => any) | null {
    return this.worker.onmessage;
  }

  set onmessage(value: ((ev: MessageEvent) => any) | null) {
    this.worker.onmessage = value;
  }

  /**
   * An EventListener called when a MessageEvent of type MessageError is fired—that is, when it receives a message that cannot be deserialized.
   */
  get onmessageerror(): ((ev: MessageEvent) => any) | null {
    return this.worker.onmessageerror;
  }

  set onmessageerror(value: ((ev: MessageEvent) => any) | null) {
    this.worker.onmessageerror = value;
  }

  /**
   * Clones message and transmits it to worker's global environment. transfer can be passed as a list of objects that are to be transferred rather than cloned.
   */
  postMessage(message: any, options?: StructuredSerializeOptions): void {
    this.worker.postMessage(message, options);
  }

  /**
   * Immediately terminates the worker. This does not let worker finish its operations; it is halted at once. ServiceWorker instances do not support this method.
   */
  terminate(): void {
    this.worker.terminate();
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
    return this.worker as unknown as MessagePort;
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
    this.worker.addEventListener(type, listener, options);
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void {
    this.worker.removeEventListener(type, listener, options);
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
