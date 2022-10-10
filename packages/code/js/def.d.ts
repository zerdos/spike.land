import type { ReactNode } from "react";

declare module "/live/code-main/js" {
  const returnFn: () => ReactNode;
  export default returnFn;
}

declare module "/npm:*" ;

