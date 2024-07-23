import { importMap } from "./importMap";
import { importMapReplace } from "./importMapReplace";
import { md5 } from "./md5";

import { resetCSS } from "./getResetCss";
import MyHTML from "./index.html";
import { Delta } from "./textDiff";

import { applyCodePatch, CodePatch, ICodeSession, makeHash, makeSession, string_ } from "./makeSess";

export { resetCSS };

export { makeHash, string_ };
export type { CodePatch, Delta, ICodeSession };
export { applyCodePatch, makeSession };
const HTML: string = MyHTML as unknown as string;
export { HTML };

export { importMapReplace };
export { md5 };
export { importMap };
