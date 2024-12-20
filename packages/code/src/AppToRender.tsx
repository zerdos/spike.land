import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@/external/clerk";
import { Bot, History } from "@/external/lucideReact";
import { css } from "@emotion/react";

import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { CodeHistoryCarousel } from "./components/AutoSaveHistory";
import { Editor } from "./components/Editor";
import { RainbowWrapper } from "./components/Rainbow";
import { DraggableWindow } from "./DraggableWindow";
// import { fakeServer } from "./sw-local-fake-server";

import type { ICode } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

const Header: FC = () => {
  console.log("Rendering Header component");
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
  const { isSignedIn, sessionId, userId } = useAuth();

  console.log("Hello component - Auth state:", {
    isSignedIn,
    sessionId,
    userId,
  });

  if (!isSignedIn) {
    return <div>Not signed in</div>;
  }

  return <h2>{userId}</h2>;
};

export const AppToRender: FC<AppToRenderProps> = ({ codeSpace, cSess }) => {
  console.log("Rendering AppToRender with codeSpace:", codeSpace);
  const maybeKey = codeSpace.split("-")[1];

  const [isOpen, setIsOpen] = useState(
    maybeKey && sessionStorage && sessionStorage.getItem(maybeKey)
      ? true
      : false,
  );
  const [showAutoSaveHistory, setShowAutoSaveHistory] = useState(false);
  const [iframeSrc, setIframeSrc] = useState(`/live/${codeSpace}/dehydrated`);

  useEffect(() => {
    (async () => {
      //   //   if (location.origin.includes("localhost")) {
      //   //   const fakeResponse = await fakeServer({url: `${location.origin}/live/${codeSpace}/iframe`} as Request);
      //   //   const indexHtml = await fakeResponse.blob();

      //   //   console.log("indexHtml", indexHtml);

      //   //  const iframeUrl =   URL.createObjectURL(indexHtml);

      const iframe = `/live/${codeSpace}/iframe`;

      setTimeout(() => setIframeSrc(iframe), 2000);
    })();
  }, [codeSpace]);

  useEffect(() => {
    console.log("AppToRender state changed:", { isOpen, showAutoSaveHistory });
  }, [isOpen, showAutoSaveHistory]);

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
          <>
            {iframeSrc.includes("dehydrated")
              ? (
                <iframe title="Live preview" src={iframeSrc}>
                </iframe>
              )
              : null}
            <iframe
              src={`/live/${codeSpace}/iframe`}
              style={{
                display: iframeSrc.includes("/iframe") ? "block" : "none",
              }}
              title="Live Preview"
            >
            </iframe>
          </>
        </DraggableWindow>

        <RainbowWrapper>
          <Editor codeSpace={codeSpace} cSess={cSess} />

          {showAutoSaveHistory && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-background rounded-lg shadow-lg w-11/12 h-5/6 max-w-6xl">
                <CodeHistoryCarousel
                  onClose={() => {
                    console.log("Closing AutoSaveHistory");
                    setShowAutoSaveHistory(false);
                  }}
                  onRestore={() => {
                    console.log("Restoring from AutoSaveHistory");
                    setShowAutoSaveHistory(false);
                  }}
                  codeSpace={codeSpace}
                  cSess={cSess}
                />
              </div>
            </div>
          )}

          <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[1001]">
            <Button
              onClick={() => {
                console.log("Opening AutoSaveHistory");
                setShowAutoSaveHistory(true);
              }}
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
                onClick={() => {
                  console.log("Opening Chat");
                  setIsOpen(true);
                }}
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
        isOpen={isOpen}
        onClose={() => {
          console.log("Closing Chat");
          setIsOpen(false);
        }}
      />
    </div>
  );
};
