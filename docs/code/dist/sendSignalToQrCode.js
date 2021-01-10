import { getUserId } from "./data.js";
import { sha256 } from "./db.js";
export async function sendSignalToQrCode() {
    const { pathname } = new URL(window.location.href);
    const maybeRoute = pathname.substr(1);
    const isKey = maybeRoute.length === 8 &&
        [...maybeRoute].filter((x) => x < "0" || x > "f").length === 0;
    if (isKey) {
        await (import("./hash.js").then(async ({ sendSignal }) => {
            const signal = `https://zed.vision/${maybeRoute}`;
            await addDataToSignal(signal, {});
            sendSignal(signal);
        }));
    }
}
/**
 *
 * @param {string} signal
 * @param {any} _data
 */
export const addDataToSignal = async (signal, _data) => {
    const data = {
        signal: signal,
        message: "hello",
        signals: {
            test: "sksjdhdohwodofhwqddddddw",
        },
    };
    const dataAsString = JSON.stringify(data);
    const hash = await sha256(dataAsString);
    const ZKEY = await getZkey(hash);
    return fetch("https://zed.vision", {
        body: dataAsString,
        method: "POST",
        headers: {
            ZKEY,
        },
    });
};
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
