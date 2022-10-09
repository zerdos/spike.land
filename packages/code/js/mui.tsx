// Export {default as Fab} from "@mui/material/Fab/Fab"
// export {default as ToggleButtonGroup} from "@mui/material/ToggleButtonGroup/ToggleButtonGroup"
// export {default as ToggleButton} from "@mui/material/ToggleButton/ToggleButton"

import type {FC} from'react';
import {lazy, Suspense} from'react';

import type {
	FabProps,
	ToggleButtonGroupProps,
	ToggleButtonProps,
} from '@mui/material';
// Import type{ ReactNode } from "react";
//
//   const ToggleButtonGroup = muiToggleButtonGroup as typeof MuiToggleButtonGroup;
//   const ToggleButton = muiToggleButton as typeof MuiToggleButton;

const FabLazy = lazy(async () => import('@mui/material/Fab'));
export const Fab: FC<FabProps> = props => (
	<Suspense>
		<FabLazy {...props}></FabLazy>
	</Suspense>
);

const ToggleButtonLazy = lazy(async () => import('@mui/material/ToggleButton'));
export const ToggleButton: FC<ToggleButtonProps> = props => (
	<Suspense>
		<ToggleButtonLazy {...props} />
	</Suspense>
);

const ToggleButtonGroupLazy = lazy(async () =>
	import('@mui/material/ToggleButtonGroup'),
);
export const ToggleButtonGroup: FC<ToggleButtonGroupProps> = props => (
	<Suspense>
		<ToggleButtonGroupLazy {...props} />
	</Suspense>
);
