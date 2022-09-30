import { css } from "@emotion/react";
export {Fab,Button, Box, Slider, ToggleButton, ToggleButtonGroup} from "@mui/material";

import { MdPhoneAndroid, MdShare, MdTabletAndroid, MdTv } from "react-icons/md";

export const Phone = () => (
  <span css={css`font-size:20pt`}>
    <MdPhoneAndroid/>
  </span>
);

export const Share = () => (
  <span css={css`font-size:20pt`}>
    <MdShare />
  </span>
);

export const Tablet = () => (
  <span css={css`font-size:20pt`}>
    <MdTabletAndroid />
  </span>
);

export const Tv = () => (
  <span css={css`font-size:20pt`}>
    <MdTv />
  </span>
);
