/** @jsx jsx */
import { css, jsx, React } from "./renderer";

export const QR: React.FC<{ url: string }> = ({ url }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const load = async () => {
      const { QRious } = await import(
        "https://code.zed.vision/modules/QRious.js"
      );
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
    };
    load();
  }, [url]);

  return <canvas
    css={css`
        border-radius: 16px;
        margin-bottom: 8px;
  `}
    ref={canvasRef}
  />;
};
