import {
  Fab,
  MdFullscreen,
  Phone,
  Share,
  Tablet,
  ToggleButton,
  ToggleButtonGroup,
  Tv
} from "./chunk-chunk-BAIBTL4K.mjs";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  domMax,
  m
} from "./chunk-chunk-W2EEQE43.mjs";
import {
  sendChannel
} from "./chunk-chunk-YGOZMIU5.mjs";
import "./chunk-chunk-Y3RRPQZ5.mjs";
import "./chunk-chunk-5L5QDEBB.mjs";
import {
  mST
} from "./chunk-chunk-AUL7LWHA.mjs";
import {
  Suspense,
  init_reactMod,
  lazy,
  useEffect,
  useRef,
  useState
} from "./chunk-chunk-ADALEOZA.mjs";
import {
  css
} from "./chunk-chunk-HS3IGWOP.mjs";
import {
  jsx,
  jsxs
} from "./chunk-chunk-2RHEIFZB.mjs";
import "./chunk-chunk-334XPUVR.mjs";
import "./chunk-chunk-AZHCEBCB.mjs";
import {
  init_define_process
} from "./chunk-chunk-2DK73MPQ.mjs";

// js/DraggableWindow.tsx
init_define_process();
init_reactMod();

// js/Qr.lazy.tsx
init_define_process();
init_reactMod();
var LQR = lazy(() => import("./chunk-Qr-HRRVWJBF.mjs"));
var QRButton = ({ url }) => jsx(Suspense, {
  fallback: jsx("div", {
    children: "...qr...,"
  }),
  children: jsx(LQR, {
    url
  })
});

// js/DraggableWindow.tsx
var breakPoints = [680, 768, 1920];
var breakPointHeights = [1137, 1024, 1080];
var sizes = [10, 25, 50, 75, 100];
var DraggableWindow = ({
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
    const reveal = async () => {
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
    };
    reveal();
  }, []);
  const bgColor = window.getComputedStyle(
    document.body,
    null
  ).getPropertyValue("background-color").slice(4, -1).split(",").slice(0, 4).map((x) => Number(x) || 0);
  const rgba = (r2, g2, b2, a) => `rgba(${r2},${g2},${b2},${a})`;
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
  return jsx(MotionConfig, {
    transition: { delay, type, duration },
    children: jsx(AnimatePresence, {
      children: jsx(LazyMotion, {
        features: { ...domAnimation, ...domMax },
        children: jsx(m.div, {
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
          children: jsxs("div", {
            style: { display: "flex" },
            children: [
              jsxs("div", {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                },
                children: [
                  jsx(m.div, {
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
                    children: jsx(ToggleButtonGroup, {
                      value: scaleRange,
                      size: "small",
                      exclusive: true,
                      onChange: (_e, newScale) => {
                        newScale && changeScaleRange(newScale);
                      },
                      children: sizes.map((size, ind) => jsx(ToggleButton, {
                        value: size,
                        children: jsxs("span", {
                          css: css`
                       color: ${size === scaleRange ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                       `,
                          children: [
                            size,
                            "%"
                          ]
                        })
                      }, ind))
                    })
                  }),
                  jsx(m.div, {
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
                    css: css`
                    display: block;                    
                    overflow-x: hidden;
                    overflow-y: hidden;

            `,
                    children: jsx(m.div, {
                      initial: {
                        width: window.innerWidth,
                        height: window.innerHeight,
                        backgroundColor: rgba(r, g, b, 1),
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
                  overflow: overlay;
                  overflow-y: hidden;
                  ${mstCss.split("body").join("#root-" + room)}
                
              `,
                      children
                    })
                  }),
                  jsx(m.div, {
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
                    children: jsx(ToggleButtonGroup, {
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
                      children: breakPoints.map((size, ind) => jsx(ToggleButton, {
                        value: size,
                        children: size === 680 ? jsx("span", {
                          css: css`
                        color: ${width === 680 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `,
                          children: jsx(Phone, {})
                        }) : size === 768 ? jsx("span", {
                          css: css`
                        color: ${width === 768 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                        `,
                          children: jsx(Tablet, {})
                        }) : jsx("span", {
                          css: css`
                        color: ${width === 1920 ? "rgba(255,255,255,.8)" : "rgba(0,0,0,.3)"};
                      `,
                          children: jsx(Tv, {})
                        })
                      }, ind))
                    })
                  })
                ]
              }),
              jsx(m.div, {
                initial: { height: 0, width: 0, opacity: 0 },
                animate: { height: "100%", width: "88px", opacity: 1 },
                children: jsxs("div", {
                  css: css`
              padding: 16px;
              display: flex;
              overflow: "hidden";
              align-items: center;          
              flex-direction: column;
              `,
                  children: [
                    jsx(Fab, {
                      onClick: () => {
                        document.querySelector("#root")?.requestFullscreen();
                      },
                      children: jsx("span", {
                        css: css`
                font-size: 20pt;
              `,
                        children: jsx(MdFullscreen, {}, "fs")
                      })
                    }, "fullscreen"),
                    jsx(QRButton, {
                      url: location.origin + `/live/${room}/public`
                    }),
                    false,
                    jsx(Fab, {
                      onClick: () => open(`/live/${room}/public`),
                      children: jsx(Share, {})
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
};
var DraggableWindow_default = DraggableWindow;
export {
  DraggableWindow,
  DraggableWindow_default as default
};
