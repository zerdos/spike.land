import { getCodeSpace } from "@/hooks/use-code-space";
import { importMap, importMapReplace } from "@/lib/importmap-utils";
import { routes } from "@/lib/routes";
import { SessionSynchronizer } from "@/services/SessionSynchronizer";
import type {} from "./def";
import HTML from "./index.html";
import { tryCatch } from "@/lib/try-catch";

// Removed invalid HTML import: import HTML from "./index.html";

import type { ICodeSession } from "@/lib/interfaces";
import { sanitizeSession, sessionToJSON } from "@/lib/make-sess";

const cSessions: Record<string, SessionSynchronizer> = {};

export async function fakeServer(request: Request) {
  const { pathname } = new URL(request.url.replace("api/room/", "live/"));
  const codeSpace = getCodeSpace(pathname);
  console.log("CodeSpace:", codeSpace);

  if (!cSessions[codeSpace]) {
    const sessionFetchPromise = fetch(`/api/room/${codeSpace}/session.json`).then((r) => {
      if (!r.ok) throw new Error(`Failed to fetch initial session for ${codeSpace}: ${r.status}`);
      return r.json();
    });
    const { data: initialSessionData, error: fetchError } = await tryCatch<ICodeSession>(sessionFetchPromise);

    if (fetchError) {
      console.error(`Failed to initialize session for ${codeSpace}:`, fetchError);
      // Handle error appropriately, maybe return an error response or use a default session
      return new Response(`Error initializing session: ${fetchError.message}`, { status: 500 });
    }
    cSessions[codeSpace] = new SessionSynchronizer(codeSpace, initialSessionData);
  }

  const session = await cSessions[codeSpace]!.init();


  if (
    request.url.includes("/session.json")
  ) {
    return await handleSessionJson(request, session);
  } else if (
    request.url.includes("/index.tsx")
  ) {
    return handleIndexTsx(request, session);
  } else if (
    request.url.includes("/index.js")
  ) {
    return await handleIndexJs(request, session);
  } else if (
    request.url.includes("/index.css")
  ) {
    return handleIndexCss(request, session);
  } else if (
    pathname in Object.keys(routes) ||
    request.url.includes("/hydrated") ||
    request.url.includes("/worker") ||
    request.url.includes("/dehydrated") ||
    request.url.endsWith("/") ||
    !request.url.includes("/live") ||
    request.url.includes("/embed") ||
    request.url.includes("/public") ||
    request.url.endsWith(`/live/${codeSpace}/xxx`) ||
    request.url.endsWith(`/live/${codeSpace}/`)
  ) {
    // Fetch HTML content on demand
    return await handleHtmlResponse(session);
  } else if (
    request.url.endsWith(`/live/${codeSpace}`)
  ) {
    // Fetch HTML content on demand
    return await handleEditorResponse(codeSpace);
  } else {
    console.log("Default request:", request.url);

    return fetch(request);
  }
}

async function handleEditorResponse(codeSpace: string) {
  const { data: htmlResponse, error: fetchHtmlError } = await tryCatch(fetch("/index.html"));

  if (fetchHtmlError || !htmlResponse || !htmlResponse.ok) {
    console.error("Failed to fetch base HTML for editor:", fetchHtmlError || htmlResponse?.status);
    return new Response("Failed to fetch base HTML", { status: 500 });
  }

  const {data: baseHtml, error: textError } = await tryCatch(htmlResponse.text());

  if(textError || baseHtml === null) {
    console.error("Failed to get text from base HTML for editor:", textError);
    return new Response("Failed to read base HTML", { status: 500 });
  }

  const respText = baseHtml.replace(
    '<script type="importmap">${JSON.stringify(importMap)}</script>', // Match the template literal placeholder
    `<script type="importmap">${JSON.stringify(importMap)}</script>`,
  ).replace(
    '<div id="embed"></div>',
    `<div id="embed"><iframe title="Live preview" src="/live/${codeSpace}/"></iframe></div>`,
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

async function handleHtmlResponse(session: ICodeSession) {
  // Fetch index.html content
  // const htmlResponse = await fetch("/index.html");
  // if (!htmlResponse.ok) {
  //   return new Response("Failed to fetch base HTML", { status: 500 });
  // }
  const baseHtml = HTML;

  const { codeSpace, html, css } = session;
  // Use fetched baseHtml instead of the imported variable
  const respText = baseHtml.replace(
    "${JSON.stringify(importMap)}",
    JSON.stringify(importMap),
  )
    .replaceAll("${codeSpace}", codeSpace).replace("/* criticalCss */", css)
    .replace(
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
) {
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

const initialisedSessions = new Set<string>();

async function handleSessionJson(
  request: Request,
  session: ICodeSession,
) {
  console.log("Session request:", request.url);
  const codeSpace = getCodeSpace(request.url);

  if (initialisedSessions.has(codeSpace)) { // This logic seems to imply re-fetching if already initialized, which might be intentional or a bug.
    initialisedSessions.add(codeSpace); // This should likely be outside the if, or the condition inverted.
    const sessionFetchPromise = fetch(request.url.replace("/live/", "/api/room/")).then((r) => {
      if (!r.ok) throw new Error(`Failed to re-fetch session for ${codeSpace}: ${r.status}`);
      return r.json();
    });
    const { data: newSessionData, error: fetchError } = await tryCatch<ICodeSession>(sessionFetchPromise);

    if (fetchError) {
      console.error(`Failed to re-initialize session for ${codeSpace}:`, fetchError);
      // Potentially return an error response or use the existing session
    } else if (newSessionData) {
      session = sanitizeSession(newSessionData);
      // This might overwrite an existing SessionSynchronizer or create a new one if cSessions[codeSpace] was somehow cleared.
      cSessions[codeSpace] = new SessionSynchronizer(codeSpace, session);
    }
  }
  // const session = await cSessions[codeSpace]!.init(); // init() might be called again if the above logic runs.

  return new Response(sessionToJSON(session), {
    headers: {
      "Content-Type": "application/json",
      ...request.headers,
    },
  });
}
