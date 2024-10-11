import fetchBuilder from "fetch-retry";

export class QueuedFetch {
  private queue: (() => Promise<void>)[] = [];
  private ongoingRequests = 0;
  private maxConcurrent: number;
  private limitedNumberOfRequests = false;
  private maxNumberOfRequests: number;
  private retries: number;
  private retryDelay: number;
  private fetchWithRetry: typeof fetch;

  constructor(maxConcurrent = 5, maxNumberOfRequests = 0, _retries = 3, _retryDelay = 300) {
    this.retries = _retries;
    this.retryDelay = _retryDelay;
    this.maxNumberOfRequests = maxNumberOfRequests;
    this.maxConcurrent = maxConcurrent;
    this.fetchWithRetry = fetchBuilder(fetch, {
      retries: this.retries,
      retryDelay: this.retryDelay,
      retryOn: [429, 500, 503, 504, 408, 413, 431, 451, 502],
    });
    if (maxNumberOfRequests > 0) {
      this.limitedNumberOfRequests = true;
    }
  }

  async fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const url = new URL(input as string);
    const pathname = url.pathname;

    const fileparts = pathname.split("/");
    const filename = fileparts[fileparts.length - 1];
    if (!filename.includes(".")) {
      return new Response("just files allowed", { status: 400 });
    }
    fileparts.pop();
    const basefolder = fileparts.pop();

    if (basefolder?.includes(".ts")) {
      return new Response("just files allowed", { status: 400 });
    }

    return new Promise((resolve, reject) => {
      if (this.limitedNumberOfRequests) {
        if (this.maxNumberOfRequests-- < 0) {
          return reject(new Error("Too many requests"));
        }
      }

      const request = async () => {
        try {
          const response = await this.fetchWithRetry(input, init);
          resolve(response);
        } catch (error) {
          reject(error);
        } finally {
          this.ongoingRequests--;
          this.processQueue();
        }
      };

      this.queue.push(request);
      this.processQueue();
    });
  }

  private processQueue() {
    while (this.ongoingRequests < this.maxConcurrent && this.queue.length > 0) {
      const request = this.queue.shift();
      if (request) {
        this.ongoingRequests++;
        request();
      }
    }
  }
}
