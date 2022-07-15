/** @jsxImportSource @emotion/react */

import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import { appFactory, AutoUpdateApp } from "./starter";
import { css } from "@emotion/react";
import { DraggableWindow } from "./DraggableWindow";
import type { FC } from "react";
import { hydrateRoot } from "react-dom/client";

import { hashCode, mST, onSessionUpdate } from "session";
import * as portals from "react-reverse-portal";
import { Editor } from "./Editor";

const RainbowContainer: FC<{ children: ReactNode }> = ({ children }) => (
  <div
    css={css`
height: 100%;
width: 100%;
background-blend-mode: overlay;
background:  repeating-radial-gradient(circle at bottom left, 
              #fedc00 0, #fedc00 5.5555555556%, 
              #fcb712 0, #fcb712 11.1111111111%, 
              #f7921e 0, #f7921e 16.6666666667%, 
            #e87f24 0, #e87f24 22.2222222222%, 
            #dd6227 0, #dd6227 27.7777777778%,
             #dc4c27 0, #dc4c27 33.3333333333%, 
            #ca3435 0, #ca3435 38.8888888889%, 
            #b82841 0, #b82841 44.4444444444%, 
            #953751 0, #953751 50%, #364c88 0, 
            #364c88 55.5555555556%, #16599d 0, 
            #16599d 61.1111111111%, #02609e 0, 
            #02609e 66.6666666667%, #0073a9 0, 
            #0073a9 72.2222222222%, #008aa4 0, 
            #008aa4 77.7777777778%, #239a87 0, 
            #239a87 83.3333333333%, #7cba6d 0, 
            #7cba6d 88.8888888889%, #becc2f 0, 
            #becc2f 94.4444444444%, #e0d81d 0, 
            #e0d81d 100%), 
            repeating-radial-gradient(circle at bottom right, 
              #fedc00 0, #fedc00 5.5555555556%, 
              #fcb712 0, #fcb712 11.1111111111%, 
              #f7921e 0, #f7921e 16.6666666667%, 
              #e87f24 0, #e87f24 22.2222222222%, 
              #dd6227 0, #dd6227 27.7777777778%, 
              #dc4c27 0, #dc4c27 33.3333333333%, 
              #ca3435 0, #ca3435 38.8888888889%, 
              #b82841 0, #b82841 44.4444444444%, 
              #953751 0, #953751 50%,
               #364c88 0, #364c88 55.5555555556%, 
               #16599d 0, #16599d 61.1111111111%, 
               #02609e 0, #02609e 66.6666666667%, 
               #0073a9 0, #0073a9 72.2222222222%, 
               #008aa4 0, #008aa4 77.7777777778%,
                #239a87 0, #239a87 83.3333333333%, 
                #7cba6d 0, #7cba6d 88.8888888889%, 
                #becc2f 0, #becc2f 94.4444444444%, 
                #e0d81d 0, #e0d81d 100%);
`}
  >
    {children}
  </div>
);

const AppToRender: FC<{ codeSpace: string }> = ({ codeSpace }) => {
  const [hash, setHash] = useState(() => hashCode());
  const [isStandalone, setIsStandalone] = useState(true);

  useEffect(() => {
    onSessionUpdate(async () => {
      const newHash = hashCode();
      if (hash !== newHash) {
        try {
          await appFactory(mST().transpiled);
          setHash(newHash);
        } catch (e) {
          console.error({ e });
        }
      }
    }, "myApp");
  }, [hash, setHash]);

  useEffect(()=>{

    setTimeout(() => {
      const isStandalone = location.pathname.endsWith("public") ||
      location.pathname.endsWith("hydrated");

      setIsStandalone(isStandalone);
    }, 500);
  },[])

  const portalNode = useMemo(() =>
    portals.createHtmlPortalNode({
      attributes: { id: `root-${codeSpace}`, style: "height: 100%" },
    }), []);



  return (
    <Fragment>
      <portals.InPortal node={portalNode}>
        <AutoUpdateApp key={hash} hash={hash} />
      </portals.InPortal>

      {isStandalone
        ? (
          <portals.OutPortal
            node={portalNode}
            // These props go back to the content of the InPortal, and trigger a
            // component render (but on the same component instance) as if they
            // had been passed to MyExpensiveComponent directly.
          />
        )
        : (
          <RainbowContainer>
            <DraggableWindow
              // onRestore={() => {
              //   const model = globalThis.model;
              //   model.setValue(mST().code);
              // }}
              hashCode={0}
              room={codeSpace}
            >
              <portals.OutPortal
                node={portalNode}
                // These props go back to the content of the InPortal, and trigger a
                // component render (but on the same component instance) as if they
                // had been passed to MyExpensiveComponent directly.
              />
            </DraggableWindow>
            <Editor code={mST().code} i={mST().i} codeSpace={codeSpace} />
          </RainbowContainer>
        )}
    </Fragment>
  );
};

export const renderPreviewWindow = async (
  codeSpace: string,
) => {
  try {
    await appFactory(mST().transpiled);
  } catch (e) {
    console.error({ e });
  }

  return hydrateRoot(
    document.getElementById("root"),
    <AppToRender codeSpace={codeSpace} />,
  );
};
