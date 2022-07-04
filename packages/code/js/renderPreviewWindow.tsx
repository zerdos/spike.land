/** @jsxImportSource @emotion/react */


import { Fragment, ReactNode, Suspense, useEffect, useState } from "react";
import { appRoot, appFactory } from "./starter";
import { codeSpace } from "./ws";
import { css } from "@emotion/react";
import { DraggableWindow } from "./DraggableWindow";
import type { FC } from "react";
import { hashCode, mST, onUpdate } from "session";


const ErrorComp = ()=>   <h1>error</h1>

const RainbowContainer: FC<{children: ReactNode}> = ({children})=><div     css={css`
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
`}>{children}</div>

const MyApp: FC<{Editor: FC<{code: string, i: number}>}> = ({Editor}) => {
  // const Dw = =useState<typeof DraggableWindow | null>(null);



const [hash, setHash] = useState(()=>hashCode() );

useEffect(()=>{
 onUpdate(()=>{
  const newHash = hashCode();
  if (hash !== newHash)
  setHash(newHash);
 });
}, [hash, setHash]);

const {App} = globalThis;
 const [ResultApp, setApp] = useState(<App />);

 useEffect(()=>{
  const {App} = globalThis;
      setApp(<App />);
 },[hash, setApp])



  return <RainbowContainer>

        <Editor code={mST().code} i={mST().i} />

        <Suspense fallback={<div dangerouslySetInnerHTML={{__html: mST().html}}></div>}>
          <DraggableWindow
            // onRestore={() => {
            //   const model = globalThis.model;
            //   model.setValue(mST().code);
            // }}
            hashCode={0}
            room={codeSpace}
          >
         {ResultApp}
          </DraggableWindow>
        </Suspense>

      </RainbowContainer>;
};

globalThis.draggableWindow = globalThis.draggableWindow || 0;
export const renderPreviewWindow = async (Editor: FC<{}>) => {
  if (globalThis.draggableWindow++) return;


    await appFactory(mST().transpiled);
  
    // document.getElementById("root");

    // const DraggableWindow = lazy(()=>import("./DraggableWindow").then(({DraggableWindow})=>({default: DraggableWindow})));

   
    appRoot.render(
      <MyApp Editor={Editor} />,
    );

  // document.body.appendChild(target);
  // document.getElementById("root")?.remove();
  // target.id = "root";
};
