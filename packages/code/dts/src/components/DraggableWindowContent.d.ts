export declare const DraggableWindowContent: (
  {
    children,
    scaleRange,
    setScaleRange,
    width,
    setWidth,
    codeSpace,
    handleDownload,
    showChat,
    setShowChat,
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
    showChat: boolean;
    setShowChat: (show: boolean) => void;
    scale: number;
    sizes: number[];
    maxScaleRange: number;
    breakPoints: number[];
    innerHeight: number;
    bgColor: number[];
    rgba: (r: number, g: number, b: number, a: number) => string;
  },
) => import("@emotion/react/jsx-runtime").JSX.Element;
