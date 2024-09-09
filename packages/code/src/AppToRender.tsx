import React, { FC, useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { css } from "@emotion/react";
import { Bot } from "@/external/lucideReact";

import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { CodeHistoryCarousel } from "./components/AutoSaveHistory";
import { Editor } from "./components/Editor";
import { RainbowWrapper } from "./components/Rainbow";
import { DraggableWindow } from "./DraggableWindow";

import { ICode } from '@/lib/interfaces';

const Header: FC = () => (
  <header css={css`
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
  `}>
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </header>
);

interface AppToRenderProps {
  codeSpace: string;
  cSess: ICode;
}

export const AppToRender: FC<AppToRenderProps> = ({ codeSpace, cSess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAutoSaveHistory, setShowAutoSaveHistory] = useState(false);

  useEffect(() => {
    if (codeSpace.includes('-')) {
      const maybeKey = codeSpace.split('-')[1];
      if (sessionStorage.getItem(maybeKey)) {
        setIsOpen(true);
      }
    }
  }, [codeSpace]);

  return (
    <>
      <Header />
      <div css={css`
        height: calc(100vh - 44px);
        width: 100vw;
        overflow: hidden;
      `} className="relative">
        <DraggableWindow isChatOpen={isOpen} codeSpace={codeSpace}>
          <iframe css={css`
            height: 100%;
            width: 100%;
            border: 0;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
          `} src={`/live/${codeSpace}/iframe`} />
        </DraggableWindow>

        <RainbowWrapper>
          <Editor codeSpace={codeSpace} cSess={cSess} />

          {showAutoSaveHistory && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-background rounded-lg shadow-lg w-11/12 h-5/6 max-w-6xl">
                <CodeHistoryCarousel
                  onClose={() => setShowAutoSaveHistory(false)}
                  onRestore={() => setShowAutoSaveHistory(false)}
                  codeSpace={codeSpace}
                  cSess={cSess}
                />
              </div>
            </div>
          )}

          {!isOpen && (
            <Button
              onClick={() => setIsOpen(true)}
              className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 z-[1001]"
            >
              <Bot className="h-6 w-6" />
            </Button>
          )}
        </RainbowWrapper>
      </div>
      
      <ChatInterface
        cSess={cSess}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};