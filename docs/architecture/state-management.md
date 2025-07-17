# State Management Architecture

## Overview

The system employs a multi-layered state management approach across different
components:

- Frontend state management using React hooks and context
- Route state management using TanStack Router
- Distributed state coordination across multiple clients
- Worker state management through Durable Objects
- Persistent state storage in KV and R2

## Route State Management

### Route Types and Parameters

```typescript
// Core route parameter types
interface RouteParams {
  codeSpace: string;
}

interface RouteWithPageParams {
  codeSpace: string;
  page: string;
}

// Router state type
interface RouterState {
  resolvedLocation: {
    pathname: string;
    params: RouteParams | RouteWithPageParams;
  };
}
```

### Route Context Integration

```typescript
// Router context configuration
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: createContext<
    {
      params: RouteParams | RouteWithPageParams;
      search: SearchParams;
    } | null
  >(null),
});
```

## Frontend State Management

### Component-Level State

```typescript
// Example of local component state
function Editor({ initialCode }: EditorProps) {
  const [code, setCode] = useState(initialCode);
  const [cursor, setCursor] = useState({ line: 0, column: 0 });

  const handleChange = useCallback((newCode: string) => {
    setCode(newCode);
    broadcastChange(newCode);
  }, []);

  // ...
}
```

### Route-Aware State Management

```typescript
// App state integrated with routing
const App: React.FC = () => {
  const [cSess, setState] = useState<ICode | null>(null);
  const codeSpace = getCodeSpace(location.pathname);

  useEffect(() => {
    if (codeSpace && location.pathname === `/live/${codeSpace}`) {
      initializeSession();
    }
  }, [codeSpace]);

  // State updates based on route
  useEffect(() => {
    let unSub: () => void = () => {};

    if (cSess) {
      (async () => {
        const cSessBr = new CodeSessionBC(codeSpace);
        await cSessBr.init(cSess.session);
        unSub = cSessBr.sub((sess) => setState({ ...cSess, session: sess }));
      })();
    }
    return () => unSub();
  }, [cSess]);
};
```

### Session State Management

```typescript
class CodeSessionBC {
  private broadcastChannel: BroadcastChannel;
  session: ICodeSession | null = null;
  subscribers: Array<(session: ICodeSession) => void> = [];

  constructor(private codeSpace: string, session?: ICodeSession) {
    this.broadcastChannel = new BroadcastChannel(
      `/live/${this.codeSpace}/`,
    );
    this.broadcastChannel.onmessage = this.handleMessage.bind(this);
  }

  async init(session?: ICodeSession): Promise<ICodeSession> {
    return this.session = session || this.session ||
      (await this.fetchSession());
  }

  sub(callback: (session: ICodeSession) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }
}
```

## Worker State Management

### Durable Object State

```typescript
// Example Durable Object state management
export class CollaborationRoom implements DurableObject {
  private state: DurableObjectState;
  private sessions: Map<string, WebSocket>;

  constructor(state: DurableObjectState) {
    this.state = state;
    this.sessions = new Map();

    // Load persistent state
    this.state.blockConcurrencyWhile(async () => {
      await this.loadState();
    });
  }

  // Handle state updates
  async updateDocument(newContent: string) {
    await this.state.storage.put("document", newContent);
    this.broadcastUpdate();
  }
}
```

## Route-Aware State Updates

### Navigation State Updates

```typescript
// Example route transition handling
interface RouteTransition {
  from: string;
  to: string;
  params: RouteParams | RouteWithPageParams;
}

const handleRouteTransition = async (transition: RouteTransition) => {
  // Handle state cleanup from previous route
  await cleanupPreviousState(transition.from);

  // Initialize state for new route
  await initializeNewState(transition.to, transition.params);
};
```

### State Persistence Per Route

```typescript
// Example route-specific state persistence
const persistRouteState = async (
  pathname: string,
  state: RouteParams | RouteWithPageParams,
) => {
  const key = `route:${pathname}`;
  await this.state.storage.put(key, state);
};

const loadRouteState = async (pathname: string) => {
  const key = `route:${pathname}`;
  return await this.state.storage.get(key);
};
```

## State Conflict Resolution

### Route Parameter Resolution

```typescript
// Example route parameter conflict resolution
function resolveRouteParams(
  params: RouteParams | RouteWithPageParams,
): ResolvedParams {
  return {
    codeSpace: sanitizeCodeSpace(params.codeSpace),
    page: "page" in params ? sanitizePage(params.page) : undefined,
  };
}

function sanitizeCodeSpace(codeSpace: string): string {
  return codeSpace.replace(/[^a-zA-Z0-9-]/g, "-");
}
```

### State Migration

```typescript
// Example state migration
class StateMigration {
  async migrateState(version: number) {
    const currentState = await this.loadState();

    switch (version) {
      case 2:
        await this.migrateV1ToV2(currentState);
        break;
      case 3:
        await this.migrateV2ToV3(currentState);
        break;
    }

    await this.saveState(currentState);
  }
}
```

## Error Recovery

### State Backup

```typescript
// Example backup strategy
class StateBackup {
  async createBackup() {
    const state = await this.exportState();
    await R2.put(
      `backup-${Date.now()}`,
      JSON.stringify(state),
    );
  }

  async restore(timestamp: number) {
    const backup = await R2.get(`backup-${timestamp}`);
    const state = JSON.parse(await backup.text());
    await this.importState(state);
  }
}
```

### Route Error Recovery

```typescript
// Example route error handling with state recovery
const handleRouteError = async (error: Error) => {
  console.error("Route Error:", error);

  // Attempt state recovery
  try {
    await recoverRouteState();
  } catch (recoveryError) {
    // Fall back to clean state
    await resetRouteState();
  }
};
```

## Related Documentation

- [Frontend Architecture](./frontend.md)
- [Data Flow](./data-flow.md)
- [Workers Architecture](./workers.md)
- [Error Handling](../development/error-handling.md)
