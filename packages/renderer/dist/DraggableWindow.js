"use strict";
/** @jsx jsx */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDraggableWindow = exports.DraggableWindow = void 0;
const Fab_1 = __importDefault(require("@material-ui/core/Fab"));
const Button_1 = __importDefault(require("@material-ui/core/Button"));
const ToggleButton_1 = __importDefault(require("@material-ui/core/ToggleButton"));
const ToggleButtonGroup_1 = __importDefault(require("@material-ui/core/ToggleButtonGroup"));
const QrCode_1 = __importDefault(require("@material-ui/icons/QrCode"));
const Share_1 = __importDefault(require("@material-ui/icons/Share"));
const TabletAndroid_1 = __importDefault(require("@material-ui/icons/TabletAndroid"));
const Tv_1 = __importDefault(require("@material-ui/icons/Tv"));
const PhoneAndroid_1 = __importDefault(require("@material-ui/icons/PhoneAndroid"));
const Qr_1 = require("./Qr");
const renderer_1 = require("./renderer");
const breakPoints = [640, 1024, 1920];
const sizes = [10, 25, 50, 75, 100];
const DraggableWindow = ({ onShare, onRestore, position, session, children }) => {
    const [showQR, setQR] = renderer_1.React.useState(false);
    const [isStable, setIsStable] = renderer_1.React.useState(false);
    const [scaleRange, changeScaleRange] = renderer_1.React.useState(75);
    const [height, changeHeight] = renderer_1.React.useState(innerHeight);
    const [qrUrl, setQRUrl] = renderer_1.React.useState(session.url);
    const [errorText, setErrorText] = renderer_1.React.useState(" ");
    const [width, setWidth] = renderer_1.React.useState(breakPoints[1]);
    const ref = renderer_1.React.useRef(null);
    const zbody = renderer_1.React.useRef(null);
    renderer_1.React.useEffect(() => {
        window.addEventListener("resize", () => changeHeight(innerHeight));
    });
    renderer_1.React.useEffect(() => {
        const handler = setInterval(() => {
            if (errorText !== session.errorText) {
                const newErr = session.errorText;
                setErrorText(newErr);
                setIsStable(false);
                setTimeout(() => {
                    if (session.errorText === newErr) {
                        setIsStable(true);
                    }
                }, 2000);
            }
            if (qrUrl !== session.url)
                setQRUrl(session.url);
        }, 200);
        return () => clearInterval(handler);
    }, [setErrorText, setQRUrl, errorText, qrUrl]);
    const scale = scaleRange / 100;
    return (renderer_1.jsx(renderer_1.motion.div, { ref: ref, css: renderer_1.css `
            right: 20px;
            background-color:rgba(92 ,92, 152, 0.8);
            backdrop-filter: blur(10px);
            top: 20px;
            padding: 0px 0px 0px 16px;
            border-radius: 16px;
            white-space: normal;
            position: ${position ? position : "fixed"};
          `, dragElastic: 0.5, dragConstraints: {
            left: 0,
            right: 300,
            top: -height / 4,
            bottom: height / 2,
        }, dragMomentum: false, drag: true },
        renderer_1.jsx("div", { css: { display: "flex" } },
            renderer_1.jsx("div", { css: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                } },
                renderer_1.jsx(ToggleButtonGroup_1.default, { value: scaleRange, size: "small", exclusive: true, color: "white", onChange: (_e, newScale) => newScale && changeScaleRange(newScale) }, sizes.map((size) => renderer_1.jsx(ToggleButton_1.default, { key: size, value: size },
                    renderer_1.jsx("span", { css: renderer_1.css `
                    color: ${size === scaleRange
                            ? "rgba(255,255,255,.8)"
                            : "rgba(0,0,0,.3)"}` },
                        size,
                        "%")))),
                renderer_1.jsx(renderer_1.motion.div, { animate: {
                        width: width * scale / devicePixelRatio,
                        height: height * scale,
                    }, css: renderer_1.css `
              display: block;
              overflow: hidden;
              border-radius: 8px;
              opacity: 0.9;
           ` },
                    errorText.trim() !== "" && renderer_1.jsx("pre", { css: `
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
      ` },
                        isStable && errorText.trim(),
                        isStable && errorText.trim() !== "" &&
                            renderer_1.jsx("div", { css: "text-align: right;" },
                                renderer_1.jsx(Button_1.default, { variant: "contained", onClick: () => {
                                        onRestore();
                                        setErrorText("");
                                    }, color: "primary" }, "Restore"))),
                    renderer_1.jsx(renderer_1.motion.div, { animate: {
                            transformOrigin: "top left",
                            width: width / devicePixelRatio,
                            height: height,
                            scale,
                        }, css: `
                  overflow:overlay;
                  >div{
                    width:100%;
                    height:100%;
                    overflow: overlay;
                    background: white;
                  }
              ` },
                        renderer_1.jsx("div", { id: "zbody", ref: zbody }, children))),
                renderer_1.jsx(ToggleButtonGroup_1.default, { value: width, size: "small", exclusive: true, onChange: (_e, newSize) => newSize && setWidth(newSize) }, breakPoints.map((size) => renderer_1.jsx(ToggleButton_1.default, { key: size, value: size }, size === 640
                    ? renderer_1.jsx(PhoneAndroid_1.default, { css: `color: ${width === 640 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"}` })
                    : size === 1024
                        ? renderer_1.jsx(TabletAndroid_1.default, { css: `color: ${width === 1024 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"}` })
                        : renderer_1.jsx(Tv_1.default, { css: `color: ${width === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"}` }))))),
            renderer_1.jsx("div", { css: renderer_1.css `
              display: flex;
              align-items: center;          
              flex-direction: column;
              padding: 16px;
              ` },
                renderer_1.jsx(renderer_1.motion.div, { animate: {
                        width: showQR ? 220 : 0,
                        height: showQR ? 240 : 0,
                    }, onClick: (e) => {
                        setQR(!showQR);
                    } }, showQR && renderer_1.jsx(Qr_1.QR, { key: qrUrl, url: qrUrl + "edit/" })),
                renderer_1.jsx("div", { css: "margin:0px 0px 16px" },
                    renderer_1.jsx(Fab_1.default, { variant: "extended", color: "secondary", onClick: () => {
                            setQR(!showQR);
                        } },
                        renderer_1.jsx(QrCode_1.default, null))),
                renderer_1.jsx("div", null,
                    renderer_1.jsx(Fab_1.default, { variant: "extended", color: "primary", onClick: () => {
                            onShare();
                        } },
                        renderer_1.jsx(Share_1.default, null)))))));
};
exports.DraggableWindow = DraggableWindow;
const renderDraggableWindow = (props, element) => renderer_1.render(renderer_1.jsx(exports.DraggableWindow, Object.assign({}, props), props.children), element);
exports.renderDraggableWindow = renderDraggableWindow;
