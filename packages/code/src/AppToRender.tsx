import { Button } from "@/components/ui/button";
import { Bot } from "@/external/lucideReact";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import ChatInterface from "./ChatInterface";
import { CodeHistoryCarousel } from "./components/AutoSaveHistory";
import { Editor } from "./components/Editor";
import { RainbowWrapper } from "./components/Rainbow";
import { DraggableWindow } from "./DraggableWindow";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { reveal } from "./reveal";

export const AppToRender: FC<{ codeSpace: string }> = ({ codeSpace }) => {
  const sp = new URLSearchParams(location.search);
  const onlyEdit = sp.has("edit");
  const [hideRest, setHideRest] = useState(true);
  const [showAutoSaveHistory, setShowAutoSaveHistory] = useState(false);
  const editorRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    console.log("AppToRender mounted");
    const existingIframe = document.querySelector(`iframe[src="/live/${codeSpace}/iframe"]`) as HTMLIFrameElement;

    if (existingIframe && !iframeRef.current) {
      iframeRef.current = existingIframe;
      iframeRef.current.style.display = "block";
      iframeRef.current.style.width = "100%";
      iframeRef.current.style.height = "100%";
      iframeRef.current.style.border = "none";

      setHideRest(false);
      reveal();

      // Remove the existing iframe from its original location
      existingIframe.parentNode?.removeChild(existingIframe);
    }
  }, [codeSpace]);

  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <div className="relative">
        {onlyEdit
          ? (
            iframeRef.current && (
              <div style={{ display: "none" }}>
                {iframeRef.current}
              </div>
            )
          )
          : (
            <DraggableWindow
              isChatOpen={isOpen}
              codeSpace={codeSpace}
            >
              {iframeRef.current}
            </DraggableWindow>
          )}

        {!hideRest && (
          <RainbowWrapper>
            <Editor
              codeSpace={codeSpace}
              ref={editorRef}
            />
            {!isOpen && (
              <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 z-[1001]"
              >
                <Bot className="h-6 w-6" />
              </Button>
            )}

            <ChatInterface
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              isMobile={isMobile}
            />

            <Button
              onClick={() => setShowAutoSaveHistory((x) => !x)}
              className="fixed top-4 right-4 z-50"
              size="sm"
            >
              Version History
            </Button>

            {showAutoSaveHistory && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-background rounded-lg shadow-lg w-11/12 h-5/6 max-w-6xl">
                  <CodeHistoryCarousel
                    onClose={() => setShowAutoSaveHistory(false)}
                    onRestore={() => {
                      setShowAutoSaveHistory(false);
                    }}
                    codeSpace={codeSpace}
                  />
                </div>
              </div>
            )}
          </RainbowWrapper>
        )}
      </div>
    </>
  );
};
