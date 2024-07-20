import { handleErrors } from "./handleErrors";
import { handleUnauthorizedRequest, handleRedirectResponse } from "./utils";
import { handleFetchApi } from "./fetchHandler";
import { md5 } from "../../code/src/md5";
import Env from "./env";

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
      const utcSecs = Math.floor(Math.floor(Date.now() / 1000) / 7200);
      const { cf } = request as unknown as { cf?: { asOrganization?: string } };

      const start = md5(
        ((cf?.asOrganization) || "default")
          + utcSecs + `
      and reset every 2 hours
      time`,
      );
      return handleRedirectResponse(url, start);
    }

    return handleFetchApi(path, request, env, ctx);
  });
}
