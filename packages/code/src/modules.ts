import { resetCSS } from "./getResetCss";
import MyTV from "./hooks/tw.html";
import { importMap } from "./importMap";
import { importMapReplace } from "./importMapReplace";
import MyHTML from "./index.html";
import { md5 } from "./md5";
import { Delta } from "./textDiff";

export { importMapReplace };

import { applyCodePatch, CodePatch, ICodeSession, makeHash, makeSession, string_ } from "./makeSess";

export { resetCSS };
export { importMap };

export { makeHash, string_ };
export type { CodePatch, Delta, ICodeSession };
export { applyCodePatch, makeSession };

const HTML: string = MyHTML as unknown as string;

const TW: string = MyTV as unknown as string;

export { HTML, TW };

export { md5 };
