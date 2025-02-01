# Frontend Architecture

The frontend is divided into two main parts:
- **Editor Interface (Main Window):** Provides the user interface for coding and editing.
- **Code Execution Environment (Iframe):** Executes the user’s code in an isolated context.

## Components

### Main Window (Editor)
- **Editor Interface:** Utilizes Monaco Editor for a rich coding experience.
- **Code Processing:** Performs initial formatting and transpilation before sending code for execution.
- **Message Handling:** Uses postMessage to communicate with the iframe and ensures that only messages from the designated iframe are acted upon, preventing unintended re-rendering in the main window.

### Iframe (Execution Environment)
- **Code Execution:** Safely executes user code in isolation.
- **Render Service:** Updates the UI based on executed code, completely isolated from the main window.
- **WebSocket Interaction:** May manage live updates and state synchronization specific to the execution context.

## Communication Flow

1. The user modifies code in the editor.
2. The code is formatted and transpiled.
3. The processed code is sent via postMessage to the iframe.
4. The iframe processes and executes the code, then sends the result back.
5. The main window updates its UI based solely on verified messages from the iframe.

## Test Environment Considerations

- **Polyfills:** A polyfill for `window.scrollTo` is setup in the test environment (see start.ts) to prevent errors.
- **Stubbed Code Processing:** In tests, the `CodeProcessor` is stubbed to immediately return "processed_test" to avoid timeouts.
- **Service Worker Configuration:** The `ServiceWorkerManager` is configured to skip setup when simulating an iframe (using a global flag) or when running outside the main window.
- **Mocking Strategy:** Key functions like `formatCode` and `transpileCode` are stubbed/mocked in tests to ensure prompt and predictable behavior.

## Testing Strategy

- **Unit Tests:** Verify the functionality of individual components such as the Editor Interface, Code Processing, and Message Handling.
- **Integration Tests:** Ensure the correct flow of messages between the main window and the iframe using postMessage.
- **Error and Edge Case Handling:** Dedicated tests validate timeout behavior, error handling, and proper isolation between contexts.
- **Mocking:** Tools like jest are used to simulate and stub browser APIs and asynchronous operations used in code processing and service worker registration.

## Security and Best Practices

- **Isolation:** Code execution is confined to the iframe, ensuring a secure separation from the main window.
- **Validation:** Incoming messages are validated to accept only those from the trusted iframe source.
- **CSP Compliance:** Content Security Policy and origin checks are implemented to safeguard against unauthorized interactions.
