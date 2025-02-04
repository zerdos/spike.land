export function setupResponseMock() {
  global.Response = class extends Response {
    constructor(body?: BodyInit | null, init?: ResponseInit) {
      // Handle WebSocket upgrade status code
      if (init?.status === 101) {
        // Allow WebSocket upgrade without validation
        init.status = undefined;
        super(body, init);
        Object.defineProperty(this, "status", { value: 101 });
        return;
      }

      // For empty responses, ensure body is null
      if (body === undefined || body === null) {
        body = null;
      }

      // Validate other status codes
      if (init?.status !== undefined && (init.status < 200 || init.status > 599)) {
        init.status = 500;
      }

      super(body, init);
    }
  };
}
