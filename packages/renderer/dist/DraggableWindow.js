import { Fab } from "@mui/material";
import { Button } from "@mui/material";
import { ToggleButton } from "@mui/material";
import { ToggleButtonGroup } from "@mui/material";
import Share from "./icons/Share.js";
import Tablet from "./icons/TabletAndroid.js";
import Tv from "./icons/Tv.js";
import Phone from "./icons/PhoneAndroid.js";
import { QRButton } from "./Qr.js";
import { css, jsx, motion, React } from "./renderer.js";
const breakPoints = [640, 1024, 1920];
const sizes = [10, 25, 50, 75, 100];
const DraggableWindow = ({ onShare, onRestore, position, session }) => {
  const [isStable, setIsStable] = React.useState(false);
  const [scaleRange, changeScaleRange] = React.useState(75);
  const [height, changeHeight] = React.useState(innerHeight);
  const [childArray, setChild] = React.useState([session.children]);
  session.setChild = setChild;
  const [qrUrl, setQRUrl] = React.useState(session.url);
  const [errorText, setErrorText] = React.useState(" ");
  const [width, setWidth] = React.useState(breakPoints[1]);
  const ref = React.useRef(null);
  const zbody = React.useRef(null);
  const child = childArray[childArray.length - 1];
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
      transformOrigin: "0px 0px",
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
  }, errorText ? /* @__PURE__ */ jsx("div", {
    dangerouslySetInnerHTML: createMarkup(session.html)
  }) : /* @__PURE__ */ jsx(React.Suspense, {
    fallback: /* @__PURE__ */ jsx("div", null, "Error fallback")
  }, /* @__PURE__ */ jsx("div", {
    id: "zbody",
    key: session.i,
    ref: zbody
  }, child)))), /* @__PURE__ */ jsx(ToggleButtonGroup, {
    value: width,
    size: "small",
    exclusive: true,
    onChange: (_e, newSize) => newSize && setWidth(newSize)
  }, breakPoints.map((size) => /* @__PURE__ */ jsx(ToggleButton, {
    key: size,
    value: size
  }, size === 640 ? /* @__PURE__ */ jsx(Phone, {
    css: css`
                        color: ${width === 640 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : size === 1024 ? /* @__PURE__ */ jsx(Tablet, {
    css: css`
                        color: ${width === 1024 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `
  }) : /* @__PURE__ */ jsx(Tv, {
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
  }), /* @__PURE__ */ jsx(Fab, {
    variant: "extended",
    color: "primary",
    onClick: () => {
      onShare();
    }
  }, /* @__PURE__ */ jsx(Share, null)))));
};
function createMarkup(__html) {
  return { __html };
}
export {
  DraggableWindow
};
