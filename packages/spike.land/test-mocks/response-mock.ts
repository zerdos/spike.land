export function setupResponseMock() {
  global.Response = class extends Response {
    webSocket?: any;

    constructor(body?: BodyInit | null, init?: ResponseInit & { webSocket?: any; }) {
      // Handle WebSocket upgrade status code
      if (init?.status === 101) {
        // Allow WebSocket upgrade without validation
        const { webSocket, ...restInit } = init;
        restInit.status = undefined;
        super(body, restInit);
        Object.defineProperty(this, "status", { value: 101 });
        if (webSocket) {
          this.webSocket = webSocket;
        }
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
