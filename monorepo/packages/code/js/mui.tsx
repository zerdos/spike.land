/** @jsx jsx */
import { jsx } from "@emotion/react";

import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import createSvgIcon from "@mui/material/utils/createSvgIcon";

import type { FC, MouseEvent } from "react";

export { Box };
export { Slider };

// Const MyToggleButtonGroup: FC<{
//   value: any,
//   onChangeD: ( _e: MouseEvent, value: any)=>void}> = ({value, onChangeD, children}) => <ToggleButtonGroup
// value={value}
// size="small"
// exclusive
// onChange={(_e, value)=>{
//   console.log("clicked");
//   onChangeD(_e, value);
// }}>{children}</ToggleButtonGroup>

// const MyToggleButton: FC<{key: any, value: any}>=({key, value, children}) => <ToggleButton
// key={key}
// value={value}
// >{children}</ToggleButton>

const FullscreenIcon = createSvgIcon(
  <path d="M17 4h5v5h-2V6h-3V4zM4 9V6h3V4H2v5h2zm16 6v3h-3v2h5v-5h-2zM7 18H4v-3H2v5h5v-2zM18 8H6v8h12V8z" />,
  "Fullscreen",
);

const Phone = createSvgIcon(
  <path
    key="12"
    d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"
  />,
  "PhoneAndroid",
);

const MyButton: FC<{ onClick: () => any }> = ({ onClick, children }) => (
  <Button variant="contained" color="primary" onClick={onClick}>
    {children}
  </Button>
);

const Share = createSvgIcon(
  <path
    key="12"
    d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
  />,
  "Share",
);

// Const FullScr = createSvgIcon(
//   <path
//     key="12"
//     d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h4v-2H5V8h14v10h-4v2h4c1.1 0 2-.9 2-2V6a2 2 0 00-2-2zm-7 6l-4 4h3v6h2v-6h3l-4-4z"
//   />,
//   "Share",
// );

// export function MdOpenInBrowser (props) {
//   return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24"},"child":[{"tag":"path","attr":{"fill":"none","d":"M0 0h24v24H0z"}},{"tag":"path","attr":{"d":"}}]})(props);
// };
// MdOpenInBrowser

const Tablet = createSvgIcon(
  <path
    key="12"
    d="M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"
  />,
  "TabletAndroid",
);

const Tv = createSvgIcon(
  <path
    key="12"
    d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
  />,
  "Tv",
);

const MyFsb: FC<{ onClick: () => void }> = ({ onClick, children }) => (
  <Fab
    variant="extended"
    color="primary"
    onClick={onClick}
  >
    {children}
  </Fab>
);

const QrCode = createSvgIcon(
  <path
    key="12"
    d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"
  />,
  "QrCode",
);

export {
  FullscreenIcon,
  MyButton as Button,
  MyFsb as Fab,
  Phone,
  QrCode,
  Share,
  Tablet,
  Tv,
};

export { default as ToggleButton } from "@mui/material/ToggleButton";
export { default as ToggleButtonGroup } from "@mui/material/ToggleButtonGroup";
