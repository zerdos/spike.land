import { handleErrors } from "./handleErrors";

export class CodeRateLimiter {
  private nextAllowedTime = 0;
  private static requestCount = 0;
  private static lastRequestTime = Date.now();
  private static readonly GRACE_PERIOD = 5; // Grace period in seconds
  private static readonly MAX_REQUESTS = 5; // Maximum requests allowed during grace period

  // Our protocol is: POST when the IP performs an action, or GET to simply read the current limit.
  // Either way, the result is the number of seconds to wait before allowing the IP to perform its
  // next action.
  async fetch(request: Request) {
    return await handleErrors(request, async () => {
      const now = Date.now() / 1000;

      this.nextAllowedTime = Math.max(now, this.nextAllowedTime);

      if (request.method == "POST") {
        // POST request means the user performed an action.
        // We allow one action per 5 seconds.
        this.nextAllowedTime += 1;
      }

      // Return the number of seconds that the client needs to wait.
      //
      // We provide a "grace" period of 20 seconds, meaning that the client can make 4-5 requests
      // in a quick burst before they start being limited.
      const cooldown = Math.max(0, this.nextAllowedTime - now - 1);
      return new Response(`${cooldown}`);
    });
  }

  public static reset() {
    this.requestCount = 0;
    this.lastRequestTime = Date.now();
  }

  public static async handleRequest(request: Request): Promise<Response> {
    const currentTime = Date.now();
    const timeDiff = (currentTime - this.lastRequestTime) / 1000; // Convert to seconds

    // Reset counter if enough time has passed
    if (timeDiff >= this.GRACE_PERIOD) {
      this.requestCount = 0;
      this.lastRequestTime = currentTime;
    }

    // If within grace period and under max requests, allow with no cooldown
    if (this.requestCount < this.MAX_REQUESTS) {
      this.requestCount++;
      return new Response("0");
    }

    // Calculate cooldown time
    const cooldown = Math.max(0, Math.ceil(this.GRACE_PERIOD - timeDiff));
    request.headers.set("Retry-After", cooldown.toString());
    return new Response(cooldown.toString(), { status: 429, headers: request.headers });
  }
}
