class WorkerMock {
  private listeners: { [key: string]: Function[] } = {};

  constructor(scriptURL: string | URL, options?: WorkerOptions) {
    // Constructor implementation not needed for our mock
  }

  addEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(listener as Function);
  }

  removeEventListener(type: string, listener: EventListenerOrEventListenerObject) {
    if (this.listeners[type]) {
      this.listeners[type] = this.listeners[type].filter(l => l !== listener);
    }
  }

  dispatchEvent(event: Event): boolean {
    const listeners = this.listeners[event.type] || [];
    listeners.forEach(listener => listener(event));
    return !event.defaultPrevented;
  }

  postMessage(message: any) {
    this.dispatchEvent(new MessageEvent("message", { data: message }));
  }

  terminate() {
    // Termination logic not needed for our mock
  }
}

declare global {
  interface Window {
    Worker: typeof WorkerMock;
  }
}

if (typeof window !== "undefined") {
  (window as any).Worker = WorkerMock;
} else {
  (global as any).Worker = WorkerMock;
}

export default WorkerMock;
