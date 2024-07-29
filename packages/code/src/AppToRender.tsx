// src/AppToRender.tsx
import { Button } from "@/components/ui/button";
import { css } from "@emotion/react";
import { Bot } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { FC } from "react";
import ChatInterface from "./ChatInterface";
import AutoSaveHistory from "./components/AutoSaveHistory";
import { RainbowWrapper } from "./components/Rainbow";
import { DraggableWindow } from "./DraggableWindow";
import { reveal } from "./reveal";

export const AppToRender: FC<{ codeSpace: string }> = ({ codeSpace }) => {
  const sp = new URLSearchParams(location.search);
  const onlyEdit = sp.has("edit");
  const [hideRest, setHideRest] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showAutoSaveHistory, setShowAutoSaveHistory] = useState(false);
  const editorRef = useRef<any>(null);

  const [isOpen, setIsOpen] = useState(false);
  const Editor = lazy(() => import("./components/Editor"));

  useEffect(() => {
    if (!onlyEdit) {
      const iframe = document.querySelector(
        `iframe[src="/live/${codeSpace}/"]`,
      );
      if (iframe) {
        iframe.addEventListener("load", () => {
          setHideRest(false);
          reveal();
        });
      }
    }
  }, [codeSpace, onlyEdit]);

  const handleAIModify = () => {
    setShowChat(true);
  };

  const handleCodeUpdate = (newCode: string) => {
    if (editorRef.current) {
      editorRef.current.setValue(newCode);
    }
  };

  return (
    <div className="relative">
      {onlyEdit ? (
        <iframe
          css={css`
            display: none;
            height: 0;
            width: 0;
            border: 0;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
          `}
          src={`/live/${codeSpace}/`}
        />
      ) : (
        <DraggableWindow
          isChatOpen={isOpen}
          onCodeUpdate={handleCodeUpdate}
          codeSpace={codeSpace}
          handleAIModify={handleAIModify}
          showChat={showChat}
          setShowChat={setShowChat}
        >
          <iframe
            css={css`
              height: 100%;
              width: 100%;
              border: 0;
              overflow: auto;
              -webkit-overflow-scrolling: touch;
            `}
            src={`/live/${codeSpace}/`}
          />
        </DraggableWindow>
      )}

      {!hideRest && (
        <RainbowWrapper>
          <Suspense fallback={<></>}>
            <Editor
              codeSpace={codeSpace}
              ref={editorRef}
              onCodeUpdate={handleCodeUpdate}
            />
          </Suspense>
          <Button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 z-50"
          >
            <Bot className="h-6 w-6" />
          </Button>

          <ChatInterface
            isOpen={isOpen}
            onCodeUpdate={handleCodeUpdate}
            onClose={() => setIsOpen(false)}
          />

          <Button
            onClick={() => setShowAutoSaveHistory(true)}
            className="fixed top-4 right-4 z-50"
            size="sm"
          >
            Version History
          </Button>

          {showAutoSaveHistory && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-background rounded-lg shadow-lg w-11/12 h-5/6 max-w-6xl">
                <AutoSaveHistory
                  codeSpace={codeSpace}
                  onRestore={handleCodeUpdate}
                  onClose={() => setShowAutoSaveHistory(false)}
                />
              </div>
            </div>
          )}
        </RainbowWrapper>
      )}
    </div>
  );
};