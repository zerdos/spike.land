import type { FC } from "react";
import { ActionButtons } from "./ActionButtons";
import { BreakpointButtons } from "./BreakpointButtons";
import { ContentWrapper } from "./ContentWrapper";
import { ScaledContent } from "./ScaledContent";
import { ScaleRangeButtons } from "./ScaleRangeButtons";

interface ColorUtils {
  bgColor: number[];
  rgba: (r: number, g: number, b: number, a: number) => string;
}

interface ScaleProps {
  scaleRange: number;
  setScaleRange: (scaleRange: number) => void;
  scale: number;
  sizes: number[];
  maxScaleRange: number;
}

interface DimensionProps {
  width: number;
  setWidth: (width: number) => void;
  breakPoints: number[];
  innerHeight: number;
}

interface ActionProps {
  codeSpace: string;
  handleDownload: () => void;
}

interface DraggableWindowContentProps extends ScaleProps, DimensionProps, ActionProps, ColorUtils {
  children: React.ReactElement;
}

const rgba = (r: number, g: number, b: number, a: number) =>
  `rgba(${r || 1}, ${g || 1}, ${b || 1}, ${a || 0.7})`;

export const DraggableWindowContent: FC<DraggableWindowContentProps> = ({
  // Scale related props
  scaleRange,
  setScaleRange,
  scale,
  sizes,
  maxScaleRange,

  // Dimension related props
  width,
  setWidth,
  breakPoints,
  innerHeight,

  // Action related props
  codeSpace,
  handleDownload,

  // Color related props
  bgColor,

  // Content
  children,
}) => {
  const commonStyleProps = {
    innerHeight,
    width,
    bgColor,
  };

  return (
    <div
      className="overflow-hidden flex"
      id="DraggableWindow"
      data-testid="draggable-window-content"
    >
      <div className="flex w-full flex-col items-center">
        <ScaleRangeButtons
          scaleRange={scaleRange}
          setScaleRange={setScaleRange}
          sizes={sizes}
          maxScaleRange={maxScaleRange}
        />

        <ContentWrapper
          {...commonStyleProps}
          scale={scale}
          rgba={rgba}
        >
          <ScaledContent
            {...commonStyleProps}
            rgba={rgba}
            scale={scale}
          >
            {children}
          </ScaledContent>
        </ContentWrapper>

        <BreakpointButtons
          width={width}
          setWidth={setWidth}
          breakPoints={breakPoints}
        />
      </div>

      <ActionButtons
        codeSpace={codeSpace}
        handleDownload={handleDownload}
      />
    </div>
  );
};

// Type exports for consuming components
export type { ActionProps, ColorUtils, DimensionProps, DraggableWindowContentProps, ScaleProps };
