import { wait } from "axax/esnext/wait";

export class Code implements DurableObject {
  state: DurableObjectState;
  value: number = 0;
  constructor(state: DurableObjectState, env: DurableObjectNamespace) {
    this.state = state;
    // `blockConcurrencyWhile()` ensures no requests are delivered until
    // initialization completes.
    this.state.blockConcurrencyWhile(async () => {
      let stored = Number(await this.state.storage!.get("value"));
      this.value = stored || 0;
    });
  }
  async increment() {
    await wait(10000);
    this.state.waitUntil(wait(1000));
    await this.state.storage!.put("value", ++this.value);
  }

  // Handle HTTP requests from clients.
  async fetch(request: Request) {
    // Apply requested action.
    let url = new URL(request.url);
    let currentValue = this.value;
    if (url.pathname.includes("inc")) {
      await this.increment();
    } else if (url.pathname.includes("dec")) {
      // currentValue = --this.value;
      await this.state.storage!.put("value", --this.value);
    }

    // Return `currentValue`. Note that `this.value` may have been
    // incremented or decremented by a concurrent request when we
    // yielded the event loop to `await` the `storage.put` above!
    // That's why we stored the counter value created by this
    // request in `currentValue` before we used `await`.
    return new Response(String(this.value));
  }
}
