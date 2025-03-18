import { getCodeSpace } from "@/hooks/use-code-space";
import { importMap, importMapReplace } from "@/lib/importmap-utils";
import { routes } from "@/lib/routes";
import { transpile } from "@/lib/shared";
import { SessionSynchronizer } from "@/services/SessionSynchronizer";
import type {} from "./def";
import HTML from "./index.html";

import type { ICodeSession } from "@/lib/interfaces";
import { sessionToJSON } from "@/lib/make-sess";

const cSessions: Record<string, SessionSynchronizer> = {};

export async function fakeServer(request: Request) {
  const { pathname } = new URL(request.url.replace("api/room/", "live/"));
  const codeSpace = getCodeSpace(pathname);
  console.log("CodeSpace:", codeSpace);

  cSessions[codeSpace] = cSessions[codeSpace] ||
    new SessionSynchronizer(
      codeSpace,
      await fetch(`/api/room/${codeSpace}/session.json`).then(
        (r) => r.json(),
      ),
    );

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
    pathname in Object.keys(routes) ||
    request.url.includes("/hydrated") ||
    request.url.includes("/worker") ||
    request.url.includes("/dehydrated") ||
    request.url.includes("/iframe") ||
    request.url.endsWith("/") ||
    !request.url.includes("/live") ||
    request.url.includes("/embed") ||
    request.url.includes("/public") ||
    request.url.endsWith(`/live/${codeSpace}/xxx`) ||
    request.url.endsWith(`/live/${codeSpace}/`)
  ) {
    // let html = HTML;
    // if (request.url.includes("localhost")) {
    // html = await fetch(HTML).then((resp) => resp.text());
    // }
    return handleHtmlResponse(session, HTML);
  } else if (
    request.url.endsWith(`/live/${codeSpace}`)
  ) {
    return handleEditorResponse(codeSpace);
  } else {
    console.log("Default request:", request.url);

    return fetch(request);
  }
}

function handleEditorResponse(codeSpace: string) {
  const respText = HTML.replace(
    `<script type="importmap"></script>`,
    `<script type="importmap">${JSON.stringify(importMap)}</script>`,
  ).replace(
    '<div id="embed"></div>',
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

function handleHtmlResponse(session: ICodeSession, HTML: string) {
  const { codeSpace, html, css } = session;
  const respText = HTML.replace("${JSON.stringify(importMap)}", JSON.stringify(importMap))
    .replaceAll("${codeSpace}", codeSpace).replace("/* criticalCss */", css).replace(
      "${html}",
      html,
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

function handleIndexCss(
  request: Request,
  session: ICodeSession,
) {
  console.log("css request:", request.url);

  return new Response(session.css, {
    headers: {
      "Content-Type": "text/css; charset=UTF-8",
      ...request.headers,
    },
  });
}

async function handleIndexJs(
  request: Request,
  session: ICodeSession,
  codeSpace: string,
) {
  console.log("Transpiled request:", request.url);

  if (typeof session.transpiled !== "string" || session.transpiled === "") {
    const transpiled = await transpile({
      code: session.code,
      originToUse: "",
    }) as unknown as string;
    session.transpiled = transpiled;
    await cSessions[codeSpace].broadcastSession({
      ...session,
      transpiled,
      sender: "sw-local-fake-server",
    });
  }

  return new Response(
    importMapReplace(session.transpiled),
    {
      headers: {
        "Content-Type": "application/javascript; charset=UTF-8",
        ...request.headers,
      },
    },
  );
}

function handleIndexTsx(
  request: Request,
  session: ICodeSession,
) {
  console.log("Index request:", request.url);

  return new Response(session.code, {
    headers: {
      "Content-Type": "application/javascript; charset=UTF-8",
      ...request.headers,
    },
  });
}

function handleSessionJson(
  request: Request,
  session: ICodeSession,
) {
  console.log("Session request:", request.url);

  return new Response(sessionToJSON(session), {
    headers: {
      "Content-Type": "application/json",
      ...request.headers,
    },
  });
}
