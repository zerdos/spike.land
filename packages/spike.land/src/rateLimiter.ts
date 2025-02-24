import { handleErrors } from "./handleErrors";

export class CodeRateLimiter {
  private nextAllowedTime = 0;
  private requestCount = 0;
  private lastRequestTime = Date.now();
  private readonly MAX_REQUESTS = 5; // Allow 5 requests in grace period
  private readonly GRACE_LIMIT = 4; // Allow 4 requests in grace period
  private readonly GRACE_PERIOD = 20; // 20 seconds grace period
  private readonly RATE_LIMIT = 0.5; // 0.5 seconds cooldown after grace period

  async fetch(request: Request) {
    return await handleErrors(request, async () => {
      const now = Date.now() / 1000;

      // Reset counts if grace period has expired
      if (now > this.nextAllowedTime + this.GRACE_PERIOD) {
        this.requestCount = 0;
        this.nextAllowedTime = now;
      }

      if (request.method === "POST") {
        this.requestCount++;

        // Apply rate limiting after grace limit is exceeded
        if (this.requestCount > this.GRACE_LIMIT) {
          const cooldown = this.RATE_LIMIT;
          this.nextAllowedTime = now + cooldown;
          return new Response(String(cooldown));
        }
      }

      return new Response("0");
    });
  }

  public reset() {
    this.requestCount = 0;
  }

  public async handleRequest(request: Request): Promise<Response> {
    const currentTime = Date.now();
    const timeDiff = (currentTime - this.lastRequestTime) / 1000; // Convert to seconds

    // Reset counter if enough time has passed
    if (timeDiff >= this.GRACE_PERIOD) {
      this.requestCount = 0;
    }

    // If within grace period and under max requests, allow with no cooldown
    if (this.requestCount < this.MAX_REQUESTS) {
      this.requestCount++;
      return new Response("0");
    }

    // Calculate cooldown time
    const cooldown = Math.max(0, Math.ceil(this.GRACE_PERIOD - timeDiff));
    request.headers.set("Retry-After", cooldown.toString());
    return new Response(cooldown.toString(), {
      status: 429,
      headers: request.headers,
    });
  }
}
