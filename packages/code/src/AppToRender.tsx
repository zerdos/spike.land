import { Bot, History } from "@/external/lucide-react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import React, { type FC, memo, useState } from "react";

import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { CodeHistoryCarousel } from "./components/AutoSaveHistory";
import { Editor } from "./components/Editor";
import { RainbowWrapper } from "./components/Rainbow";
import { DraggableWindow } from "./DraggableWindow";

import { cn } from "@/lib/utils";
import { type AppComponentProps } from "./app-loader";

/**
 * User info component that displays authentication status
 */
export const Hello: FC = memo(() => {
  const { isSignedIn, userId } = useAuth();

  if (!isSignedIn) {
    return <div className="text-sm text-gray-500">Not signed in</div>;
  }

  return <h2 className="text-sm font-medium truncate max-w-[120px]">{userId}</h2>;
});

Hello.displayName = "Hello";

/**
 * Header component with authentication controls
 */
const Header: FC = memo(() => {
  return (
    <header className="h-11 flex items-center justify-between px-3 border-b border-border/40">
      <div className="flex items-center gap-2">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <Hello />
    </header>
  );
});

Header.displayName = "Header";

/**
 * Action buttons component for the bottom right corner
 */
interface ActionButtonsProps {
  isOpen: boolean;
  onToggleChat: () => void;
  onToggleHistory: () => void;
}

const ActionButtons: FC<ActionButtonsProps> = memo(({
  isOpen,
  onToggleChat,
  onToggleHistory,
}) => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[1001]">
      <Button
        onClick={onToggleHistory}
        className={cn(
          "rounded-full w-12 h-12 p-0",
          "hover:bg-primary transition-colors",
        )}
        title="Show Version History"
        aria-label="Show Version History"
      >
        <History className="h-6 w-6" />
      </Button>

      {!isOpen && (
        <Button
          onClick={onToggleChat}
          className={cn(
            "rounded-full w-12 h-12 p-0",
            "hover:bg-primary transition-colors",
          )}
          title="Open Chat"
          aria-label="Open Chat"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
});

ActionButtons.displayName = "ActionButtons";

/**
 * History modal component
 */
interface HistoryModalProps {
  isVisible: boolean;
  codeSpace: string;
  codeSession: AppComponentProps["cSess"]; // Renamed cSess
  onClose: () => void;
}

const HistoryModal: FC<HistoryModalProps> = memo(({
  isVisible,
  codeSpace,
  codeSession, // Renamed cSess
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-background rounded-lg shadow-lg w-11/12 h-5/6 max-w-6xl">
        <CodeHistoryCarousel
          onClose={onClose}
          onRestore={onClose}
          codeSpace={codeSpace}
          cSess={codeSession} // Renamed cSess
        />
      </div>
    </div>
  );
});

HistoryModal.displayName = "HistoryModal";

/**
 * Main application component that renders the code editor, preview, and tools
 */
export const AppToRender: FC<AppComponentProps> = memo(({
  codeSpace,
  cSess: codeSession, // Renamed cSess
}) => {
  const maybeKey = codeSpace.split("-")[1];

  // Chat toggle state
  const [isOpen, setIsOpen] = useState(
    maybeKey && sessionStorage.getItem(maybeKey) ? true : false,
  );

  // History modal state
  const [showAutoSaveHistory, setShowAutoSaveHistory] = useState(false);

  // Ref to the iframe DOM node in the draggable window.
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  /**
   * Replaces the iframe DOM node in the draggable window with a new one.
   * Used by CodeProcessor to show the rendered result without reloading src.
   */
  const replaceIframe = (newIframe: HTMLIFrameElement) => {
    const oldIframe = iframeRef.current;
    if (oldIframe && oldIframe.parentNode) {
      oldIframe.parentNode.replaceChild(newIframe, oldIframe);
      iframeRef.current = newIframe;
    }
  };

  // Event handlers
  const handleToggleAutoSaveHistory = () => setShowAutoSaveHistory((prev) => !prev);
  const handleToggleChat = () => setIsOpen((prev) => !prev);

  return (
    <div className="h-[100dvh] h-[100svh] flex flex-col relative overflow-hidden">
      <ClerkProvider
        publishableKey="pk_live_Y2xlcmsuc3Bpa2UubGFuZCQ"
        afterSignOutUrl="/"
      >
        <Header />

        <main className="flex-1 relative overflow-hidden">
          {/* Live preview window */}
          <DraggableWindow isChatOpen={isOpen} codeSpace={codeSpace}>
            {/* Attach a ref to the iframe so it can be replaced in the DOM */}
            <iframe
              ref={iframeRef}
              title="Live preview"
              src={`/live/${codeSpace}/`}
              className="w-full h-full border-0"
            />
          </DraggableWindow>

          <RainbowWrapper>
            {
              /* Code editor.
                Pass replaceIframe so the editor/code processor can replace the preview iframe after rendering. */
            }
            <Editor
              codeSpace={codeSpace}
              cSess={codeSession}
              replaceIframe={replaceIframe}
            />

            {/* Action buttons */}
            <ActionButtons
              isOpen={isOpen}
              onToggleChat={handleToggleChat}
              onToggleHistory={handleToggleAutoSaveHistory}
            />
          </RainbowWrapper>

          {/* History modal */}
          <HistoryModal
            isVisible={showAutoSaveHistory}
            codeSpace={codeSpace}
            codeSession={codeSession} // Renamed cSess
            onClose={handleToggleAutoSaveHistory}
          />
        </main>

        {/* Chat interface */}
        <ChatInterface
          codeSession={codeSession} // Renamed cSess
          codeSpace={codeSpace}
          isOpen={isOpen}
          onClose={handleToggleChat}
        />
      </ClerkProvider>
    </div>
  );
});

AppToRender.displayName = "AppToRender";
