/** @jsx jsx */

import { QRious } from "@zedvision/qrious"
import React from "react"
import {css, jsx} from "@emotion/react"
import {motion} from "framer-motion"


import {QrCode} from "@material-ui/icons"

// const QR: React.FC<{ url: string }> = ({ url }) => {
//   const canvasRef = React.useRef<HTMLCanvasElement>(null);

//   React.useEffect(() => {
//     const load = async () => {

//       const options = {
//         size: 220,
//         element: canvasRef.current,
//         foregroundAlpha: 0.9,
//         foreground: "white",
//         backgroundAlpha: 1,
//         padding: 16,
//         background: "#1e1e1e",
//         value: url,
//       };

//       //@ts-ignore
//       const qr = new QRious(options);
//     };
//     load();
//   }, [url]);

//   return <canvas
//     css={css`
//         border-radius: 16px;
//         margin-bottom: 8px;
//   `}
//     ref={canvasRef}
//   />;
// };

// export const QRButton: React.FC<{ url: string }> = ({ url }) => {
//   const [showQR, setQR] = React.useState(false);
//   return <motion.div
//     animate={{
//       width: showQR ? 220 : 56,
//       height: showQR ? 240 : 48,
//     }}
//     onClick={(e) => {
//       setQR(!showQR);
//     }}
//     css={css`
//                 margin-bottom: 12px;
//               `}
//   >
//     {showQR ? <QR key={url} url={url + "edit/"} /> : <Fab
//       variant="extended"
//       color="secondary"
//       onClick={() => {
//         setQR(!showQR);
//       }}
//     >
//       <QrCode />
//     </Fab>}
//   </motion.div>;
// };
