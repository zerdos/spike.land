import { ScrollArea } from "@/components/ui/scroll-area";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {ChatInterface} from "./ChatInterface";
import { CodeHistoryCarousel } from "./components/AutoSaveHistory";
import { Editor } from "./components/Editor";
import { RainbowWrapper } from "./components/Rainbow";
import type { ICode } from "@/lib/interfaces";

const ResizeHandle = () => (
  <PanelResizeHandle className="w-2 bg-white/20 hover:bg-white/40 transition-colors">
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-1 h-8 bg-white/40 rounded-full" />
    </div>
  </PanelResizeHandle>
);

export const AppToRenderNew: React.FC<{ codeSpace: string; cSess: ICode }> = ({ codeSpace, cSess }) => {
  const [hideRest, setHideRest] = useState(true);
  

  const reveal = async () => {
    // ... (keep the existing reveal logic)
    setHideRest(false);
  };

  return (
    <RainbowWrapper>
      <div className="h-screen w-screen overflow-hidden">
        {!hideRest && (
          <header className="h-10 flex justify-between items-center px-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
        )}
        <PanelGroup direction="horizontal" className="h-[calc(100dvh-40px)]">
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={70} minSize={30}>
                <Editor codeSpace={codeSpace} cSess={cSess} />
              </Panel>
              <ResizeHandle />
              <Panel defaultSize={30} minSize={20}>
                <ScrollArea className="h-full">
                  <CodeHistoryCarousel
                    onClose={() => {}}
                    onRestore={() => {}}
                    codeSpace={codeSpace}
                    cSess={cSess}
                  />
                </ScrollArea>
              </Panel>
            </PanelGroup>
          </Panel>
          <ResizeHandle />
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={70} minSize={30}>
                <div className="h-full w-full">
                  <iframe
                    onLoad={reveal}
                    className="h-full w-full border-0"
                    src={`/live/${codeSpace}/iframe`}
                    title="Live Preview"
                  />
                </div>
              </Panel>
              <ResizeHandle />
              <Panel defaultSize={30} minSize={20}>
                <ChatInterface
                  isOpen={true}
                  onClose={() => {}}
                  cSess={cSess}
                />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </RainbowWrapper>
  );
};
