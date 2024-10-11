import { useCodeSpace } from "@/hooks/use-code-space";
import importMap, { importMapReplace } from "@/lib/importmap-utils";
import { routes } from "@/lib/routes";
import { transpile } from "@/lib/shared";
import { CodeSessionBC } from "./services/CodeSessionBc";

import HTML from "./index.html";
import type { ICodeSession } from "./modules";

const cSessions: {
  [key: string]: CodeSessionBC;
} = {};

export async function fakeServer(request: Request) {
  const { pathname } = new URL(request.url);
  const codeSpace = useCodeSpace(pathname);
  console.log("CodeSpace:", codeSpace);

  cSessions[codeSpace] = cSessions[codeSpace]
    || new CodeSessionBC(codeSpace);
  const session = await cSessions[codeSpace].init();

  if (
    request.url.includes("/session.json")
  ) {
    return handleSessionJson(request, session);
  } else if (
    request.url.includes("/index.tsx")
  ) {
    return handleIndexTsx(request, session);
  } else if (
    request.url.includes("/index.js")
  ) {
    return await handleIndexJs(request, session, codeSpace);
  } else if (
    request.url.includes("/index.css")
  ) {
    return handleIndexCss(request, session);
  } else if (
    pathname in Object.keys(routes)
    || request.url.includes("/hydrated")
    || request.url.includes("/worker")
    || request.url.includes("/dehydrated")
    || request.url.includes("/iframe")
    || request.url.includes("/embed")
    || request.url.includes("/public")
    || request.url.endsWith(`/live/${codeSpace}/xxx`)
    || request.url.endsWith(`/live/${codeSpace}/`)
  ) {
    return handleHtmlResponse(session);
  } else if (
    request.url.endsWith(`/live/${codeSpace}`)
    || request.url.endsWith(`/live/${codeSpace}/`)
  ) {
    return buildHTMLResponse(codeSpace);
  } else {
    console.log("Default request:", request.url);

    return fetch(request);
  }
}
function buildHTMLResponse(codeSpace: string) {
  const respText = HTML.replace(
    `<script type="importmap"></script>`,
    `<script type="importmap">${JSON.stringify(importMap)}</script>`,
  ).replace(
    `<div id="embed"></div>`,
    `<div id="embed"><iframe title="Live preview" src="/live/${codeSpace}/iframe"></iframe></div>`,
  );

  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Cross-Origin-Resource-Policy": "cross-origin",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cache-Control": "no-cache",
    "Content-Encoding": "gzip",
    "Content-Type": "text/html; charset=UTF-8",
  });

  return new Response(respText, { status: 200, headers });
}

function handleHtmlResponse(session: ICodeSession) {
  const respText = HTML.replace(
    `<script type="importmap"></script>`,
    `<script type="importmap">${JSON.stringify(importMap)}</script>`,
  ).replace(
    `<!-- Inline LINK for initial theme -->`,
    `<link rel="preload" href="/live/${session.codeSpace}/index.css" as="style" />
    <link rel="stylesheet" href="/live/${session.codeSpace}/index.css" />`,
  ).replace(
    "<div id=\"embed\"></div>",
    `<div id="embed">${session.html}</div>`,
  );

  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Cross-Origin-Resource-Policy": "cross-origin",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cache-Control": "no-cache",
    "Content-Encoding": "gzip",
    "Content-Type": "text/html; charset=UTF-8",
  });

  return new Response(respText, { status: 200, headers });
}

function handleIndexCss(request: Request<unknown, CfProperties<unknown>>, session: ICodeSession) {
  console.log("css request:", request.url);

  return new Response(session.css, {
    headers: {
      "Content-Type": "text/css; charset=UTF-8",
      ...request.headers,
    },
  });
}

async function handleIndexJs(
  request: Request<unknown, CfProperties<unknown>>,
  session: ICodeSession,
  codeSpace: string,
) {
  console.log("Transpiled request:", request.url);

  if (typeof session.transpiled !== "string" || session.transpiled === "") {
    const transpiled = await transpile({
      code: session.code,
      originToUse: location.origin,
    }) as unknown as string;
    session.transpiled = transpiled;
    await cSessions[codeSpace].postMessage({
      ...session,
      transpiled,
      i: session.i + 1,
    });
  }

  return new Response(
    importMapReplace(session.transpiled, location.origin),
    {
      headers: {
        "Content-Type": "application/javascript; charset=UTF-8",
        ...request.headers,
      },
    },
  );
}

function handleIndexTsx(request: Request<unknown, CfProperties<unknown>>, session: ICodeSession) {
  console.log("Index request:", request.url);

  return new Response(session.code, {
    headers: {
      "Content-Type": "application/javascript; charset=UTF-8",
      ...request.headers,
    },
  });
}

function handleSessionJson(request: Request<unknown, CfProperties<unknown>>, session: ICodeSession) {
  console.log("Session request:", request.url);

  return new Response(JSON.stringify(session), {
    headers: {
      "Content-Type": "application/json",
      ...request.headers,
    },
  });
}
