import { motion } from "framer-motion";
import { ToggleButton, ToggleButtonGroup } from "../mui";
import { Phone, Tablet, Tv } from "../icons";
import { css } from "@emotion/react";

type BreakpointButtonsProps = {
  width: number;
  setWidth: (value: number) => void;
  breakPoints: number[];
};

export const BreakpointButtons: React.FC<BreakpointButtonsProps> = ({
  width,
  setWidth,
  breakPoints,
}) => {
  return (
    <motion.div
      layout
      css={css`
        overflow: hidden;
        display: flex;
        justify-content: space-evenly;
      `}
      initial={{ height: 0, width: "0%" }}
      animate={{ height: 42, width: "100%" }}
    >
      <ToggleButtonGroup
        value={width}
        size="small"
        exclusive
        onChange={(_e, newSize) => {
          if (newSize) setWidth(newSize);
        }}
      >
        {breakPoints.map((size, index) => (
          <ToggleButton key={size} value={size}>
            <span
              css={css`
                color: ${
                  width === size
                    ? "var(--text-color-highlight)"
                    : "var(--text-color-normal)"
                };
              `}
            >
              {index === 0 ? <Phone /> : index === 1 ? <Tablet /> : <Tv />}
            </span>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </motion.div>
  );
};
