/** @jsx jsx */

import Fab from "@material-ui/core/Fab";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";

import {
  AnimateSharedLayout,
  css,
  jsx,
  motion,
  QR,
  React,
  render,
} from "./renderer";

const breakPoints = [640, 750, 1024, 1920];

const sizes = [25, 50, 75, 100, 200];

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
  const [scaleRange, changeScaleRange] = React.useState(75);
  const [height, changeHeight] = React.useState(innerHeight);

  const [width, setWidth] = React.useState(breakPoints[1]);
  const ref = React.useRef<HTMLDivElement>(null);
  const zbody = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    window.addEventListener("resize", () => changeHeight(innerHeight));
  });

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

  const scale = scaleRange / 100;

  return (
    <AnimateSharedLayout>
      <motion.div
        ref={ref}
        css={css`
            right: 20px;
            background-color: rgba(255, 255, 255, .25);  
            backdrop-filter: blur(7px);
            top: 20px;
            padding: 0px 0px 0px 16px;
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
          <div
            css={`
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
          >
            <ToggleButtonGroup
              value={scaleRange}
              size="small"
              exclusive
              color="white"
              onChange={(_e, newScale) =>
                newScale && changeScaleRange(newScale)}
            >
              {sizes.map((size) =>
                <ToggleButton
                  key={size}
                  value={size}
                >
                  {size}%
                </ToggleButton>
              )}
            </ToggleButtonGroup>

            <motion.div
              animate={{ width: width * scale, height: height * scale }}
              css={css`
                  display: block;
                  overflow: hidden;
                  border-radius: 8px;
                  opacity: 0.9;

    
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
                  overflow:overlay;
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
          <div
            css={`display: flex;
          align-items: center;
                
          flex-direction: column;
          padding: 16px;

                
          `}
          >
            <motion.div
              animate={{
                width: showQR ? 220 : 0,
                height: showQR ? 240 : 0,
              }}
              onClick={(e) => {
                setQR(!showQR);
              }}
            >
              {showQR && <QR url={session.url + "/edit/"} />}
            </motion.div>

            <div css="margin:0px 0px 16px">
              <Fab
                variant="extended"
                color="secondary"
                onClick={() => {
                  setQR(!showQR);
                }}
              >
                <QrIcon />
              </Fab>
            </div>

            <div>
              <Fab
                variant="extended"
                color="primary"
                onClick={() => {
                  onShare();
                }}
              >
                <ShareIcon />
              </Fab>
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

const QrIcon = () =>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    viewBox="0 0 24 24"
    fill="black"
    width="24px"
    height="24px"
  >
    <g>
      <rect fill="none" height="24" width="24" />
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <g>
        <path
          d="M5,11h4c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2H5C3.9,3,3,3.9,3,5v4C3,10.1,3.9,11,5,11z M5,5h4v4H5V5z"
        />
        <path
          d="M5,21h4c1.1,0,2-0.9,2-2v-4c0-1.1-0.9-2-2-2H5c-1.1,0-2,0.9-2,2v4C3,20.1,3.9,21,5,21z M5,15h4v4H5V15z"
        />
        <path
          d="M13,5v4c0,1.1,0.9,2,2,2h4c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-4C13.9,3,13,3.9,13,5z M19,9h-4V5h4V9z"
        />
        <path
          d="M21,20.5v-1c0-0.28-0.22-0.5-0.5-0.5h-1c-0.28,0-0.5,0.22-0.5,0.5v1c0,0.28,0.22,0.5,0.5,0.5h1C20.78,21,21,20.78,21,20.5 z"
        />
        <path
          d="M13,13.5v1c0,0.28,0.22,0.5,0.5,0.5h1c0.28,0,0.5-0.22,0.5-0.5v-1c0-0.28-0.22-0.5-0.5-0.5h-1C13.22,13,13,13.22,13,13.5z"
        />
        <path
          d="M16.5,15h-1c-0.28,0-0.5,0.22-0.5,0.5v1c0,0.28,0.22,0.5,0.5,0.5h1c0.28,0,0.5-0.22,0.5-0.5v-1C17,15.22,16.78,15,16.5,15 z"
        />
        <path
          d="M13,17.5v1c0,0.28,0.22,0.5,0.5,0.5h1c0.28,0,0.5-0.22,0.5-0.5v-1c0-0.28-0.22-0.5-0.5-0.5h-1C13.22,17,13,17.22,13,17.5z"
        />
        <path
          d="M15.5,21h1c0.28,0,0.5-0.22,0.5-0.5v-1c0-0.28-0.22-0.5-0.5-0.5h-1c-0.28,0-0.5,0.22-0.5,0.5v1C15,20.78,15.22,21,15.5,21 z"
        />
        <path
          d="M17.5,19h1c0.28,0,0.5-0.22,0.5-0.5v-1c0-0.28-0.22-0.5-0.5-0.5h-1c-0.28,0-0.5,0.22-0.5,0.5v1C17,18.78,17.22,19,17.5,19 z"
        />
        <path
          d="M18.5,13h-1c-0.28,0-0.5,0.22-0.5,0.5v1c0,0.28,0.22,0.5,0.5,0.5h1c0.28,0,0.5-0.22,0.5-0.5v-1C19,13.22,18.78,13,18.5,13 z"
        />
        <path
          d="M19.5,17h1c0.28,0,0.5-0.22,0.5-0.5v-1c0-0.28-0.22-0.5-0.5-0.5h-1c-0.28,0-0.5,0.22-0.5,0.5v1C19,16.78,19.22,17,19.5,17 z"
        />
      </g>
    </g>
  </svg>;
const ShareIcon = () =>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <g>
      <rect fill="none" height="24" width="24" />
      <rect fill="none" height="24" width="24" />
    </g>
    <g>
      <g>
        <path
          d="M18,16c-0.79,0-1.5,0.31-2.03,0.81L8.91,12.7C8.96,12.47,9,12.24,9,12s-0.04-0.47-0.09-0.7l7.05-4.11 C16.49,7.69,17.21,8,18,8c1.66,0,3-1.34,3-3s-1.34-3-3-3s-3,1.34-3,3c0,0.24,0.04,0.48,0.09,0.7L8.04,9.81C7.5,9.31,6.79,9,6,9 c-1.66,0-3,1.34-3,3s1.34,3,3,3c0.79,0,1.5-0.31,2.04-0.81l7.05,4.12C15.04,18.53,15,18.76,15,19c0,1.66,1.34,3,3,3s3-1.34,3-3 S19.66,16,18,16z"
        />
      </g>
    </g>
  </svg>;
