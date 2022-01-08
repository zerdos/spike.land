// js/dist/session.mjs
import { Record } from "https://ga.jspm.io/npm:immutable@4.0.0/dist/immutable.es.js";
import createDelta from "https://unpkg.com/@spike.land/esm@0.6.9/dist/textdiff-create.mjs";
import applyPatch from "https://unpkg.com/@spike.land/esm@0.6.9/dist/textdiff-patch.mjs";
function initSession(room, u) {
  return Record({ ...u, room, state: Record(u.state)() });
}
var hashStore = {};
var CodeSession = class {
  session;
  hashCodeSession;
  room = "";
  created = new Date().toISOString();
  constructor(room, user) {
    const savedState = null;
    this.room = room;
    this.session = initSession(room, {
      ...user,
      state: savedState ? savedState : user.state,
      capabilities: {
        ...user.capabilities,
        sessionStorage: storageAvailable("sessionStorage")
      }
    })();
    this.hashCodeSession = this.session.get("state").hashCode();
    hashStore[this.session.get("state").hashCode()] = this.session.get("state");
  }
  addEvent(e) {
    this.session.get("events").push({
      ...e
    });
    setTimeout(() => this.processEvents);
  }
  hashCode() {
    return this.session.get("state").hashCode();
  }
  processEvents() {
    const events = this.session.get("events");
    const event = events.shift();
    if (event) {
      switch (event.type) {
        case "code-init":
          const { code, transpiled, i, css, errorDiff, html } = event;
          const sess = {
            code,
            transpiled,
            i,
            css,
            errorDiff,
            html
          };
          this.session.set("events", events);
          this.session.set("state", Record(sess)());
      }
    }
  }
  createPatchFromHashCode(oldHash, state) {
    if (hashStore[oldHash]) {
      const oldRec = hashStore[oldHash];
      const oldState = JSON.stringify(oldRec.toJSON());
      const newRec = oldRec.merge(state);
      const newHash = newRec.hashCode();
      hashStore[newHash] = newRec;
      const newState = JSON.stringify(newRec.toJSON());
      const patch = createPatch(oldState, newState);
      return {
        oldHash,
        newHash,
        patch
      };
    }
  }
  createPatch(state) {
    if (state.code === this.session.get("state").get("code")) {
      return {
        oldHash: this.session.get("state").hashCode(),
        newHash: this.session.get("state").hashCode(),
        patch: ""
      };
    }
    const oldState = JSON.stringify(this.session.get("state").toJSON());
    const oldHash = this.session.get("state").hashCode();
    hashStore[oldHash] = this.session.get("state");
    const oldRec = this.session.get("state");
    const newRec = oldRec.merge(state);
    const newHash = newRec.hashCode();
    hashStore[newHash] = newRec;
    const newState = JSON.stringify(newRec.toJSON());
    const patch = createPatch(oldState, newState);
    return {
      oldHash,
      newHash,
      patch
    };
  }
  applyPatch({
    oldHash,
    newHash,
    patch
  }) {
    const oldHashCheck = this.session.get("state").hashCode();
    if (oldHashCheck !== oldHash) {
      console.error("Cant update");
      return;
    }
    const oldST = this.session.get("state").toJSON();
    const oldState = JSON.stringify(oldST);
    const oldCode = oldST.code;
    const newState = JSON.parse(applyPatch(oldState, JSON.parse(patch)));
    const newRec = Record(newState)();
    console.log({ newState });
    console.log(newRec.hashCode());
    const newRecord = this.session.get("state").merge(newRec);
    const newCode = newRecord.get("code");
    if (oldCode === newCode) {
      return;
    }
    console.log(newRecord.hashCode());
    const newHashCheck = newRecord.hashCode();
    if (newHashCheck === newHash) {
      this.session = this.session.set("state", newRecord);
    } else {
      console.log("WRONG");
      console.log({
        newState
      });
    }
  }
  json() {
    const user = this.session.toJSON();
    const state = user.state.toJSON();
    return { ...user, state };
  }
  setRoom(room) {
    const user = this.session.set("room", room);
    this.session = user;
  }
};
var session = null;
var session_default = (room, u) => session || new CodeSession(room, u);
function storageAvailable(type) {
  try {
    if (!window.hasOwnProperty(type)) {
      return;
    }
    const storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch {
    return false;
  }
}
function createPatch(oldCode, newCode) {
  return JSON.stringify(createDelta(oldCode, newCode));
}
export {
  CodeSession,
  session_default as default
};
//# sourceMappingURL=session-W7AHAWP6.mjs.map
