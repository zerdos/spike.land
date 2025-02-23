import { Bot, History } from "@/external/lucideReact";
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from "@clerk/clerk-react";
import { css } from "@emotion/react";
import type { FC } from "react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { CodeHistoryCarousel } from "./components/AutoSaveHistory";
import { Editor } from "./components/Editor";
import { RainbowWrapper } from "./components/Rainbow";
import { DraggableWindow } from "./DraggableWindow";
// import { fakeServer } from "./sw-local-fake-server";

import type { ICode } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

Object.assign(globalThis, {
  setupAndRun: async (prompt: string) => {
    const { setupAndRun } = await import("./chat-utils-langchain-example");
    setupAndRun(prompt).catch(console.error);
  },
});

const Header: FC = () => {
  return (
    <header className="h-11 flex items-center justify-between px-3">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <Hello />
    </header>
  );
};

interface AppToRenderProps {
  codeSpace: string;
  cSess: ICode;
}

export const Hello = () => {
  const { isSignedIn, userId } = useAuth();

  if (!isSignedIn) {
    return <div>Not signed in</div>;
  }

  return <h2>{userId}</h2>;
};

export const AppToRender: FC<AppToRenderProps> = ({ codeSpace, cSess }) => {
  const maybeKey = codeSpace.split("-")[1];

  const [isOpen, setIsOpen] = useState(
    maybeKey && sessionStorage.getItem(maybeKey) ? true : false,
  );
  const [showAutoSaveHistory, setShowAutoSaveHistory] = useState(false);

  const handleToggleAutoSaveHistory = () => {
    setShowAutoSaveHistory(!showAutoSaveHistory);
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      css={css`
        height: 100dvh;
        height: 100svh;
        display: block;
        position: relative;
        overflow: hidden;
      `}
    >
      <Header />
      <div className="flex-1 relative overflow-hidden">
        <DraggableWindow isChatOpen={isOpen} codeSpace={codeSpace}>
          <iframe title="Live preview" src={`/live/${codeSpace}/iframe`} />
        </DraggableWindow>

        <RainbowWrapper>
          <Editor codeSpace={codeSpace} cSess={cSess} />

          {showAutoSaveHistory && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-background rounded-lg shadow-lg w-11/12 h-5/6 max-w-6xl">
                <CodeHistoryCarousel
                  onClose={handleToggleAutoSaveHistory}
                  onRestore={handleToggleAutoSaveHistory}
                  codeSpace={codeSpace}
                  cSess={cSess}
                />
              </div>
            </div>
          )}

          <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[1001]">
            <Button
              onClick={handleToggleAutoSaveHistory}
              className={cn(
                "rounded-full w-12 h-12 p-0",
                "hover:bg-primary transition-colors",
              )}
              title="Show Version History"
            >
              <History className="h-6 w-6" />
            </Button>
            {!isOpen && (
              <Button
                onClick={handleToggleChat}
                className={cn(
                  "rounded-full w-12 h-12 p-0",
                  "hover:bg-primary transition-colors",
                )}
                title="Open Chat"
              >
                <Bot className="h-6 w-6" />
              </Button>
            )}
          </div>
        </RainbowWrapper>
      </div>

      <ChatInterface
        cSess={cSess}
        codeSpace={codeSpace}
        isOpen={isOpen}
        onClose={handleToggleChat}
      />
    </div>
  );
};
