import React, { FC, useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Bot } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { CodeHistoryCarousel } from "./components/AutoSaveHistory";
import { Editor } from "./components/Editor";
import { RainbowWrapper } from "./components/Rainbow";
import { DraggableWindow } from "./DraggableWindow";

import { ICode } from '@/lib/interfaces';
import { cn } from "@/lib/utils";

const Header: FC = () => (
  <header className="h-11 flex items-center justify-between px-3">
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
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 relative overflow-hidden">
        <DraggableWindow isChatOpen={isOpen} codeSpace={codeSpace}>
          <iframe 
            className="w-full h-full border-0 overflow-auto"
            src={`/live/${codeSpace}/iframe`} 
          />
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
              className={cn(
                "fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 z-[1001]",
                "hover:bg-primary/90 transition-colors"
              )}
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
    </div>
  );
};