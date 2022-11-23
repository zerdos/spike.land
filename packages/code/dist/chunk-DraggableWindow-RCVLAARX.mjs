import {
  AnimatePresence,
  Fab,
  LazyMotion,
  MdFullscreen,
  MotionConfig,
  Phone,
  Share,
  Tablet,
  ToggleButton,
  ToggleButtonGroup,
  Tv,
  domAnimation,
  domMax,
  m
} from "./chunk-chunk-7X4A6XOH.mjs";
import {
  sendChannel
} from "./chunk-chunk-KNXXS5RT.mjs";
import "./chunk-chunk-NIA252UP.mjs";
import "./chunk-chunk-JN55TS27.mjs";
import "./chunk-chunk-BGPB5RNK.mjs";
import {
  require_emotion_react_cjs
} from "./chunk-chunk-NRK2N2RS.mjs";
import {
  require_emotion_react_jsx_runtime_cjs
} from "./chunk-chunk-O6GJOOGP.mjs";
import "./chunk-chunk-7DH4XB4M.mjs";
import "./chunk-chunk-DKLIUXI6.mjs";
import "./chunk-chunk-TKBKOKNA.mjs";
import {
  mST
} from "./chunk-chunk-AM5XZHSQ.mjs";
import "./chunk-chunk-PEW2TWYT.mjs";
import "./chunk-chunk-IZGGUXAP.mjs";
import "./chunk-chunk-5K2DW3QL.mjs";
import "./chunk-chunk-QNTVLDPA.mjs";
import {
  require_react
} from "./chunk-chunk-IGJHLPB6.mjs";
import {
  __name,
  __spreadValues,
  __toESM,
  init_define_process
} from "./chunk-chunk-BSQL4JKA.mjs";

// js/DraggableWindow.tsx
init_define_process();
var import_react2 = __toESM(require_emotion_react_cjs(), 1);
var import_react3 = __toESM(require_react(), 1);

// js/Qr.lazy.tsx
init_define_process();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var LQR = (0, import_react.lazy)(() => import("./chunk-Qr-UZAVE6HB.mjs"));
var QRButton = /* @__PURE__ */ __name(({ url }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
  fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    children: "...qr...,"
  }),
  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LQR, {
    url
  })
}), "QRButton");

// js/DraggableWindow.tsx
var import_jsx_runtime2 = __toESM(require_emotion_react_jsx_runtime_cjs(), 1);
var breakPoints = [680, 768, 1920];
var breakPointHeights = [1137, 1024, 1080];
var sizes = [10, 25, 50, 75, 100];
var DraggableWindow = /* @__PURE__ */ __name(({
  children,
  room
}) => {
  const [scaleRange, changeScaleRange] = (0, import_react3.useState)(100);
  const startPositions = { bottom: 0, right: 0 };
  const [{ bottom, right }, setPositions] = (0, import_react3.useState)(startPositions);
  const [width, setWidth] = (0, import_react3.useState)(window.innerWidth * devicePixelRatio);
  const [height, setHeight] = (0, import_react3.useState)(window.innerHeight * devicePixelRatio);
  const videoRef = (0, import_react3.useRef)(null);
  const scale = scaleRange / 100;
  (0, import_react3.useEffect)(() => {
    const reveal = /* @__PURE__ */ __name(async () => {
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
        changeScaleRange(100);
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
      setPositions({
        bottom: 20,
        right: 20
      });
    }, "reveal");
    reveal();
  }, []);
  const bgColor = window.getComputedStyle(
    document.body,
    null
  ).getPropertyValue("background-color").slice(4, -1).split(",").slice(0, 4).map((x) => Number(x) || 0);
  const [bg, setBG] = (0, import_react3.useState)(bgColor);
  const [mstCss, setCSS] = (0, import_react3.useState)(mST().css);
  const [r, g, b, a] = bg;
  const rgba = /* @__PURE__ */ __name((r2, g2, b2, a2) => `rgba(${r2},${g2},${b2},${a2})`, "rgba");
  (0, import_react3.useEffect)(() => {
    const intervalHandler = setInterval(() => {
      setCSS(mST().css);
      const bgColor2 = window.getComputedStyle(
        document.body,
        null
      ).getPropertyValue("background-color").slice(4, -1).split(",").slice(0, 4).map((x) => Number(x) || 0);
      if (JSON.stringify(bg) !== JSON.stringify(bgColor2))
        setBG(bgColor2);
    }, 1e3 / 2);
    return () => clearInterval(intervalHandler);
  }, []);
  const [clients, setClients] = (0, import_react3.useState)(Object.keys(sendChannel.rtcConns));
  (0, import_react3.useEffect)(() => {
    setClients([...Object.keys(sendChannel.rtcConns)]);
  }, [sendChannel.webRtcArray.length, setClients]);
  const delay = sessionStorage && Number(sessionStorage.getItem("delay")) || 0;
  const duration = sessionStorage && Number(sessionStorage.getItem("duration")) || 0.8;
  const type = sessionStorage && sessionStorage.getItem("type") || "spring";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(MotionConfig, {
    transition: { delay, type, duration },
    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AnimatePresence, {
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LazyMotion, {
        features: __spreadValues(__spreadValues({}, domAnimation), domMax),
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(m.div, {
          layout: true,
          initial: {
            top: 0,
            padding: 0,
            right: 0,
            borderRadius: 0
          },
          animate: {
            top: bottom,
            padding: 8,
            right,
            borderRadius: 16
          },
          css: import_react2.css`
            ${mstCss.split("body").join(`[data-test-id="z-body"]`)}
            touch-action: pinch-zoom;
            background-color: ${rgba(r | 96, g | 66, b || 160, a || 0.3)};
            backdrop-filter: blur(15px);
            z-index: 10;

            position: fixed;
          `,
          drag: true,
          dragMomentum: false,
          dragConstraints: {
            left: -innerWidth,
            right: width - 20 - width / 6,
            bottom: innerHeight
          },
          dragElastic: 0.5,
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", {
            style: { display: "flex" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(m.div, {
                    css: import_react2.css`
              overflow: hidden;
              display:flex;
              justify-content: space-evenly;`,
                    initial: { height: "0px", width: "0", opacity: 0 },
                    animate: {
                      height: "42px",
                      width: "100%",
                      opacity: 1
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToggleButtonGroup, {
                      value: scaleRange,
                      size: "small",
                      exclusive: true,
                      onChange: (_e, newScale) => {
                        newScale && changeScaleRange(newScale);
                      },
                      children: sizes.map((size, ind) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToggleButton, {
                        value: size,
                        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", {
                          css: import_react2.css`
                       color: ${size === scaleRange ? "var(--text-color-highlight)" : "var(--text-color-normal)"};
                       `,
                          children: [
                            size,
                            "%"
                          ]
                        })
                      }, ind))
                    })
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(m.div, {
                    initial: {
                      width: window.innerWidth,
                      height: window.innerHeight,
                      borderRadius: 0
                    },
                    animate: {
                      width: width * scale / devicePixelRatio,
                      height: height * scale / devicePixelRatio,
                      borderRadius: 8
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(m.div, {
                      initial: {
                        width: window.innerWidth,
                        height: window.innerHeight,
                        backgroundColor: rgba(r, g, b, 0),
                        scale: 1
                      },
                      animate: {
                        backgroundColor: rgba(r, g, b, 0.7),
                        transformOrigin: "0px 0px",
                        width: width / devicePixelRatio,
                        height: height / devicePixelRatio,
                        scale: scaleRange / 100
                      },
                      "data-test-id": "z-body",
                      css: import_react2.css`
                  overflow: auto;    
              `,
                      children
                    })
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(m.div, {
                    css: import_react2.css`
              overflow: hidden;
              display:flex;
              justify-content: space-evenly;`,
                    initial: { height: "0", width: "0", opacity: 0 },
                    animate: {
                      height: "42px",
                      width: "100%",
                      opacity: 1
                    },
                    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToggleButtonGroup, {
                      value: width,
                      size: "small",
                      exclusive: true,
                      onChange: (_e, newSize) => {
                        if (newSize) {
                          setHeight(
                            breakPointHeights[breakPoints.indexOf(newSize)]
                          );
                          setWidth(newSize);
                        }
                      },
                      children: breakPoints.map((size, ind) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToggleButton, {
                        value: size,
                        children: size === 680 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", {
                          css: import_react2.css`
                        color: ${width === 680 ? "var(--text-color-highlight)" : "var(--text-color-normal)"};
                        `,
                          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Phone, {})
                        }) : size === 768 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", {
                          css: import_react2.css`
                        color: ${width === 768 ? "var(--text-color-highlight)" : "var(--text-color-normal)"};
                        `,
                          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Tablet, {})
                        }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", {
                          css: import_react2.css`
                        color: ${width === 1920 ? "var(--text-color-highlight)" : "var(--text-color-normal)"};
                      `,
                          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Tv, {})
                        })
                      }, ind))
                    })
                  })
                ]
              }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(m.div, {
                initial: { height: 0, width: 0, opacity: 0 },
                animate: { height: "100%", width: "88px", opacity: 1 },
                children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", {
                  css: import_react2.css`
              padding: 16px;
              display: flex;
              overflow: "hidden";
              align-items: center;          
              flex-direction: column;
              `,
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Fab, {
                      onClick: () => {
                        var _a;
                        (_a = document.querySelector("#root")) == null ? void 0 : _a.requestFullscreen();
                      },
                      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", {
                        css: import_react2.css`
                font-size: 20pt;
              `,
                        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(MdFullscreen, {}, "fs")
                      })
                    }, "fullscreen"),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(QRButton, {
                      url: location.origin + `/live/${room}/public`
                    }),
                    false,
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Fab, {
                      onClick: () => open(`/live/${room}/public`),
                      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Share, {})
                    }, "Share")
                  ]
                })
              })
            ]
          })
        })
      })
    })
  });
}, "DraggableWindow");
var DraggableWindow_default = DraggableWindow;
export {
  DraggableWindow,
  DraggableWindow_default as default
};
