import ReconnectingWebSocket from "reconnecting-websocket";

globalThis.isSharedWorker = true;

importScripts("/workerScripts/superFetch.js");

import type * as RPC from "worker-rpc";

import type { ata as Ata } from "./ata";
import { applyCodePatch, createPatch, ICodeSession, makeHash, makeSession } from "./makeSess";
import type { prettierJs as Prettier } from "./prettierEsm";
import type { transpile as Transpile } from "./transpile";

import { Mutex } from "async-mutex";

declare var self:
  & SharedWorkerGlobalScope
  & { RpcProvider: typeof RPC.RpcProvider }
  & { ata: typeof Ata }
  & {
    prettierJs: typeof Prettier;
  }
  & { transpile: typeof Transpile };

Object.assign(self, { fetch: globalThis.superFetch });

importScripts("/workerScripts/workerRpc.js");
importScripts("/workerScripts/prettierEsm.js");
importScripts("/workerScripts/ata.js");
importScripts("/workerScripts/transpile.js");

const { RpcProvider, ata, prettierJs, transpile } = self;

self.onconnect = ({ ports }) => {
  const p = ports[0];

  const rpcProvider = new RpcProvider(
    (message, transfer) => p.postMessage(message, transfer as StructuredSerializeOptions),
  );

  p.onmessage = (e) => rpcProvider.dispatch(e.data);
  globalThis.isSharedWorker = true;

  rpcProvider.registerRpcHandler(
    "prettierJs",
    (code: string) => prettierJs(code),
  );

  rpcProvider.registerRpcHandler(
    "ata",
    ({ code, originToUse }: { code: string; originToUse: string }) => ata({ code, originToUse, prettierJs }),
  );

  rpcProvider.registerRpcHandler(
    "transpile",
    (code: string) => code ? transpile(code) : code,
  );

  rpcProvider.registerSignalHandler(
    "connect",
    (signal: string) => setConnections(signal),
  );

  p.start();
};

const connections: {
  [key: string]: {
    BC: BroadcastChannel;
    ws: ReconnectingWebSocket;
    user: string;
    oldSession: ICodeSession;
    versionId: number;
  };
} = {};

Object.assign(self, { connections });
const mutex = new Mutex();

function setConnections(signal: string) {
  const parts = signal.split(" ");

  const codeSpace = parts[0];

  const user = parts[1];

  const c = connections[codeSpace] = connections[codeSpace] || {
    user,
    oldSession: makeSession({ i: 0, html: "", css: "", code: "" }),
  };

  if (!c.ws) {
    fetch(`/live/${codeSpace}/session`).then(s => s.json<ICodeSession>().then(ss => c.oldSession = makeSession(ss)));
    const ws = new ReconnectingWebSocket(
      `wss://${location.host}/live/${codeSpace}/websocket`,
    );
    c.ws = ws;
    const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
    c.BC = BC;
    BC.onmessage = async ({ data }) => {
      if (data.changes && data.versionId > c.versionId) {
        c.versionId = data.versionId;
        ws.send(JSON.stringify(data));
      }
      if (data.i > c.oldSession.i && data.html && data.code) {
        const oldSession = makeSession(c.oldSession);

        const newSession = makeSession(data);
        const newHash = makeHash(newSession);
        const oldHash = makeHash(oldSession);

        if (newHash !== oldHash) {
          const patchMessage = createPatch(oldSession, newSession);
          // const transpiled = await transpile(c.oldSession.code);

          // BC.postMessage({ ...patchMessage, name: c.user });
          if (patchMessage.oldHash === oldHash) {
            c.oldSession = newSession;
            ws.send(
              JSON.stringify({ ...patchMessage, i: newSession.i, name: c.user }),
            );

            // BC.postMessage(
            //   { ...newSession, transpiled },
            // );
          }
        }
      }
    };

    ws.onmessage = async (ev: { data: string }) => {
      const data = JSON.parse(ev.data);
      if (data.changes && data.versionId > c.versionId) {
        c.versionId = data.versionId;
        BC.postMessage(data);
      }
      if (data.strSess) {
        const sess = makeSession(data.strSess);
        const pp = createPatch(sess, c.oldSession);
        ws.send(JSON.stringify({ ...pp, name: c.user, i: c.oldSession.i }));
        return;
      }
      if (data.i < c.oldSession.i) return;
      if (data.type === "handShake") {
        ws.send(JSON.stringify({ name: c.user }));

        if (makeHash(c.oldSession) !== String(data.hashCode)) {
          c.oldSession = await (await fetch(`/live/${codeSpace}/session`)).json();
          //    const transpiled = await transpile(c.oldSession.code);

          BC.postMessage(c.oldSession);
          return;
        }
        return;
      }
      // if (data.type === "transpile") {
      // ws.send(JSON.stringify({ name: c.user }));

      // if (makeHash(c.oldSession) !== String(data.hashCode)) {
      // c.oldSession = await (await fetch(`/live/${codeSpace}/session`)).json();
      //  const transpiled = await transpile(c.oldSession.code);
      //
      // BC.postMessage({});
      // return;
      // }
      // return;
      // }
      // if (data.type === "transpile") {
      //   transpile(data.code).then(transpiled => ws.send(JSON.stringify({ ...data, transpiled })));
      // }

      // ^? a
      if (data.newHash) {
        await mutex.runExclusive(async () => {
          const oldSession = makeSession(c.oldSession);

          const newSession = applyCodePatch(oldSession, data);
          const newHash = makeHash(newSession);
          const oldHash = makeHash(oldSession);
          if (oldHash !== String(data.oldHash)) {
            c.oldSession = await (await fetch(`/live/${codeSpace}/session`)).json();

            BC.postMessage({ ...c.oldSession });
            return;
          }

          if (oldHash !== newHash) {
            c.oldSession = newSession;
            BC.postMessage({ ...newSession });
          }
        });
      }
    };
  }
}
