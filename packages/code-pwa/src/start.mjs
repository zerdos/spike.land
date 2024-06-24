import StarterApp from "/live/code-main/js";
import { run } from "./starter";

fetch("/live/code-main/session").then((resp) => resp.json())
  .then((session) => run(session, StarterApp));
