import { rpcFactory } from "./workerRpc";

import type { ata as Ata } from "./ata";
import { applyCodePatch, createPatch, ICodeSession, makeHash, makeSession } from "./makeSess";
import type { Prettier } from "./prettierEsm";
import type { transpile as Transpile } from "./transpile";

import { Mutex } from "async-mutex";

import { BufferedSocket, Socket, StableSocket } from "@github/stable-socket";

const policy = {
  timeout: 4000,
  attempts: Infinity,
  maxDelay: 60000,
};

declare var self:
  & SharedWorkerGlobalScope
  & { ata: typeof Ata }
  & {
    prettierJs: Prettier;
  }
  & { transpile: typeof Transpile };

// Object.assign(self, { fetch: globalThis.superFetch });
importScripts("/swVersion.js");
importScripts("/workerScripts/ata.js");
importScripts("/workerScripts/prettierEsm.js");
importScripts("/workerScripts/transpile.js");

const { ata, prettierJs, transpile } = self;
const start = (port: MessagePort) => {
  // All your normal Worker and SharedWorker stuff can be placed here and should just work, with no extra setup required

  const rpcProvider = rpcFactory(port);

  port.onmessage = ({ data }) => rpcProvider.dispatch(data);

  rpcProvider.registerRpcHandler(
    "prettierJs",
    (code: string) => prettierJs(code),
  );

  rpcProvider.registerRpcHandler(
    "ata",
    ({ code, originToUse }: { code: string; originToUse: string }) => {
      return ata({ code, originToUse, prettierJs });
    },
  );

  rpcProvider.registerRpcHandler(
    "transpile",
    ({ code, originToUse }: { code: string; originToUse: string }) => transpile(code, originToUse),
  );

  rpcProvider.registerSignalHandler(
    "connect",
    (signal: string) => setConnections(signal),
  );
};

self.onconnect = (e) => {
  let [port] = e.ports;
  start(port);
};

// This is the fallback, just in case the browser doesn't support SharedWorkers natively
self.onconnect = ({ ports }) => start(ports[0]);

// If the script is running in a normal webworker thr don't worry about the Shared Worker message ports
if (!("SharedWorkerGlobalScope" in self)) {
  start(self as typeof self & MessagePort);
}

const connections: {
  [key: string]: {
    BC: BroadcastChannel;
    ws: Socket;
    user: string;
    oldSession: ICodeSession;
  };
} = {};

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
    fetch(`/live/${codeSpace}/session`).then((s) =>
      s.json<ICodeSession>().then((ss) => c.oldSession = makeSession(ss))
    );

    const delegate = {
      socketDidOpen(_socket: Socket) {
        // Socket is ready to write.
      },
      socketDidClose(_socket: Socket, _code?: number, _reason?: string) {
        // Socket closed and will retry the connection.
      },
      socketDidFinish(_socket: Socket) {
        // Socket closed for good and will not retry.
      },
      socketDidReceiveMessage(ws: Socket, message: string) {
        const data = JSON.parse(message);
        (async () => {
          if (data.changes) {
            BC.postMessage(data);
          }
          if (data.strSess) {
            const sess = makeSession(data.strSess);
            const pp = createPatch(sess, c.oldSession);
            ws.send(JSON.stringify({ ...pp, name: c.user, i: c.oldSession.i }));
            return;
          }
          if (data.i && data.i < c.oldSession.i) return;
          if (data.type === "handShake") {
            ws.send(JSON.stringify({ name: c.user }));

            if (makeHash(c.oldSession) !== String(data.hashCode)) {
              c.oldSession = await (await fetch(`/live/${codeSpace}/session`))
                .json();
              const transpiled = data.transpiled
                || await transpile(c.oldSession.code, location.origin);

              BC.postMessage({ ...c.oldSession, transpiled });
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
          if (data.newHash && data.oldHash) {
            await mutex.runExclusive(async () => {
              const oldSession = makeSession(c.oldSession);
              const oldHash = makeHash(oldSession);

              if (oldHash !== String(data.oldHash)) {
                c.oldSession = makeSession(
                  await (await fetch(`/live/${codeSpace}/session`)).json(),
                );

                console.log(c.oldSession);
                BC.postMessage(c.oldSession);
                return;
              }

              const newSession = applyCodePatch(oldSession, data);
              const newHash = makeHash(newSession);

              if (data.newHash === newHash) {
                c.oldSession = newSession;
                console.log(newSession);
                BC.postMessage(newSession);
                return;
              }

              c.oldSession = makeSession(
                await (await fetch(`/live/${codeSpace}/session`)).json(),
              );

              console.log(c.oldSession);
              BC.postMessage(c.oldSession);
            });
          }
        })();
      },
      socketShouldRetry(_socket: Socket, code: number): boolean {
        // Socket reconnects unless server returns the policy violation code.
        return code !== 1008;
      },
    };
    const url = `wss://${location.host}/live/${codeSpace}/websocket`;
    const ws = new BufferedSocket(new StableSocket(url, delegate, policy));
    ws.open();

    c.ws = ws;
    const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
    c.BC = BC;
    BC.onmessage = async ({ data }) => {
      if (data.changes) {
        ws.send(JSON.stringify({ ...data, name: c.user }));
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
              JSON.stringify({
                ...patchMessage,
                i: newSession.i,
                name: c.user,
              }),
            );

            // BC.postMessage(
            //   { ...newSession, transpiled },
            // );
          }
        }
      }
    };
  }
}

export {};
