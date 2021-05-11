// src/renderer.ts
import * as Motion from "framer-motion";
import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import {css, Global, jsx} from "@emotion/react";

// src/DraggableWindow.tsx
import Fab2 from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";

// src/icons/utils/createSvgIcon.js
import {createSvgIcon} from "@material-ui/core/utils";

// src/icons/Share.tsx
var Share_default = createSvgIcon(/* @__PURE__ */ React.createElement("path", {
  d: "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
}), "Share");

// src/icons/TabletAndroid.tsx
var TabletAndroid_default = createSvgIcon(/* @__PURE__ */ React.createElement("path", {
  d: "M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"
}), "TabletAndroid");

// src/icons/Tv.tsx
var Tv_default = createSvgIcon(/* @__PURE__ */ React.createElement("path", {
  d: "M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
}), "Tv");

// src/icons/PhoneAndroid.tsx
var PhoneAndroid_default = createSvgIcon(/* @__PURE__ */ React.createElement("path", {
  d: "M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"
}), "PhoneAndroid");

// src/Qr.tsx
import Fab from "@material-ui/core/Fab";

// src/icons/QrCode.tsx
var QrCode_default = createSvgIcon(/* @__PURE__ */ React.createElement("path", {
  d: "M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"
}), "QrCode");

// src/Qr.tsx
var QR = ({url}) => {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const load = async () => {
      const QRious = await new Function(`return import(
        "https://esm.sh/qrious"
      ).then(x=>x.default);`)();
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
  return /* @__PURE__ */ jsx("canvas", {
    css: css`
        border-radius: 16px;
        margin-bottom: 8px;
  `,
    ref: canvasRef
  });
};
var QRButton = ({url}) => {
  const [showQR, setQR] = React.useState(false);
  return /* @__PURE__ */ jsx(motion.div, {
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
  }, showQR ? /* @__PURE__ */ jsx(QR, {
    key: url,
    url: url + "/edit/"
  }) : /* @__PURE__ */ jsx(Fab, {
    variant: "extended",
    color: "secondary",
    onClick: () => {
      setQR(!showQR);
    }
  }, /* @__PURE__ */ jsx(QrCode_default, null)));
};

// src/DraggableWindow.tsx
var breakPoints = [640, 1024, 1920];
var sizes = [10, 25, 50, 75, 100];
var DraggableWindow = ({onShare, onRestore, position, session, children}) => {
  const [isStable, setIsStable] = React.useState(false);
  const [scaleRange, changeScaleRange] = React.useState(75);
  const [height, changeHeight] = React.useState(innerHeight);
  const [qrUrl, setQRUrl] = React.useState(session.url);
  const [errorText, setErrorText] = React.useState(" ");
  const [width, setWidth] = React.useState(breakPoints[1]);
  const ref = React.useRef(null);
  const zbody = React.useRef(null);
  React.useEffect(() => {
    window.addEventListener("resize", () => changeHeight(innerHeight));
  });
  React.useEffect(() => {
    const handler = setInterval(() => {
      if (errorText !== session.errorText) {
        const newErr = session.errorText;
        setErrorText(newErr);
        setIsStable(false);
        setTimeout(() => {
          if (session.errorText === newErr) {
            setIsStable(true);
          }
        }, 2e3);
      }
      if (qrUrl !== session.url)
        setQRUrl(session.url);
    }, 200);
    return () => clearInterval(handler);
  }, [setErrorText, setQRUrl, errorText, qrUrl]);
  const scale = scaleRange / 100;
  return /* @__PURE__ */ jsx(motion.div, {
    ref,
    css: css`
            right: 20px;
            background-color:rgba(92 ,92, 152, 0.8);
            backdrop-filter: blur(10px);
            top: 20px;
            padding: 0px 0px 0px 16px;
            border-radius: 16px;
            white-space: normal;
            position: ${position ? position : "fixed"};
          `,
    dragElastic: 0.5,
    dragConstraints: {
      left: 0,
      right: 300,
      top: -height / 4,
      bottom: height / 2
    },
    dragMomentum: false,
    drag: true
  }, /* @__PURE__ */ jsx("div", {
    css: css` 
              display: flex;
                `
  }, /* @__PURE__ */ jsx("div", {
    css: css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `
  }, /* @__PURE__ */ jsx(ToggleButtonGroup, {
    value: scaleRange,
    size: "small",
    exclusive: true,
    onChange: (_e, newScale) => newScale && changeScaleRange(newScale)
  }, sizes.map((size) => /* @__PURE__ */ jsx(ToggleButton, {
    key: size,
    value: size
  }, /* @__PURE__ */ jsx("span", {
    css: css`
                       color: ${size === scaleRange ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       `
  }, size, "%")))), /* @__PURE__ */ jsx(motion.div, {
    animate: {
      width: width * scale / devicePixelRatio,
      height: height * scale
    },
    css: css`
              display: block;
              overflow: hidden;
              border-radius: 8px;
              opacity: 0.9;
           `
  }, errorText.trim() !== "" && /* @__PURE__ */ jsx("pre", {
    css: css`
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
  }, isStable && errorText.trim(), isStable && errorText.trim() !== "" && /* @__PURE__ */ jsx("div", {
    css: css`
                          text-align: right;
                        `
  }, /* @__PURE__ */ jsx(Button, {
    variant: "contained",
    onClick: () => {
      onRestore();
      setErrorText("");
    },
    color: "primary"
  }, "Restore"))), /* @__PURE__ */ jsx(motion.div, {
    animate: {
      transformOrigin: "top left",
      width: width / devicePixelRatio,
      height,
      scale
    },
    css: css`
                  overflow:overlay;
                  >div{
                    width:100%;
                    height:100%;
                    overflow: overlay;
                    background: white;
                  }
              `
  }, /* @__PURE__ */ jsx("div", {
    id: "zbody",
    ref: zbody
  }, children))), /* @__PURE__ */ jsx(ToggleButtonGroup, {
    value: width,
    size: "small",
    exclusive: true,
    onChange: (_e, newSize) => newSize && setWidth(newSize)
  }, breakPoints.map((size) => /* @__PURE__ */ jsx(ToggleButton, {
    key: size,
    value: size
  }, size === 640 ? /* @__PURE__ */ jsx(PhoneAndroid_default, {
    css: css`
                        color: ${width === 640 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : size === 1024 ? /* @__PURE__ */ jsx(TabletAndroid_default, {
    css: css`
                        color: ${width === 1024 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : /* @__PURE__ */ jsx(Tv_default, {
    css: css`
                        color: ${width === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      `
  }))))), /* @__PURE__ */ jsx("div", {
    css: css`
              display: flex;
              align-items: center;          
              flex-direction: column;
              padding: 16px;
              `
  }, /* @__PURE__ */ jsx(QRButton, {
    url: qrUrl
  }), /* @__PURE__ */ jsx(Fab2, {
    variant: "extended",
    color: "primary",
    onClick: () => {
      onShare();
    }
  }, /* @__PURE__ */ jsx(Share_default, null)))));
};

// src/renderer.ts
var {motion} = Motion;
var render = (el, container) => {
  ReactDOM.render(jsx(Fragment, {children: el}), container);
  return () => ReactDOM.unmountComponentAtNode(container);
};
var renderer_default = React;
export {
  DraggableWindow,
  Fragment,
  Global,
  Motion,
  React,
  css,
  renderer_default as default,
  jsx,
  motion,
  render
};
