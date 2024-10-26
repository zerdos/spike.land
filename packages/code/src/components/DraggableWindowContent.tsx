import { ActionButtons } from "./ActionButtons";
import { BreakpointButtons } from "./BreakpointButtons";
import { ContentWrapper } from "./ContentWrapper";
import { ScaledContent } from "./ScaledContent";
import { ScaleRangeButtons } from "./ScaleRangeButtons";

export const DraggableWindowContent = (
  {
    children,
    scaleRange,
    setScaleRange,
    width,
    setWidth,
    codeSpace,
    handleDownload,
    scale,
    sizes,
    maxScaleRange,
    breakPoints,
    innerHeight,
    bgColor,
    rgba,
  }: {
    children: JSX.Element;
    scaleRange: number;
    setScaleRange: (scaleRange: number) => void;
    width: number;
    setWidth: (width: number) => void;
    codeSpace: string;
    handleDownload: () => void;
    scale: number;
    sizes: number[];
    maxScaleRange: number;
    breakPoints: number[];
    innerHeight: number;
    bgColor: number[];
    rgba: (r: number, g: number, b: number, a: number) => string;
  },
) => (
  <div className="overflow-hidden flex" id="DraggableWindow">
    <div className="flex w-full flex-col items-center">
      <ScaleRangeButtons
        scaleRange={scaleRange}
        setScaleRange={setScaleRange}
        sizes={sizes}
        maxScaleRange={maxScaleRange}
      />
      <ContentWrapper
        scale={scale}
        innerHeight={innerHeight}
        width={width}
        bgColor={bgColor}
        rgba={rgba}
        type="spring"
      >
        <ScaledContent
          innerHeight={innerHeight}
          width={width}
          scale={scale}
          bgColor={bgColor}
          rgba={rgba}
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
