import {
  Fab,
  MdFullscreen,
  Phone,
  Share,
  Tablet,
  ToggleButton,
  ToggleButtonGroup,
  Tv
} from "./chunk-chunk-X6XJPEVD.mjs";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  domMax,
  m
} from "./chunk-chunk-HYAK7S2L.mjs";
import {
  sendChannel
} from "./chunk-chunk-TIETGXNB.mjs";
import "./chunk-chunk-C4YGW4UC.mjs";
import {
  mST
} from "./chunk-chunk-BSZOAW4H.mjs";
import {
  Suspense,
  init_reactMod,
  lazy,
  useEffect,
  useRef,
  useState
} from "./chunk-chunk-5XDTQVNY.mjs";
import {
  css
} from "./chunk-chunk-PFBWPXXL.mjs";
import {
  jsx,
  jsxs
} from "./chunk-chunk-QWXFQFWU.mjs";
import "./chunk-chunk-PAZYWBPP.mjs";
import "./chunk-chunk-WNMOTYVA.mjs";
import {
  __name,
  init_define_process
} from "./chunk-chunk-4FHARZBR.mjs";

// js/DraggableWindow.tsx
init_define_process();
init_reactMod();

// js/Qr.lazy.tsx
init_define_process();
init_reactMod();
var LQR = lazy(() => import("./chunk-Qr-N7X5KNAX.mjs"));
var QRButton = /* @__PURE__ */ __name(({ url }) => /* @__PURE__ */ jsx(Suspense, {
  fallback: /* @__PURE__ */ jsx("div", {
    children: "...qr...,"
  }),
  children: /* @__PURE__ */ jsx(LQR, {
    url
  })
}), "QRButton");

// js/DraggableWindow.tsx
var breakPoints = [680, 768, 1920];
var breakPointHeights = [1137, 1024, 1080];
var sizes = [10, 25, 50, 75, 100];
var DraggableWindow = /* @__PURE__ */ __name(({
  children,
  room
}) => {
  const [scaleRange, changeScaleRange] = useState(100);
  const startPositions = { bottom: 0, right: 0 };
  const [{ bottom, right }, setPositions] = useState(startPositions);
  const [width, setWidth] = useState(window.innerWidth * devicePixelRatio);
  const [height, setHeight] = useState(window.innerHeight * devicePixelRatio);
  const videoRef = useRef(null);
  const scale = scaleRange / 100;
  useEffect(() => {
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
  const rgba = /* @__PURE__ */ __name((r2, g2, b2, a) => `rgba(${r2},${g2},${b2},${a})`, "rgba");
  const [bg, setBG] = useState(bgColor);
  const [mstCss, setCSS] = useState(mST().css);
  const [r, g, b, _a, ..._rest] = bg;
  useEffect(() => {
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
  const [clients, setClients] = useState(Object.keys(sendChannel.rtcConns));
  useEffect(() => {
    setClients([...Object.keys(sendChannel.rtcConns)]);
  }, [sendChannel.webRtcArray.length, setClients]);
  const delay = sessionStorage && Number(sessionStorage.getItem("delay")) || 0;
  const duration = sessionStorage && Number(sessionStorage.getItem("duration")) || 0.8;
  const type = sessionStorage && sessionStorage.getItem("type") || "spring";
  return /* @__PURE__ */ jsx(MotionConfig, {
    transition: { delay, type, duration },
    children: /* @__PURE__ */ jsx(AnimatePresence, {
      children: /* @__PURE__ */ jsx(LazyMotion, {
        features: { ...domAnimation, ...domMax },
        children: /* @__PURE__ */ jsx(m.div, {
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
          css: css`
            ${mstCss.split("body").join("#z-body")}
            touch-action: pinch-zoom;
            background-color: ${rgba(r | 96, g | 66, b || 160, 0.3)};
            backdrop-filter: blur(15px);
            z-index: 10;

            position: fixed;
          `,
          drag: true,
          dragMomentum: false,
          dragConstraints: {
            left: 0,
            right: width - 20 - width / 6,
            bottom: innerHeight
          },
          dragElastic: 0.5,
          children: /* @__PURE__ */ jsxs("div", {
            style: { display: "flex" },
            children: [
              /* @__PURE__ */ jsxs("div", {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                },
                children: [
                  /* @__PURE__ */ jsx(m.div, {
                    css: css`
              overflow: hidden;
              display:flex;
              justify-content: space-evenly;`,
                    initial: { height: "0px", width: "0", opacity: 0 },
                    animate: {
                      height: "42px",
                      width: "100%",
                      opacity: 1
                    },
                    children: /* @__PURE__ */ jsx(ToggleButtonGroup, {
                      value: scaleRange,
                      size: "small",
                      exclusive: true,
                      onChange: (_e, newScale) => {
                        newScale && changeScaleRange(newScale);
                      },
                      children: sizes.map((size, ind) => /* @__PURE__ */ jsx(ToggleButton, {
                        value: size,
                        children: /* @__PURE__ */ jsxs("span", {
                          css: css`
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
                  /* @__PURE__ */ jsx(m.div, {
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
                    children: /* @__PURE__ */ jsx(m.div, {
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
                      css: css`
                  overflow: auto;    
              `,
                      children
                    })
                  }),
                  /* @__PURE__ */ jsx(m.div, {
                    css: css`
              overflow: hidden;
              display:flex;
              justify-content: space-evenly;`,
                    initial: { height: "0", width: "0", opacity: 0 },
                    animate: {
                      height: "42px",
                      width: "100%",
                      opacity: 1
                    },
                    children: /* @__PURE__ */ jsx(ToggleButtonGroup, {
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
                      children: breakPoints.map((size, ind) => /* @__PURE__ */ jsx(ToggleButton, {
                        value: size,
                        children: size === 680 ? /* @__PURE__ */ jsx("span", {
                          css: css`
                        color: ${width === 680 ? "var(--text-color-highlight)" : "var(--text-color-normal)"};
                        `,
                          children: /* @__PURE__ */ jsx(Phone, {})
                        }) : size === 768 ? /* @__PURE__ */ jsx("span", {
                          css: css`
                        color: ${width === 768 ? "var(--text-color-highlight)" : "var(--text-color-normal)"};
                        `,
                          children: /* @__PURE__ */ jsx(Tablet, {})
                        }) : /* @__PURE__ */ jsx("span", {
                          css: css`
                        color: ${width === 1920 ? "var(--text-color-highlight)" : "var(--text-color-normal)"};
                      `,
                          children: /* @__PURE__ */ jsx(Tv, {})
                        })
                      }, ind))
                    })
                  })
                ]
              }),
              /* @__PURE__ */ jsx(m.div, {
                initial: { height: 0, width: 0, opacity: 0 },
                animate: { height: "100%", width: "88px", opacity: 1 },
                children: /* @__PURE__ */ jsxs("div", {
                  css: css`
              padding: 16px;
              display: flex;
              overflow: "hidden";
              align-items: center;          
              flex-direction: column;
              `,
                  children: [
                    /* @__PURE__ */ jsx(Fab, {
                      onClick: () => {
                        document.querySelector("#root")?.requestFullscreen();
                      },
                      children: /* @__PURE__ */ jsx("span", {
                        css: css`
                font-size: 20pt;
              `,
                        children: /* @__PURE__ */ jsx(MdFullscreen, {}, "fs")
                      })
                    }, "fullscreen"),
                    /* @__PURE__ */ jsx(QRButton, {
                      url: location.origin + `/live/${room}/public`
                    }),
                    false,
                    /* @__PURE__ */ jsx(Fab, {
                      onClick: () => open(`/live/${room}/public`),
                      children: /* @__PURE__ */ jsx(Share, {})
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
