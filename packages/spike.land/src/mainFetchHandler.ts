import { routes } from "@spike-npm-land/code";
import type Env from "./env";
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

    const redirect = routes[url.pathname as keyof typeof routes];
    if (redirect) {
      return handleFetchApi(["live", redirect, "embed"], request, env, ctx);
    }

    const path = url.pathname.slice(1).split("/");
    return handleFetchApi(path, request, env, ctx);
  });
}
