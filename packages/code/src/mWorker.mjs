import * as Comlink from "comlink";
import { extraStuff } from "./monacoExtra";

const m = {
  extraStuff,
};

Comlink.expose(m);
