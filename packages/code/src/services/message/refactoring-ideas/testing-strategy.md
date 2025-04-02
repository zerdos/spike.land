# Testing Strategy

## Testing Philosophy

Our testing approach follows the Testing Pyramid principle with:

1. Many unit tests
2. Some integration tests
3. Few end-to-end tests

## Test Categories

### 1. Unit Tests

#### Message Validation Tests

```typescript
describe("MessageValidator", () => {
  it("should validate correct message structure", () => {
    const validator = new MessageValidator();
    const message: Message = {
      id: "1",
      type: MessageType.TEXT,
      content: { type: "text", text: "Test" },
      role: "user",
    };

    expect(validator.validate(message)).toBe(true);
  });

  it("should reject invalid message structure", () => {
    const validator = new MessageValidator();
    const invalidMessage = {
      type: MessageType.TEXT,
    };

    expect(validator.validate(invalidMessage)).toBe(false);
  });
});
```

#### Content Processing Tests

```typescript
describe("ContentProcessor", () => {
  it("should process text content", async () => {
    const processor = new ContentProcessor();
    const content = { type: "text", text: "Hello" };

    const result = await processor.process(content);
    expect(result).toEqual({ text: "Hello" });
  });

  it("should handle complex content types", async () => {
    const processor = new ContentProcessor();
    const content = [
      { type: "text", text: "Hello" },
      { type: "image", url: "test.jpg" },
    ];

    const result = await processor.process(content);
    expect(result.text).toBe("Hello");
  });
});
```

### 2. Integration Tests

#### Message Flow Tests

```typescript
describe("MessageHandlerService Integration", () => {
  let service: MessageHandlerService;
  let validator: MessageValidator;
  let processor: ContentProcessor;

  beforeEach(() => {
    validator = new MessageValidator();
    processor = new ContentProcessor();
    service = new MessageHandlerService(validator, processor);
  });

  it("should handle complete message flow", async () => {
    const message: Message = {
      id: "1",
      type: MessageType.TEXT,
      content: { type: "text", text: "Test" },
      role: "user",
    };

    const result = await service.handleMessage(message);
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ text: "Test" });
  });
});
```

#### Error Handling Tests

```typescript
describe("Error Handling", () => {
  it("should handle validation errors gracefully", async () => {
    const service = new MessageHandlerService();
    const invalidMessage = {} as Message;

    const result = await service.handleMessage(invalidMessage);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Invalid message format");
  });

  it("should handle processing errors gracefully", async () => {
    const service = new MessageHandlerService();
    const message: Message = {
      id: "1",
      type: MessageType.TEXT,
      content: null,
      role: "user",
    };

    const result = await service.handleMessage(message);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Invalid content");
  });
});
```

### 3. Performance Tests

#### Load Testing

```typescript
describe("Performance", () => {
  it("should handle high message volume", async () => {
    const service = new MessageHandlerService();
    const messages = generateTestMessages(1000);

    const start = Date.now();
    await Promise.all(messages.map((msg) => service.handleMessage(msg)));
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(5000); // 5 seconds max
  });

  it("should maintain performance under load", async () => {
    const service = new MessageHandlerService();
    const results = [];

    for (let i = 0; i < 100; i++) {
      const start = Date.now();
      await service.handleMessage(generateMessage());
      results.push(Date.now() - start);
    }

    const avgTime = results.reduce((a, b) => a + b) / results.length;
    expect(avgTime).toBeLessThan(50); // 50ms average
  });
});
```

### 4. Memory Tests

```typescript
describe("Memory Management", () => {
  it("should not leak memory during processing", async () => {
    const service = new MessageHandlerService();
    const initialMemory = process.memoryUsage().heapUsed;

    for (let i = 0; i < 1000; i++) {
      await service.handleMessage(generateLargeMessage());
    }

    const finalMemory = process.memoryUsage().heapUsed;
    const diff = finalMemory - initialMemory;
    expect(diff).toBeLessThan(5 * 1024 * 1024); // 5MB max increase
  });
});
```

## Test Infrastructure

### 1. Test Helpers

```typescript
// Message Generators
function generateMessage(type: MessageType = MessageType.TEXT): Message {
  return {
    id: uuid(),
    type,
    content: { type: "text", text: "Test message" },
    role: "user",
  };
}

// Mock Factories
class MockValidator implements IMessageValidator {
  validate(message: unknown): boolean {
    return true;
  }
}

// Test Data Builders
class MessageBuilder {
  private message: Partial<Message> = {};

  withId(id: string): this {
    this.message.id = id;
    return this;
  }

  withType(type: MessageType): this {
    this.message.type = type;
    return this;
  }

  build(): Message {
    return {
      id: this.message.id ?? uuid(),
      type: this.message.type ?? MessageType.TEXT,
      content: this.message.content ?? { type: "text", text: "Test" },
      role: this.message.role ?? "user",
    };
  }
}
```

## Testing Best Practices

1. **Test Organization**
   - Group related tests
   - Use descriptive names
   - Follow AAA pattern (Arrange, Act, Assert)

2. **Test Coverage**
   - Maintain >90% coverage
   - Cover edge cases
   - Test error paths

3. **Test Maintenance**
   - Keep tests focused
   - Avoid test duplication
   - Use test helpers

4. **Performance Testing**
   - Regular benchmarking
   - Load testing
   - Memory profiling

## Continuous Integration

1. **Pre-commit Hooks**
   ```bash
   npm run lint
   npm run test:unit
   npm run test:integration
   ```

2. **CI Pipeline**
   ```yaml
   steps:
     - name: Unit Tests
       run: npm run test:unit

     - name: Integration Tests
       run: npm run test:integration

     - name: Performance Tests
       run: npm run test:performance
   ```

3. **Test Reports**
   - Coverage reports
   - Performance metrics
   - Test execution time

## Test Monitoring

1. **Metrics to Track**
   - Test execution time
   - Coverage percentage
   - Failed tests
   - Flaky tests

2. **Alerts**
   - Coverage drops
   - Performance degradation
   - Test failures

3. **Documentation**
   - Test scenarios
   - Setup instructions
   - Troubleshooting guides
