import { join } from "./ws.mjs";
import { v4 as uuid } from "uuid";

export default function (injectedRoom = "") {
  run(injectedRoom);
}
export const run = (injectedRoom = "") => {
  const path = location.pathname.split("/");

  const room = injectedRoom || (path[1] === "api" && path[2] === "room")
    ? path[3]
    : (path.pop() || path.pop()).slice(-12);

  const user =
    (storageAvailable(sessionStorage) && sessionStorage.getItem("username")) ||
    (self.crypto.randomUUID()(
      self && self.crypto && self.crypto.randomUUID && self.crypto.randomUUID(),
    ) || uuid()).substring(0, 8);

  storageAvailable(sessionStorage) && sessionStorage.setItem("username", user);

  // console.log({ room }, { user });
  join(room, user);
  setTimeout(() => window.sess || join(room, user), 500);
};

function storageAvailable(type) {
  try {
    var storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}
