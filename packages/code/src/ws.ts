import { ICodeSession, makeHash, makeSession } from "./makeSess";
import { md5 } from "./md5";

import { connect } from "./shared";

// Initialize global state for first render
globalThis.firstRender = globalThis.firstRender
  || { html: "", css: "", code: "" };

const codeSpace = getCodeSpace();

class Code {
  session: ICodeSession;
  head: string;
  user: string;
  ignoreUsers: string[] = [];
  waiting: (() => boolean)[] = [];
  buffy: Promise<void>[] = [];
  i = 0;

  constructor() {
    this.session = makeSession({ i: 0, code: "", html: "", css: "" });
    this.head = makeHash(this.session);
    this.user = localStorage.getItem(`${codeSpace} user`)
      || md5(self.crypto.randomUUID());

    this.init();
  }

  async init() {
    this.session = makeSession(await fetch(`/live/${codeSpace}/session`).then((resp) => resp.json<ICodeSession>()));
  }

  async run() {
    if (location.pathname === `/live/${codeSpace}`) {
      connect(`${codeSpace} ${this.user}`);

      const { renderPreviewWindow } = await import("./renderPreviewWindow");
      renderPreviewWindow({ codeSpace });
    }
  }
}

if (!globalThis.cSess) {
  globalThis.cSess = new Code();
}

const { cSess } = globalThis;

export const sess = cSess.session;

export const run = () => cSess.run();

/**
 * Get the code space from the current URL.
 * @returns {string} The code space.
 */
function getCodeSpace(): string {
  return location.pathname.slice(1).split("/")[1];
}
