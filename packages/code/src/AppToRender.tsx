import { Button } from "@/components/ui/button";
import { Bot } from "@/external/lucideReact";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { createHtmlPortalNode, HtmlPortalNode, InPortal, OutPortal } from "react-reverse-portal";
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
  const portalNodeRef = useRef<HtmlPortalNode | null>(null);

  useEffect(() => {
    console.log("AppToRender mounted");
    const existingIframe = document.querySelector(`iframe[src="/live/${codeSpace}/iframe"]`) as HTMLIFrameElement;

    if (existingIframe && !portalNodeRef.current) {
      portalNodeRef.current = createHtmlPortalNode();

      setHideRest(false);
      reveal();
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
        {portalNodeRef.current && (
          <InPortal node={portalNodeRef.current}>
            <iframe
              src={`/live/${codeSpace}/iframe`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </InPortal>
        )}

        {onlyEdit
          ? (
            <div style={{ display: "none" }}>
              {portalNodeRef.current && <OutPortal node={portalNodeRef.current} />}
            </div>
          )
          : (
            <DraggableWindow
              isChatOpen={isOpen}
              codeSpace={codeSpace}
            >
              {portalNodeRef.current && <OutPortal node={portalNodeRef.current} />}
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
