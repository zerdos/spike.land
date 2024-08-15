import { useCodeSpace } from "./hooks/useCodeSpace";
import { ICodeSession, makeHash, makeSession } from "./makeSess";
import { md5 } from "./md5";

import { connect } from "./shared";

// Initialize global state for first render
globalThis.firstRender = globalThis.firstRender
  || { html: "", css: "", code: "" };

const codeSpace = useCodeSpace();

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
    this.session = makeSession(
      await fetch(`/live/${codeSpace}/session`).then((resp) => resp.json()),
    );
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

export const { cSess } = globalThis;

export const sess = cSess.session;

export const run = () => cSess.run();
