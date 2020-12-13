import { arrBuffSha256, sha256 } from "../../code/src/sha256.js";
import { getDbObj } from "../../shadb/src/shaDB.ts";
import { handleAdmin } from "./admin.ts";
import { json, text } from "./utils/handleOptions.ts";
import { v4 } from "./dec.ts";

var SHAKV: KVNamespace;
var USERS: KVNamespace;
var API_KEY: string;

export async function handleCloudRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const { searchParams, pathname } = url;
  const psk = String(request.headers.get("API_KEY") || "");

  if (request.method === "GET" && psk && psk == API_KEY) {
    return handleAdmin(request, searchParams, pathname, SHAKV);
  } else if (request.method === "GET") {
    if (pathname === "/robots.txt") {
      return text("User-agent: * Disallow: /");
    }

    if (pathname === "/connect") {
      const uuid = searchParams.get("uuid") || v4();
      const key = await sha256(uuid);
      await SHAKV.put(
        key,
        JSON.stringify(
          {
            uuid,
            connected: searchParams.get("uuid"),
          },
        ),
        { expirationTtl: 60 },
      );
      return json({ key });
    }

    if (pathname === "/check") {
      const key = searchParams.get("key");

      if (key === null) return new Response("500");

      const waitForChange = async () => {
        const data = await SHAKV.get<{ connected: boolean }>(
          key,
          "json",
        );
        if (!data || data.connected) {
          return data;
        }
        return new Promise((resolve) => {
          const clear = setInterval(async () => {
            const data = await SHAKV.get<{ connected: boolean }>(
              key,
              "json",
            );
            if (!data || data.connected) {
              clearInterval(clear);
              resolve(data);
            }
          }, 1000);
        });
      };

      const data = await waitForChange();

      return json({ expired: data === null });
    }

    if (pathname === "/register") {
      const uuid = v4();
      await USERS.put(
        uuid,
        JSON.stringify({ uuid, registered: Date.now(), cf: request.cf }),
      );
      return json({ uuid });
    }

    const maybeRoute = pathname.substr(1);
    if (maybeRoute) {
      const shaDB = getDbObj(SHAKV);
      const result = shaDB.get(maybeRoute);
      if (result !== null) {
        return text(await result);
      }
    }
    return Response.redirect("https://zed.vision/code", 301);
  } else if (request.method === "POST") {
    // this need restriction
    // such as:
    //    what are we saving - which projectID
    //    what will be the key
    //    and the data for the construction
    //         -- which is the parent sha id
    //         -- and what are we doing with it
    //             - for example, adding a new line
    //                - or babel it
    //                - or render it to html
    //                - then the result :)

    const myBuffer = await request.arrayBuffer();

    const hash = await arrBuffSha256(myBuffer);

    const smallerKey = hash.substring(0, 8);
    const shaDB = getDbObj(SHAKV);
    const result = await shaDB.put(smallerKey, myBuffer);

    return json({
      hash: smallerKey,
    });
  }

  return new Response("404");
}
