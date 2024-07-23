import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { lazy, Suspense } from "react";
const LQR = lazy(() => import("./Qr"));
export const QRButton = (
  { url },
) => (_jsx(Suspense, { fallback: _jsx("div", { children: "qr" }), children: _jsx(LQR, { url: url }) }));
