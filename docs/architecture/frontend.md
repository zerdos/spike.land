# Frontend Architecture

The frontend consists of two main parts: the editor interface in the main window and the code execution environment in an iframe.

## Components

### Main Window (Editor)

- **Editor Interface**: Monaco-based code editor that handles user input
- **Code Processing**: Initial code formatting and preparation
- **Message Handling**: Manages communication with the iframe

### Iframe (Execution Environment)

- **Code Execution**: Safe environment for running user code
- **Render Service**: Handles DOM updates and styling
- **WebSocket Manager**: Manages real-time updates and state sync

## Communication Flow

### Code Execution Flow

```
Editor (Main Window)                 Iframe
     |                                |
     |--- [postMessage] Code -------->|
     |                                |
     |                    Process Code|
     |                    Execute Code|
     |                                |
     |<-- [postMessage] Results -----|
     |                                |
     |Update UI                       |
```

1. User modifies code in the editor
2. Code is sent to iframe via postMessage
3. Iframe processes and executes the code
4. Results are sent back to main window
5. UI updates with new output

### State Management

- Editor state is maintained in the main window
- Execution state is isolated in the iframe
- State synchronization happens through postMessage

## Error Handling

- Code execution errors are captured in the iframe
- Errors are reported back to the editor
- Timeouts prevent infinite loops or hanging execution
- Network errors trigger automatic reconnection

## Security Features

- Code execution is isolated in the iframe
- Content Security Policy (CSP) restrictions
- Input validation at multiple levels
- Origin verification for messages

## Performance Optimizations

- Code execution is debounced
- Message batching for frequent updates
- Resource caching where appropriate
- Lazy loading of heavy components

## Development Guidelines

### Adding New Features

1. Determine which window (main or iframe) should own the functionality
2. Implement proper message handling if cross-window communication is needed
3. Add appropriate error handling
4. Write tests for both success and failure scenarios

### Testing

1. Unit tests for individual components
2. Integration tests for window communication
3. End-to-end tests for complete workflows
4. Performance testing for resource-intensive operations

## File Structure

```
packages/code/src/
├── components/           # UI components
│   ├── editor/          # Editor-related components
│   └── preview/         # Preview components
├── services/            # Core services
│   ├── code/           # Code processing
│   ├── websocket/      # WebSocket handling
│   └── render/         # Rendering service
└── utils/              # Shared utilities
```

For implementation details, refer to:
- `packages/code/src/components/editorUtils.ts`
- `packages/code/src/services/code/CodeProcessor.ts`
- `packages/code/src/services/websocket/WebSocketManager.ts`
