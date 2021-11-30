import Hash from "ipfs-only-hash";
import { text } from "./utils/responds";
import { log } from "./log";
import { handleCloudRequest } from "./handler";

import { publicIpfsGateways, raceToSuccess } from "@spike.land/ipfs";

export type KV = { [key: string]: string };

const reverseMap: KV = {};
const filteredFiles: KV = {};

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond with hello worker text
 * @param {Request} request}
 */
async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const { pathname } = url;

  if (pathname === "/") {
    const { content } = await import("./indexHtml");
    return text(content);
  }

  // do not do anything if bots looking for wordpress
  if (pathname.includes("wp-includes")) return await text("404");

  if (pathname.startsWith("/error/")) {
    const maybeCID = pathname.slice(7);
    const content = await request.text();
    const calculatedCID = await Hash.of(content);

    if (maybeCID === calculatedCID) {
      const uuid = request.headers.get("UID");
      if (!uuid) return await text("UID is empty");

      const user: Object | null = await USERS.get(uuid, "json");
      if (!user) return await text("USER not found");
      await IPFS.put(calculatedCID, content);
      await USERS.put(
        uuid,
        JSON.stringify({ ...user, errorCode: calculatedCID }),
      );
      await log("SAVE", {
        data: {
          CID: calculatedCID,
        },
      });
      return await text("CID saved");
    }

    return await text("test");
  }
  return await handleCloudRequest(request);
}

async function fetchCid(path: string, retry = 3): Promise<Response> {
  const random5GatewaysFetch = publicIpfsGateways.sort(() =>
    0.5 - Math.random()
  )
    .slice(0, 5).map((gw: string) => gw.replace("/ipfs/:hash", path))
    .map((x: string) =>
      fetch(x).then((res) => {
        if (!res || res.status !== 200) {
          throw new Error("Not found");
        }
        return res.clone();
      }).catch((e) => console.log({ e }))
    );

  let res;

  try {
    res = await raceToSuccess(random5GatewaysFetch) as Response;
    if (res) return res.clone();
  } catch {
    if (retry > 0) return await fetchCid(path, retry - 1) as Response;
    throw new Error("500 - some error - :(");
  }
  if (retry > 0) return await fetchCid(path, retry - 1) as Response;
  throw new Error("500 - some error");
}
