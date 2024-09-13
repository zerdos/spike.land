class MockWorker {
  onmessage: ((this: Worker, ev: MessageEvent) => any) | null = null;
  onmessageerror: ((this: Worker, ev: MessageEvent) => any) | null = null;
  onerror: ((this: AbstractWorker, ev: ErrorEvent) => any) | null = null;

  addEventListener() {}
  removeEventListener() {}
  postMessage() {}
  terminate() {}
  dispatchEvent(event: Event): boolean {
    // Log the event type to use the 'event' parameter
    console.log('Event dispatched:', event.type);
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
      console.log('Event dispatched on SharedWorker port:', event.type);
      return true;
    },
  };
}

export { MockWorker, MockSharedWorker };