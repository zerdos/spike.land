importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");

async function wArrBuffSha256(msgBuffer) {
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray.map((b) => ("00" + b.toString(16)).slice(-2)).join(
    "",
  );
  return hashHex.slice(0, 8);
}

const arrBuffSha256 = (msgBuffer) => {
  return wArrBuffSha256(msgBuffer);
};

Comlink.expose(arrBuffSha256);
