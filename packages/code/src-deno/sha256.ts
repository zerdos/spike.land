export async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashHex = await arrBuffSha256(msgBuffer);
  return hashHex.substr(0, 8);
}

export async function arrBuffSha256(msgBuffer: Uint8Array) {
  //@ts-ignore
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray.map((b) => ("00" + b.toString(16)).slice(-2)).join(
    "",
  );
  return hashHex;
}
