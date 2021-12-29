import st from "https://code.spike.land/api/room/code-main/session" assert {
  type: "json",
};
// @ts-expect-error
import type { ISession } from "./session.tsx" assert {
  type: "json",
};

export const state: ISession = st;
