let inc = 0;
export function log(message: string, data: unknown = {}) {
  const now = Date.now();

  const [hour, minute] = new Date().toLocaleTimeString("en-GB").split(/:| /);

  return LOGS.put(
    String(2000000000000 - now - inc++),
    JSON.stringify({ message, time: `${hour}:${minute}`, data }),
    { expirationTtl: 86400 * 7 },
  );
}
