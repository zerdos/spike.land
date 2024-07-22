import { css } from "@emotion/react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { motion } from "framer-motion";

type ScaleRangeButtonsProps = {
  scaleRange: number;
  setScaleRange: (value: number) => void;
  sizes: number[];
  maxScaleRange: number;
};

export const ScaleRangeButtons: React.FC<ScaleRangeButtonsProps> = ({
  scaleRange,
  setScaleRange,
  sizes,
  maxScaleRange,
}) => {
  return (
    <motion.div
      layout
      css={css`
        overflow: hidden;
        display: flex;
        justify-content: space-evenly;
      `}
      initial={{ height: 0, width: 0 }}
      animate={{ height: 42, width: "100%" }}
    >
      <ToggleButtonGroup
        value={scaleRange}
        size="small"
        exclusive
        onChange={(_e, newScale) => {
          if (newScale !== null) setScaleRange(newScale);
        }}
      >
        {Array.from(
          new Set([
            ...sizes.filter((x) => x < maxScaleRange),
            scaleRange,
            maxScaleRange,
          ]),
        )
          .sort((a, b) => a - b)
          .map((size) => (
            <ToggleButton key={size} value={size}>
              <span
                css={css`
                  color: ${
                  size === scaleRange
                    ? "var(--text-color-highlight)"
                    : "var(--text-color-normal)"
                };
                `}
              >
                {size}%
              </span>
            </ToggleButton>
          ))}
      </ToggleButtonGroup>
    </motion.div>
  );
};
