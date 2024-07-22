import { rpcFactory } from "./workerRpc";
import { applyCodePatch, createPatch, makeHash, makeSession } from "./makeSess";
import { Mutex } from "async-mutex";
import { BufferedSocket, StableSocket } from "@github/stable-socket";
const policy = {
    timeout: 4000,
    attempts: Infinity,
    maxDelay: 60000,
};
importScripts("/swVersion.js");
importScripts("/workerScripts/dts.js");
importScripts("/workerScripts/ata.js");
importScripts("/workerScripts/prettierEsm.js");
importScripts("/workerScripts/transpile.js");
const { ata, prettierJs, transpile, build, tsx } = self;
const start = (port) => {
    const rpcProvider = rpcFactory(port);
    port.onmessage = ({ data }) => rpcProvider.dispatch(data);
    rpcProvider.registerRpcHandler("prettierJs", (code) => prettierJs(code));
    rpcProvider.registerRpcHandler("ata", ({ code, originToUse }) => {
        return ata({ code, originToUse, prettierJs, tsx });
    });
    rpcProvider.registerRpcHandler("transpile", ({ code, originToUse }) => transpile(code, originToUse));
    rpcProvider.registerRpcHandler("build", ({ codeSpace, origin, format }) => build({ codeSpace, origin, format }));
    rpcProvider.registerSignalHandler("connect", (signal) => setConnections(signal));
};
self.onconnect = (e) => {
    let [port] = e.ports;
    start(port);
};
self.onconnect = ({ ports }) => start(ports[0]);
if (!("SharedWorkerGlobalScope" in self)) {
    start(self);
}
const connections = {};
const mutex = new Mutex();
function setConnections(signal) {
    const parts = signal.split(" ");
    const codeSpace = parts[0];
    const user = parts[1];
    const c = connections[codeSpace] = connections[codeSpace] || {
        user,
        oldSession: makeSession({ i: 0, html: "", css: "", code: "" }),
    };
    if (!c.ws) {
        fetch(`/live/${codeSpace}/session`).then((s) => s.json().then((ss) => c.oldSession = makeSession(ss)));
        const delegate = {
            socketDidOpen(_socket) {
            },
            socketDidClose(_socket, _code, _reason) {
            },
            socketDidFinish(_socket) {
            },
            socketDidReceiveMessage(ws, message) {
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
                    if (data.i && data.i < c.oldSession.i)
                        return;
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
                    if (data.newHash && data.oldHash) {
                        await mutex.runExclusive(async () => {
                            const oldSession = makeSession(c.oldSession);
                            const oldHash = makeHash(oldSession);
                            if (oldHash !== String(data.oldHash)) {
                                c.oldSession = makeSession(await (await fetch(`/live/${codeSpace}/session`)).json());
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
                            c.oldSession = makeSession(await (await fetch(`/live/${codeSpace}/session`)).json());
                            console.log(c.oldSession);
                            BC.postMessage(c.oldSession);
                        });
                    }
                })();
            },
            socketShouldRetry(_socket, code) {
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
                    if (patchMessage.oldHash === oldHash) {
                        c.oldSession = newSession;
                        ws.send(JSON.stringify({
                            ...patchMessage,
                            i: newSession.i,
                            name: c.user,
                        }));
                    }
                }
            }
        };
    }
}
