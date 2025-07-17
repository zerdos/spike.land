# Data Flow Architecture

## Overview

This document describes how data flows through the spike.land system, including
real-time collaboration, asset serving, and AI interactions.

## Core Data Flows

```mermaid
sequenceDiagram
    participant Client
    participant Frontend
    participant MainWorker
    participant TranspilerWorker
    participant RendererWorker
    participant DurableObjects
    participant Storage
    participant AI

    Note over Client,AI: Primary Data Flows

    %% Code Editing Flow
    Client->>Frontend: Edit code
    Frontend->>Frontend: Format code (Prettier)
    Frontend->>TranspilerWorker: Request transpilation (esbuild)
    TranspilerWorker-->>Frontend: Return transpiled code
    Frontend->>MainWorker: Save changes
    MainWorker->>DurableObjects: Update state
    MainWorker->>Storage: Store changes
    
    %% Real-time Collaboration
    DurableObjects-->>MainWorker: Broadcast changes
    MainWorker-->>Client: Push updates
    
    %% Asset Serving
    Client->>MainWorker: Request asset
    MainWorker->>Storage: Fetch asset
    Storage-->>MainWorker: Return asset
    MainWorker-->>Client: Serve asset
    
    %% AI Integration
    Client->>MainWorker: AI request
    MainWorker->>AIHandler: Prepare content
    MainWorker->>AIService: Process request
    AI-->>MainWorker: Return result
    MainWorker-->>Client: Send response
```

## Real-time Collaboration Flow

### WebSocket Connection

```typescript
// Example WebSocket setup
class CollaborationManager {
  private ws: WebSocket;

  connect(roomId: string) {
    this.ws = new WebSocket(`wss://spike.land/room/${roomId}`);
    this.ws.onmessage = this.handleMessage.bind(this);
  }

  handleMessage(event: MessageEvent) {
    const update = JSON.parse(event.data);
    this.applyUpdate(update);
  }
}
```

The Main Worker manages WebSocket connections for real-time collaboration.

### State Synchronization

```typescript
// Example state sync
interface StateUpdate {
  type: "insert" | "delete" | "replace";
  position: number;
  content?: string;
  length?: number;
}

function applyUpdate(doc: string, update: StateUpdate): string {
  switch (update.type) {
    case "insert":
      return doc.slice(0, update.position) +
        update.content +
        doc.slice(update.position);
    case "delete":
      return doc.slice(0, update.position) +
        doc.slice(update.position + update.length!);
      // ...
  }
}
```

## Code Processing Flow

### Edit to Execution

1. **Code Input**
   ```typescript
   // Frontend code capture
   editor.onChange((content) => {
     transpileAndExecute(content);
   });
   ```

2. **Transpilation**
   ```typescript
   // Transpiler worker request
   async function transpileCode(content: string) {
     const response = await fetch("https://js.spike.land/transpile", {
       method: "POST",
       body: JSON.stringify({ content }),
     });
     return response.json();
   }
   ```

3. **Execution**
   ```typescript
   // Code execution
   function executeCode(transpiled: string) {
     const worker = new Worker(
       URL.createObjectURL(new Blob([transpiled])),
     );
     worker.onmessage = handleResult;
   }
   ```

## Asset Management Flow

### Static Assets

```mermaid
graph TD
    A[Client Request] --> B{Cache Check}
    B -- Hit --> C[Return Cached]
    B -- Miss --> D[Fetch from KV]
    D -- Found --> E[Store in Cache]
    D -- Not Found --> F[Fetch from R2]
    F --> E
    E --> G[Return Asset]
```

### Dynamic Assets

```typescript
// Example asset routing
async function routeAsset(request: Request) {
  const url = new URL(request.url);

  // Check if it's a static asset
  if (isStaticAsset(url.pathname)) {
    return serveFromKV(url.pathname);
  }

  // Check if it's a dynamic asset
  if (isDynamicAsset(url.pathname)) {
    return generateAsset(url.pathname, request);
  }

  return new Response("Not Found", { status: 404 });
}
```

## Data Storage Hierarchy

### Storage Tiers

```mermaid
graph TD
    A[Browser] --> B[Memory Cache]
    B --> C[Service Worker Cache]
    C --> D[KV Storage]
    D --> E[R2 Storage]
```

### Cache Strategy

```typescript
// Example cache strategy implementation
async function fetchWithCache(key: string) {
  // Check memory cache
  const memCache = await caches.match(key);
  if (memCache) return memCache;

  // Check KV
  const kvCache = await KV.get(key);
  if (kvCache) {
    await caches.put(key, kvCache);
    return kvCache;
  }

  // Fetch from R2
  const r2Data = await R2.get(key);
  if (r2Data) {
    await KV.put(key, r2Data, { expirationTtl: 3600 });
    return r2Data;
  }
}
```

## AI Integration Flow

### Request Processing

```mermaid
sequenceDiagram
    participant Client
    participant MainWorker
    participant RateLimit
    participant AI
    participant Cache

    Client->>MainWorker: AI Request
    MainWorker->>RateLimit: Check Limits
    RateLimit-->>MainWorker: Approved
    MainWorker->>Cache: Check Cache
    Cache-->>MainWorker: Cache Miss
    MainWorker->>AI: Process Request
    AI-->>MainWorker: Response
    MainWorker->>Cache: Store Result
    MainWorker-->>Client: Return Result
```

### AI Service Integration

```typescript
// Example AI service router
class AIServiceRouter {
  private services = new Map<string, AIService>();

  constructor() {
    this.services.set("openai", new OpenAIService());
    this.services.set("anthropic", new AnthropicService());
  }

  async route(request: Request) {
    const service = this.getService(request);
    return service.process(request);
  }
}
```

## Error Handling Flow

### Error Propagation

```mermaid
graph TD
    A[Error Occurs] --> B{Type?}
    B -- Network --> C[Retry Logic]
    B -- Validation --> D[Client Response]
    B -- System --> E[Error Report]
    C --> F[Circuit Breaker]
    E --> G[Log Aggregation]
```

### Error Recovery

```typescript
// Example error recovery
class ErrorHandler {
  async recover(error: Error, context: Context) {
    if (error instanceof NetworkError) {
      return this.handleNetworkError(error);
    }
    if (error instanceof ValidationError) {
      return this.handleValidationError(error);
    }
    return this.handleSystemError(error);
  }
}
```

## Monitoring and Logging Flow

### Data Collection

```typescript
// Example monitoring setup
interface MetricPoint {
  timestamp: number;
  type: string;
  value: number;
  metadata: Record<string, string>;
}

class Monitoring {
  async recordMetric(point: MetricPoint) {
    await this.store(point);
    if (this.isAlertThreshold(point)) {
      await this.alert(point);
    }
  }
}
```

### Log Aggregation

```mermaid
graph TD
    A[Log Entry] --> B[Worker Logger]
    B --> C[Aggregation Service]
    C --> D[Analysis]
    C --> E[Storage]
    D --> F[Alerts]
    D --> G[Dashboards]
```

## Related Documentation

- [Frontend Architecture](./frontend.md)
- [Workers Architecture](./workers.md)
- [State Management](./state-management.md)
- [API Documentation](../apis/worker-apis.md)
