// deno-lint-ignore-file
import gen from "https://unpkg.com/uuid@8.3.2/dist/esm-browser/v4.js";

export type { FetchEvent, KVNamespace } from "@cloudflare/workers-types";

export const v4 = () => gen() as unknown as string;
