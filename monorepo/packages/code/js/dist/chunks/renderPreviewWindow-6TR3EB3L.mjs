import {
  wait
} from "./chunk-PL2TSUJW.mjs";
import {
  LazySpikeLandComponent
} from "./chunk-SZGP6JU2.mjs";
import "./chunk-XHYF4LCB.mjs";

// js/renderPreviewWindow.tsx
import { jsx as jsx4 } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/emotion-react.mjs";

// js/DraggableWindow.tsx
import { css as css2, jsx as jsx3 } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/emotion-react.mjs";
import React2, {
  useEffect,
  useRef,
  useState
} from "https://unpkg.com/@spike.land/esm@0.6.71/dist/react.mjs";
import { motion as motion2 } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/framer-motion.mjs";

// js/Qr.tsx
import { css, jsx as jsx2 } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/emotion-react.mjs";
import { motion } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/framer-motion.mjs";
import React from "https://unpkg.com/@spike.land/esm@0.6.71/dist/react.mjs";
import { QRious } from "https://ga.jspm.io/npm:@spike.land/qrious@0.6.59/dist/QRious.mjs";

// js/mui.tsx
import { jsx } from "https://unpkg.com/@spike.land/esm@0.6.71/dist/emotion-react.mjs";
import Fab from "https://ga.jspm.io/npm:@mui/material@5.3.0/Fab/index.js";
import Button from "https://ga.jspm.io/npm:@mui/material@5.3.0/Button/index.js";
import createSvgIcon from "https://ga.jspm.io/npm:@mui/material@5.3.0/utils/createSvgIcon.js";
import { default as default2 } from "https://ga.jspm.io/npm:@mui/material@5.3.0/ToggleButton/index.js";
import { default as default3 } from "https://ga.jspm.io/npm:@mui/material@5.3.0/ToggleButtonGroup/index.js";
var FullscreenIcon = createSvgIcon(/* @__PURE__ */ jsx("path", {
  d: "M17 4h5v5h-2V6h-3V4zM4 9V6h3V4H2v5h2zm16 6v3h-3v2h5v-5h-2zM7 18H4v-3H2v5h5v-2zM18 8H6v8h12V8z"
}), "Fullscreen");
var Phone = createSvgIcon(/* @__PURE__ */ jsx("path", {
  key: "12",
  d: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"
}), "PhoneAndroid");
var MyButton = ({ onClick, children }) => /* @__PURE__ */ jsx(Button, {
  variant: "contained",
  color: "primary",
  onClick
}, children);
var Share = createSvgIcon(/* @__PURE__ */ jsx("path", {
  key: "12",
  d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
}), "Share");
var Tablet = createSvgIcon(/* @__PURE__ */ jsx("path", {
  key: "12",
  d: "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"
}), "TabletAndroid");
var Tv = createSvgIcon(/* @__PURE__ */ jsx("path", {
  key: "12",
  d: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
}), "Tv");
var MyFsb = ({ onClick, children }) => /* @__PURE__ */ jsx(Fab, {
  variant: "extended",
  color: "primary",
  onClick
}, children);
var QrCode = createSvgIcon(/* @__PURE__ */ jsx("path", {
  key: "12",
  d: "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"
}), "QrCode");

// js/Qr.tsx
var QR = ({ url }) => {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const load = () => {
      const options = {
        size: 200,
        element: canvasRef.current,
        foregroundAlpha: 0.9,
        foreground: "white",
        backgroundAlpha: 1,
        padding: 16,
        background: "#1e1e1e",
        value: url
      };
      const qr = new QRious(options);
    };
    load();
  }, [url]);
  return /* @__PURE__ */ jsx2("canvas", {
    css: css`
        border-radius: 16px;
        margin-bottom: 8px;
  `,
    ref: canvasRef
  });
};
var QRButton = ({ url }) => {
  const [showQR, setQR] = React.useState(false);
  return /* @__PURE__ */ jsx2(motion.div, {
    animate: {
      width: showQR ? 200 : 56,
      height: showQR ? 220 : 48
    },
    onClick: (e) => {
      setQR(!showQR);
    },
    css: css`
                margin-bottom: 12px;
              `
  }, showQR ? /* @__PURE__ */ jsx2(QR, {
    key: url,
    url: url + "/edit/"
  }) : /* @__PURE__ */ jsx2(MyFsb, {
    variant: "extended",
    color: "secondary",
    onClick: () => {
      setQR(!showQR);
    }
  }, /* @__PURE__ */ jsx2(QrCode, null)));
};

// js/DraggableWindow.tsx
var breakPoints = [680, 768, 1920];
var breakPointHeights = [1137, 1024, 1080];
var sizes = [10, 25, 50, 75, 100, 150];
var bg = `rgba(${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${Math.random() * 128 + 64}, ${!navigator.userAgent.includes("Firefox") ? 0.3 : 0.7})`;
var DraggableWindow = ({ onShare, onRestore, position, session, keepFullScreen, room }) => {
  const [isStable, setIsStable] = useState(false);
  const [scaleRange, changeScaleRange] = useState(100);
  const [childArray, setChild] = useState([
    /* @__PURE__ */ jsx3(LazySpikeLandComponent, {
      name: room,
      transpiled: session.transpiled,
      htmlContent: `<div id="root"><style>${session.css}</style><div id="zbody">${session.html}</div></div>`,
      html: session.html
    })
  ]);
  const startPositions = { bottom: -40, right: -90 };
  session.setChild = setChild;
  const [qrUrl, setQRUrl] = useState(session.url);
  const [errorText, setErrorText] = useState("");
  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidth] = useState(window.innerWidth * devicePixelRatio);
  const [height, setHeight] = useState(window.innerHeight * devicePixelRatio);
  const ref = useRef(null);
  const zbody = useRef(null);
  const child = childArray[childArray.length - 1];
  useEffect(() => {
    const handler = setInterval(async () => {
      if (errorText !== session.errorText) {
        const newError = session.errorText;
        setErrorText(newError);
        setIsStable(false);
        await wait(1500);
        if (session.errorText === newError) {
          setIsStable(true);
        }
      }
      if (qrUrl !== session.url) {
        setQRUrl(session.url);
      }
    }, 200);
    return () => {
      clearInterval(handler);
    };
  }, [setErrorText, setQRUrl, errorText, qrUrl]);
  const scale = scaleRange / 100;
  const [isFullScreen, setFullScreen] = useState(true);
  useEffect(() => {
    const reveal = async () => {
      const { bottom: bottom2, right: right2 } = startPositions;
      if (keepFullScreen) {
        return;
      }
      await wait(1200);
      await wait(300);
      setFullScreen(false);
      changeScaleRange(50);
      setPositions({
        bottom: window.innerHeight * 0.2,
        right: window.innerWidth * 0.2
      });
      if (window.innerWidth / devicePixelRatio < 600) {
        changeScaleRange(50);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      }
      if (window.innerWidth / devicePixelRatio < 1200) {
        changeScaleRange(75);
        setWidth(breakPoints[0]);
        setHeight(breakPointHeights[0]);
      } else if (window.innerWidth / devicePixelRatio < 1800) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(50);
      } else if (window.innerWidth / devicePixelRatio < 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(75);
      } else if (window.innerWidth / devicePixelRatio > 2500) {
        setWidth(breakPoints[1]);
        setHeight(breakPointHeights[1]);
        changeScaleRange(100);
      }
      await wait(200);
      setPositions({
        bottom: 20,
        right: 20
      });
    };
    reveal();
  }, []);
  return /* @__PURE__ */ jsx3(React2.StrictMode, null, /* @__PURE__ */ jsx3(motion2.div, {
    ref,
    initial: { bottom: startPositions.bottom, right: startPositions.right },
    animate: {
      bottom,
      right
    },
    css: css2`
            background-color:${bg};
            backdrop-filter: blur(15px);
            padding: 0px 0px 0px 16px;
            border-radius: 16px;
            white-space: normal;
            position: ${position ? position : "fixed"};
          `,
    dragElastic: 0.5,
    dragConstraints: {
      left: 0,
      right: width - 20 - width / 6,
      bottom: innerHeight - 100
    },
    dragMomentum: false,
    drag: !isFullScreen
  }, /* @__PURE__ */ jsx3("div", {
    css: css2` 
              display: flex;
              
                `
  }, /* @__PURE__ */ jsx3("div", {
    css: css2`
            display: flex;
            flex-direction: column;
            align-items: center;
          `
  }, /* @__PURE__ */ jsx3(default3, {
    value: scaleRange,
    size: "small",
    exclusive: true,
    onChange: (_e, newScale) => {
      newScale && changeScaleRange(newScale);
    }
  }, sizes.map((size) => /* @__PURE__ */ jsx3(default2, {
    key: size,
    value: size
  }, /* @__PURE__ */ jsx3("span", {
    css: css2`
                       color: ${size === scaleRange ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       `
  }, size, "%")))), /* @__PURE__ */ jsx3(motion2.div, {
    animate: {
      width: width * scale / devicePixelRatio,
      height: height * scale / devicePixelRatio,
      maxHeight: height * scale / devicePixelRatio,
      borderRadius: isFullScreen ? 0 : 8
    },
    css: css2`
                width: ${width * scale / devicePixelRatio};
                height: ${height * scale / devicePixelRatio};
                display: block;
                overflow: hidden;


                /* background-color: red; */
            `
  }, errorText && errorText.trim() !== "" && /* @__PURE__ */ jsx3("pre", {
    css: css2`
                    position: absolute;
                    z-index:3;
                    color: rgb(255, 240, 240);
                    padding: 24px;
                    font-size: 14pt;
                    background-color: rgb(255, 0, 0);
                    flex: 0 0 auto;
                    overflow: auto;
                    margin: 0;
                    font-family: monospace;
                    white-space: pre-wrap;
                `
  }, isStable && errorText && errorText.trim(), isStable && errorText && errorText.trim() !== "" && /* @__PURE__ */ jsx3("div", {
    css: css2`
                          text-align: right;
                        `
  }, /* @__PURE__ */ jsx3(MyButton, {
    onClick: () => {
      onRestore();
      setErrorText("");
    }
  }, "Restore"))), /* @__PURE__ */ jsx3(motion2.div, {
    initial: {
      transformOrigin: "0px 0px",
      width: window.innerWidth / devicePixelRatio,
      height: window.innerHeight / devicePixelRatio,
      scale: scaleRange / 100
    },
    animate: {
      transformOrigin: "0px 0px",
      width: width / devicePixelRatio,
      height: height / devicePixelRatio,
      scale: scaleRange / 100
    },
    css: css2`
                  overflow:overlay;
                  overflow-y: hidden;
                  >div{
                    width:100%;
                    height:100%;
                    overflow: overlay;
                    background: white;
                  }
              `
  }, errorText ? /* @__PURE__ */ jsx3("div", {
    id: "zbody",
    css: `${session.css}`,
    dangerouslySetInnerHTML: createMarkup(session.html)
  }) : /* @__PURE__ */ jsx3("div", {
    id: "zbody",
    key: session.i,
    ref: zbody,
    css: css2`q
                        height: 100%;
                      `
  }, child), " ")), /* @__PURE__ */ jsx3(default3, {
    value: width,
    size: "small",
    exclusive: true,
    onChange: (_e, newSize) => {
      if (newSize) {
        setHeight(breakPointHeights[breakPoints.indexOf(newSize)]);
        setWidth(newSize);
      }
    }
  }, breakPoints.map((size) => /* @__PURE__ */ jsx3(default2, {
    key: size,
    value: size
  }, size === 680 ? /* @__PURE__ */ jsx3(Phone, {
    css: css2`
                        color: ${width === 680 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : size === 768 ? /* @__PURE__ */ jsx3(Tablet, {
    css: css2`
                        color: ${width === 768 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : /* @__PURE__ */ jsx3(Tv, {
    css: css2`
                        color: ${width === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      `
  }))))), /* @__PURE__ */ jsx3("div", {
    css: css2`
              display: flex;
              align-items: center;          
              flex-direction: column;
              padding: 16px;
              `
  }, /* @__PURE__ */ jsx3(MyFsb, {
    onClick: () => {
      setFullScreen(true);
    }
  }, /* @__PURE__ */ jsx3(FullscreenIcon, null)), /* @__PURE__ */ jsx3(QRButton, {
    url: qrUrl
  }), /* @__PURE__ */ jsx3(MyFsb, {
    onClick: () => {
      onShare();
    }
  }, /* @__PURE__ */ jsx3(Share, null))))));
};
function createMarkup(__html) {
  return { __html };
}

// js/renderPreviewWindow.tsx
var renderPreviewWindow = async (session, room, keepFullScreen) => {
  const target = document.createElement("div");
  const editor = document.querySelector("#monacoEditor");
  editor.style.opacity = "0";
  const { createRoot } = await import("https://unpkg.com/@spike.land/esm@0.6.71/dist/react-dom.mjs");
  const root = createRoot(target, {});
  root.render(/* @__PURE__ */ jsx4(DraggableWindow, {
    onShare: () => open(`https://spike.land/api/room/${room}/public`),
    onRestore: () => {
      const model = session.editor.getModel();
      model.setValue(session.code);
    },
    position: session.mode === "window" ? "fixed" : "absolute",
    session,
    keepFullScreen,
    room
  }));
  const diffy = window.diffy = Date.now() - window.aniStart;
  console.log({ diffy });
  target.style.opacity = "0";
  document.body.append(target);
  console.log("wait....: " + String(2e3 - diffy));
  await wait(2e3 - diffy);
  target.style.display = "block";
  target.style.opacity = "1";
  document.querySelector("#root").remove();
  document.body.style.backgroundImage = 'url("https://unpkg.com/@spike.land/code@0.6.11/js/assets/synthwave.webp")';
  editor.style.opacity = "1";
  editor.style.display = "block";
};
export {
  renderPreviewWindow
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVuZGVyUHJldmlld1dpbmRvdy50c3giLCAiLi4vLi4vRHJhZ2dhYmxlV2luZG93LnRzeCIsICIuLi8uLi9Rci50c3giLCAiLi4vLi4vbXVpLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqIEBqc3gganN4ICovXG5pbXBvcnQgeyBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7fSBmcm9tIFwicmVhY3QtZG9tL25leHRcIjtcbi8vIEB0cy1leHBlY3QtZXJyb3JcbmltcG9ydCB7IERyYWdnYWJsZVdpbmRvdyB9IGZyb20gXCIuL0RyYWdnYWJsZVdpbmRvdy50c3hcIjtcbi8vIEB0cy1leHBlY3QtZXJyb3JcbmltcG9ydCB7IHdhaXQgfSBmcm9tIFwiLi93YWl0LnRzXCI7XG4vLyBAdHMtZXhwZWN0LWVycm9yXG5pbXBvcnQgdHlwZSB7IElDb2RlU2Vzc2lvbiB9IGZyb20gXCIuL3Nlc3Npb24udHN4XCI7XG4vLyBJbXBvcnQgeyBnZXRIdG1sQW5kQ3NzXG4vLyAgfSBmcm9tIFwiLi9yZW5kZXJUb1N0cmluZ1wiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyUHJldmlld1dpbmRvdyA9IGFzeW5jIChcbiAgc2Vzc2lvbjogSUNvZGVTZXNzaW9uLFxuICByb29tOiBzdHJpbmcsXG4gIGtlZXBGdWxsU2NyZWVuOiBib29sZWFuLFxuKSA9PiB7XG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IGVkaXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9uYWNvRWRpdG9yXCIpITtcbiAgLy8gVGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgZWRpdG9yLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcblxuICAvLyBDb25zdCBFbGVtZW50ID0gKCkgPT4gKFxuICAvLyAgIDxEcmFnZ2FibGVXaW5kb3dcbiAgLy8gICAgIG9uU2hhcmU9eygpID0+IG9wZW4oYGh0dHBzOi8vc3Bpa2UubGFuZC9hcGkvcm9vbS8ke3Jvb219L3B1YmxpY2ApfVxuICAvLyAgICAgb25SZXN0b3JlPXsoKSA9PiB7fX1cbiAgLy8gICAgIHBvc2l0aW9uPXtzZXNzaW9uLm1vZGUgPT09IFwid2luZG93XCIgPyBcImZpeGVkXCIgOiBcImFic29sdXRlXCJ9XG4gIC8vICAgICBzZXNzaW9uPXtzZXNzaW9ufVxuICAvLyAgIC8+XG4gIC8vICk7XG5cbiAgLy8gY29uc3Qge2h0bWx9ID0gZ2V0SHRtbEFuZENzcyggPEVsZW1lbnQ+PC9FbGVtZW50PiBhcyBhbnkgKTtcblxuICAvLyB0YXJnZXQgIC5pbm5lckhUTUwgPSBodG1sO1xuXG4gIGNvbnN0IHsgY3JlYXRlUm9vdCB9ID0gYXdhaXQgaW1wb3J0KFwicmVhY3QtZG9tXCIpO1xuXG4gIC8vIFRhcmdldCAgLmlubmVySFRNTCA9IGh0bWw7XG5cbiAgY29uc3Qgcm9vdCA9IGNyZWF0ZVJvb3QodGFyZ2V0LCB7fSk7XG4gIC8vIFJvb3QucmVuZGVyKDxFbGVtZW50PjwvRWxlbWVudD4gYXMgYW55KTtcblxuICByb290LnJlbmRlcihcbiAgICA8RHJhZ2dhYmxlV2luZG93XG4gICAgICBvblNoYXJlPXsoKSA9PiBvcGVuKGBodHRwczovL3NwaWtlLmxhbmQvYXBpL3Jvb20vJHtyb29tfS9wdWJsaWNgKX1cbiAgICAgIG9uUmVzdG9yZT17KCkgPT4ge1xuICAgICAgICBjb25zdCBtb2RlbCA9IHNlc3Npb24uZWRpdG9yLmdldE1vZGVsKCk7XG4gICAgICAgIG1vZGVsLnNldFZhbHVlKHNlc3Npb24uY29kZSk7XG4gICAgICB9fVxuICAgICAgcG9zaXRpb249e3Nlc3Npb24ubW9kZSA9PT0gXCJ3aW5kb3dcIiA/IFwiZml4ZWRcIiA6IFwiYWJzb2x1dGVcIn1cbiAgICAgIHNlc3Npb249e3Nlc3Npb259XG4gICAgICBrZWVwRnVsbFNjcmVlbj17a2VlcEZ1bGxTY3JlZW59XG4gICAgICByb29tPXtyb29tfVxuICAgIC8+LFxuICApO1xuXG4gIGNvbnN0IGRpZmZ5ID0gd2luZG93LmRpZmZ5ID0gRGF0ZS5ub3coKSAtIHdpbmRvdy5hbmlTdGFydDtcblxuICBjb25zb2xlLmxvZyh7IGRpZmZ5IH0pO1xuXG4gIHRhcmdldC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XG4gIC8vIGF3YWl0IHdhaXQoMjAwMCk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRhcmdldCk7XG5cbiAgY29uc29sZS5sb2coXCJ3YWl0Li4uLjogXCIgKyBTdHJpbmcoMjAwMCAtIGRpZmZ5KSk7XG5cbiAgYXdhaXQgd2FpdCgyMDAwIC0gZGlmZnkpO1xuXG4gIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICB0YXJnZXQuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Jvb3RcIikhLnJlbW92ZSgpO1xuICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9XG4gICAgJ3VybChcImh0dHBzOi8vdW5wa2cuY29tL0BzcGlrZS5sYW5kL2NvZGVAMC42LjExL2pzL2Fzc2V0cy9zeW50aHdhdmUud2VicFwiKSc7XG5cbiAgZWRpdG9yLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgZWRpdG9yLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59O1xuIiwgIi8qKiBAanN4IGpzeCAqL1xuXG5pbXBvcnQgeyBjc3MsIGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IFJlYWN0LCB7XG4gIEZyYWdtZW50LFxuICBsYXp5LFxuICBTdXNwZW5zZSxcbiAgdXNlRWZmZWN0LFxuICB1c2VSZWYsXG4gIHVzZVN0YXRlLFxufSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgRkMgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IG1vdGlvbiB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XG5pbXBvcnQgeyBRUkJ1dHRvbiB9IGZyb20gXCIuL1FyLnRzeFwiO1xuaW1wb3J0IHsgd2FpdCB9IGZyb20gXCIuL3dhaXQudHNcIjtcbi8vIEB0cy1leHBlY3QtZXJyb3JcbmltcG9ydCB7IExhenlTcGlrZUxhbmRDb21wb25lbnQgfSBmcm9tIFwiLi9MYXp5TG9hZGVkQ29tcG9uZW50LnRzeFwiO1xuXG4vLyBAdHMtZXhwZWN0LWVycm9yXG5pbXBvcnQge1xuICBCdXR0b24sXG4gIEZhYixcbiAgRnVsbHNjcmVlbkljb24sXG4gIFBob25lLFxuICBTaGFyZSxcbiAgVGFibGV0LFxuICBUb2dnbGVCdXR0b24sXG4gIFRvZ2dsZUJ1dHRvbkdyb3VwLFxuICBUdixcbn0gZnJvbSBcIi4vbXVpLnRzeFwiO1xuXG4vLyBJbXBvcnQgeyBicmVha3BvaW50cyB9IGZyb20gXCJAbXVpL3N5c3RlbVwiO1xuXG4vLyBjb25zdCB7bW90aW9ufSA9IE1vdGlvbjtcblxuY29uc3QgYnJlYWtQb2ludHMgPSBbNjgwLCA3NjgsIDE5MjBdO1xuY29uc3QgYnJlYWtQb2ludEhlaWdodHMgPSBbMTEzNywgMTAyNCwgMTA4MF07XG5cbmNvbnN0IHNpemVzID0gWzEwLCAyNSwgNTAsIDc1LCAxMDAsIDE1MF07XG5cbmNvbnN0IGJnID0gYHJnYmEoJHtNYXRoLnJhbmRvbSgpICogMTI4ICsgNjR9LCAke01hdGgucmFuZG9tKCkgKiAxMjggKyA2NH0sICR7XG4gIE1hdGgucmFuZG9tKCkgKiAxMjggKyA2NFxufSwgJHshbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcyhcIkZpcmVmb3hcIikgPyAwLjMgOiAwLjd9KWA7XG5cbmludGVyZmFjZSBEcmFnZ2FibGVXaW5kb3dQcm9wcyB7XG4gIG9uU2hhcmU6ICgpID0+IHZvaWQ7XG4gIG9uUmVzdG9yZTogKCgpID0+IHZvaWQpO1xuICBzZXNzaW9uOiB7XG4gICAgaTogbnVtYmVyO1xuICAgIHVybDogc3RyaW5nO1xuICAgIGh0bWw6IHN0cmluZztcbiAgICB0cmFuc3BpbGVkOiBzdHJpbmc7XG4gICAgZXJyb3JUZXh0OiBzdHJpbmc7XG4gICAgY2hpbGRyZW46IGFueTtcbiAgICBjc3M6IHN0cmluZztcbiAgICBzZXRDaGlsZDogYW55O1xuICB9O1xuICBrZWVwRnVsbFNjcmVlbjogYm9vbGVhbjtcbiAgcG9zaXRpb24/OiBzdHJpbmc7XG4gIHJvb206IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IERyYWdnYWJsZVdpbmRvdzogRkM8RHJhZ2dhYmxlV2luZG93UHJvcHM+ID0gKFxuICB7IG9uU2hhcmUsIG9uUmVzdG9yZSwgcG9zaXRpb24sIHNlc3Npb24sIGtlZXBGdWxsU2NyZWVuLCByb29tIH0sXG4pID0+IHtcbiAgY29uc3QgW2lzU3RhYmxlLCBzZXRJc1N0YWJsZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzY2FsZVJhbmdlLCBjaGFuZ2VTY2FsZVJhbmdlXSA9IHVzZVN0YXRlKDEwMCk7XG4gIC8vIENvbnN0IFtoZWlnaHQsIGNoYW5nZUhlaWdodF0gPSB1c2VTdGF0ZShpbm5lckhlaWdodCk7XG5cbiAgY29uc3QgW2NoaWxkQXJyYXksIHNldENoaWxkXSA9IHVzZVN0YXRlKFtcbiAgICA8TGF6eVNwaWtlTGFuZENvbXBvbmVudFxuICAgICAgbmFtZT17cm9vbX1cbiAgICAgIHRyYW5zcGlsZWQ9e3Nlc3Npb24udHJhbnNwaWxlZH1cbiAgICAgIGh0bWxDb250ZW50PXtgPGRpdiBpZD1cInJvb3RcIj48c3R5bGU+JHtzZXNzaW9uLmNzc308L3N0eWxlPjxkaXYgaWQ9XCJ6Ym9keVwiPiR7c2Vzc2lvbi5odG1sfTwvZGl2PjwvZGl2PmB9XG4gICAgICBodG1sPXtzZXNzaW9uLmh0bWx9XG4gICAgLz4sXG4gIF0pO1xuXG4gIGNvbnN0IHN0YXJ0UG9zaXRpb25zID0geyBib3R0b206IC00MCwgcmlnaHQ6IC05MCB9O1xuXG4gIHNlc3Npb24uc2V0Q2hpbGQgPSBzZXRDaGlsZDtcblxuICBjb25zdCBbcXJVcmwsIHNldFFSVXJsXSA9IHVzZVN0YXRlKHNlc3Npb24udXJsKTtcbiAgY29uc3QgW2Vycm9yVGV4dCwgc2V0RXJyb3JUZXh0XSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IFt7IGJvdHRvbSwgcmlnaHQgfSwgc2V0UG9zaXRpb25zXSA9IHVzZVN0YXRlKHN0YXJ0UG9zaXRpb25zKTtcbiAgY29uc3QgW3dpZHRoLCBzZXRXaWR0aF0gPSB1c2VTdGF0ZSh3aW5kb3cuaW5uZXJXaWR0aCAqIGRldmljZVBpeGVsUmF0aW8pO1xuICBjb25zdCBbaGVpZ2h0LCBzZXRIZWlnaHRdID0gdXNlU3RhdGUod2luZG93LmlubmVySGVpZ2h0ICogZGV2aWNlUGl4ZWxSYXRpbyk7XG4gIGNvbnN0IHJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG4gIGNvbnN0IHpib2R5ID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcblxuICBjb25zdCBjaGlsZCA9IGNoaWxkQXJyYXlbY2hpbGRBcnJheS5sZW5ndGggLSAxXTtcblxuICAvLyBVc2VFZmZlY3QoKCkgPT4ge1xuICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiBjaGFuZ2VIZWlnaHQod2luZG93LmlubmVySGVpZ2h0KSk7XG4gIC8vIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgIGlmIChlcnJvclRleHQgIT09IHNlc3Npb24uZXJyb3JUZXh0KSB7XG4gICAgICAgIGNvbnN0IG5ld0Vycm9yID0gc2Vzc2lvbi5lcnJvclRleHQ7XG4gICAgICAgIHNldEVycm9yVGV4dChuZXdFcnJvcik7XG4gICAgICAgIHNldElzU3RhYmxlKGZhbHNlKTtcbiAgICAgICAgYXdhaXQgd2FpdCgxNTAwKTtcbiAgICAgICAgaWYgKHNlc3Npb24uZXJyb3JUZXh0ID09PSBuZXdFcnJvcikge1xuICAgICAgICAgIHNldElzU3RhYmxlKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChxclVybCAhPT0gc2Vzc2lvbi51cmwpIHtcbiAgICAgICAgc2V0UVJVcmwoc2Vzc2lvbi51cmwpO1xuICAgICAgfVxuICAgICAgLy8gU2V0Q2hpbGQoc2Vzc2lvbi5jaGlsZHJlbik7XG4gICAgfSwgMjAwKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKGhhbmRsZXIpO1xuICAgIH07XG4gIH0sIFtzZXRFcnJvclRleHQsIHNldFFSVXJsLCBlcnJvclRleHQsIHFyVXJsXSk7XG5cbiAgY29uc3Qgc2NhbGUgPSBzY2FsZVJhbmdlIC8gMTAwO1xuICBjb25zdCBbaXNGdWxsU2NyZWVuLCBzZXRGdWxsU2NyZWVuXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgcmV2ZWFsID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgeyBib3R0b20sIHJpZ2h0IH0gPSBzdGFydFBvc2l0aW9ucztcbiAgICAgIGlmIChrZWVwRnVsbFNjcmVlbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XG4gICAgICAvLyBDb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xuICAgICAgLy8gaWYgKHJvb3QgJiYgcm9vdC5yZW1vdmUpIHJvb3QucmVtb3ZlKCk7XG4gICAgICBhd2FpdCB3YWl0KDMwMCk7XG5cbiAgICAgIHNldEZ1bGxTY3JlZW4oZmFsc2UpO1xuICAgICAgY2hhbmdlU2NhbGVSYW5nZSg1MCk7XG5cbiAgICAgIHNldFBvc2l0aW9ucyh7XG4gICAgICAgIGJvdHRvbTogd2luZG93LmlubmVySGVpZ2h0ICogMC4yLFxuICAgICAgICByaWdodDogd2luZG93LmlubmVyV2lkdGggKiAwLjIsXG4gICAgICB9KTtcbiAgICAgIC8vIENoYW5nZVNjYWxlUmFuZ2UoNzUpO1xuICAgICAgLy8gc2V0SGVpZ2h0KGhlaWdodD0+IGhlaWdodClcblxuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIC8gZGV2aWNlUGl4ZWxSYXRpbyA8IDYwMCkge1xuICAgICAgICBjaGFuZ2VTY2FsZVJhbmdlKDUwKTtcbiAgICAgICAgc2V0V2lkdGgoYnJlYWtQb2ludHNbMF0pO1xuICAgICAgICBzZXRIZWlnaHQoYnJlYWtQb2ludEhlaWdodHNbMF0pO1xuXG4gICAgICAgIC8vIFNldEhlaWdodCh3aW5kb3cuaW5uZXJIZWlnaHQgKiBkZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIC8gZGV2aWNlUGl4ZWxSYXRpbyA8IDEyMDApIHtcbiAgICAgICAgY2hhbmdlU2NhbGVSYW5nZSg3NSk7XG4gICAgICAgIHNldFdpZHRoKGJyZWFrUG9pbnRzWzBdKTtcbiAgICAgICAgc2V0SGVpZ2h0KGJyZWFrUG9pbnRIZWlnaHRzWzBdKTtcblxuICAgICAgICAvLyBTZXRIZWlnaHQod2luZG93LmlubmVySGVpZ2h0ICogZGV2aWNlUGl4ZWxSYXRpbyk7XG4gICAgICB9IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoIC8gZGV2aWNlUGl4ZWxSYXRpbyA8IDE4MDApIHtcbiAgICAgICAgLy8gU2V0SGVpZ2h0KGJyZWFrUG9pbnRzWzFdKTtcbiAgICAgICAgc2V0V2lkdGgoYnJlYWtQb2ludHNbMV0pO1xuICAgICAgICBzZXRIZWlnaHQoYnJlYWtQb2ludEhlaWdodHNbMV0pO1xuXG4gICAgICAgIGNoYW5nZVNjYWxlUmFuZ2UoNTApO1xuICAgICAgfSBlbHNlIGlmICh3aW5kb3cuaW5uZXJXaWR0aCAvIGRldmljZVBpeGVsUmF0aW8gPCAyNTAwKSB7XG4gICAgICAgIC8vIFNldEhlaWdodChicmVha1BvaW50SGVpZ2h0c1syXSAqIGRldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICBzZXRXaWR0aChicmVha1BvaW50c1sxXSk7XG4gICAgICAgIHNldEhlaWdodChicmVha1BvaW50SGVpZ2h0c1sxXSk7XG5cbiAgICAgICAgY2hhbmdlU2NhbGVSYW5nZSg3NSk7XG4gICAgICB9IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoIC8gZGV2aWNlUGl4ZWxSYXRpbyA+IDI1MDApIHtcbiAgICAgICAgLy8gU2V0V2lkdGgod2luZG93KiBkZXZpY2VQaXhlbFJhdGlvKVxuICAgICAgICBzZXRXaWR0aChicmVha1BvaW50c1sxXSk7XG4gICAgICAgIHNldEhlaWdodChicmVha1BvaW50SGVpZ2h0c1sxXSk7XG5cbiAgICAgICAgLy8gU2V0SGVpZ2h0KGJyZWFrUG9pbnRzWzBdKTtcbiAgICAgICAgY2hhbmdlU2NhbGVSYW5nZSgxMDApO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB3YWl0KDIwMCk7XG4gICAgICBzZXRQb3NpdGlvbnMoe1xuICAgICAgICBib3R0b206IDIwLFxuICAgICAgICByaWdodDogMjAsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV2ZWFsKCk7XG4gIH0sIFtdKTtcblxuICAvLyBJZiAoaXNGdWxsU2NyZWVuKSB7XG4gIC8vICAgcmV0dXJuIChcbiAgLy8gICAgIDxMYXp5U3Bpa2VMYW5kQ29tcG9uZW50XG4gIC8vICAgICAgIG5hbWU9e3Jvb219XG4gIC8vICAgICAgIGNzc1RleHQ9e3Nlc3Npb24uY3NzfVxuICAvLyAgICAgICBodG1sPXtzZXNzaW9uLmh0bWx9XG4gIC8vICAgICAvPlxuICAvLyAgICk7XG4gIC8vIH1cblxuICByZXR1cm4gKFxuICAgIDxSZWFjdC5TdHJpY3RNb2RlPlxuICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgIGluaXRpYWw9e3sgYm90dG9tOiBzdGFydFBvc2l0aW9ucy5ib3R0b20sIHJpZ2h0OiBzdGFydFBvc2l0aW9ucy5yaWdodCB9fVxuICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgYm90dG9tLFxuICAgICAgICAgIHJpZ2h0LFxuICAgICAgICB9fVxuICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6JHtiZ307XG4gICAgICAgICAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTVweCk7XG4gICAgICAgICAgICBwYWRkaW5nOiAwcHggMHB4IDBweCAxNnB4O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XG4gICAgICAgICAgICBwb3NpdGlvbjogJHtwb3NpdGlvbiA/IHBvc2l0aW9uIDogXCJmaXhlZFwifTtcbiAgICAgICAgICBgfVxuICAgICAgICBkcmFnRWxhc3RpYz17MC41fVxuICAgICAgICBkcmFnQ29uc3RyYWludHM9e3tcbiAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgIHJpZ2h0OiB3aWR0aCAtIDIwIC0gd2lkdGggLyA2LFxuICAgICAgICAgIGJvdHRvbTogaW5uZXJIZWlnaHQgLSAxMDAsXG4gICAgICAgIH19XG4gICAgICAgIGRyYWdNb21lbnR1bT17ZmFsc2V9XG4gICAgICAgIGRyYWc9eyFpc0Z1bGxTY3JlZW59XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjc3M9e2Nzc2AgXG4gICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGB9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBgfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsvKiAvLyBAdHMtbm9jaGVjayAqL31cbiAgICAgICAgICAgIDxUb2dnbGVCdXR0b25Hcm91cFxuICAgICAgICAgICAgICB2YWx1ZT17c2NhbGVSYW5nZX1cbiAgICAgICAgICAgICAgc2l6ZT1cInNtYWxsXCJcbiAgICAgICAgICAgICAgZXhjbHVzaXZlXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoX2UsIG5ld1NjYWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3U2NhbGUgJiYgY2hhbmdlU2NhbGVSYW5nZShuZXdTY2FsZSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtzaXplcy5tYXAoKHNpemUpID0+IChcbiAgICAgICAgICAgICAgICA8VG9nZ2xlQnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e3NpemV9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17c2l6ZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICR7XG4gICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9PT0gc2NhbGVSYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcInJnYmEoMjU1LDI1NSwyNTUsLjgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJyZ2JhKDAsMCwwLC4zKVwiXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtzaXplfSVcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L1RvZ2dsZUJ1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L1RvZ2dsZUJ1dHRvbkdyb3VwPlxuICAgICAgICAgICAgey8qIDxzcGFuPnt3aWR0aH0qe2hlaWdodH08L3NwYW4+ICovfVxuXG4gICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAvLyBJbml0aWFsPXt7XG4gICAgICAgICAgICAgIC8vICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgICAvLyAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgICAgICAgIC8vIH19XG4gICAgICAgICAgICAgIC8vIHRyYW5zaXRpb249e1xuICAgICAgICAgICAgICAvLyAgIHtkdXJhdGlvbjogMjAwMH1cbiAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoICogc2NhbGUgLyBkZXZpY2VQaXhlbFJhdGlvLFxuICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0ICogc2NhbGUgLyBkZXZpY2VQaXhlbFJhdGlvLFxuICAgICAgICAgICAgICAgIG1heEhlaWdodDogaGVpZ2h0ICogc2NhbGUgLyBkZXZpY2VQaXhlbFJhdGlvLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogaXNGdWxsU2NyZWVuID8gMCA6IDgsXG4gICAgICAgICAgICAgICAgLy8gT3BhY2l0eTogaXNGdWxsU2NyZWVuID8gMSA6IDAuNyxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgd2lkdGg6ICR7d2lkdGggKiBzY2FsZSAvIGRldmljZVBpeGVsUmF0aW99O1xuICAgICAgICAgICAgICAgIGhlaWdodDogJHtoZWlnaHQgKiBzY2FsZSAvIGRldmljZVBpeGVsUmF0aW99O1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG5cblxuICAgICAgICAgICAgICAgIC8qIGJhY2tncm91bmQtY29sb3I6IHJlZDsgKi9cbiAgICAgICAgICAgIGB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtlcnJvclRleHQgJiYgZXJyb3JUZXh0LnRyaW0oKSAhPT0gXCJcIiAmJiAoXG4gICAgICAgICAgICAgICAgPHByZVxuICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICAgICAgei1pbmRleDozO1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmdiKDI1NSwgMjQwLCAyNDApO1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAyNHB4O1xuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHQ7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDAsIDApO1xuICAgICAgICAgICAgICAgICAgICBmbGV4OiAwIDAgYXV0bztcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgICAgICAgICAgICAgICAgICAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICAgICAgICAgICAgICAgIGB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2lzU3RhYmxlICYmIGVycm9yVGV4dCAmJiBlcnJvclRleHQudHJpbSgpfVxuICAgICAgICAgICAgICAgICAge2lzU3RhYmxlICYmIGVycm9yVGV4dCAmJiBlcnJvclRleHQudHJpbSgpICE9PSBcIlwiICYmXG4gICAgICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVzdG9yZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEVycm9yVGV4dChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgUmVzdG9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICBpbml0aWFsPXt7XG4gICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46IFwiMHB4IDBweFwiLFxuICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoIC8gZGV2aWNlUGl4ZWxSYXRpbyxcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC8gZGV2aWNlUGl4ZWxSYXRpbyxcbiAgICAgICAgICAgICAgICAgIHNjYWxlOiBzY2FsZVJhbmdlIC8gMTAwLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgYW5pbWF0ZT17e1xuICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBcIjBweCAwcHhcIixcblxuICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoIC8gZGV2aWNlUGl4ZWxSYXRpbyxcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0IC8gZGV2aWNlUGl4ZWxSYXRpbyxcbiAgICAgICAgICAgICAgICAgIHNjYWxlOiBzY2FsZVJhbmdlIC8gMTAwLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICBvdmVyZmxvdzpvdmVybGF5O1xuICAgICAgICAgICAgICAgICAgb3ZlcmZsb3cteTogaGlkZGVuO1xuICAgICAgICAgICAgICAgICAgPmRpdntcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6MTAwJTtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OjEwMCU7XG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiBvdmVybGF5O1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtlcnJvclRleHRcbiAgICAgICAgICAgICAgICAgID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgaWQ9XCJ6Ym9keVwiXG4gICAgICAgICAgICAgICAgICAgICAgY3NzPXtgJHtzZXNzaW9uLmNzc31gfVxuICAgICAgICAgICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtjcmVhdGVNYXJrdXAoc2Vzc2lvbi5odG1sKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIDogKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgaWQ9XCJ6Ym9keVwiXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtzZXNzaW9uLml9XG4gICAgICAgICAgICAgICAgICAgICAgcmVmPXt6Ym9keX1cbiAgICAgICAgICAgICAgICAgICAgICBjc3M9e2Nzc2BxXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtjaGlsZH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApfSB7XG4gICAgICAgICAgICAgICAgICAvKiAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgLy8gey8qIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aWZyYW1lXG4gICAgICAgICAgICAgICAgICAgICAgZnJhbWVib3JkZXI9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxpbmc9XCJub1wiXG4gICAgICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgICAgICAgIG9uTG9hZD17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmRvY3VtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIHNyYz17YGh0dHBzOi8vc3Bpa2UubGFuZC9hcGkvcm9vbS8ke3Jvb219L2h5ZHJhdGVkYH1cbiAgICAgICAgICAgICAgICAgICAgLz4gKi9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgIDxUb2dnbGVCdXR0b25Hcm91cFxuICAgICAgICAgICAgICB2YWx1ZT17d2lkdGh9XG4gICAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgICAgIGV4Y2x1c2l2ZVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KF9lLCBuZXdTaXplKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1NpemUpIHtcbiAgICAgICAgICAgICAgICAgIHNldEhlaWdodChicmVha1BvaW50SGVpZ2h0c1ticmVha1BvaW50cy5pbmRleE9mKG5ld1NpemUpXSk7XG4gICAgICAgICAgICAgICAgICBzZXRXaWR0aChuZXdTaXplKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHticmVha1BvaW50cy5tYXAoKHNpemUpID0+IChcbiAgICAgICAgICAgICAgICA8VG9nZ2xlQnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e3NpemV9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17c2l6ZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7c2l6ZSA9PT0gNjgwXG4gICAgICAgICAgICAgICAgICAgID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxQaG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPT09IDY4MFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJyZ2JhKDI1NSwyNTUsMjU1LC44KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInJnYmEoMCwwLDAsLjMpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgOiAoc2l6ZSA9PT0gNzY4XG4gICAgICAgICAgICAgICAgICAgICAgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8VGFibGV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPT09IDc2OFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcInJnYmEoMjU1LDI1NSwyNTUsLjgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJyZ2JhKDAsMCwwLC4zKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8VHZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9PT0gMTkyMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcInJnYmEoMjU1LDI1NSwyNTUsLjgpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJyZ2JhKDAsMCwwLC4zKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgYH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9Ub2dnbGVCdXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9Ub2dnbGVCdXR0b25Hcm91cD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyOyAgICAgICAgICBcbiAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICAgICAgcGFkZGluZzogMTZweDtcbiAgICAgICAgICAgICAgYH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RmFiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRGdWxsU2NyZWVuKHRydWUpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RnVsbHNjcmVlbkljb24gLz5cbiAgICAgICAgICAgIDwvRmFiPlxuXG4gICAgICAgICAgICA8UVJCdXR0b24gdXJsPXtxclVybH0gLz5cblxuICAgICAgICAgICAgPEZhYlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgb25TaGFyZSgpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U2hhcmUgLz5cbiAgICAgICAgICAgIDwvRmFiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbW90aW9uLmRpdj5cbiAgICA8L1JlYWN0LlN0cmljdE1vZGU+XG4gICk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVNYXJrdXAoX19odG1sOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHsgX19odG1sIH07XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZUlmcmFtZShvYmopIHtcbiAgb2JqLnN0eWxlLmhlaWdodCA9IG9iai5jb250ZW50V2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgK1xuICAgIFwicHhcIjtcbn1cbiIsICIvKiogQGpzeCBqc3ggKi9cblxuaW1wb3J0IHsgY3NzLCBqc3ggfSBmcm9tIFwiQGVtb3Rpb24vcmVhY3RcIjtcbmltcG9ydCB7IG1vdGlvbiB9IGZyb20gXCJmcmFtZXItbW90aW9uXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBRUmlvdXMgfSBmcm9tIFwiQHNwaWtlLmxhbmQvcXJpb3VzXCI7XG4vLyBAdHMtZXhwZWN0LWVycm9yXG5pbXBvcnQgeyBGYWIsIFFyQ29kZSB9IGZyb20gXCIuL211aS50c3hcIjtcblxuY29uc3QgUVI6IFJlYWN0LkZDPHsgdXJsOiBzdHJpbmcgfT4gPSAoeyB1cmwgfSkgPT4ge1xuICBjb25zdCBjYW52YXNSZWYgPSBSZWFjdC51c2VSZWY8SFRNTENhbnZhc0VsZW1lbnQ+KG51bGwpO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbG9hZCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHNpemU6IDIwMCxcbiAgICAgICAgZWxlbWVudDogY2FudmFzUmVmLmN1cnJlbnQsXG4gICAgICAgIGZvcmVncm91bmRBbHBoYTogMC45LFxuICAgICAgICBmb3JlZ3JvdW5kOiBcIndoaXRlXCIsXG4gICAgICAgIGJhY2tncm91bmRBbHBoYTogMSxcbiAgICAgICAgcGFkZGluZzogMTYsXG4gICAgICAgIGJhY2tncm91bmQ6IFwiIzFlMWUxZVwiLFxuICAgICAgICB2YWx1ZTogdXJsLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcXIgPSBuZXcgUVJpb3VzKG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICBsb2FkKCk7XG4gIH0sIFt1cmxdKTtcblxuICByZXR1cm4gKFxuICAgIDxjYW52YXNcbiAgICAgIGNzcz17Y3NzYFxuICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIGB9XG4gICAgICByZWY9e2NhbnZhc1JlZn1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IFFSQnV0dG9uOiBSZWFjdC5GQzx7IHVybDogc3RyaW5nIH0+ID0gKHsgdXJsIH0pID0+IHtcbiAgY29uc3QgW3Nob3dRUiwgc2V0UVJdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICByZXR1cm4gKFxuICAgIDxtb3Rpb24uZGl2XG4gICAgICBhbmltYXRlPXt7XG4gICAgICAgIHdpZHRoOiBzaG93UVIgPyAyMDAgOiA1NixcbiAgICAgICAgaGVpZ2h0OiBzaG93UVIgPyAyMjAgOiA0OCxcbiAgICAgIH19XG4gICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICBzZXRRUighc2hvd1FSKTtcbiAgICAgIH19XG4gICAgICBjc3M9e2Nzc2BcbiAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgICAgICAgICAgICBgfVxuICAgID5cbiAgICAgIHtzaG93UVIgPyA8UVIga2V5PXt1cmx9IHVybD17dXJsICsgXCIvZWRpdC9cIn0gLz4gOiAoXG4gICAgICAgIDxGYWJcbiAgICAgICAgICB2YXJpYW50PVwiZXh0ZW5kZWRcIlxuICAgICAgICAgIGNvbG9yPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBzZXRRUighc2hvd1FSKTtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPFFyQ29kZSAvPlxuICAgICAgICA8L0ZhYj5cbiAgICAgICl9XG4gICAgPC9tb3Rpb24uZGl2PlxuICApO1xufTtcbiIsICIvKiogQGpzeCBqc3ggKi9cbmltcG9ydCB7IGpzeCB9IGZyb20gXCJAZW1vdGlvbi9yZWFjdFwiO1xuaW1wb3J0IEZhYiBmcm9tIFwiQG11aS9tYXRlcmlhbC9GYWJcIjtcbmltcG9ydCBCdXR0b24gZnJvbSBcIkBtdWkvbWF0ZXJpYWwvQnV0dG9uXCI7XG5cbmltcG9ydCBjcmVhdGVTdmdJY29uIGZyb20gXCJAbXVpL21hdGVyaWFsL3V0aWxzL2NyZWF0ZVN2Z0ljb25cIjtcblxuaW1wb3J0IHR5cGUgeyBGQywgTW91c2VFdmVudCB9IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBDb25zdCBNeVRvZ2dsZUJ1dHRvbkdyb3VwOiBGQzx7XG4vLyAgIHZhbHVlOiBhbnksXG4vLyAgIG9uQ2hhbmdlRDogKCBfZTogTW91c2VFdmVudCwgdmFsdWU6IGFueSk9PnZvaWR9PiA9ICh7dmFsdWUsIG9uQ2hhbmdlRCwgY2hpbGRyZW59KSA9PiA8VG9nZ2xlQnV0dG9uR3JvdXBcbi8vIHZhbHVlPXt2YWx1ZX1cbi8vIHNpemU9XCJzbWFsbFwiXG4vLyBleGNsdXNpdmVcbi8vIG9uQ2hhbmdlPXsoX2UsIHZhbHVlKT0+e1xuLy8gICBjb25zb2xlLmxvZyhcImNsaWNrZWRcIik7XG4vLyAgIG9uQ2hhbmdlRChfZSwgdmFsdWUpO1xuLy8gfX0+e2NoaWxkcmVufTwvVG9nZ2xlQnV0dG9uR3JvdXA+XG5cbi8vIGNvbnN0IE15VG9nZ2xlQnV0dG9uOiBGQzx7a2V5OiBhbnksIHZhbHVlOiBhbnl9Pj0oe2tleSwgdmFsdWUsIGNoaWxkcmVufSkgPT4gPFRvZ2dsZUJ1dHRvblxuLy8ga2V5PXtrZXl9XG4vLyB2YWx1ZT17dmFsdWV9XG4vLyA+e2NoaWxkcmVufTwvVG9nZ2xlQnV0dG9uPlxuXG5jb25zdCBGdWxsc2NyZWVuSWNvbiA9IGNyZWF0ZVN2Z0ljb24oXG4gIDxwYXRoIGQ9XCJNMTcgNGg1djVoLTJWNmgtM1Y0ek00IDlWNmgzVjRIMnY1aDJ6bTE2IDZ2M2gtM3YyaDV2LTVoLTJ6TTcgMThINHYtM0gydjVoNXYtMnpNMTggOEg2djhoMTJWOHpcIiAvPixcbiAgXCJGdWxsc2NyZWVuXCIsXG4pO1xuXG5jb25zdCBQaG9uZSA9IGNyZWF0ZVN2Z0ljb24oXG4gIDxwYXRoXG4gICAga2V5PVwiMTJcIlxuICAgIGQ9XCJNMTYgMUg4QzYuMzQgMSA1IDIuMzQgNSA0djE2YzAgMS42NiAxLjM0IDMgMyAzaDhjMS42NiAwIDMtMS4zNCAzLTNWNGMwLTEuNjYtMS4zNC0zLTMtM3ptLTIgMjBoLTR2LTFoNHYxem0zLjI1LTNINi43NVY0aDEwLjV2MTR6XCJcbiAgLz4sXG4gIFwiUGhvbmVBbmRyb2lkXCIsXG4pO1xuXG5jb25zdCBNeUJ1dHRvbjogRkM8eyBvbkNsaWNrOiAoKSA9PiBhbnkgfT4gPSAoeyBvbkNsaWNrLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxCdXR0b24gdmFyaWFudD1cImNvbnRhaW5lZFwiIGNvbG9yPVwicHJpbWFyeVwiIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgIHtjaGlsZHJlbn1cbiAgPC9CdXR0b24+XG4pO1xuXG5jb25zdCBTaGFyZSA9IGNyZWF0ZVN2Z0ljb24oXG4gIDxwYXRoXG4gICAga2V5PVwiMTJcIlxuICAgIGQ9XCJNMTggMTYuMDhjLS43NiAwLTEuNDQuMy0xLjk2Ljc3TDguOTEgMTIuN2MuMDUtLjIzLjA5LS40Ni4wOS0uN3MtLjA0LS40Ny0uMDktLjdsNy4wNS00LjExYy41NC41IDEuMjUuODEgMi4wNC44MSAxLjY2IDAgMy0xLjM0IDMtM3MtMS4zNC0zLTMtMy0zIDEuMzQtMyAzYzAgLjI0LjA0LjQ3LjA5LjdMOC4wNCA5LjgxQzcuNSA5LjMxIDYuNzkgOSA2IDljLTEuNjYgMC0zIDEuMzQtMyAzczEuMzQgMyAzIDNjLjc5IDAgMS41LS4zMSAyLjA0LS44MWw3LjEyIDQuMTZjLS4wNS4yMS0uMDguNDMtLjA4LjY1IDAgMS42MSAxLjMxIDIuOTIgMi45MiAyLjkyIDEuNjEgMCAyLjkyLTEuMzEgMi45Mi0yLjkycy0xLjMxLTIuOTItMi45Mi0yLjkyelwiXG4gIC8+LFxuICBcIlNoYXJlXCIsXG4pO1xuXG4vLyBDb25zdCBGdWxsU2NyID0gY3JlYXRlU3ZnSWNvbihcbi8vICAgPHBhdGhcbi8vICAgICBrZXk9XCIxMlwiXG4vLyAgICAgZD1cIk0xOSA0SDVhMiAyIDAgMDAtMiAydjEyYTIgMiAwIDAwMiAyaDR2LTJINVY4aDE0djEwaC00djJoNGMxLjEgMCAyLS45IDItMlY2YTIgMiAwIDAwLTItMnptLTcgNmwtNCA0aDN2Nmgydi02aDNsLTQtNHpcIlxuLy8gICAvPixcbi8vICAgXCJTaGFyZVwiLFxuLy8gKTtcblxuLy8gZXhwb3J0IGZ1bmN0aW9uIE1kT3BlbkluQnJvd3NlciAocHJvcHMpIHtcbi8vICAgcmV0dXJuIEdlbkljb24oe1widGFnXCI6XCJzdmdcIixcImF0dHJcIjp7XCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIn0sXCJjaGlsZFwiOlt7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJmaWxsXCI6XCJub25lXCIsXCJkXCI6XCJNMCAwaDI0djI0SDB6XCJ9fSx7XCJ0YWdcIjpcInBhdGhcIixcImF0dHJcIjp7XCJkXCI6XCJ9fV19KShwcm9wcyk7XG4vLyB9O1xuLy8gTWRPcGVuSW5Ccm93c2VyXG5cbmNvbnN0IFRhYmxldCA9IGNyZWF0ZVN2Z0ljb24oXG4gIDxwYXRoXG4gICAga2V5PVwiMTJcIlxuICAgIGQ9XCJNMTggMEg2QzQuMzQgMCAzIDEuMzQgMyAzdjE4YzAgMS42NiAxLjM0IDMgMyAzaDEyYzEuNjYgMCAzLTEuMzQgMy0zVjNjMC0xLjY2LTEuMzQtMy0zLTN6bS00IDIyaC00di0xaDR2MXptNS4yNS0zSDQuNzVWM2gxNC41djE2elwiXG4gIC8+LFxuICBcIlRhYmxldEFuZHJvaWRcIixcbik7XG5cbmNvbnN0IFR2ID0gY3JlYXRlU3ZnSWNvbihcbiAgPHBhdGhcbiAgICBrZXk9XCIxMlwiXG4gICAgZD1cIk0yMSAzSDNjLTEuMSAwLTIgLjktMiAydjEyYzAgMS4xLjkgMiAyIDJoNXYyaDh2LTJoNWMxLjEgMCAxLjk5LS45IDEuOTktMkwyMyA1YzAtMS4xLS45LTItMi0yem0wIDE0SDNWNWgxOHYxMnpcIlxuICAvPixcbiAgXCJUdlwiLFxuKTtcblxuY29uc3QgTXlGc2I6IEZDPHsgb25DbGljazogKCkgPT4gdm9pZCB9PiA9ICh7IG9uQ2xpY2ssIGNoaWxkcmVuIH0pID0+IChcbiAgPEZhYlxuICAgIHZhcmlhbnQ9XCJleHRlbmRlZFwiXG4gICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICA+XG4gICAge2NoaWxkcmVufVxuICA8L0ZhYj5cbik7XG5cbmNvbnN0IFFyQ29kZSA9IGNyZWF0ZVN2Z0ljb24oXG4gIDxwYXRoXG4gICAga2V5PVwiMTJcIlxuICAgIGQ9XCJNMyAxMWg4VjNIM3Y4em0yLTZoNHY0SDVWNXpNMyAyMWg4di04SDN2OHptMi02aDR2NEg1di00em04LTEydjhoOFYzaC04em02IDZoLTRWNWg0djR6bTAgMTBoMnYyaC0yem0tNi02aDJ2MmgtMnptMiAyaDJ2MmgtMnptLTIgMmgydjJoLTJ6bTIgMmgydjJoLTJ6bTItMmgydjJoLTJ6bTAtNGgydjJoLTJ6bTIgMmgydjJoLTJ6XCJcbiAgLz4sXG4gIFwiUXJDb2RlXCIsXG4pO1xuXG5leHBvcnQge1xuICBGdWxsc2NyZWVuSWNvbixcbiAgTXlCdXR0b24gYXMgQnV0dG9uLFxuICBNeUZzYiBhcyBGYWIsXG4gIFBob25lLFxuICBRckNvZGUsXG4gIFNoYXJlLFxuICBUYWJsZXQsXG4gIFR2LFxufTtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBUb2dnbGVCdXR0b24gfSBmcm9tIFwiQG11aS9tYXRlcmlhbC9Ub2dnbGVCdXR0b25cIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVG9nZ2xlQnV0dG9uR3JvdXAgfSBmcm9tIFwiQG11aS9tYXRlcmlhbC9Ub2dnbGVCdXR0b25Hcm91cFwiO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7O0FBQ0E7OztBQ0NBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBOzs7QUNWQTtBQUNBO0FBQ0E7QUFDQTs7O0FDSkE7QUFDQTtBQUNBO0FBRUE7QUF5R0E7QUFDQTtBQXRGQSxJQUFNLGlCQUFpQixjQUNyQixvQkFBQyxRQUFEO0FBQUEsRUFBTSxHQUFFO0FBQUEsSUFDUjtBQUdGLElBQU0sUUFBUSxjQUNaLG9CQUFDLFFBQUQ7QUFBQSxFQUNFLEtBQUk7QUFBQSxFQUNKLEdBQUU7QUFBQSxJQUVKO0FBR0YsSUFBTSxXQUF1QyxDQUFDLEVBQUUsU0FBUyxlQUN2RCxvQkFBQyxRQUFEO0FBQUEsRUFBUSxTQUFRO0FBQUEsRUFBWSxPQUFNO0FBQUEsRUFBVTtBQUFBLEdBQ3pDO0FBSUwsSUFBTSxRQUFRLGNBQ1osb0JBQUMsUUFBRDtBQUFBLEVBQ0UsS0FBSTtBQUFBLEVBQ0osR0FBRTtBQUFBLElBRUo7QUFnQkYsSUFBTSxTQUFTLGNBQ2Isb0JBQUMsUUFBRDtBQUFBLEVBQ0UsS0FBSTtBQUFBLEVBQ0osR0FBRTtBQUFBLElBRUo7QUFHRixJQUFNLEtBQUssY0FDVCxvQkFBQyxRQUFEO0FBQUEsRUFDRSxLQUFJO0FBQUEsRUFDSixHQUFFO0FBQUEs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
