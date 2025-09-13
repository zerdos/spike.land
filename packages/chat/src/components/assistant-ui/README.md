# Assistant UI Components

This directory contains the assistant-ui components for building AI chat interfaces with React.

## Components

### Thread
The main chat interface component that displays messages and handles user input.

```tsx
import { Thread } from './components/assistant-ui/thread';

<Thread
  placeholder="Type a message..."
  suggestions={["Help me code", "Explain this concept"]}
  welcomeMessage="Welcome! How can I help?"
  showTimestamps
  allowAttachments
/>
```

### ThreadList
Displays a list of conversation threads with actions like pin, archive, and delete.

```tsx
import { ThreadList } from './components/assistant-ui/thread-list';

<ThreadList
  threads={threads}
  activeThreadId={activeId}
  onThreadSelect={handleSelect}
  onThreadDelete={handleDelete}
/>
```

### MarkdownText
Renders markdown content with syntax highlighting and proper formatting.

```tsx
import { MarkdownText } from './components/assistant-ui/markdown-text';

<MarkdownText className="prose">
  {markdownContent}
</MarkdownText>
```

### ChatInterface
Complete chat interface with sidebar and thread management.

```tsx
import { ChatInterface } from './components/assistant-ui/chat-interface';

<ChatInterface
  showSidebar
  collapsible
  defaultSidebarSize={25}
/>
```

## Usage with AI SDK

### Basic Setup

```tsx
import { useChat } from "@ai-sdk/react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useVercelUseChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "./components/assistant-ui/thread";

function ChatApp() {
  const chat = useChat({
    api: "/api/chat",
  });

  const runtime = useVercelUseChatRuntime(chat);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Thread />
    </AssistantRuntimeProvider>
  );
}
```

### Custom Configuration

```tsx
const threadConfig = {
  assistantMessage: {
    allowReload: true,
    allowCopy: true,
    allowSpeak: true,
  },
  userMessage: {
    allowEdit: true,
  },
  composer: {
    allowAttachments: true,
  },
};

<Thread config={threadConfig} />
```

## Styling

### Import Styles

```css
/* In your global CSS file */
@import "@assistant-ui/styles";
@import "./styles/assistant-ui.css";
```

### Dark Mode

The components support dark mode through Tailwind CSS classes:

```tsx
<div className="dark">
  <Thread className="dark:bg-gray-900" />
</div>
```

### Custom Theme

Override CSS variables for custom theming:

```css
:root {
  --aui-primary: hsl(222.2 47.4% 11.2%);
  --aui-primary-foreground: hsl(210 40% 98%);
  --aui-border: hsl(214.3 31.8% 91.4%);
  --aui-radius: 0.5rem;
}
```

## Features

- **Real-time Messaging**: WebSocket support for live updates
- **Markdown Rendering**: Full markdown support with syntax highlighting
- **Branch Navigation**: Navigate between different message versions
- **Action Bar**: Copy, reload, edit, and speak messages
- **File Attachments**: Support for uploading files
- **Voice Input**: Optional voice input support
- **Thread Management**: Create, delete, pin, and archive conversations
- **Responsive Design**: Mobile-friendly interface
- **Accessibility**: ARIA labels and keyboard navigation
- **TypeScript**: Full type safety and IntelliSense support

## Dependencies

- `@assistant-ui/react`: Core assistant UI components
- `@assistant-ui/react-markdown`: Markdown rendering
- `@assistant-ui/styles`: Base styles
- `@assistant-ui/react-ai-sdk`: Vercel AI SDK integration
- `lucide-react`: Icons
- `clsx`: Class name utility
- `tailwind-merge`: Tailwind class merging
- `@radix-ui/react-slot`: Component composition
- `@radix-ui/react-tooltip`: Tooltip primitives
- `class-variance-authority`: Component variants

## Examples

See the `examples/assistant-ui-example.tsx` file for complete usage examples including:

- Basic chat setup
- Chat with sidebar
- Dark mode implementation
- Advanced configuration with tools
- Static UI demonstration