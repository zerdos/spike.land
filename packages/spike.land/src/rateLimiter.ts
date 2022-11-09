import { handleErrors } from "./handleErrors";
export class CodeRateLimiter {
  private nextAllowedTime = 0;

  // Our protocol is: POST when the IP performs an action, or GET to simply read the current limit.
  // Either way, the result is the number of seconds to wait before allowing the IP to perform its
  // next action.
  async fetch(url: string, request: Request) {
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
}
