export async function getHash(hash: string) {
  try {
    const list = `https://code.zed-vision.workers.dev/?h=${hash}`;
    const req = await fetch(list, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    const data = await req.text();

    return data;

    //if (data.code) return data.code as string;
    // return "";
  } catch (e) {
    console.log(e);
    return "";
  }
}

export async function getKeys(apiKey: string, prefix: string) {
  try {
    const list = `https://code.zed-vision.workers.dev/keys/?prefix=${prefix}`;

    const req = await fetch(list, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "API_KEY": apiKey,
      },
    });
    const data = await req.json();
    return data.keys as { name: string }[];
  } catch (e) {
    console.log(e);
    return [] as { name: string }[];
  }
}
