# Message Handler Service

A robust and type-safe service for handling different types of messages in the
system.

## Features

- Support for multiple message types (text, command, status)
- Type-safe message handling
- Comprehensive error handling
- Configurable behavior
- Support for different message content formats

## Usage

### Basic Usage

```typescript
import { MessageHandlerService } from "./MessageHandlerService";
import { MessageType } from "./types";

const messageHandler = new MessageHandlerService();

// Handle a simple text message
const textMessage = {
  id: "1",
  type: MessageType.TEXT,
  content: "Hello, World!",
  role: "user",
};

const result = await messageHandler.handleMessage(textMessage);
// result.data = { text: 'Hello, World!' }

// Handle a command message
const commandMessage = {
  id: "2",
  type: MessageType.COMMAND,
  content: { type: "text", text: "execute-task" },
  role: "system",
};

const cmdResult = await messageHandler.handleMessage(commandMessage);
// cmdResult.data = { command: 'execute-task', executed: true }
```

### Advanced Usage

#### Custom Configuration

```typescript
const messageHandler = new MessageHandlerService({
  logErrors: true,
  maxRetries: 5,
  timeout: 10000,
});
```

#### Handling Complex Content

```typescript
// Message with mixed content types
const complexMessage = {
  id: "3",
  type: MessageType.TEXT,
  content: [
    { type: "text", text: "Check out this image:" },
    {
      type: "image_url",
      image_url: { url: "https://example.com/image.jpg" },
    },
  ],
  role: "assistant",
};

const result = await messageHandler.handleMessage(complexMessage);
// Extracts text content from the array
// result.data = { text: 'Check out this image:' }
```

#### Error Handling

```typescript
// Invalid message
const invalidMessage = {
  type: MessageType.TEXT,
  // Missing required fields
};

const result = await messageHandler.handleMessage(invalidMessage as any);
// result = { success: false, error: 'Invalid message format' }

// Message with invalid content
const invalidContent = {
  id: "4",
  type: MessageType.TEXT,
  content: { invalid: true },
  role: "user",
};

const errorResult = await messageHandler.handleMessage(invalidContent as any);
// errorResult = { success: false, error: 'Invalid message content type' }
```

## API Reference

### MessageType

Available message types:

- `TEXT`: Regular text messages
- `COMMAND`: System command messages
- `STATUS`: Status update messages
- `ERROR`: Error messages

### MessageRole

Possible message sender roles:

- `'user'`
- `'system'`
- `'assistant'`

### MessageResponse

Response structure:

```typescript
interface MessageResponse {
  success: boolean; // Operation success status
  data?: unknown; // Response data (if successful)
  error?: string; // Error message (if failed)
}
```

### MessageHandlerConfig

Configuration options:

```typescript
interface MessageHandlerConfig {
  logErrors?: boolean; // Whether to log errors (default: true)
  maxRetries?: number; // Max retry attempts (default: 3)
  timeout?: number; // Operation timeout in ms (default: 5000)
}
```

## Error Handling

The service handles various error cases:

- Invalid message format
- Missing required fields
- Unsupported message types
- Invalid content types
- Processing errors

All errors are:

1. Logged (if `logErrors` is enabled)
2. Returned in a structured format
3. Type-safe with proper error messages

## Best Practices

1. Always validate message format before sending
2. Use type assertions sparingly
3. Handle errors appropriately
4. Set appropriate configuration for your use case
5. Prefer structured content over plain text when applicable

## Testing

The service includes comprehensive tests for all features. Run tests with:

```bash
npm test
```

Check `__tests__/MessageHandlerService.test.ts` for test examples and coverage.
