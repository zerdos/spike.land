import { Button } from "@/components/ui/button";
import { Bot } from "@/external/lucideReact";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import React, { useEffect, useRef, useState } from "react";
import ChatInterface from "./ChatInterface";
import { CodeHistoryCarousel } from "./components/AutoSaveHistory";
import { Editor } from "./components/Editor";
import { RainbowWrapper } from "./components/Rainbow";
import { DraggableWindow } from "./DraggableWindow";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { reveal } from "./reveal";

export const AppToRender: React.FC<{ codeSpace: string }> = ({ codeSpace }) => {
  const sp = new URLSearchParams(location.search);
  const onlyEdit = sp.has("edit");
  const [hideRest, setHideRest] = useState(true);
  const [showAutoSaveHistory, setShowAutoSaveHistory] = useState(false);
  const editorRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [iframeTransitioned, setIframeTransitioned] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const existingIframe = document.querySelector("#embed iframe") as HTMLIFrameElement;
    if (existingIframe) {
      iframeRef.current = existingIframe;
      setHideRest(false);
      reveal();

      // Trigger the transition after a short delay
      setTimeout(() => {
        setIframeTransitioned(true);
      }, 100);
    }
  }, []);

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
        <style>
          {`
            .iframe-container {
              position: fixed;
              transition: all 0.5s ease-in-out;
              z-index: 1000;
            }
            .iframe-initial {
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
            }
            .iframe-transitioned {
              top: 50px;
              left: 50px;
              width: calc(100vw - 100px);
              height: calc(100vh - 100px);
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
          `}
        </style>
        <DraggableWindow codeSpace={codeSpace} isChatOpen={isOpen}>
          <div
            className={`iframe-container ${iframeTransitioned ? "iframe-transitioned" : "iframe-initial"}`}
            ref={el => {
              if (el && iframeRef.current) {
                el.appendChild(iframeRef.current);
              }
            }}
          />
        </DraggableWindow>

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
