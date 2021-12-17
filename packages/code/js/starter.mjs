import { join } from "./ws.mjs";
import v4 from "uuid/v4";

const path = location.pathname.split("/");
const room = (path.pop() || path.pop()).slice(-12);
// const user = v4().substring(0, 8);


export default function (injectedRoom = "") {
  const path = location.pathname.split("/");
  const room = injectedRoom || (path.pop() || path.pop()).slice(-12);
  const user = v4().substring(0, 8);

  // console.log({ room }, { user });
  join(room, user);
  setTimeout(() => window.sess || join(room, user), 500);
}
