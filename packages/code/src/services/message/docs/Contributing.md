# Contributing to Message Handler Service

## Development Guidelines

### Code Style

1. **TypeScript Best Practices**
   - Use strict type checking
   - Avoid `any` types
   - Leverage type inference
   - Use type guards for runtime checks

2. **Naming Conventions**
   ```typescript
   // Interfaces
   interface IMessageHandler {}

   // Types
   type MessageContent = string | TextPart;

   // Enums
   enum MessageType {}
   ```

3. **File Structure**
   ```
   services/message/
   ├── __tests__/
   ├── types/
   ├── handlers/
   └── utils/
   ```

### Testing Requirements

1. **Unit Tests**
   - Test each public method
   - Test error cases
   - Mock external dependencies
   - Verify type guards

2. **Integration Tests**
   - Test message flow
   - Test configuration options
   - Test error handling

3. **Test Coverage**
   - Maintain >90% coverage
   - Cover edge cases
   - Test async behavior
   - Test error paths

### Documentation

1. **Code Documentation**
   - JSDoc for all public methods
   - Clear interface descriptions
   - Example usage in comments
   - Document error cases

2. **README Updates**
   - Document new features
   - Update API changes
   - Add examples
   - Update version history

### Pull Request Process

1. **Before Submitting**
   - Run all tests
   - Update documentation
   - Add test cases
   - Check code style

2. **PR Requirements**
   - Clear description
   - Test coverage
   - Documentation updates
   - No lint errors

3. **Review Process**
   - Code review required
   - Tests must pass
   - Documentation reviewed
   - Performance impact assessed

### Development Workflow

1. **Setup**
   ```bash
   npm install
   npm run build
   npm test
   ```

2. **Development**
   ```bash
   npm run dev
   npm run lint
   npm run test:watch
   ```

3. **Pre-commit**
   ```bash
   npm run lint
   npm test
   npm run build
   ```

### Best Practices

1. **Error Handling**
   ```typescript
   try {
     await messageHandler.process(message);
   } catch (error) {
     // Log and handle appropriately
     logger.error("Message processing failed:", error);
     throw new MessageProcessingError(error);
   }
   ```

2. **Async/Await**
   ```typescript
   // Prefer async/await over promises
   async function handleMessage(message: Message) {
     const result = await processMessage(message);
     return result;
   }
   ```

3. **Type Safety**
   ```typescript
   // Use type guards
   function isValidMessage(message: unknown): message is Message {
     return (
       typeof message === "object" &&
       message !== null &&
       "type" in message
     );
   }
   ```

### Performance Considerations

1. **Memory Management**
   - Avoid memory leaks
   - Clean up resources
   - Use WeakMap/WeakSet when appropriate

2. **Optimization**
   - Profile before optimizing
   - Document performance impacts
   - Consider batch operations

3. **Resource Usage**
   - Monitor CPU usage
   - Track memory consumption
   - Handle backpressure

### Security Guidelines

1. **Input Validation**
   - Validate all inputs
   - Sanitize data
   - Use type checking

2. **Error Messages**
   - Don't expose internals
   - Log securely
   - Handle sensitive data

3. **Dependencies**
   - Keep updated
   - Audit regularly
   - Minimize third-party code

### Version Control

1. **Commit Messages**
   ```
   feat: Add new message type support
   fix: Handle edge case in content validation
   docs: Update API documentation
   test: Add tests for error cases
   ```

2. **Branching**
   - feature/
   - bugfix/
   - docs/
   - test/

3. **Release Process**
   - Semantic versioning
   - Changelog updates
   - Documentation updates
