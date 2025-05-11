class MockWorker {
  onmessage: ((this: Worker, ev: MessageEvent) => void) | null = null;
  onmessageerror: ((this: Worker, ev: MessageEvent) => void) | null = null;
  onerror: ((this: AbstractWorker, ev: ErrorEvent) => void) | null = null;

  addEventListener() {}
  removeEventListener() {}
  postMessage() {}
  terminate() {}
  dispatchEvent(event: Event): boolean {
    // Log the event type to use the 'event' parameter
    console.warn("Event dispatched:", event.type);
    return true;
  }
}

class MockSharedWorker extends MockWorker {
  port = {
    onmessage: null,
    onmessageerror: null,
    close: () => {},
    postMessage: () => {},
    start: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: (event: Event): boolean => {
      // Log the event type to use the 'event' parameter
      console.warn("Event dispatched on SharedWorker port:", event.type);
      return true;
    },
  };
}

export { MockSharedWorker, MockWorker };
