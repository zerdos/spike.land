import { QRious } from "@zedvision/qrious/dist/qrious.esm.js";
/** @jsx jsx */

import { css, jsx, React } from "./renderer";

export const QR: React.FC<{ url: string }> = ({ url }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const options = {
      size: 220,
      element: canvasRef.current,
      foregroundAlpha: 0.9,
      foreground: "white",
      backgroundAlpha: 1,
      padding: 16,
      background: "#1e1e1e",
      value: url,
    };

    const qr = new QRious(options);
  }, [url]);

  return <canvas
    css={css`
        border-radius: 16px;
        margin-bottom: 8px;
  `}
    ref={canvasRef}
  />;
};
