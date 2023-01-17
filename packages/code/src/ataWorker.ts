globalThis.isSharedWorker = true;

importScripts("/workerScripts/superFetch.js");
import { ReconnectingWebSocket } from "./ReconnectingWebSocket";

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
    websocket: WebSocket;
    user: {};
    i: number;
    oldSession: ICodeSession;
  };
} = {};

Object.assign(self, { connections });

async function setConnections(signal: string) {
  const parts = signal.split(" ");

  const codeSpace = parts[0];

  const user = parts[1];

  connections[codeSpace] = connections[codeSpace] || await (async (codeSpace: string, user: string) => {
    const c = connections[codeSpace] = {
      BC: new BroadcastChannel(`${location.origin}/live/${codeSpace}/`),
      ws: new ReconnectingWebSocket(
        `wss://${location.host}/live/${codeSpace}/websocket`,
      ),
      user,
      i: 0,
      oldSession: makeSession(
        await (await fetch(`/live/${codeSpace}/session`)).json(),
      ),
    };

    c.ws.onopen = () => console.log("onOpened");
    c.ws.onmessage = (ev: { data: string }) => {
      const data = JSON.parse(ev.data);
      if (data.type === "handShake") {
        c.ws.send(JSON.stringify({ name: c.user }));
        return;
      }
      if (data.type === "transpile") {
        transpile(data.code).then(transpiled => c.ws.send(JSON.stringify({ ...data, transpiled })));
      }
      if (data.newHash) {
        const newSession = applyCodePatch(c.oldSession, data);
        if (makeHash(newSession) !== makeHash(c.oldSession)) {
          transpile(data.code).then(transpiled => {
            c.BC.postMessage({ ...newSession, transpiled });
            c.i = newSession.i;
            c.oldSession = newSession;
          });
        }
      }
    };

    c.BC.onmessage = ({ data }) => {
      if (data.i > c.i && (data.hashCode || data.newHash)) {
        c.i = data.i;

        data.name = c.user;
        c.ws.send(JSON.stringify(data));
      }
      if (data.i > c.i && data.html && data.code) {
        c.i = data.i;
        if (makeHash(data) !== makeHash(c.oldSession)) {
          const patchMessage = createPatch(c.oldSession, data);

          c.BC.postMessage({ ...patchMessage, name: c.user });

          c.ws.send(
            JSON.stringify({ ...patchMessage, name: c.user }),
          );
          c.oldSession = makeSession(data);
        }
      }
    };
  })(codeSpace, user);
}
