import { run } from "./starter";
import StarterApp from "https://spike.land/live/code-main/js";

fetch("https://spike.land/live/code-main/session").then((resp) => resp.json())
  .then((session) => run(session, StarterApp));
