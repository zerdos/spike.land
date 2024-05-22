import type { DurableObjectState } from "@cloudflare/workers-types";
import { WebSocket } from "@cloudflare/workers-types";
import { applyCodePatch, makeHash, CodePatch, ICodeSession } from "./../../code/src/makeSess";
import { WebsocketSession, IData, YMessage } from './WebsocketSession';  // Assuming you have a types.ts file for common interfaces
import * as map from 'lib0/map';

const pingTimeout = 30000;

export async function processWsMessage(
  msg: { data: string | ArrayBuffer },
  session: WebsocketSession,
  state: {
    getCommit: (commit: string)=>Promise<CodePatch | undefined>, 
    setCommit: (code: ICodeSession)=>Promise<void>
},
  topics: Map<string, Set<WebSocket>>,
  sessions: WebsocketSession[],
  user2user: (to: string, msg: unknown | string) => void,
  broadcast: (msg: CodePatch | string, session: ICodeSession) => void,
  send: (conn: WebSocket, message: YMessage | { type: 'pong' }) => void,
  makeSession: (data: any) => ICodeSession,
  currentSession: ICodeSession
) {
  if (session.quit) {
    session.webSocket.close(1011, "WebSocket broken.");
    return;
  }

  const { name } = session;
  const respondWith = (obj: unknown) => session.webSocket.send(JSON.stringify(obj));

  let data: IData;
  try {
    data = typeof msg.data === "string" ? JSON.parse(msg.data) : JSON.parse(new TextDecoder().decode(msg.data));
  } catch (exp) {
    return respondWith({ error: "JSON parse error", exp: exp || {} });
  }

  const message = data as unknown as YMessage;
  if (message && message.type) {
    switch (message.type) {
      case 'subscribe':
        message.topics?.forEach(topicName => {
          if (typeof topicName === 'string') {
            const topic = map.setIfUndefined(topics, topicName, () => new Set());
            topic.add(session.webSocket);
            session.subscribedTopics.add(topicName);
          }
        });
        break;
      case 'unsubscribe':
        message.topics?.forEach(topicName => {
          const subs = topics.get(topicName);
          if (subs) subs.delete(session.webSocket);
        });
        break;
      case 'publish':
        if (message.topic) {
          const receivers = topics.get(message.topic);
          if (receivers) {
            message.clients = receivers.size;
            receivers.forEach(receiver => send(receiver, message));
          }
        }
        break;
      case 'pong':
        session.pongReceived = true;
        break;
      case 'ping':
        send(session.webSocket, { type: 'pong' });
        break;
    }
  }

  if (data.changes) return broadcast(msg.data as string, currentSession);

  if (!name) {
    if (!data.name) return respondWith({ msg: "no-name-no-party" });

    sessions.filter(x => x.name === data.name).forEach(x => {
      x.blockedMessages.reverse().forEach(m => session.webSocket.send(m));
      x.quit = true;
    });
    sessions = sessions.filter(x => !x.quit);
    session.name = data.name;
  }

  if (data.type === "handshake") {
    const commit = data.hashCode;
    while (commit && commit !== makeHash(currentSession)) {
      const oldNode = await state.getCommit(commit);
      const newNode =  await state.getCommit(oldNode!.newHash);

      return respondWith({
        oldHash: commit,
        newHash: oldNode!.newHash,
        patch: oldNode!.patch,
        reversePatch: newNode!.reversePatch,
      });
    }
  }

  if (data.i && currentSession.i && currentSession.i > data.i) return respondWith({ error: "i is not up to date" });

  try {
    if (data.target && data.type && ["new-ice-candidate", "video-offer", "video-answer"].includes(data.type)) {
      return user2user(data.target, { ...data, name });
    }

    if (data.patch && data.oldHash && data.newHash && data.reversePatch) {
      const oldState = currentSession;
      const oldHash = makeHash(currentSession);
      if (oldHash !== data.oldHash) return respondWith({ error: "old hashes not matching", i: currentSession.i, strSess: currentSession });

      const newState = applyCodePatch(oldState, {
        oldHash: data.oldHash,
        newHash: data.newHash,
        patch: data.patch,
        reversePatch: data.reversePatch,
      });

      currentSession = newState;
      await state.setCommit(currentSession);
      broadcast(data as CodePatch, currentSession);

      return respondWith({ hashCode: data.newHash });
    }
  } catch (exp) {
    return respondWith({ error: "unknown error - e1", exp: exp || {} });
  }
}
