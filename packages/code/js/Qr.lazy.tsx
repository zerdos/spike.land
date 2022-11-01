import { lazy, Suspense } from "react";
import type { FC } from "react";

const LQR = lazy(() => import("./Qr"));
export const QRButton: FC<{ url: string }> = ({ url }) => (
  <Suspense fallback={<div>...qr...,</div>}>
    <LQR url={url} />
  </Suspense>
);
