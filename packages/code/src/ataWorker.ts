globalThis.isSharedWorker = true;

importScripts("/workerScripts/superFetch.js");
import ReconnectingWebSocket from "./ReconnectingWebSocket";

import type * as RPC from "worker-rpc";

import type { ata as Ata } from "./ata";
import { applyCodePatch, createPatch, ICodeSession, makeHash, makeSession } from "./makeSess";
import type { prettierJs as Prettier } from "./prettierEsm";
import type { transpile as Transpile } from "./transpile";

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
    (code: string) => transpile(code),
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
    ws: typeof ReconnectingWebSocket;
    user: string;
    oldSession: ICodeSession;
  };
} = {};

Object.assign(self, { connections });

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
    BC.onmessage = ({ data }) => {
      if (data.i > c.oldSession.i && (data.hashCode || data.newHash)) {
        data.name = c.user;
        ws.send(JSON.stringify(data));
      }
      if (data.i > c.oldSession.i && data.html && data.code) {
        if (makeHash(data) !== makeHash(c.oldSession)) {
          const patchMessage = createPatch(c.oldSession, data);

          BC.postMessage({ ...patchMessage, name: c.user });

          ws.send(
            JSON.stringify({ ...patchMessage, name: c.user }),
          );
          c.oldSession = makeSession(data);
        }
      }
    };

    ws.onmessage = (ev: { data: string }) => {
      const data = JSON.parse(ev.data);
      if (data.type === "handShake") {
        ws.send(JSON.stringify({ name: c.user }));
        return;
      }
      if (data.type === "transpile") {
        transpile(data.code).then(transpiled => ws.send(JSON.stringify({ ...data, transpiled })));
      }
      if (data.newHash) {
        const newSession = applyCodePatch(c.oldSession, data);
        if (makeHash(newSession) !== makeHash(c.oldSession)) {
          transpile(data.code).then(transpiled => {
            BC.postMessage({ ...newSession, transpiled });
            c.oldSession = newSession;
          });
        }
      }
    };
  }
}
