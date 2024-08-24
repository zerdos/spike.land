// src/AppToRender.tsx
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";
import { Bot } from "@/external/lucideReact";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import type { FC } from "react";
import ChatInterface from "./ChatInterface";
import { CodeHistoryCarousel } from "./components/AutoSaveHistory";
import { Editor } from "./components/Editor";
import { RainbowWrapper } from "./components/Rainbow";
import { DraggableWindow } from "./DraggableWindow";
import { useMediaQuery } from "./hooks/useMediaQuery"; // Add this import
import { wait } from "./wait";

export const AppToRender: FC<{ codeSpace: string }> = ({ codeSpace }) => {
  const sp = new URLSearchParams(location.search);
  const onlyEdit = sp.has("edit");
  const [hideRest, setHideRest] = useState(true);

  const [showAutoSaveHistory, setShowAutoSaveHistory] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const reveal = async () => {
    await wait(300);
    console.log("Revealing");
    const re = document.getElementById("root");
    const rootEl = document.querySelector("#root > iframe") as HTMLIFrameElement;
    const firstEl = re!.lastElementChild as HTMLDivElement;

    if (!rootEl) return;

    firstEl.style.height = "100%";
    firstEl.style.opacity = "1";

    // if (firstEl !== rootEl) {
    //   re?.removeChild(re.firstElementChild!);
    // }

    // rootEl.style.opacity = "1";
    document.querySelector(`link[href="/live/${codeSpace}/index.css"]`)
      ?.remove();
    setHideRest(false);
    if (rootEl) rootEl.remove();
    // document.querySelector(`#root[iframe]`)?.remove();
  };

  // const handleCodeUpdate = (newCode: string) => {
  //   if (editorRef.current) {
  //     editorRef.current.setValue(newCode, true);
  //   }
  // };

  // useEffect(() => {
  //   // if (onlyEdit) {
  //   setTimeout(() => {
  //     reveal();
  //   }, 1000);

  //   // }
  // });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        console.log("Scrolling to last message");
        document.getElementById("last-message")?.scrollIntoView({ behavior: "smooth", block: "end" });
        console.log("Scrolled to last message");
      }, 100);
      setTimeout(() => {
        console.log("PT2 Scrolling to last message");
        document.getElementById("last-message")?.scrollIntoView({ behavior: "smooth", block: "end" });
        console.log("PT2 Scrolled to last message");
      }, 500);

      setTimeout(() => {
        console.log("PT3 Scrolling to last message");
        document.getElementById("last-message")?.scrollIntoView({ behavior: "smooth", block: "end" });
        console.log("PT3 Scrolled to last message");
      }, 1000);
    }
  }, [isOpen]);

  return (
    <>
      {!hideRest && (
        <header>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
      )}
      <div className="relative">
        {onlyEdit
          ? (
            <iframe
              id="iframeD"
              onLoad={() => {
                reveal();
              }}
              css={css`
            display: none;
            height: 0;
            
            width: 0;
            border: 0;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
          `}
              src={`/live/${codeSpace}/iframe`}
            />
          )
          : (
            <DraggableWindow
              isChatOpen={isOpen}
              codeSpace={codeSpace}
            >
              <iframe
                onLoad={() => {
                  reveal();
                }}
                css={css`
              height: 100%;
              width: 100%;
              border: 0;
              overflow: auto;
              -webkit-overflow-scrolling: touch;
            `}
                src={`/live/${codeSpace}/iframe`}
              />
            </DraggableWindow>
          )}

        {!hideRest && (
          <RainbowWrapper>
            <Editor
              codeSpace={codeSpace}
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
