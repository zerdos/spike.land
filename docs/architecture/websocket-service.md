# WebSocket Service Architecture

## Overview

The WebSocket service provides real-time communication capabilities for the application, handling live code synchronization, collaborative editing, and real-time preview updates. The service is built with dependency injection, proper error handling, and retry mechanisms to ensure robust and reliable communication.

## Core Components

### WebSocketManager

The main class responsible for managing WebSocket connections and coordinating communication between different parts of the application.

```typescript
class WebSocketManager implements IWebSocketManager {
  constructor(dependencies: WebSocketDependencies, config?: WebSocketConfig)
}
```

#### Key Features

- Dependency injection for better testability and maintainability
- Automatic retry mechanism for failed connections
- Route-specific handling for different application states
- Proper error boundaries and recovery mechanisms
- Event-based subscription system

### Dependencies

The service uses a dependency injection pattern with the following dependencies:

```typescript
interface WebSocketDependencies {
  messageHandler: IMessageHandlerService;    // Handles message processing
  serviceWorker: IServiceWorkerManager;      // Manages service worker
  codeSessionBC: ICodeSessionBC;            // Manages code session broadcast
}
```

### Configuration

The service can be configured with the following options:

```typescript
interface WebSocketConfig {
  maxRetries?: number;         // Maximum number of retry attempts
  retryDelay?: number;         // Delay between retries in milliseconds
  connectionTimeout?: number;  // Connection timeout in milliseconds
}
```

## Message Flow

1. **Initialization**
   ```typescript
   const manager = new WebSocketManager(dependencies, config);
   await manager.init();
   ```

2. **Route-Specific Handling**
   - Live Page: Handles real-time code synchronization
   - Dehydrated Page: Manages static content rendering
   - Default Page: Handles general message routing

3. **Event Subscription**
   ```typescript
   manager.subscribe(WebSocketEventType.MESSAGE, handler);
   ```

## Error Handling

The service implements a comprehensive error handling strategy:

1. **Error Types**
   - WebSocketError: General WebSocket-related errors
   - MessageHandlingError: Message processing errors
   - DOMError: DOM-related errors

2. **Retry Mechanism**
   - Automatic retry for recoverable errors
   - Configurable retry attempts and delays
   - Progressive backoff strategy

3. **Error Recovery**
   ```typescript
   try {
     await manager.init();
   } catch (error) {
     // Error is logged and retry mechanism is triggered
   }
   ```

## State Management

The service maintains connection state through the WebSocketState enum:

```typescript
enum WebSocketState {
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  RECONNECTING = 'reconnecting',
  ERROR = 'error'
}
```

## Testing

The service is designed with testability in mind:

1. **Unit Tests**
   - Mock dependencies for isolated testing
   - Test different connection states
   - Verify error handling and retry logic

2. **Integration Tests**
   - Test real WebSocket communication
   - Verify message flow
   - Test reconnection scenarios

Example test:
```typescript
describe("WebSocketManager", () => {
  it("should handle connection errors", async () => {
    const manager = new WebSocketManager(mockDependencies);
    await manager.init();
    // Verify error handling
  });
});
```

## Best Practices

1. **Dependency Injection**
   - Always inject dependencies rather than creating them internally
   - Use interfaces for better abstraction
   - Make dependencies easily mockable for testing

2. **Error Handling**
   - Always catch and properly handle errors
   - Implement retry mechanisms for recoverable errors
   - Log errors appropriately for debugging

3. **State Management**
   - Keep track of connection state
   - Handle state transitions properly
   - Notify relevant parts of the application about state changes

4. **Resource Cleanup**
   - Always clean up resources when they're no longer needed
   - Unsubscribe from events
   - Close connections properly

## Usage Examples

### Basic Usage

```typescript
const dependencies = {
  messageHandler: new MessageHandlerService(),
  serviceWorker: new ServiceWorkerManager(),
  codeSessionBC: new CodeSessionBC()
};

const config = {
  maxRetries: 3,
  retryDelay: 1000
};

const manager = new WebSocketManager(dependencies, config);
await manager.init();
```

### Message Handling

```typescript
// Handle run message
const result = await manager.handleRunMessage(code);
if (result) {
  const { html, css } = result;
  // Update preview
}
```

### Cleanup

```typescript
// Clean up resources
manager.cleanup();
```

## Future Improvements

1. **Performance Optimization**
   - Implement message batching
   - Add compression for large messages
   - Optimize reconnection strategy

2. **Feature Enhancements**
   - Add support for binary messages
   - Implement message priority queue
   - Add support for multiple simultaneous connections

3. **Monitoring**
   - Add performance metrics
   - Implement better logging
   - Add connection quality monitoring
