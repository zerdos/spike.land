import { css } from "@emotion/react";
import type { FC } from "react";
import { lazy, Suspense } from "react";

import type { FabProps, ToggleButtonGroupProps, ToggleButtonProps } from "@mui/material";

// Lazy load Material-UI Fab component
const FabLazy = lazy(() => import("@mui/material/Fab"));

export const Fab: FC<FabProps> = (props) => (
  <Suspense fallback={<Placeholder />}>
    <FabLazy {...props} />
  </Suspense>
);

// Lazy load Material-UI ToggleButton component
const ToggleButtonLazy = lazy(() => import("@mui/material/ToggleButton"));

export const ToggleButton: FC<ToggleButtonProps> = (props) => (
  <Suspense fallback={<Placeholder />}>
    <ToggleButtonLazy {...props} />
  </Suspense>
);

// Lazy load Material-UI ToggleButtonGroup component
const ToggleButtonGroupLazy = lazy(() => import("@mui/material/ToggleButtonGroup"));

export const ToggleButtonGroup: FC<ToggleButtonGroupProps> = (props) => (
  <Suspense fallback={<Placeholder />}>
    <ToggleButtonGroupLazy {...props} />
  </Suspense>
);

// Placeholder component to be shown while the component is loading
const Placeholder: FC = () => (
  <div
    css={css`
      width: 28px;
      height: 28px;
    `}
  />
);