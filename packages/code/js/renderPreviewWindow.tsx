import type { FC } from "react";
import {
  Fragment,
  lazy,
  StrictMode,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";

import { createRoot } from "react-dom/client";
import {
  createHtmlPortalNode,
  InPortal,
  OutPortal,
} from "react-reverse-portal";
import { appFactory, AutoUpdateApp } from "./starter";

import { css } from "@emotion/react";
// Import { useSpring, a } from '@react-spring/web'

import { hashCode, onSessionUpdate } from "./session";

import { Editor } from "./Editor";
import { wait } from "wait.mjs";

const DraggableWindowLazy = lazy(() =>
  wait(1000).then(() => import("./DraggableWindow"))
);

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
  // Const [flipped, set] = useState(false)
  // const { transform, opacity } = useSpring({
  //   opacity: flipped ? 1 : 0,
  //   transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
  //   config: { mass: 5, tension: 500, friction: 80 },
  // })

  const currentHash = hashCode();

  const [hash, setHash] = useState(currentHash);

  const onlyApp = location.pathname.endsWith("public") ||
    location.pathname.endsWith("hydrated");

  useEffect(() => {
    onSessionUpdate(async () => {
      const newHash = hashCode();
      if (hash !== newHash) {
        try {
          await appFactory();
          setHash(newHash);
        } catch (error) {
          console.error({ e: error });
        }
      }
    }, "myApp");
  }, [hash, setHash]);

  const portalNode = useMemo(() =>
    createHtmlPortalNode({
      attributes: { id: `root-${codeSpace}`, style: "height: 100%" },
    }), []);

  return (
    <div style={{ height: 100 + "%" }}>
      <InPortal node={portalNode}>
        <AutoUpdateApp hash={hash} codeSpace={codeSpace} />
      </InPortal>

      <Suspense fallback={() => <OutPortal node={portalNode} />}>
        {onlyApp
          ? (
            <RainbowContainer>
              <Fragment>
                <Editor
                  codeSpace={codeSpace}
                />
                <DraggableWindowLazy room={codeSpace}>
                  <OutPortal node={portalNode} />
                </DraggableWindowLazy>
              </Fragment>
            </RainbowContainer>
          )
          : null}
      </Suspense>
    </div>
  );
};
const singleton = { started: false };

export const renderPreviewWindow = ({ codeSpace }: { codeSpace: string }) => {
  if (singleton.started) return;
  singleton.started = true;

  const div = document.querySelector("#root")!;
  // Div.style.height='100%';
  const root = createRoot(div);

  // (createCache as unknown as {default: typeof createCache}).default

  root.render(
    <StrictMode>
      <AppToRender codeSpace={codeSpace} />
    </StrictMode>,
  );
};
