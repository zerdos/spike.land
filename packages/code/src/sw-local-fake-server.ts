import { getCodeSpace } from "@/hooks/use-code-space";
import { importMap, importMapReplace } from "@/lib/importmap-utils";
import { routes } from "@/lib/routes";
import { SessionSynchronizer } from "@/services/SessionSynchronizer";
import type {} from "./def";
import { tryCatch } from "@/lib/try-catch";
import HTML from "./index.html";

// Removed invalid HTML import: import HTML from "./index.html";

import type { ICodeSession } from "@/lib/interfaces";
import { sanitizeSession, sessionToJSON } from "@/lib/make-sess";

const cSessions: Record<string, SessionSynchronizer> = {};

interface RouteContext {
  request: Request;
  session: ICodeSession;
  codeSpace: string;
  pathname: string;
}

type RouteHandler = (context: RouteContext) => Promise<Response> | Response;
type RouteCondition = (context: RouteContext) => boolean;

interface RouteConfig {
  condition: RouteCondition;
  handler: RouteHandler;
}

// Define route handlers (keeping existing functions, but they might need slight adjustments for context)
async function handleEditorResponseInternal(
  context: RouteContext,
): Promise<Response> {
  return handleEditorResponse(context.codeSpace);
}
async function handleHtmlResponseInternal(
  context: RouteContext,
): Promise<Response> {
  return handleHtmlResponse(context.session);
}
function handleIndexCssInternal(context: RouteContext): Response {
  return handleIndexCss(context.request, context.session);
}
async function handleIndexJsInternal(context: RouteContext): Promise<Response> {
  return handleIndexJs(context.request, context.session);
}
function handleIndexTsxInternal(context: RouteContext): Response {
  return handleIndexTsx(context.request, context.session);
}
async function handleSessionJsonInternal(
  context: RouteContext,
): Promise<Response> {
  return handleSessionJson(context.request, context.session);
}

function isGeneralHtmlRoute(
  { request, pathname, codeSpace }: RouteContext,
): boolean {
  const url = request.url;
  // Check if pathname is a key in the routes object
  const isListedRoute = Object.prototype.hasOwnProperty.call(routes, pathname);

  return (
    isListedRoute ||
    url.includes("/hydrated") ||
    url.includes("/worker") ||
    url.includes("/dehydrated") ||
    url.endsWith("/") ||
    (!url.includes("/live/") && !url.startsWith(location.origin + "/api/")) || // Exclude /api/ routes as well
    url.includes("/embed") ||
    url.includes("/public") ||
    url.endsWith(`/live/${codeSpace}/xxx`) ||
    url.endsWith(`/live/${codeSpace}/`)
  );
}

const routeConfigs: RouteConfig[] = [
  {
    condition: ({ request }) => request.url.includes("/session.json"),
    handler: handleSessionJsonInternal,
  },
  {
    condition: ({ request }) => request.url.includes("/index.tsx"),
    handler: handleIndexTsxInternal,
  },
  {
    condition: ({ request }) => request.url.includes("/index.js"),
    handler: handleIndexJsInternal,
  },
  {
    condition: ({ request }) => request.url.includes("/index.css"),
    handler: handleIndexCssInternal,
  },
  {
    condition: isGeneralHtmlRoute,
    handler: handleHtmlResponseInternal,
  },
  {
    condition: ({ request, codeSpace }) => request.url.endsWith(`/live/${codeSpace}`), // This should likely be more specific if it's for the editor view itself
    handler: handleEditorResponseInternal,
  },
];

export async function fakeServer(request: Request) {
  const { pathname: rawPathname } = new URL(request.url);
  const pathname = rawPathname.replace("/api/room/", "/live/"); // Normalize path for codespace extraction
  const codeSpace = getCodeSpace(pathname);
  console.warn(
    "CodeSpace:",
    codeSpace,
    "Request URL:",
    request.url,
    "Normalized Pathname:",
    pathname,
  );

  if (!cSessions[codeSpace]) {
    const sessionFetchPromise = fetch(`/api/room/${codeSpace}/session.json`)
      .then((r) => {
        if (!r.ok) {
          throw new Error(
            `Failed to fetch initial session for ${codeSpace}: ${r.status}`,
          );
        }
        return r.json();
      });
    const { data: initialSessionData, error: fetchError } = await tryCatch<
      ICodeSession
    >(
      sessionFetchPromise,
    );

    if (fetchError || !initialSessionData) {
      console.error(
        `Failed to initialize session for ${codeSpace}:`,
        fetchError,
      );
      return new Response(
        `Error initializing session: ${fetchError?.message || "Unknown error"}`,
        {
          status: 500,
        },
      );
    }
    cSessions[codeSpace] = new SessionSynchronizer(
      codeSpace,
      initialSessionData,
    );
    initialisedSessions.add(codeSpace); // Mark as initialized after the first successful fetch
  }

  const session = await cSessions[codeSpace]!.init();
  if (!session) {
    console.error(`Session is null after init for ${codeSpace}`);
    return new Response(`Error initializing session: Session is null`, {
      status: 500,
    });
  }

  const context: RouteContext = { request, session, codeSpace, pathname };

  for (const config of routeConfigs) {
    if (config.condition(context)) {
      return config.handler(context);
    }
  }

  console.warn("Default request (no route matched):", request.url);
  return fetch(request);
}

async function handleEditorResponse(codeSpace: string) {
  const { data: htmlResponse, error: fetchHtmlError } = await tryCatch(
    fetch("/index.html"),
  );

  if (fetchHtmlError || !htmlResponse || !htmlResponse.ok) {
    console.error(
      "Failed to fetch base HTML for editor:",
      fetchHtmlError || htmlResponse?.status,
    );
    return new Response("Failed to fetch base HTML", { status: 500 });
  }

  const { data: baseHtml, error: textError } = await tryCatch(
    htmlResponse.text(),
  );

  if (textError || baseHtml === null) {
    console.error("Failed to get text from base HTML for editor:", textError);
    return new Response("Failed to read base HTML", { status: 500 });
  }

  const respText = baseHtml.replace(
    "//IMPORTMAP",
    JSON.stringify(importMap),
  ).replace(
    '<div id="embed"></div>',
    `<div id="embed"><iframe title="Live preview" src="/live/${codeSpace}/"></iframe></div>`,
  );

  const headers = createHtmlResponseHeaders();
  return new Response(respText, { status: 200, headers });
}

function createHtmlResponseHeaders(): Headers {
  return new Headers({
    "Access-Control-Allow-Origin": "*",
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Cross-Origin-Resource-Policy": "cross-origin",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cache-Control": "no-cache",
    "Content-Encoding": "gzip",
    "Content-Type": "text/html; charset=UTF-8",
  });
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

  const headers = createHtmlResponseHeaders();
  return new Response(respText, { status: 200, headers });
}

function handleIndexCss(
  request: Request,
  session: ICodeSession,
) {
  console.warn("css request:", request.url);

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
  console.warn("Index request:", request.url);

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
  currentSession: ICodeSession, // Renamed to avoid confusion
) {
  console.warn("Session request:", request.url);
  const codeSpace = getCodeSpace(request.url);
  let sessionToReturn = currentSession;

  // This condition seems to intend to re-fetch if it's NOT the first time for this codeSpace.
  // However, `initialisedSessions` is populated when `!cSessions[codeSpace]` is true in `fakeServer`.
  // If the goal is to always return the latest from the server for /session.json:
  const sessionFetchPromise = fetch(request.url.replace("/live/", "/api/room/"))
    .then((r) => {
      if (!r.ok) {
        throw new Error(
          `Failed to fetch session for ${codeSpace} in handleSessionJson: ${r.status}`,
        );
      }
      return r.json();
    });
  const { data: newSessionData, error: fetchError } = await tryCatch<
    ICodeSession
  >(
    sessionFetchPromise,
  );

  if (fetchError) {
    console.error(
      `Failed to fetch session for ${codeSpace} in handleSessionJson:`,
      fetchError,
    );
    // Fallback to currentSession if fetch fails
  } else if (newSessionData) {
    sessionToReturn = sanitizeSession(newSessionData);
    // Update the central SessionSynchronizer if it exists, or create it.
    // This ensures cSessions[codeSpace] is always up-to-date after a /session.json call.
    if (cSessions[codeSpace]) {
      // It's tricky if cSessions[codeSpace] is already being used by other parts.
      // A full re-initialization might be too disruptive.
      // For now, let's assume the SessionSynchronizer handles internal updates if its session changes.
      // Or, we might need a method on SessionSynchronizer to update its internal session.
      // This part of the logic might need further review based on SessionSynchronizer's capabilities.
      // For simplicity, we'll re-assign if it's different.
      const currentSyncSession = await cSessions[codeSpace]!.getSession();
      if (
        JSON.stringify(currentSyncSession) !== JSON.stringify(sessionToReturn)
      ) {
        cSessions[codeSpace] = new SessionSynchronizer(
          codeSpace,
          sessionToReturn,
        );
      }
    } else {
      cSessions[codeSpace] = new SessionSynchronizer(
        codeSpace,
        sessionToReturn,
      );
    }
  }

  return new Response(sessionToJSON(sessionToReturn), {
    headers: {
      "Content-Type": "application/json",
      ...request.headers,
    },
  });
}
