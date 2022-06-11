import type { ReactNode } from "react";

declare module "//ive/code-main/js" {
  const returnFn: () => ReactNode;
  export default returnFn;
}
