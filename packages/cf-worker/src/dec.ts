export type {
  FetchEvent,
  KVNamespace,
} from "../../../node_modules/@cloudflare/workers-types/index.d.ts";

import gen from "https://unpkg.com/uuid@8.3.2/dist/esm-browser/v4.js"

export const v4 = ()=>gen() as unknown as string;;