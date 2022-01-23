// RateLimiterClient implements rate limiting logic on the caller's side.
export class RateLimiterClient {
  constructor(getLimiterStub, reportError) {
    this.getLimiterStub = getLimiterStub;
    this.reportError = reportError;
    this.getLimiterStub = getLimiterStub;
    this.reportError = reportError;
    // Call the callback to get the initial stub.
    this.limiter = getLimiterStub();
    // When `inCoolDown` is true, the rate limit is currently applied and checkLimit() will return
    // false.
    this.inCoolDown = false;
  }
  // Call checkLimit() when a message is received to decide if it should be blocked due to the
  // rate limit. Returns `true` if the message should be accepted, `false` to reject.
  checkLimit() {
    if (this.inCoolDown) {
      return false;
    }
    this.inCoolDown = true;
    this.callLimiter();
    return true;
  }
  // callLimiter() is an internal method which talks to the rate limiter.
  async callLimiter() {
    try {
      let response;
      try {
        // Currently, fetch() needs a valid URL even though it's not actually going to the
        // internet. We may loosen this in the future to accept an arbitrary string. But for now,
        // we have to provide a dummy URL that will be ignored at the other end anyway.
        response = await this.limiter.fetch(
          new Request("https://dummy-url", {
            method: "POST",
          }),
        );
      } catch (err) {
        // `fetch()` threw an exception. This is probably because the limiter has been
        // disconnected. Stubs implement E-order semantics, meaning that calls to the same stub
        // are delivered to the remote object in order, until the stub becomes disconnected, after
        // which point all further calls fail. This guarantee makes a lot of complex interaction
        // patterns easier, but it means we must be prepared for the occasional disconnect, as
        // networks are inherently unreliable.
        //
        // Anyway, get a new limiter and try again. If it fails again, something else is probably
        // wrong.
        this.limiter = this.getLimiterStub();
        response = await this.limiter.fetch(
          new Request("https://dummy-url", {
            method: "POST",
          }),
        );
      }
      // The response indicates how long we want to pause before accepting more requests.
      let coolDown = +(await response.text());
      await new Promise((resolve) => setTimeout(resolve, coolDown * 100));
      // Done waiting.
      this.inCoolDown = false;
    } catch (err) {
      this.reportError(err);
    }
  }
}
//# sourceMappingURL=rateLimiterClient.js.map
