// packages/durable-objects/test/presence.test.ts
import { env } from "cloudflare:test";
import { expect, it, describe } from "vitest";

describe("PresenceDurableObject", () => {
  it("should reject non-WebSocket requests", async () => {
    const id = env.PRESENCE.idFromName("global-presence-test-1");
    const stub = env.PRESENCE.get(id);

    // Make a non-WebSocket request
    const response = await stub.fetch("http://placeholder/presence");
    expect(response.status).toBe(426); // "Upgrade Required"
    expect(await response.text()).toBe("Expected Upgrade: websocket");
  });

  it("should upgrade WebSocket connections", async () => {
    const id = env.PRESENCE.idFromName("global-presence-test-2");
    const stub = env.PRESENCE.get(id);

    // Make a WebSocket upgrade request
    const request = new Request("http://placeholder/presence", {
      headers: { Upgrade: "websocket" },
    });
    const response = await stub.fetch(request);

    expect(response.status).toBe(101); // "Switching Protocols"
    expect(response.webSocket).toBeDefined(); // Check if a WebSocket object is provided for the client

    // To fully test, we'd need to interact with `response.webSocket` (the client side of the pair).
    // For example, response.webSocket.send("hello") and expect the DO to process it.
    // This part is more complex and might need further investigation on how `cloudflare:test` handles it.
    // For now, ensuring the upgrade attempt is a good first step.
    if (response.webSocket) {
      // Close the WebSocket to clean up resources, if the test environment doesn't do it automatically.
      // This client-side socket would be connected to the server-side socket inside the DO.
      response.webSocket.close();
    }
  });

  // TODO: Add more tests for:
  // - User connection broadcasts (USER_CONNECTED)
  // - User disconnection broadcasts (USER_DISCONNECTED)
  // - Status update messages (STATUS_UPDATE and USER_STATUS_UPDATED)
  // - Multiple users connecting and receiving updates about each other
});
