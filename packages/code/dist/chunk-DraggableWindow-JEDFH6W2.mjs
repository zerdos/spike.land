import{a as j,c as q,d as E,e as J,f as L,g as W,h as $,i as B}from"./chunk-chunk-TAHDTHMF.mjs";import{a as y}from"./chunk-chunk-PIWFEPHX.mjs";import"./chunk-chunk-IFMJW7GH.mjs";import"./chunk-chunk-IPZ2T56S.mjs";import"./chunk-chunk-L5BROTM5.mjs";import"./chunk-chunk-OOBH5VBY.mjs";import"./chunk-chunk-RQUTZNLE.mjs";import{a as re}from"./chunk-chunk-73U57KXL.mjs";import{a as f}from"./chunk-chunk-WNZVI2YQ.mjs";import"./chunk-chunk-VTPNA5YQ.mjs";import"./chunk-chunk-EQNZC276.mjs";import"./chunk-chunk-ZKM7LPRE.mjs";import{g as S}from"./chunk-chunk-UDUMOIFY.mjs";import{b as s,c as N,d as O,e as A,f as D,g as G}from"./chunk-chunk-2HHZXJDJ.mjs";import"./chunk-chunk-BBFXSIIJ.mjs";import{a as M}from"./chunk-chunk-HJDRMN4F.mjs";import{a as p,f as a,g as v}from"./chunk-chunk-O6JVKB3A.mjs";v();var n=a(re(),1);var o=a(M(),1);v();var w=a(M(),1);var b=a(f(),1),se=(0,w.lazy)(()=>import("./chunk-Qr-JSO5ROY5.mjs")),Q=p(({url:m})=>(0,b.jsx)(w.Suspense,{fallback:(0,b.jsx)("div",{children:"qr"}),children:(0,b.jsx)(se,{url:m})}),"QRButton");var e=a(f(),1),l=[680,768,1920],u=[1137,1024,1080],le=[10,25,50,75,100],de=p(({room:m})=>{let[h,d]=(0,o.useState)(100),V={bottom:0,right:0},[{bottom:_,right:X},F]=(0,o.useState)(V),[r,c]=(0,o.useState)(window.innerWidth*devicePixelRatio),[I,g]=(0,o.useState)(window.innerHeight*devicePixelRatio+20),ce=(0,o.useRef)(null),T=h/100;(0,o.useEffect)(()=>{p(async()=>{F({bottom:window.innerHeight*.2,right:window.innerWidth*.2}),window.innerWidth/devicePixelRatio<600&&(d(50),c(l[0]),g(u[0])),window.innerWidth/devicePixelRatio<1200?(d(100),c(l[0]),g(u[0])):window.innerWidth/devicePixelRatio<1800?(c(l[1]),g(u[1]),d(50)):window.innerWidth/devicePixelRatio<2500?(c(l[1]),g(u[1]),d(75)):window.innerWidth/devicePixelRatio>2500&&(c(l[1]),g(u[1]),d(100)),F({bottom:20,right:20})},"reveal")()},[]);let K=window.getComputedStyle(document.body,null).getPropertyValue("background-color").slice(4,-1).split(",").slice(0,4).map(i=>Number(i)||0),[H,U]=(0,o.useState)(K),[Y,Z]=(0,o.useState)(S().css),[x,R,k,ee]=H,C=p((i,t,P,ne)=>`rgba(${i},${t},${P},${ne})`,"rgba");(0,o.useEffect)(()=>{let i=setInterval(()=>{Z(S().css);let t=window.getComputedStyle(document.body,null).getPropertyValue("background-color").slice(4,-1).split(",").slice(0,4).map(P=>Number(P)||0);JSON.stringify(H)!==JSON.stringify(t)&&U(t)},500);return()=>clearInterval(i)},[]);let[ge,z]=(0,o.useState)(Object.keys(y.rtcConns));(0,o.useEffect)(()=>{z([...Object.keys(y.rtcConns)])},[y.webRtcArray.length,z]);let ie=sessionStorage&&Number(sessionStorage.getItem("delay"))||0,te=sessionStorage&&Number(sessionStorage.getItem("duration"))||.8,oe=sessionStorage&&sessionStorage.getItem("type")||"spring";return(0,e.jsx)(O,{transition:{delay:ie,type:oe,duration:te},children:(0,e.jsx)(N,{children:(0,e.jsx)(A,{features:{...D,...G},children:(0,e.jsx)(s.div,{layout:!0,initial:{top:0,padding:0,right:0,borderRadius:0},animate:{top:_,padding:8,right:X,borderRadius:16},css:n.css`
            ${Y.split("body").join('[data-test-id="z-body"]')}
            touch-action: pinch-zoom;
            background-color: ${C(x|96,R|66,k||160,ee||.3)};
            backdrop-filter: blur(15px);
            z-index: 10;

            position: fixed;
          `,drag:!0,dragMomentum:!1,dragConstraints:{left:-innerWidth,right:r-20-r/6,bottom:innerHeight},dragElastic:.5,children:(0,e.jsxs)("div",{style:{display:"flex"},children:[(0,e.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,e.jsx)(s.div,{css:n.css`
              overflow: hidden;
              display:flex;
              justify-content: space-evenly;`,initial:{height:"0px",width:"0",opacity:0},animate:{height:"42px",width:"100%",opacity:1},children:(0,e.jsx)(B,{value:h,size:"small",exclusive:!0,onChange:(i,t)=>{t&&d(t)},children:le.map((i,t)=>(0,e.jsx)($,{value:i,children:(0,e.jsxs)("span",{css:n.css`
                       color: ${i===h?"var(--text-color-highlight)":"var(--text-color-normal)"};
                       `,children:[i,"%"]})},t))})}),(0,e.jsx)(s.div,{initial:{width:window.innerWidth,height:window.innerHeight,borderRadius:0},animate:{width:r*T/devicePixelRatio,height:I*T/devicePixelRatio,borderRadius:8},children:(0,e.jsx)(s.div,{initial:{width:window.innerWidth,height:window.innerHeight,backgroundColor:C(x,R,k,0),scale:1},animate:{backgroundColor:C(x,R,k,.7),transformOrigin:"0px 0px",width:r/devicePixelRatio,height:I/devicePixelRatio,scale:h/100},id:"z-body","data-test-id":"z-body",css:n.css`
                  position: relative  ;
                  overflow: auto;    
              `})}),(0,e.jsx)(s.div,{css:n.css`
              overflow: hidden;
              display:flex;
              justify-content: space-evenly;`,initial:{height:"0",width:"0",opacity:0},animate:{height:"42px",width:"100%",opacity:1},children:(0,e.jsx)(B,{value:r,size:"small",exclusive:!0,onChange:(i,t)=>{t&&(g(u[l.indexOf(t)]),c(t))},children:l.map((i,t)=>(0,e.jsx)($,{value:i,children:i===680?(0,e.jsx)("span",{css:n.css`
                        color: ${r===680?"var(--text-color-highlight)":"var(--text-color-normal)"};
                        `,children:(0,e.jsx)(q,{})}):i===768?(0,e.jsx)("span",{css:n.css`
                        color: ${r===768?"var(--text-color-highlight)":"var(--text-color-normal)"};
                        `,children:(0,e.jsx)(J,{})}):(0,e.jsx)("span",{css:n.css`
                        color: ${r===1920?"var(--text-color-highlight)":"var(--text-color-normal)"};
                      `,children:(0,e.jsx)(L,{})})},t))})})]}),(0,e.jsx)(s.div,{initial:{height:0,width:0,opacity:0},animate:{height:"100%",width:"88px",opacity:1},children:(0,e.jsxs)("div",{css:n.css`
              padding: 16px;
              display: flex;
              overflow: "hidden";
              align-items: center;          
              flex-direction: column;
              `,children:[(0,e.jsx)(W,{onClick:()=>{document.querySelector("#root")?.requestFullscreen()},children:(0,e.jsx)("span",{css:n.css`
                font-size: 20pt;
              `,children:(0,e.jsx)(j,{},"fs")})},"fullscreen"),(0,e.jsx)(Q,{url:location.origin+`/live/${m}/public`}),!1,(0,e.jsx)(W,{onClick:()=>open(`/live/${m}/public`),children:(0,e.jsx)(E,{})},"Share")]})})]})})})})})},"DraggableWindow"),Re=de;export{de as DraggableWindow,Re as default};
