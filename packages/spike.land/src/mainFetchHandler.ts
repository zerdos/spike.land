import { HTML } from "@spike-land/code";
import { isJSDocReturnTag } from "typescript";
import Env from "./env";
import { handleFetchApi } from "./fetchHandler";
import { handleErrors } from "./handleErrors";
import { handleUnauthorizedRequest } from "./utils";

export async function handleMainFetch(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  const { cf } = request as unknown as { cf?: { asOrganization?: string } };
  if (cf?.asOrganization?.startsWith("YANDEX")) {
    return handleUnauthorizedRequest();
  }

  return handleErrors(request, async () => {
    console.log(`handling request: ${request.url}`);

    const url = new URL(request.url);
    const path = url.pathname.slice(1).split("/");

    if (!path[0]) {
      return handleFetchApi(["live", "landing"], request, env, ctx);
    }

    if (path[0] === "start") {
      return handleFetchApi(["live", "temp"], request, env, ctx);
    }

    return handleFetchApi(path, request, env, ctx);
  });
}
