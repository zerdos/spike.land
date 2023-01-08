import type { FC } from "react";
import { Fragment, useEffect, useState } from "react";
import * as portals from "react-reverse-portal";

// import { AutoUpdateApp } from "./starter";

import { css } from "@emotion/react";

// Import { useSpring, a } from '@react-spring/web'

import DraggableWindow from "./DraggableWindow";
import { Editor } from "./Editor";
import { createRoot } from "./reactDomClient";

const RainbowContainer: FC<{ children: JSX.Element }> = (
  { children },
) => (
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

const AppToRender: FC<
  { codeSpace: string }
> = (
  { codeSpace },
) => {
  // const portalNode = React.useMemo(() => portals.createHtmlPortalNode(), []);

  const portalNode = React.useMemo(() =>
    portals.createHtmlPortalNode({
      attributes: {
        style: "height: 100%",
      },
    }), []);
  const sp = new URLSearchParams(location.search);
  const onlyEdit = sp.has("edit");
  // const hideRes = sp.has("edit");

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (hideRest) setHideRest(false);
  //   }, 2000);
  // });

  //   || location.pathname.endsWith("hydrated");
  // const devTools = !onlyApp;

  return (
    <>
      <portals.InPortal node={portalNode}>
        <iframe
          // id={"z-body"}
          // data-test-id="z-body"
          css={css`
      height: 100%;
      width: 100%;
      border: none;
  `}
          src={`${location.origin}/live/${codeSpace}/iframe`}
        />
      </portals.InPortal>
      {onlyEdit ? null : (
        <DraggableWindow codeSpace={codeSpace}>
          <portals.OutPortal node={portalNode} />
        </DraggableWindow>
      )}
      <RainbowContainer>
        <Fragment>
          <Editor
            codeSpace={codeSpace}
          />
        </Fragment>
      </RainbowContainer>
    </>
  );
};
const singleton = { started: false };

export const renderPreviewWindow = (
  { codeSpace }: { codeSpace: string; dry: boolean },
) => {
  if (singleton.started) return;
  singleton.started = true;

  let rootEl: HTMLDivElement | null = document.querySelector(
    `#${codeSpace}-css`,
  );
  //
  // if (rootEl === null) return;
  // rootEl.style.height = "100%";
  // rootEl.innerHTML = ``;
  // const root = createRoot(rootEl);

  // (createCache as unknown as {default: typeof createCache}).default

  const root = createRoot(rootEl!);
  root.render(<AppToRender codeSpace={codeSpace} />);
  // setTimeout(() => {

  // }, 500);
};
