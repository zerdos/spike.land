export async function getHash(hash: string) {
  try {
    const list = `https://code.zed.vision/?h=${hash}`;
    const req = await fetch(list, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
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

async function getCode(hash: string) {
  try {
    const list = `https://code.zed.vision/?h=${hash}`;
    const req = await fetch(list, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    const data = await req.json();
    if (data.code) return data.code as string;
    return "";
  } catch (e) {
    console.log(e);
    return "";
  }
}

async function deleteHash(apiKey: string, hash: string) {
  try {
    const url = `https://code.zed.vision/keys/delete/?hash=${hash}`;
    const req = await fetch(url, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "API_KEY": apiKey,
      },
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getKeys(apiKey: string, prefix: string) {
  try {
    const list = `https://code.zed.vision/keys/?prefix=${prefix}`;

    const req = await fetch(list, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
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
