import { run } from "./starter";
import StarterApp from "https://spike.land/api/room/code-main/js";

fetch("https://spike.land/api/room/code-main/session").then((resp) =>
  resp.json()
).then((session) => run(session, StarterApp));
