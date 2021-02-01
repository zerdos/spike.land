/** @jsx jsx */

import Fab from "@material-ui/core/Fab";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";
import Slider from "@material-ui/core/Slider";
import { css, jsx, motion, QR, React, render, AnimateSharedLayout, Motion } from "./renderer";
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
  const [scaleRange, changeScaleRange] = React.useState(80);
  const [width, setWidth] = React.useState(breakPoints[1]);
  const ref = React.useRef<HTMLDivElement>(null);
  const zbody = React.useRef<HTMLDivElement>(null);

  const marks = [
    {
      value: 20,
      label: "20%",
    },
    {
      value: 100,
      label: "100%",
    },
    {
      value: 150,
      label: "150%",
    },
  ];


  //@ts-ignore
  const height = innerHeight;

  const scale = scaleRange/100;

  return (
    <AnimateSharedLayout>
    <motion.div
      ref={ref}
      css={css`
            right: 20px;
            background-color: rgba(255, 255, 255, .25);  
            backdrop-filter: blur(7px);
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
          <motion.div
          animate={{  width: width*scale,
          height: height*scale}}
            css={css`
                  display: block;
                  margin: 16px;
                  position: relative;
          
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
                height,
                scale,
              }}
              css={`
                  position: absolute;
                  overflow-y: overlay;
              `}
            >
              <div
                id="zbody"
                ref={zbody}
              >
                {children}
              </div>
              
            </motion.div>
         
          </motion.div>
          <div css="text-align: center"> 
          <div css={`
              background: rgba(200, 200, 200, 0.7);
              display: inline-block;
              border-radius: 4px;
              overflow: hidden;
          `}>
          <ToggleButtonGroup
                value={width}
                size="small"
                exclusive
                color="white"
                onChange={(_e, newSize) => newSize && setWidth(newSize)}
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
        </div>
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
          <div
          css={css`
            display: block;
            margin-top: 40px;
            height: 150px;
            width: 24px;
            padding: 6px;
          `}>
          <Slider
                  value={scaleRange}
                  orientation="vertical"
                  onChange={(_e, v) => {
                    if (typeof v === "object") {
                      return;
                    }
                    _e.stopPropagation();
                    changeScaleRange(v);
                  }}
                  step={10}
                  marks={marks}
                  min={20}
                  max={150}
                >
                  {scaleRange}%
                </Slider>
                </div>
        </div>
      </div>
    </motion.div>
    </AnimateSharedLayout>
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
