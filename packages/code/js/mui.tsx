import {css} from "@emotion/react"
export { default as Fab } from "@mui/material/Fab/Fab";
export { default as Button } from "@mui/material/Button/Button";

export { default as Box } from "@mui/material/Box/Box";
export { default as Slider } from "@mui/material/Slider/Slider";

export { default as ToggleButton } from "@mui/material/ToggleButton/ToggleButton";
export { default as ToggleButtonGroup } from "@mui/material/ToggleButtonGroup/ToggleButtonGroup";

import { MdPhoneAndroid, MdTabletAndroid, MdShare, MdTv } from "react-icons/md";

export const Phone =()=> <span css={css`font-size:20pt`}><MdPhoneAndroid></MdPhoneAndroid></span>

export const Share =  ()=> <span css={css`font-size:20pt`}><MdShare /></span>


export const Tablet =()=> <span css={css`font-size:20pt`}><MdTabletAndroid /></span>


export const Tv  =()=> <span css={css`font-size:20pt`}><MdTv /></span>


