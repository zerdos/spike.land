export const parse = (str) => {
  const cookies = {};
  if (!str) return cookies;

  str.split(";").forEach(pair => {
    const eqIdx = pair.indexOf("=");
    if (eqIdx < 0) return;

    const key = pair.slice(0, eqIdx).trim();
    const val = pair.slice(eqIdx + 1).trim();

    if (key && val) {
      cookies[key] = val;
    }
  });

  return cookies;
};

export const serialize = (name, value) => {
  return `${name}=${value}`;
};
