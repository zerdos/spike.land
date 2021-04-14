import { getUserId, saveCode } from "./data.mjs";
import { sha256 } from "../modules/sha256.js";

/**
 * @param {string} rootUrl
 */
export async function sendSignalToQrCode(session) {
  const { searchParams } = new URL(window.location.href);

  const maybeRoute = searchParams.get("signalToQr") || "";
  const isKey = maybeRoute.length === 8 &&
    [...maybeRoute].filter((x) => x < "0" || x > "f").length === 0;

  if (!isKey) return;

  await saveCode(session);

  const { sendSignal } = await import("./hash.mjs");
  const signal = `https://zed-vision.zed-vision.workers.dev/${maybeRoute}`;

  await sendSignal(
    signal,
    {
      rootUrl: `${session.url}edit/`,
      signals: {
        onChange: "url",
        onLogout: "url",
      },
    },
  );
}

// /**
//  *
//  * @param {string} signal
//  * @param {any} _data
//  */
// export const addDataToSignal = async (signal, _data) => {
//   const data = {
//     signal: signal,
//     message: "hello",
//     signals: {
//       test: "",
//     },
//   };
//   const dataAsString = JSON.stringify(data);
//   const hash = await sha256(dataAsString);
//   const ZKEY = await getZkey(hash);

//   return fetch("https://zed-vision.zed-vision.workers.dev", {
//     body: dataAsString,
//     method: "POST",
//     headers: {
//       ZKEY,
//     },
//   });
// };

/**
 * @param {string} hash
 */
export async function getZkey(hash) {
  const uuid = await getUserId();
  const uKey = await sha256(uuid);
  const gKey = await sha256(hash + uKey);
  const vKey = await sha256(hash + uuid);

  return `${hash}${uKey}${gKey}${vKey}`;
}
