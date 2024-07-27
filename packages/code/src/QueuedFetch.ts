export class QueuedFetch {
  private queue: (() => Promise<void>)[] = [];
  private ongoingRequests = 0;
  private maxConcurrent: number;
  private limitedNumberOfRequests = false; 
  private maxNumberOfRequests: number;



  constructor(maxConcurrent = 5, maxNumberOfRequests = 0) {
    this.maxNumberOfRequests = maxNumberOfRequests;
    this.maxConcurrent = maxConcurrent;
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
          const response = await fetch(input, init);
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
