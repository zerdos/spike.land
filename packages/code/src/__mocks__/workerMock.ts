class MockWorker implements Worker {
  onmessage: ((this: Worker, ev: MessageEvent) => any) | null = null;
  onerror: ((this: Worker, ev: ErrorEvent) => any) | null = null;

  addEventListener(): void {}
  removeEventListener(): void {}
  dispatchEvent(): boolean {
    return false;
  }
  postMessage(): void {}
  terminate(): void {}
}

class MockSharedWorker implements SharedWorker {
  port: MessagePort = {
    onmessage: null,
    onmessageerror: null,
    close: () => {},
    postMessage: () => {},
    start: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  };
}

global.Worker = MockWorker as any;
global.SharedWorker = MockSharedWorker as any;

export { MockSharedWorker, MockWorker };
