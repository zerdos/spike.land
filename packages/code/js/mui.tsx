// export {default as Fab} from "@mui/material/Fab/Fab"
// export {default as ToggleButtonGroup} from "@mui/material/ToggleButtonGroup/ToggleButtonGroup"
// export {default as ToggleButton} from "@mui/material/ToggleButton/ToggleButton"


import React, {Suspense} from "react";


import type {
    ToggleButton as MuiToggleButton,
    ToggleButtonGroup as MuiToggleButtonGroup,
  } from "@mui/material";
  // import type{ ReactNode } from "react";
//   
//   const ToggleButtonGroup = muiToggleButtonGroup as typeof MuiToggleButtonGroup;
//   const ToggleButton = muiToggleButton as typeof MuiToggleButton;



const FabLazy = React.lazy(()=>import("@mui/material/Fab"))
export const Fab = (props: object)=> <Suspense><FabLazy {...props}></FabLazy></Suspense>



const ToggleButtonLazy = React.lazy(()=>import("@mui/material/ToggleButton"));
export const ToggleButton: typeof MuiToggleButton = ({value, children, onChange}) => <Suspense><ToggleButtonLazy value={value} onChange={onChange}>{children}</ToggleButtonLazy></Suspense>




const ToggleButtonGroupLazy = React.lazy(()=>import("@mui/material/ToggleButtonGroup"));
export const ToggleButtonGroup: typeof MuiToggleButtonGroup  = ({children, value, exclusive, onChange}) => <Suspense><ToggleButtonGroupLazy exclusive={exclusive} onChange={onChange} value={value}>{children}</ToggleButtonGroupLazy></Suspense>
