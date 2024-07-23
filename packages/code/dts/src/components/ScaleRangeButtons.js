import { css } from "@emotion/react";
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { motion } from "framer-motion";
export const ScaleRangeButtons = ({ scaleRange, setScaleRange, sizes, maxScaleRange }) => {
  return (_jsx(motion.div, {
    layout: true,
    css: css`
        overflow: hidden;
        display: flex;
        justify-content: space-evenly;
      `,
    initial: { height: 0, width: 0 },
    animate: { height: 42, width: "100%" },
    children: _jsx(ToggleButtonGroup, {
      value: scaleRange,
      size: "small",
      exclusive: true,
      onChange: (_e, newScale) => {
        if (newScale !== null) {
          setScaleRange(newScale);
        }
      },
      children: Array.from(
        new Set([
          ...sizes.filter((x) => x < maxScaleRange),
          scaleRange,
          maxScaleRange,
        ]),
      )
        .sort((a, b) => a - b)
        .map((size) => (_jsx(ToggleButton, {
          value: size,
          children: _jsxs("span", {
            css: css`
                  color: ${
              size === scaleRange
                ? "var(--text-color-highlight)"
                : "var(--text-color-normal)"
            };
                `,
            children: [size, "%"],
          }),
        }, size))),
    }),
  }));
};
