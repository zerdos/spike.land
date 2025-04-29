import fetchBuilder from "fetch-retry";

export class QueuedFetch {
  private queue: Array<() => Promise<void>> = [];
  private ongoingRequests = 0;
  private maxConcurrent: number;
  private limitedNumberOfRequests = false;
  private maxNumberOfRequests: number;
  private retries: number;
  private retryDelay: number;
  private fetchWithRetry: typeof fetch;

  constructor(
    maxConcurrent = 5,
    maxNumberOfRequests = 0,
    _retries = 3,
    _retryDelay = 300,
  ) {
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
    return new Promise((resolve, reject) => {
      if (this.limitedNumberOfRequests) {
        if (this.maxNumberOfRequests-- < 0) {
          return reject(new Error("Too many requests"));
        }
      }

      const request = async () => {
        try {
          // Directly use fetchWithRetry, as it handles the retries=0 case.
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
      // Array.shift() performance is generally acceptable in V8 for moderate queue sizes.
      // Replacing it might add complexity without significant gains unless profiling proves otherwise.
      const request = this.queue.shift();
      if (request) {
        this.ongoingRequests++;
        // No need to await here; the request function handles its own lifecycle.
        request();
      }
    }
  }
}
