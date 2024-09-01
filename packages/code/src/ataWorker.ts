import { BufferedSocket, Socket, StableSocket } from "@github/stable-socket";
import { Mutex } from "async-mutex";
import type { ata as Ata } from "./ata";
import type { createWorkflow as CreateWorkflow } from "./LangChain";
import { applyCodePatch, createPatch, ICodeSession, makeHash, makeSession, stringifySession } from "./makeSess";
import type { prettierCss as PrettierCSS, prettierJs as Prettier } from "./prettierEsm";
import type { build as Build, transpile as Transpile } from "./transpile";
import { rpcFactory } from "./workerRpc";

// Type declarations
declare var self: SharedWorkerGlobalScope & {
  ata: typeof Ata;
  prettierCss: typeof PrettierCSS;
  prettierJs: typeof Prettier;
  createWorkflow: typeof CreateWorkflow;
  transpile: typeof Transpile;
  build: typeof Build;
  tsx: (code: string) => Promise<string[]>;
};

// Import scripts
importScripts(
  "/workerScripts/dts.js",
  "/workerScripts/ata.js",
  "/workerScripts/prettierEsm.js",
  "/workerScripts/transpile.js",
  "/workerScripts/LangChain.js",
);

const { ata, prettierJs, transpile, build, tsx, prettierCss, createWorkflow } = self;

// Constants
const SOCKET_POLICY = {
  timeout: 4000,
  attempts: Infinity,
  maxDelay: 60000,
};

// Interfaces
interface Connection {
  BC: BroadcastChannel;
  lastCounter: number;
  codeSpace: string;
  ws: Socket;
  controller: AbortController;
  user: string;
  oldSession: ICodeSession;
}

interface BroadcastMod {
  i: number;
  code: string;
  html: string;
  css: string;
  transpiled: string;
  controller: AbortController;
}

// State
const connections: Record<string, Connection> = {};
const broadcastMod: Record<string, BroadcastMod> = {};
const mutex = new Mutex();

// Main function
function start(port: MessagePort) {
  const rpcProvider = rpcFactory(port);
  port.onmessage = ({ data }) => rpcProvider.dispatch(data);
  registerRpcHandlers(rpcProvider);
}

// RPC handlers
function registerRpcHandlers(rpcProvider: ReturnType<typeof rpcFactory>) {
  const handlers = {
    prettierJs: ({ code, toThrow }: { code: string; toThrow: boolean }) => prettierJs(code, toThrow),
    createWorkflow: (q: string) => createWorkflow(q),
    prettierCss: (code: string) => prettierCss(code),
    ata: ({ code, originToUse }: { code: string; originToUse: string }) => ata({ code, originToUse, tsx }),
    transpile: ({ code, originToUse }: { code: string; originToUse: string }) => transpile(code, originToUse),
    build: (params: {
      codeSpace: string;
      splitting?: boolean;
      entryPoint?: string;
      origin: string;
      format: "esm" | "iife";
      external?: string[];
    }) => build(params),
  };

  rpcProvider.registerRpcHandler("prettierJS", handlers.prettierJs);
  rpcProvider.registerRpcHandler("createWorkflow", handlers.createWorkflow);
  rpcProvider.registerRpcHandler("prettierCss", handlers.prettierCss);
  rpcProvider.registerRpcHandler("ata", handlers.ata);
  rpcProvider.registerRpcHandler("transpile", handlers.transpile);
  rpcProvider.registerRpcHandler("build", handlers.build);

  rpcProvider.registerSignalHandler(
    "connect",
    ({ signal, sess }: { signal: string; sess: ICodeSession }) => setConnections(signal, sess),
  );
}

// Connection setup
async function setConnections(signal: string, sess: ICodeSession) {
  const [codeSpace, user] = signal.split(" ");

  const connection = connections[codeSpace] || {
    user,
    codeSpace,
    controller: new AbortController(),
    oldSession: makeSession(sess),
  };

  if (!connection.ws) {
    connection.oldSession = makeSession(sess);
    connection.ws = createWebSocket(codeSpace, connection);
    connection.codeSpace = codeSpace;
    connection.BC = createBroadcastChannel(codeSpace, connection);
  }

  connections[codeSpace] = connection;
}

// Helper functions
async function fetchInitialSession(codeSpace: string): Promise<ICodeSession> {
  const response = await fetch(`/live/${codeSpace}/session`);
  return makeSession(await response.json());
}

function createWebSocket(codeSpace: string, connection: Connection): Socket {
  const host = location.host === "localhost" ? "testing.spike.land" : location.host;
  const url = `wss://${host}/live/${codeSpace}/websocket`;
  const delegate = createSocketDelegate(connection, codeSpace);
  const ws = new BufferedSocket(new StableSocket(url, delegate, SOCKET_POLICY));
  ws.open();
  return ws;
}

function createSocketDelegate(connection: Connection, codeSpace: string) {
  return {
    socketDidOpen: () => {},
    socketDidClose: () => {},
    socketDidFinish: () => {},
    socketDidReceiveMessage: (ws: Socket, message: string) => handleSocketMessage(ws, message, connection, codeSpace),
    socketShouldRetry: (_socket: Socket, code: number) => code !== 1008,
  };
}

function createBroadcastChannel(codeSpace: string, connection: Connection): BroadcastChannel {
  const BC = new BroadcastChannel(`${location.origin}/live/${codeSpace}/`);
  BC.onmessage = ({ data }) => handleBroadcastMessage(data, connection);
  return BC;
}

// Message handlers
async function handleSocketMessage(ws: Socket, message: string, connection: Connection, codeSpace: string) {
  const data = JSON.parse(message);
  const { BC, oldSession, user } = connection;

  if (data.i) {
    connection.lastCounter = data.i;
  }

  if (data.changes) {
    BC.postMessage({ ...data, sender: "ATA WORKER1" });
  } else if (data.strSess) {
    const sess = makeSession(data.strSess);
    const pp = createPatch(sess, oldSession);
    ws.send(JSON.stringify({ ...pp, name: user, i: oldSession.i }));
  } else if (data.i && data.i < oldSession.i) {
    return;
  } else if (data.type === "handShake") {
    await handleHandshake(ws, data, connection, codeSpace);
  } else if (data.newHash && data.oldHash) {
    await handleHashUpdate(data, connection, codeSpace);
  }
}

async function handleHandshake(ws: Socket, data: any, connection: Connection, codeSpace: string) {
  ws.send(JSON.stringify({ name: connection.user }));

  if (makeHash(connection.oldSession) !== String(data.hashCode)) {
    connection.oldSession = await fetchInitialSession(codeSpace);
    connection.BC.postMessage({
      ...connection.oldSession,
      sender: "ATA WORKER2",
    });
  }
}

async function handleHashUpdate(data: any, connection: Connection, codeSpace: string) {
  connection.controller.abort();
  connection.controller = new AbortController();
  const signal = connection.controller.signal;
  if (signal.aborted) return;

  await mutex.runExclusive(async () => {
    const oldSession = makeSession(connection.oldSession);
    const oldHash = makeHash(oldSession);

    if (oldHash !== String(data.oldHash)) {
      await handleHashMismatch(connection, codeSpace, signal);
    } else {
      await handleHashMatch(data, connection, oldSession, signal);
    }
  });
}

async function handleHashMismatch(connection: Connection, codeSpace: string, signal: AbortSignal) {
  if (signal.aborted) return;
  connection.oldSession = await fetchInitialSession(codeSpace);
  if (signal.aborted) return;
  const transpiled = connection.oldSession.transpiled || await transpile(connection.oldSession.code, location.origin);
  if (signal.aborted) return;
  connection.BC.postMessage({
    ...connection.oldSession,
    transpiled,
    sender: "ATA WORKER3",
  });
}

async function handleHashMatch(data: any, connection: Connection, oldSession: ICodeSession, signal: AbortSignal) {
  const newSession = applyCodePatch(oldSession, data);
  const newHash = makeHash(newSession);
  if (signal.aborted) return;
  const transpiled = await transpile(newSession.code, location.origin);
  if (signal.aborted) return;
  if (data.newHash === newHash) {
    connection.oldSession = newSession;
    connection.BC.postMessage({
      ...newSession,
      transpiled,
      sender: "ATA WORKER4",
    });
  } else {
    if (signal.aborted) return;
    connection.oldSession = await fetchInitialSession(connection.codeSpace);
    if (signal.aborted) return;
    connection.BC.postMessage({
      ...connection.oldSession,
      sender: "ATA WORKER5",
    });
  }
}

async function handleBroadcastMessage(data: {
  i: number;
  changes?: boolean;
  html: string;
  css: string;
  code: string;
  transpiled: string;
}, connection: Connection) {
  if (data.changes) {
    connection.ws.send(JSON.stringify({ ...data, name: connection.user }));
  } else if (data.i > connection.oldSession.i && data.html && data.code) {
    const codeSpace = connection.codeSpace;

    if (!broadcastMod[codeSpace]) {
      broadcastMod[codeSpace] = {
        ...data,
        controller: new AbortController(),
      };
    }

    const bMod = broadcastMod[codeSpace]!;
    bMod.controller.abort();

    const { signal } = bMod.controller = new AbortController();

    setTimeout(async () => {
      if (signal.aborted) return;

      if (connection.lastCounter < bMod.i) {
        const { code, html, css, i, transpiled } = bMod;
        const json = stringifySession({ code, html, css, i, transpiled });
        await fetch(`/live/${codeSpace}/session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: json,
        });
      }
    }, 1000);

    const oldSession = makeSession(connection.oldSession);
    const newSession = makeSession(data);
    const newHash = makeHash(newSession);
    const oldHash = makeHash(oldSession);

    if (newHash !== oldHash) {
      const patchMessage = createPatch(oldSession, newSession);
      if (patchMessage.oldHash === oldHash) {
        connection.oldSession = newSession;
        connection.ws.send(
          JSON.stringify({
            ...patchMessage,
            i: newSession.i,
            name: connection.user,
          }),
        );
      }
    }
  }
}

// Entry point
self.onconnect = (e) => start(e.ports[0]);

if (!("SharedWorkerGlobalScope" in self)) {
  start(self as typeof self & MessagePort);
}

export {};
