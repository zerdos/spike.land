import { Record } from "immutable";
import debounce from "lodash.debounce";
import { md5 } from "./md5";

import type { Delta } from "./textDiff";
import { applyPatch as aPatch, createDelta } from "./textDiff";
// Import * as Immutable from "immutable"

mST();

type IUsername = string;

export { md5 };

export type ICodeSession = {
  code: string;
  i: number;
  transpiled: string;
  html: string;
  css: string;
};

export type INewWSConnection = {
  uuid: string;
  timestamp: number;
  hashCode: string;
  type: "new-ws-connection";
};

type ICodeInitEvent = {
  name: IUsername;
  uuid: string;
  type: "code-init";
  hashOfCode: string;
} & ICodeSession;

type OtherEvent = {
  name: IUsername;
  uuid: string;
  target: IUsername | "broadcast";
  type: "start" | "open" | "quit" | "get-cid" | "provide-cid" | "new-ws";
  timestamp: number;
};

export type IEvent =
  | INewWSConnection
  | OtherEvent
  | ICodeInitEvent;

export type IUserJSON = {
  name: IUsername;
  state: ICodeSession;
};

export type IUser = Record<
  IUserJSON & {
    room: string;
    state: Record<ICodeSession>;
  }
>;

export function initSession(room: string, u: IUserJSON) {
  return Record({ ...u, room, state: Record(u.state)() });
}

type CodePatch = { oldHash: string; newHash: string; patch: Delta[] };
type IApplyPatch = (
  prop: CodePatch,
) => Promise<void>;

type ICodeSess = {
  hashOfState: () => string;
  applyPatch: IApplyPatch;
  createPatchFromHashCode: (
    c: string,
    st: ICodeSession,
    updateHash?: (h: string) => void,
  ) => Promise<CodePatch>;
  json: () => IUserJSON;
};

let session: CodeSession | null = null;

const hashStore: { [key: string]: Record<ICodeSession> } = {};
export class CodeSession implements ICodeSess {
  session: IUser;
  update() {
    return debounce(() => this.updateNonDebounced(), 200, {
      maxWait: 500,
      trailing: true,
      leading: false,
    })();
  }

  updateNonDebounced() {
    Object.keys(this.cb).map((k) => this.cb[k]).map((x) => {
      try {
        x();
      } catch (error) {
        console.error("error calling callback", { err: error });
      }
    });
  }

  cb: { [key: string]: () => void } = {};

  onUpdate(fn: () => void, regId: string) {
    this.cb[regId] = fn;
  }

  hashCodeSession = 0;
  room: string;
  created: string = new Date().toISOString();
  constructor(room: string, user: IUserJSON) {
    session = this;
    this.room = room;
    const savedState: ICodeSession | null = null;

    // If (user.state.code === "" && room) {
    // const cacheKey = `state-${room}`;

    // if (storageAvailable("localStorage")) {
    //   const savedStateStr = localStorage.getItem(cacheKey);
    //   if (savedStateStr) {
    //     savedState = JSON.parse(savedStateStr);
    //   } else {
    //     fetch(`/live/${room}/mySession`).then(
    //       (resp) => resp.json(),
    //     ).then((session: IUserJSON) => {
    //       localStorage.setItem(cacheKey, JSON.stringify(session.state));
    //       this.session.set("state", Record(session.state)());
    //     });
    //   }
    // }
    // }

    this.session = initSession(room, {
      ...user,
      state: savedState ? savedState : JSON.parse(string_(user.state)),
    })();
  }

  hashOfState = () => {
    const state = this.session.get("state");
    const hashCode = md5(state.transpiled);
    hashStore[hashCode] = state;
    return hashCode;
  };

  createPatchFromHashCode = async (
    oldHash: string,
    state: ICodeSession,
    updateHash?: (h: string) => void,
  ) => {
    const s = JSON.parse(string_(state));

    let oldRec = hashStore[oldHash];
    let usedOldHash = oldHash;

    if (!oldRec) {
      const resp = await fetch(
        `/live/${this.room}/mST`,
      );
      if (!resp.ok) {
        console.error(location.origin + " is NOT OK", await resp.text());
        throw new Error(location.origin + " is NOT OK");
      }

      const { mST, hashCode } = await resp.json();
      if (updateHash) {
        updateHash(hashCode);
      }

      hashStore[hashCode] = this.session.get("state").merge(mST);

      usedOldHash = hashCode;
      oldRec = hashStore[hashCode];
    }

    const oldString = string_(oldRec.toJSON());

    const newRec = oldRec.merge(s);
    const newString = string_(newRec.toJSON());
    const newHash = md5(newRec.toJS().transpiled);
    hashStore[newHash] = newRec;

    const patch = createPatch(oldString, newString);
    return {
      oldHash: usedOldHash,
      newHash,
      patch,
    };
  };

  patchSync = (sess: ICodeSession) => {
    if (
      sess.code !== this.session.get("state").code &&
      sess.i <= this.session.get("state").i
    ) throw new Error("Code update without I update error");

    if (sess.i < this.session.get("state").i) {
      throw new Error("never going back!");
    }
    if (
      sess.code !== this.session.get("state").code &&
      sess.i <= this.session.get("state").i
    ) throw new Error("Code update without I update error");

    if (sess.transpiled.slice(0, 12) !== `/*${md5(sess.code)}*/`) {
      console.error(
        `missing: /*${md5(sess.code)}*/, transpiled: ${
          sess.transpiled.slice(0, 12)
        }`,
      );
      throw new Error("transpiled	hack issue");
    }

    if (sess.code.length < 5) {
      throw new Error("code deleted?");
    }

    if (sess.html.indexOf(md5(sess.transpiled)) === -1) {
      console.error(`missing md5trans from html: ${md5(sess.transpiled)}
      ${sess.html.slice(0, 64)}
      
      `);
      throw new Error(`render hack issue missing: ${md5(sess.transpiled)}.`);
    }

    if (sess.css.indexOf(md5(sess.transpiled)) === -1) {
      console.error(`missing from css: ${md5(sess.transpiled)}`);
      throw new Error(`render hack issue missing: ${md5(sess.transpiled)}.`);
    }

    const oldHash = md5(this.session.get("state").transpiled);
    this.session = this.session.set(
      "state",
      this.session.get("state").merge(sess),
    );
    const newHash = md5(this.session.get("state").transpiled);
    if (newHash !== oldHash) {
      // console.log({ sess });
      (self.requestAnimationFrame || setTimeout)(async () =>
        this.createPatchFromHashCode(oldHash, mST()).then(() => this.update())
      );
    }
  };

  // reverse = ({oldHash,
  // 	newHash,
  // 	patch}: CodePatch
  // 	)=>{
  // 		return 0;
  // 	}
  applyPatch = async ({
    oldHash,
    newHash,
    patch,
  }: CodePatch) => {
    const codeSpace = this.room || "";
    const now = mST();
    const nowHash = md5(now.transpiled);
    hashStore[nowHash] = hashStore[nowHash] || session?.session.get("state");
    if (
      !(Object.keys(hashStore).includes(
        oldHash,
      )) &&
      codeSpace
    ) {
      // console.log(Object.keys(hashStore));
      const resp = await fetch(
        `/live/${codeSpace}/mST`,
      );
      if (resp.ok) {
        const s: { hashCode: string; mST: ICodeSession } = await resp.json();

        // HashStore[Number(s.hashCode)] =

        const serverRecord = this.session.get("state").merge(
          JSON.parse(string_(s.mST)),
        );
        hashStore[md5(serverRecord.transpiled)] = serverRecord;
      } else {
        const { mST } = await import(
          `/live/${this.room}/mst.mjs?${Date.now()}`
        );
        const latestRec = this.session.get("state").merge(
          JSON.parse(string_(mST)),
        );
        hashStore[md5(latestRec.transpiled)] = latestRec;
      }
    }

    const maybeOldRec = hashStore[oldHash];
    if (!maybeOldRec) throw new Error(`cant find old record: ${oldHash}`);
    const oldString = string_(maybeOldRec.toJSON());

    const applied = aPatch(oldString, patch);
    const newState = JSON.parse(applied);
    const newRec: Record<ICodeSession> = this.session.get("state").merge(
      newState,
    );

    const newRecord = this.session.get("state").merge(newRec);
    if (newRecord.i < this.session.get("state").i) {
      throw new Error("never going back!");
    }
    if (
      newRecord.code !== this.session.get("state").code &&
      newRecord.i <= this.session.get("state").i
    ) throw new Error("Code update without I update error");

    const codeHash = md5(newRecord.code);

    if (newRecord.transpiled.slice(0, 12) !== `/*${codeHash}*/`) {
      console.error(
        `missing: ${codeHash}, transpiled: ${
          newRecord.transpiled.slice(0, 12)
        }`,
      );
      throw new Error("transpiled	hack issue");
    }

    if (newRecord.code.length < 5) {
      throw new Error("code deleted?");
    }

    const transHash = md5(newRecord.transpiled);
    if (newRecord.html.indexOf(transHash) === -1) {
      console.error(`missing from html: ${transHash}
      ${newRecord.html}
      
      `);
      throw new Error(`render hack issue missing: ${transHash}.`);
    }

    if (newRecord.css.indexOf(transHash) === -1) {
      console.error(`missing from css: ${transHash}`);
      throw new Error(`render hack issue missing: ${transHash}.`);
    }

    const newHashCheck = md5(newRecord.get("transpiled"));

    if (newHashCheck === newHash) {
      this.session = this.session.set("state", newRecord);
      //  Console.error("WRONG update");
    } else {
      throw new Error("Wrong patch");
    }
  };

  json() {
    const user = this.session.toJSON();
    const state = user.state.toJSON();
    return { ...user, state };
  }

  setRoom(codeSpace: string) {
    const user = this.session.set("room", codeSpace);
    this.session = user;
  }
}

export const hashCode = () => md5(mST().transpiled);
export function mST(p?: Delta[]) {
  if (!session) {
    return {
      i: 0,
      transpiled: "",
      code: "",
      html: "",
      css: "",
    };
  }

  // If (originStr) return addOrigin(session.json().state, originStr);
  const sessAsJs = session.session.get("state").toJSON();

  const { i, transpiled, code, html, css } = p
    ? JSON.parse(
      aPatch(
        string_(
          sessAsJs,
        ),
        p,
      ),
    )
    : sessAsJs;
  return { i, transpiled, code, html, css };
}

function addOrigin(s: ICodeSession, originString: string) {
  const { i, transpiled, code, html, css } = s;

  const mst = { i, transpiled, code, html, css };

  mst.code = mst.code.replace("from '/live", `from '${originString}/live`);
  mst.code = mst.code.replace("from './", `from '${originString}/live/`);

  mst.transpiled = mst.transpiled.replace(
    'from "/live',
    `from "${originString}/live`,
  );

  mst.transpiled = mst.transpiled.replace(
    'from "./',
    `from "${originString}/live/`,
  );
  return mst;
}

function string_(s: ICodeSession) {
  const { i, transpiled, code, html, css } = s;
  return JSON.stringify({ i, transpiled, code, html, css });
}

export const applyPatch: IApplyPatch = async (x) => {
  await session?.applyPatch(x);
  session?.update();
};

export const onSessionUpdate = (
  fn: () => void,
  regId = "default",
) => session?.onUpdate(fn, regId);
export const makePatchFrom = async (
  n: string,
  st: ICodeSession,
  update?: (h: string) => void,
) => (session!).createPatchFromHashCode(n, st, update);
export const makePatch = async (
  st: ICodeSession,
  update?: (h: string) => void,
) => makePatchFrom(md5(mST().transpiled), st, update);

export const startSession = (
  room: string,
  u: IUserJSON,
  originString: string,
): CodeSession =>
  session ||
  new CodeSession(room, {
    name: u.name,
    state: addOrigin(u.state, originString),
  });

function createPatch(oldCode: string, newCode: string) {
  return createDelta(oldCode, newCode);
}

export const patchSync = (sess: ICodeSession) => session?.patchSync(sess);

export { type Delta } from "./textDiff";
