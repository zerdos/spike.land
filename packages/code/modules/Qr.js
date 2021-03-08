"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QR = void 0;
/** @jsx jsx */
const renderer_1 = require("./renderer");
const QR = ({ url }) => {
    const canvasRef = renderer_1.React.useRef(null);
    renderer_1.React.useEffect(() => {
        const load = async () => {
            const { QRious } = await Promise.resolve().then(() => __importStar(require("https://code.zed.vision/modules/QRious.js")));
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
    return renderer_1.jsx("canvas", { css: renderer_1.css `
        border-radius: 16px;
        margin-bottom: 8px;
  `, ref: canvasRef });
};
exports.QR = QR;
