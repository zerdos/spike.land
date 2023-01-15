globalThis.isSharedWorker = true;

importScripts("/workerScripts/superFetch.js");
import { ReconnectingWebSocket } from "./ReconnectingWebSocket";

import type * as RPC from "worker-rpc";

import type { ata as Ata } from "./ata";
import { importMapReplace } from "./importMapReplace";
import { applyCodePatch, createPatch, ICodeSession, makeHash, makeSession } from "./makeSess";
import type { prettierJs as Prettier } from "./prettierEsm";
import type { transpile as Transpile } from "./transpile";

declare var self: SharedWorkerGlobalScope & { RpcProvider: typeof RPC.RpcProvider } & { ata: typeof Ata } & {
  prettierJs: typeof Prettier;
} & { transpile: typeof Transpile };

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

  rpcProvider.registerRpcHandler("transpile", (code: string) => transpile(code));

  rpcProvider.registerSignalHandler("connect", (signal: string) => setConnections(signal));

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

function setConnections(signal: string) {
  const parts = signal.split(" ");

  const codeSpace = parts[0];

  const user = parts[1];

  connections[codeSpace] = connections[codeSpace] || (async (codeSpace) => {
    console.log("new WS conn to: " + `wss://${location.host}/live/${codeSpace}/websocket`);
    const websocket = new ReconnectingWebSocket(
      `wss://${location.host}/live/${codeSpace}/websocket`,
    );
    const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);

    connections[codeSpace] = {
      BC,
      websocket,
      user,
      i: 0,
      oldSession: makeSession(await (await fetch(`/live/${codeSpace}/session`)).json()),
    };
    const session = connections[codeSpace];

    BC.onmessage = async ({ data }) => {
      if (data.i > session.i && (data.hashCode || data.newHash)) {
        session.i = data.i;

        data.name = session.user;
        websocket.send(JSON.stringify(data));
      }
      if (data.i >= session.i && data.html && data.code) {
        session.i = data.i;
        if (makeHash(data) !== makeHash(session.oldSession)) {
          const patchMessage = createPatch(session.oldSession, data);

          BC.postMessage({ ...patchMessage, name: session.user });

          websocket.send(JSON.stringify({ ...patchMessage, name: session.user }));
          session.oldSession = makeSession(data);
        }
      }
    };

    websocket.onopen = () => console.log("onOpened");
    websocket.onmessage = async ({ data }) => {
      const msg = JSON.parse(data);
      if (data.type === "handShake") {
        websocket.send(JSON.stringify({ name: session.user }));
        return;
      }
      if (data.type === "transpile") {
        const transpiled = importMapReplace(await transpile(data.code), location.origin);
        websocket.send(JSON.stringify({ ...data, transpiled }));
      }
      if (data.newHash) {
        const newSession = applyCodePatch(sess, data);
        if (makeHash(newSession) !== makeHash(session.oldSession)) {
          BC.postMessage(newSession);
          session.i = newSession.i;
          session.oldSession = newSession;
        }
      }

      if (msg.i > session.i) {
        session.i = msg.i;
        BC.postMessage(data);
      }
    };
  })(codeSpace);
}
