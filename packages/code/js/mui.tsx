/** @jsxImportSource @emotion/react */

export { default as Fab } from "@mui/material/Fab/Fab";
export { default as Button } from "@mui/material/Button/Button";

export { default as Box } from "@mui/material/Box/Box";
export { default as Slider } from "@mui/material/Slider/Slider";

import createSvgIcon from "@mui/material/utils/createSvgIcon";

export { default as ToggleButton } from "@mui/material/ToggleButton/ToggleButton";
export { default as ToggleButtonGroup } from "@mui/material/ToggleButtonGroup/ToggleButtonGroup";

export const FullscreenIcon = createSvgIcon(
  <path d="M17 4h5v5h-2V6h-3V4zM4 9V6h3V4H2v5h2zm16 6v3h-3v2h5v-5h-2zM7 18H4v-3H2v5h5v-2zM18 8H6v8h12V8z">
  </path>,
  "Fullscreen",
);

export const Phone = createSvgIcon(
  <path
    key="12"
    d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"
  >
  </path>,
  "PhoneAndroid",
);

export const Share = createSvgIcon(
  <path
    key="12"
    d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
  >
  </path>,
  "Share",
);

export const Tablet = createSvgIcon(
  <path
    key="12"
    d="M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z"
  />,
  "TabletAndroid",
);

export const Tv = createSvgIcon(
  <path
    key="12"
    d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
  >
  </path>,
  "Tv",
);

export const QrCode = createSvgIcon(
  <path
    key="12"
    d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm8-12v8h8V3h-8zm6 6h-4V5h4v4zm0 10h2v2h-2zm-6-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm0-4h2v2h-2zm2 2h2v2h-2z"
  >
  </path>,
  "QrCode",
);
