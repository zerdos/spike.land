l ,...# WebSocket Service

The WebSocket service handles real-time communication between the editor and the running application. It manages code execution, state synchronization, and error handling.

## Architecture

### Components

- **WebSocketManager**: Manages WebSocket connections and handles message routing
- **CodeProcessor**: Processes code changes, handles transpilation and execution
- **RenderService**: Manages the rendering of executed code in the iframe

### Message Flow

1. Code changes in the editor trigger the `runCode` function
2. The code is sent via postMessage to the iframe
3. The iframe's WebSocketManager receives and processes the code:
   - Transpiles the code
   - Executes it in the iframe context
   - Returns results back to the main window
4. Results are displayed in the editor view

### State Management

- WebSocket connections are maintained separately for the main window and iframe
- State is synchronized between windows using postMessage communication
- The WebSocketManager handles reconnection and error recovery

## Error Handling

- Connection failures trigger automatic retry attempts
- Execution errors are captured and reported back to the editor
- Timeouts prevent hanging operations

## Security

- All code execution happens in the isolated iframe context
- Message validation ensures only expected message types are processed
- Origin checking prevents unauthorized communication

## Testing

The WebSocket service is thoroughly tested:

- Unit tests cover both code processing and WebSocket communication
- Integration tests ensure proper message flow between windows
- Error scenarios and edge cases are verified with dedicated test cases
- Additional tests verify that code processing occurs only within the iframe context using the exported testHandleRunMessage function.

For implementation details, see the following files:
- `packages/code/src/services/websocket/WebSocketManager.ts`
- `packages/code/src/services/code/CodeProcessor.ts`
- `packages/code/src/components/editorUtils.ts`
