/** @jsx jsx */

import Fab from "@material-ui/core/Fab";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";
import Slider from "@material-ui/core/Slider";
import { css, jsx, motion, QR, React, render } from "./renderer";
// import CssBaseline from "@material-ui/core/CssBaseline";

const breakPoints = [640, 750, 1024, 1920];

const dragHelper = {
  drag: false,
};

interface DraggableWindowProps {
  onShare: () => void;
  session: {
    url: string;
  };
  position?: string;
}

export const DraggableWindow: React.FC<DraggableWindowProps> = (
  { onShare, position, session, children },
) => {
  const [showQR, setQR] = React.useState(false);
  const [scale, changeScale] = React.useState(100);
  const [width, setWidth] = React.useState(breakPoints[0]);
  const ref = React.useRef<HTMLDivElement>(null);
  const zbody = React.useRef<HTMLDivElement>(null);

  const marks = [
    {
      value: 10,
      label: "10%",
    },
    {
      value: 100,
      label: "100%",
    },
    {
      value: 250,
      label: "250%",
    },
  ];

  return (
    <motion.div
      ref={ref}
      css={css`
            right: 20px;
            background-color: rgba(255, 255, 255, .15);  
            backdrop-filter: blur(5px);
            top: 20px;
            padding: 16px;
            border-radius: 16px;
            white-space: normal;
            position: ${position ? position : "fixed"};
          `}
      dragElastic={0.5}
      onDrag={(e) => {
        dragHelper.drag = true;
      }}
      onDragEnd={(e) => {
        dragHelper.drag = false;
      }}
      dragMomentum={false}
      drag={true}
    >
      <div
        css={css`
              display: flex;
            
      `}
      >
        <div>
          <div
            css={css`
        justify-content: flex-end;
                display: flex;
              `}
          >
            <div
              css={css`
          background: rgb(204,204,204, 06);
          border-radius: 20px;
          overflow: hidden;
          float: right;
          display: flex;
          right: 0;
          top: 0;
      `}
            >
              {/* <CssBaseline /> */}
              <ToggleButtonGroup
                value={width}
                exclusive
                onChange={(_e, newSize) => setWidth(newSize)}
              >
                {breakPoints.map((size) =>
                  <ToggleButton
                    key={size}
                    value={size}
                  >
                    {size}px
                  </ToggleButton>
                )}
              </ToggleButtonGroup>
              <div
                css={css`
                margin-left: 40px;
                margin-right: 40px;
                vertical-align: middle;
                display: inline-block;
                width: 200px;
          `}
              >
                <Slider
                  value={scale}
                  onChange={(_e, v) => {
                    if (typeof v === "object") {
                      return;
                    }
                    _e.stopPropagation();
                    changeScale(v);
                  }}
                  step={10}
                  marks={marks}
                  min={10}
                  max={250}
                >
                  {scale}%
                </Slider>
              </div>
            </div>
          </div>
          <div
            css={css`
                  display: block;
                  width: ${scale}%;
                  height: ${scale}%;
                  margin: 16px;
                  background: inherit;
                    :after{
                      content: '';
                      z-index: -9;
                      background: inherit;
                      left: 16px;
                      right:16px;
                      top: 16px;
                      bottom: 16px;
                      box-shadow: inset 0 0 0 200px rgba(255,255,255,0.35);
                      filter: blur(10px);
                    }
                    >div{
                      background: white;
                      opacity: 0.8;
                      overflow: hidden;
                  border-radius: 16px;
                    }
           `}
          >
            <motion.div
              animate={{
                transformOrigin: "top left",
                width,
                scale: scale / 100,
              }}
            >
              <div
                id="zbody"
                ref={zbody}
              >
                {children}
              </div>
            </motion.div>
          </div>
        </div>
        <div
          css={css`
      display: block;
      text-align: right;`}
        >
          <motion.div
            animate={{
              width: showQR ? 220 : 64,
              height: showQR ? 240 : 64,
            }}
            css={css`
                overflow: hidden;
                display: inline-block;
                margin: 0px 8px 0px 8px;             
               `}
            onClick={(e) => {
              e.stopPropagation();
              setQR(!showQR);
            }}
          >
            {showQR ? <QR url={session.url + "/edit/"} /> : <Fab
              variant="extended"
              color="secondary"
            >
              QR
            </Fab>}
          </motion.div>
          <div>
            <Fab
              variant="extended"
              color="primary"
              onClick={() => {
                console.log(ref.current!.clientHeight);
                onShare();
              }}
            >
              Publish
            </Fab>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
interface IRenderProps extends DraggableWindowProps {
  children: React.ReactNode;
}

export const renderDraggableWindow = (
  props: IRenderProps,
  element: HTMLElement,
) =>
  render(
    <DraggableWindow {...props}>{props.children}</DraggableWindow>,
    element,
  );
