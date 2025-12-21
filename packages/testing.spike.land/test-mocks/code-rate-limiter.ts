export function setupCodeRateLimiter() {
  class CodeRateLimiter {
    private static requestCount = 0;
    private static windowStart = Date.now();
    private static readonly GRACE_PERIOD = 5;
    private static readonly COOLDOWN_PERIOD = 60;

    async handleRequest() {
      const now = Date.now();
      const elapsed = (now - CodeRateLimiter.windowStart) / 1000;

      if (elapsed > CodeRateLimiter.COOLDOWN_PERIOD) {
        CodeRateLimiter.requestCount = 0;
        CodeRateLimiter.windowStart = now;
      }

      if (CodeRateLimiter.requestCount < CodeRateLimiter.GRACE_PERIOD) {
        CodeRateLimiter.requestCount++;
        return new Response("0");
      }

      const cooldown = Math.ceil(CodeRateLimiter.COOLDOWN_PERIOD - elapsed);
      return new Response(cooldown.toString());
    }

    static reset() {
      CodeRateLimiter.requestCount = 0;
      CodeRateLimiter.windowStart = Date.now();
    }
  }

  globalThis.CodeRateLimiter = CodeRateLimiter;
}
