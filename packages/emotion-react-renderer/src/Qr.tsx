import { QRious } from "@zedvision/qrious/dist/qrious.esm";
import {React} from "./renderer"

export const QR: React.FC<{url: string}> = ({url}) => {

    
const canvasRef = React.useRef<HTMLCanvasElement>(null);

React.useEffect(()=>{

    const options = {
        size: 220,
        element: canvasRef.current,
        foregroundAlpha: 0.9,
        foreground: "white",
        backgroundAlpha: 1,
        padding: 10,
        background: "black",
        value: url,
      };

    const qr = new QRious({options})
    

}, [url])


return <canvas ref={canvasRef} />
}