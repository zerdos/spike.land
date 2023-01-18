import ky from "ky";

import AVLTree from "avl";
import { connect, prettier } from "./shared";

import { CodePatch, createPatch, ICodeSession, makeHash, makeSession } from "./makeSess";

import { Mutex } from "async-mutex";
globalThis.firstRender = globalThis.firstRender || {
  html: "",
  css: "",
  code: "",
};

import { md5 } from "./md5";

import type { IFirstRender } from "../../spike.land/src/chatRoom";
import { ldb } from "./createDb";
import { syncStorage } from "./session";

type MessageProps = Partial<
  CodePatch | ICodeSession | {
    name?: string;
    codeSpace: string;
    session: ICodeSession;
    sess?: ICodeSession;
    type?: string;
    target?: string;
    candidate?: RTCIceCandidateInit;
    answer?: RTCSessionDescriptionInit;
    offer?: RTCSessionDescription;
  }
>;

const ws = {
  blockedMessages: [] as MessageProps[],
  post: (
    json: Partial<
      CodePatch & ICodeSession & { hashCode: string } & IFirstRender
    >,
  ) =>
    ky.post(location.href, {
      json,
      retry: {
        limit: 5,
        methods: ["post"],
        statusCodes: [413, 500],
        backoffLimit: 3000,
      },
    }).json(),
  send: (
    mess: MessageProps,
  ) => {
    ws.blockedMessages.push(mess);
  },
};

const codeSpace = location.pathname.slice(1).split("/")[1];

const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
const mutex = new Mutex();
export class Code {
  session = makeSession({ i: 0, code: "", html: "", css: "" });
  head = makeHash(this.session);
  user = localStorage.getItem(`${codeSpace} user`)
    ? localStorage.getItem(`${codeSpace} user`)
    : md5(self.crypto.randomUUID());

  syncKV(
    oldSession: ICodeSession,
    newSess: ICodeSession,
    message: CodePatch,
  ) {
    syncStorage(
      ldb(codeSpace).setItem,
      ldb(codeSpace).getItem,
      oldSession,
      newSess,
      message,
    );
  }

  constructor() {
    (async () => {
      localStorage.setItem(`${codeSpace} user`, this.user!);
      connect(`${codeSpace} ${this.user}`);

      await mutex.runExclusive(async () => {
        const head = Number(await ldb(codeSpace).getItem("head") || 0);
        const startSess = await ky(`${origin}/live/${codeSpace}/session`)
          .json<ICodeSession>();

        if (head === 0) {
          this.session = makeSession(startSess);
          this.head = makeHash(this.session);

          await ldb(codeSpace).setItem(
            "head",
            Number(this.head),
          ) as number;
          await ldb(codeSpace).setItem(
            String(this.head),
            this.session,
          ) as (ICodeSession | false);
        } else {
          const startSessLocal = await ldb(codeSpace).getItem(
            String(head),
          ) as ICodeSession;
          this.session = makeSession(
            startSess.i > startSessLocal.i ? startSess : startSessLocal,
          );

          this.head = makeHash(this.session);
        }
      });
    })();
  }

  async syncWS(newSession: ICodeSession) {
    const oldSession = this.session;
    const newSess = makeSession(newSession);

    const message = createPatch(oldSession, newSess);

    await mutex.waitForUnlock();
    await mutex.acquire();

    this.session = makeSession(newSession);

    await ldb(codeSpace).syncDb(oldSession, newSess, message);

    mutex.release();

    return newSession;
  }

  users = new AVLTree(
    (a: string, b: string) => a === b ? 0 : a < b ? 1 : -1,
    true,
  );
  ignoreUsers = Array<string>();

  waiting: (() => boolean)[] = [];

  buffy: Promise<void>[] = [];
  i = 0;

  async run() {
    await mutex.waitForUnlock();

    if (location.pathname === `/live/${codeSpace}`) {
      const code = await prettier(cSess.session.code);
      cSess.session = makeSession({ ...cSess.session, code });

      globalThis.firstRender.code = code;
      window.onmessage = ({ data }) => {
        if (
          data.html && data.code && data.i
        ) {
          const oldHash = makeHash(this.session);

          const newSession = makeSession(data);
          const newHash = makeHash(newSession);
          if (newHash !== oldHash) cSess.session = newSession;

          BC.postMessage({ ...cSess.session });
        }
      };

      connect(`${codeSpace} ${cSess.user}`);

      const { renderPreviewWindow } = await import("./renderPreviewWindow");
      renderPreviewWindow({ codeSpace });
    }
  }
}

if (!globalThis.cSess) {
  Object.assign(globalThis, {
    cSess: new Code(),
  });
}

const { cSess } = globalThis;

export const sess = cSess.session;

export const syncWS = async (sess: ICodeSession) => await cSess.syncWS(sess);

export const run = () => cSess.run();

const rcpOptions = {
  iceServers: ["stun3.l.google.com:19302"].map((url) => ({
    urls: `stun:${url}`,
  })),
};

rcpOptions.iceServers = [{ urls: "stun:stun.stunprotocol.org:3478" }, {
  urls: "stun:stun.l.google.com:19302",
}];
