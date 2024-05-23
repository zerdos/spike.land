import AVLTree from "avl";
import { connect } from "./shared";
import { CodePatch, createPatch, ICodeSession, makeHash, makeSession } from "./makeSess";
import { Mutex } from "async-mutex";
import { md5 } from "./md5";
import { ldb } from "./createDb";
import { syncStorage } from "./session";

globalThis.firstRender = globalThis.firstRender || { html: "", css: "", code: "" };

const codeSpace = location.pathname.slice(1).split("/")[1];
const mutex = new Mutex();

class Code {
  session = makeSession({ i: 0, code: "", html: "", css: "" });
  head = makeHash(this.session);
  user = localStorage.getItem(`${codeSpace} user`) || md5(self.crypto.randomUUID());
  users = new AVLTree((a: string, b: string) => (a === b ? 0 : a < b ? 1 : -1), true);
  ignoreUsers: string[] = [];
  waiting: (() => boolean)[] = [];
  buffy: Promise<void>[] = [];
  i = 0;

  constructor() {
    (async () => {
      localStorage.setItem(`${codeSpace} user`, this.user!);
      connect(`${codeSpace} ${this.user}`);

      await mutex.runExclusive(async () => {
        const head = Number((await ldb(codeSpace).getItem("head")) || 0);
        const startSess = await fetch(`${origin}/live/${codeSpace}/session`).then(resp => resp.json<ICodeSession>());

        if (head === 0) {
          this.session = makeSession(startSess);
          this.head = makeHash(this.session);

          await ldb(codeSpace).setItem("head", Number(this.head));
          await ldb(codeSpace).setItem(String(this.head), this.session);
        } else {
          const startSessLocal = (await ldb(codeSpace).getItem(String(head))) as ICodeSession;
          this.session = makeSession(startSess.i > startSessLocal.i ? startSess : startSessLocal);
          this.head = makeHash(this.session);
        }
      });
    })();
  }

  syncKV(oldSession: ICodeSession, newSess: ICodeSession, message: CodePatch) {
    syncStorage(
      ldb(codeSpace).setItem,
      ldb(codeSpace).getItem,
      oldSession,
      newSess,
      message,
    );
  }

  async syncWS(newSession: ICodeSession) {
    const oldSession = this.session;
    const newSess = makeSession(newSession);

    const message = createPatch(oldSession, newSess);

    await mutex.runExclusive(async () => {
      this.session = makeSession(newSession);
      await ldb(codeSpace).syncDb(oldSession, newSess, message);
    });

    return newSession;
  }

  async run() {
    await mutex.waitForUnlock();

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
export const syncWS = async (sess: ICodeSession) => await cSess.syncWS(sess);
export const run = () => cSess.run();
