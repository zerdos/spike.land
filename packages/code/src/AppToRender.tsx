import type { FC} from 'react';
import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Bot, History } from "@/external/lucideReact";

import { Button } from "@/components/ui/button";
import { ChatInterface } from "./ChatInterface";
import { CodeHistoryCarousel } from "./components/AutoSaveHistory";
import { Editor } from "./components/Editor";
import { RainbowWrapper } from "./components/Rainbow";
import { DraggableWindow } from "./DraggableWindow";
import { useAuth } from "@clerk/clerk-react";

import type { ICode } from '@/lib/interfaces';
import { cn } from "@/lib/utils";

const Header: FC = () => (
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

interface AppToRenderProps {
  codeSpace: string;
  cSess: ICode;
}

 export const Hello = () => {
   const { isSignedIn, sessionId, userId} = useAuth();

   console.log(isSignedIn, sessionId, userId)

   if (!isSignedIn) {
      return <div>Not signed in</div>
    }


   return <h2>{userId}</h2> 
 }

export const AppToRender: FC<AppToRenderProps> = ({ codeSpace, cSess }) => {
  const maybeKey = codeSpace.split('-')[1];

  const [isOpen, setIsOpen] = useState(maybeKey && sessionStorage && sessionStorage.getItem(maybeKey) ? true : false);
  const [showAutoSaveHistory, setShowAutoSaveHistory] = useState(false);


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

          <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[1001]">
            <Button
              onClick={() => setShowAutoSaveHistory(true)}
              className={cn(
                "rounded-full w-12 h-12 p-0",
                "hover:bg-primary transition-colors"
              )}
              title="Show Version History"
            >
              <History className="h-6 w-6" />
            </Button>
            {!isOpen && (
              <Button
                onClick={() => setIsOpen(true)}
                className={cn(
                  "rounded-full w-12 h-12 p-0",
                  "hover:bg-primary transition-colors"
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
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};