import { getDbObj } from "@spike.land/shadb";
import { json, text } from "./utils/handleOptions";
import { v4 } from "uuid";
import { sha256 } from "@spike.land/shadb";
import { log } from "./log";

var API_KEY: string;

export async function handleCloudRequest(request: Request): Promise<Response> {
  try {
    const { country, colo } = request.cf || { country: "", colo: "" };

    const url = new URL(request.url);
    const { searchParams, pathname } = url;
    const psk = String(request.headers.get("API_KEY") || "");
    await log("request", { searchParams, pathname, country, colo });
    if (request.method === "GET" && psk && psk == API_KEY) {
      //    return handleAdmin(request, searchParams, pathname, SHAKV);
    } else if (request.method === "GET") {
      if (pathname === "/robots.txt") {
        return text("User-agent: * Disallow: /");
      }
      if (pathname.slice(0, 7) === "/signal") {
        const cid = searchParams.get("cid") || "";
        const signal = searchParams.get("signal") || "";
        const key = searchParams.get("key") || "";

        if (cid.length === 46 && signal.length === 8) {
          await SIGNALS.put(signal, cid, { expirationTtl: 86400 * 7 });
          return json({ success: true });
        } else if (signal.length === 8) {
          const msg = await SIGNALS.get(signal);
          if (msg === null) return text("404");
          return text(msg);
        }
        // if (key) {
        // }
        return text("error....");
      }

      if (pathname === "/connect") {
        if (searchParams.get("key")) {
          const key = searchParams.get("key")!;

          const tokenKey = key.slice(0, 8);
          const userIdKey = key.slice(8, 16);
          const pass = key.slice(16, 24);
          const tokenPassUserId = key.slice(24, 32);

          const checkTokenPassUserId = await sha256(tokenKey + userIdKey);

          if (
            !tokenKey || !userIdKey || !pass ||
            (checkTokenPassUserId !== tokenPassUserId)
          ) {
            return json({ error: "auth error" });
          }

          const uuid = await USERKEYS.get(userIdKey);
          if (uuid === null) {
            return json({ error: 401 });
          }

          const tokenUuid = await USERKEYS.get(tokenKey);

          if (tokenUuid === null) {
            return json({
              error: 404,
              message: "token not found",
            });
          }
          const checkPass = await sha256(tokenKey + uuid);
          const checkPassToken = await sha256(tokenUuid + uuid);

          if (checkPass === pass) {
            await USERS.put(
              tokenUuid,
              JSON.stringify(
                {
                  uuid,
                  connected: userIdKey,
                },
              ),
              { expirationTtl: 60 },
            );

            return json({ success: true });
          } else if (checkPassToken === pass) {
            return json({ success: true });
          }
          return json({ error: 401 });
        }
      }

      // if (pathname === "/check") {
      //   const key = searchParams.get("key");

      //   if (key === null) return new Response("500");

      //   const waitForChange = async () => {
      //     const uuid = await USERKEYS.get(
      //       key,
      //     );

      //     if (!uuid) return null;

      //     const data = await USERS.get<{ connected: boolean }>(
      //       uuid,
      //       "json",
      //     );
      //     if (!data || data.connected) {
      //       return data;
      //     }
      //     return new Promise((resolve) => {
      //       const clear = setInterval(async () => {
      //         const data = await USERS.get<{ connected: boolean }>(
      //           uuid,
      //           "json",
      //         );
      //         if (!data || data.connected) {
      //           clearInterval(clear);
      //           resolve(data);
      //         }
      //       }, 1000);
      //     });
      //   };

      //   const data = await waitForChange();

      //   return json({ expired: data === null });
      // }

      if (pathname === "/register") {
        const uuid = v4();

        const uuidHash = await sha256(uuid);
        await USERS.put(
          uuid,
          JSON.stringify(
            { uuid, uuidHash, registered: Date.now(), country, colo },
          ),
        );
        await log("register", { uuidHash });
        await USERKEYS.put(uuidHash, uuid);
        return json({ uuid });
      }
      if (pathname === "/token") {
        const uuid = v4();
        const uuidHash = await sha256(uuid);
        await USERS.put(
          uuid,
          JSON.stringify({ uuid, registered: Date.now(), country, colo }),
          { expirationTtl: 60 },
        );
        await USERKEYS.put(uuidHash, uuid, { expirationTtl: 60 });

        return json({ uuid, key: uuidHash });
      }

      if (pathname === "/create-project") {
        const uuidHash = request.headers.get("TOKEN");
        const uuid = v4();
        await USERS.put(
          uuid,
          JSON.stringify({ uuid, registered: Date.now(), country, colo }),
        );
        return json({ uuid });
      }

      const maybeRoute = pathname.substr(1);
      const isKey = [...maybeRoute].filter((x) =>
            x < "0" || x > "f"
          ).length === 0 && maybeRoute.length === 8;
      if (maybeRoute && isKey) {
        return Response.redirect(
          `https://code.spike.land/?signalToQr=${maybeRoute}`,
          307,
        );
      }

      if (pathname === "/") {
        return Response.redirect(
          "https://code.spike.land/ipfs/QmZHkLVcsmBrrEuYjNUNDSmcNjZcjZPnkyLwLjk5oa9wF5/",
          302,
        );
      }

      if (pathname === "/code" || pathname === "/code/") {
        return Response.redirect(
          `https://code.spike.land`,
          302,
        );
      }

      return text(pathname);
    } else if (request.method === "POST") {
      const zkey = String(request.headers.get("ZKEY") || "");

      const sha = zkey.slice(0, 8);
      const uKey = zkey.slice(8, 16);
      const gKey = zkey.slice(16, 24);
      const proofKey = zkey.slice(24, 32);

      if (!sha || !uKey || !gKey || !proofKey) {
        return json({ error: 401, "message": "not matching keys" });
      }
      const checkGkey = await sha256(sha + uKey);

      if (checkGkey !== gKey) {
        return json(
          { error: 401, "message": "content and userkeys are not a pain" },
        );
      }

      const myBuffer = await request.arrayBuffer();
      const hash = await sha256(myBuffer);
      const smallerKey = hash.substring(0, 8);

      if (smallerKey !== sha) {
        return json(
          {
            error: 401,
            message:
              `body hash not matching with the sent hash: ${smallerKey} -- ${zkey}`,
          },
        );
      }

      const uuid = await USERKEYS.get(uKey);

      if (!uuid) return json({ error: 500, message: "user not found" });

      const checkProofKey = await sha256(sha + uuid);

      if (checkProofKey !== proofKey) {
        return json({ error: 401, message: "user not verified" });
      }

      await log("new html", { sha, uKey });

      // this need restriction:
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

      const maybeRoute = pathname.substr(1);

      await SHAKV.put(smallerKey, myBuffer);

      if (maybeRoute) {
        const shaDB = getDbObj(SHAKV);
        const result = await shaDB.put(maybeRoute, smallerKey);
      }

      return json({
        hash: smallerKey,
      });
    }

    return new Response("404");
  } catch (e) {
    return text(
      "ERROR, please refresh <br /><pre>" + JSON.stringify({ e }) + "</pre>",
    );
  }
}
