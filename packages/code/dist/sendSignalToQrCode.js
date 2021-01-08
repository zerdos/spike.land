export async function sendSignalToQrCode() {
    const { pathname } = new URL(window.location.href);
    const maybeRoute = pathname.substr(1);
    const isKey = maybeRoute.length === 8 &&
        [...maybeRoute].filter((x) => x < "0" || x > "f").length === 0;
    if (isKey) {
        await import("./hash.js").then(({ sendSignal }) => sendSignal(`https://zed.vision/${maybeRoute}`));
    }
}
