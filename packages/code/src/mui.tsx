import { css } from "@emotion/react";
import type { FC } from "react";
import { lazy, Suspense } from "react";

import type { FabProps, ToggleButtonGroupProps, ToggleButtonProps } from "@mui/material";

const FabLazy = lazy(async () => import("@mui/material/Fab"));
export const Fab: FC<FabProps> = (props) => (
  <Suspense
    fallback={
      <div
        css={css`
        width: 28px; 
        height:28px;
        `}
      >
      </div>
    }
  >
    <FabLazy {...props} />
  </Suspense>
);

const ToggleButtonLazy = lazy(async () => import("@mui/material/ToggleButton"));
export const ToggleButton: FC<ToggleButtonProps> = (props) => (
  <Suspense fallback={<div css={css`width: 28px; height:28px;`} />}>
    <ToggleButtonLazy {...props} />
  </Suspense>
);

const ToggleButtonGroupLazy = lazy(async () => import("@mui/material/ToggleButtonGroup"));
export const ToggleButtonGroup: FC<ToggleButtonGroupProps> = (props) => (
  <Suspense fallback={<div css={css`width: 28px; height:28px;`} />}>
    <ToggleButtonGroupLazy {...props} />
  </Suspense>
);
