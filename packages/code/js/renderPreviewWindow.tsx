import { Fragment, useMemo } from "react";
import { createRoot } from "react-dom/client";
import {
  createHtmlPortalNode,
  InPortal,
  OutPortal,
} from "react-reverse-portal";
import { ReactNode, useEffect, useState } from "react";
import { appFactory, AutoUpdateApp } from "./starter";
import { css } from "@emotion/react";
import { DraggableWindow } from "./DraggableWindow";
import type { FC } from "react";

// import { useSpring, a } from '@react-spring/web'

import { hashCode, mST, onSessionUpdate } from "./session";

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

const AppToRender: FC<{ codeSpace: string; children: FC }> = (
  { codeSpace, children },
) => {
  // const [flipped, set] = useState(false)
  // const { transform, opacity } = useSpring({
  //   opacity: flipped ? 1 : 0,
  //   transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
  //   config: { mass: 5, tension: 500, friction: 80 },
  // })

  const [hash, setHash] = useState(() => hashCode());
  const [isStandalone, setIsStandalone] = useState(true);

  useEffect(() => {
    onSessionUpdate(async () => {
      const newHash = hashCode();
      if (hash !== newHash) {
        try {
          await appFactory();
          setHash(newHash);
        } catch (e) {
          console.error({ e });
        }
      }
    }, "myApp");
  }, [hash, setHash]);

  useEffect(() => {
    setTimeout(() => {
      const isStandalone = location.pathname.endsWith("public") ||
        location.pathname.endsWith("hydrated");

      setIsStandalone(isStandalone);
    }, 800);
  }, []);

  const portalNode = useMemo(() =>
    createHtmlPortalNode({
      attributes: { id: `root-${codeSpace}`, style: "height: 100%" },
    }), []);

  return (
    <Fragment>
      <InPortal node={portalNode}>
        <AutoUpdateApp hash={hash} starter={children} />
      </InPortal>

      {isStandalone
        ? <OutPortal node={portalNode}></OutPortal>
        : (
          <RainbowContainer>
            {
              /* <div css={css`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
`} onClick={() => set(state => !state)} > */
            }
            <OutPortal node={portalNode}></OutPortal>
            {
              /* <a.div
        css={css`
        background-size: cover;
        position: absolute;
        max-width: 500px;
        max-height: 500px;
        width: 350px;
        height: 200px;
        cursor: pointer;
        will-change: transform, opacity;

        `}
        style={{ opacity: opacity.to((o: number)=> 1 - o), transform }}
      >



      </a.div> */
            }
            {
              /* <a.div
    css={css`
    background-size: cover;
    position: absolute;
    max-width: 500px;
    max-height: 500px;
    width: 350px;
    height: 200px;
    cursor: pointer;
    will-change: transform, opacity;

    `}
        style={{
          opacity,
          transform,
          rotateX: '180deg',
        }}
      >    */
            }
            <Editor code={mST().code} i={mST().i} codeSpace={codeSpace} />
            {/* </a.div> */}
            {/* </div> */}
            <DraggableWindow
              // onRestore={() => {
              //   const model = globalThis.model;
              //   model.setValue(mST().code);
              // }}
              hashCode={0}
              room={codeSpace}
            >
              <OutPortal node={portalNode}></OutPortal>
            </DraggableWindow>
          </RainbowContainer>
        )}
    </Fragment>
  );
};

export const renderPreviewWindow = (
  codeSpace: string,
  child: FC,
) => {
  const div = document.getElementById("root")!;
  // div.style.height='100%';
  const root = createRoot(div);
  root.render(
    <Fragment>
      <AppToRender codeSpace={codeSpace}>{child}</AppToRender>
    </Fragment>,
  );
};
