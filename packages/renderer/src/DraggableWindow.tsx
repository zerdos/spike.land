/** @jsx jsx */

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

interface DraggableWindowProps {
  onShare: () => void;
  onRestore: () => void;
  session: {
    i: number;
    url: string;
    html: string;
    errorText: string;
    children: React.FC;
    setChild: React.Dispatch<React.SetStateAction<React.FC[]>>;
  };
  position?: string;
}

export const DraggableWindow: React.FC<DraggableWindowProps> = (
  { onShare, onRestore, position, session },
) => {
  const [isStable, setIsStable] = React.useState(false);
  const [scaleRange, changeScaleRange] = React.useState(75);
  const [height, changeHeight] = React.useState(innerHeight);
  const [childArray, setChild] = React.useState([session.children]);
  session.setChild = setChild;

  const [qrUrl, setQRUrl] = React.useState(session.url);
  const [errorText, setErrorText] = React.useState(" ");

  const [width, setWidth] = React.useState(breakPoints[1]);
  const ref = React.useRef<HTMLDivElement>(null);
  const zbody = React.useRef<HTMLDivElement>(null);

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
        }, 2000);
      }
      if (qrUrl !== session.url) setQRUrl(session.url);
      // setChild(session.children);
    }, 200);

    return () => clearInterval(handler);
  }, [setErrorText, setQRUrl, errorText, qrUrl]);

  const scale = scaleRange / 100;

  return (
    <motion.div
      ref={ref}
      css={css`
            right: 20px;
            background-color:rgba(92 ,92, 152, 0.8);
            backdrop-filter: blur(10px);
            top: 20px;
            padding: 0px 0px 0px 16px;
            border-radius: 16px;
            white-space: normal;
            position: ${position ? position : "fixed"};
          `}
      dragElastic={0.5}
      dragConstraints={{
        left: 0,
        right: 300,
        top: -height / 4,
        bottom: height / 2,
      }}
      dragMomentum={false}
      drag={true}
    >
      <div
        css={css` 
              display: flex;
                `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          <ToggleButtonGroup
            value={scaleRange}
            size="small"
            exclusive
            onChange={(_e, newScale) => newScale && changeScaleRange(newScale)}
          >
            {sizes.map((size) => (
              <ToggleButton
                key={size}
                value={size}
              >
                <span
                  css={css`
                       color: ${
                    size === scaleRange
                      ? "rgba(255,255,255,.8)"
                      : "rgba(0,0,0,.3)"
                  };
                       `}
                >
                  {size}%
                </span>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <motion.div
            animate={{
              width: width * scale / devicePixelRatio,
              height: height * scale,
            }}
            css={css`
              display: block;
              overflow: hidden;
              border-radius: 8px;
              opacity: 0.9;
           `}
          >
            {errorText.trim() !== "" && (
              <pre
                css={css`
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
                `}
              >
                {isStable && errorText.trim()}
                {isStable && errorText.trim() !== "" &&
                  (
                    <div
                      css={css`
                          text-align: right;
                        `}
                    >
                      <Button
                        variant="contained"
                        onClick={() => {
                          onRestore();
                          setErrorText("");
                        }}
                        color="primary"
                      >
                        Restore
                      </Button>
                    </div>
                  )}
              </pre>
            )}

            <motion.div
              animate={{
                transformOrigin: "0px 0px",
                width: width / devicePixelRatio,
                height: height,
                scale,
              }}
              css={css`
                  overflow:overlay;
                  >div{
                    width:100%;
                    height:100%;
                    overflow: overlay;
                    background: white;
                  }
              `}
            >
              {errorText
                ? <div dangerouslySetInnerHTML={createMarkup(session.html)} />
                : (
                  <React.Suspense fallback={<div>Error fallback</div>}>
                    <div
                      id="zbody"
                      key={session.i}
                      ref={zbody}
                    >
                      {child}
                    </div>
                  </React.Suspense>
                )}
            </motion.div>
          </motion.div>
          <ToggleButtonGroup
            value={width}
            size="small"
            exclusive
            onChange={(_e, newSize) => newSize && setWidth(newSize)}
          >
            {breakPoints.map((size) => (
              <ToggleButton
                key={size}
                value={size}
              >
                {size === 640
                  ? (
                    <Phone
                      css={css`
                        color: ${
                        width === 640
                          ? "rgba(255,255,255,.8)"
                          : "rgba(0,0,0,.3)"
                      };
                        `}
                    />
                  )
                  : size === 1024
                  ? (
                    <Tablet
                      css={css`
                        color: ${
                        width === 1024
                          ? "rgba(255,255,255,.8)"
                          : "rgba(0,0,0,.3)"
                      };
                        `}
                    />
                  )
                  : (
                    <Tv
                      css={css`
                        color: ${
                        width === 1920
                          ? "rgba(255,255,255,.8)"
                          : "rgba(0,0,0,.3)"
                      };
                      `}
                    />
                  )}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>

        <div
          css={css`
              display: flex;
              align-items: center;          
              flex-direction: column;
              padding: 16px;
              `}
        >
          <QRButton url={qrUrl} />

          <Fab
            variant="extended"
            color="primary"
            onClick={() => {
              onShare();
            }}
          >
            <Share />
          </Fab>
        </div>
      </div>
    </motion.div>
  );
};

function createMarkup(__html: string) {
  return { __html };
}
