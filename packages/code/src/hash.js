/**
 * 
 * @param {string} cid 
 */

const feedTheCache = (cid) => {
  const controller = new AbortController();
  fetch(`https://zed.vision/ipfs/${cid}`).then((x) => x.text());

  const random5GatewaysFetch = publicIpfsGateways.sort(() =>
    0.5 - Math.random()
  ).slice(0, 5).map((gw) => gw.replace("/ipfs/:hash", `/ipfs/${cid}`)).map((
    x,
  ) =>
    fetch(x, { signal: controller.signal }).then((res) =>
      res.status === 200 ? res : (() => {
        throw new Error("Not found");
      })()
    )
  );

  raceToSuccess(random5GatewaysFetch).then(() => controller.abort());

  // console.log(cid);
  return cid;
};

async function getClient() {
  const { getIpfs } = await import("./ipfsClient.js");
  return getIpfs();
}

/**
 * @param {any} data
 * @param {any} onlyHash
 */
const hash = async (data, { onlyHash, signal }) => {
  /** @type {{ add: (arg0: string, arg1: { onlyHash: any; }) => any; } | null} */
  const ipfs = await getClient();

  const noisyHashes = (await Promise.all([
    // @ts-ignore
    await ipfs.add(`${data}`, { onlyHash }).then((d) => d.cid.toString()),
  ]));
  if (!onlyHash) {
    console.log(`adding data to ipfs: ${data} `);
    const returnData = await Promise.all(noisyHashes.map(feedTheCache));
    return returnData[0];
  }

  const res = await Promise.all(
    noisyHashes.map((cid) =>
      getHash(cid, signal).then((x) => ({ success: x === data }))
    ),
  );

  return res[0];
};

const cidCache = {};
/**
 * @param {string} cid
 * @param {AbortSignal} signal
 */
const getHash = async (cid, signal) => {
  //@ts-ignore
  if (cidCache[cid]) return cidCache[cid];
  signal.onabort = function () {
    aborted = 1;
  };
  let aborted = 0;
  try {
    /** @type {{ cat: (arg0: any, arg1: any) => any; } | null} */
    const ipfs = await getClient();
    if (aborted) return "";
    // @ts-ignore

    const data = await ipfs.cat(cid);
    /** @type {Uint8Array | null} */
    let resultUintArr = null;
    if (aborted) return "";

    for await (let res of data) {
      if (resultUintArr !== null) {
        //@ts-ignore
        resultUintArr.concat(res);
      } else {
        resultUintArr = res;
      }
    }
    if (aborted) return "";

    //@ts-ignore
    const result = new TextDecoder().decode(resultUintArr);
    //@ts-ignore
    cidCache[cid] = result;
    return result;
    // console.error({ data });
  } catch (e) {
    // console.log({});
  }
};

/**
 * @param {string} signal => Promise<{success: boolean}>
 * @param {AbortSignal} abortSignal
 */

const _waitForSignal = async (signal, abortSignal) => {
  return hash(signal, { onlyHash: true, signal: abortSignal }).then((x) =>
    (typeof x === "string" || (x && x.success))
      ? { success: true }
      : { success: false }
  ).catch(() => ({ success: false }));
};

/**
 * @param {string} signal 
 * @param {string} data
 */
export const sendSignal = async (signal, data) => {
  await hash(signal, false);

  if (data) {
    const CID = (await import("./vendor/cids.js")).default;

    // @ts-ignore
    let toSave = data;

    if (typeof data !== "string") toSave = JSON.stringify(data);

    //@ts-ignore
    const dataCid = await hash(data, false);

    const hexHash = Array.from((new CID(dataCid)).multihash).map((b) =>
      ("00" + b.toString(16)).slice(-2)
    ).join("");

    const allHash = new Array(hexHash.length).fill(signal).map((x, i) =>
      x + new Array(i).fill("x").join("") + hexHash.slice(i, i + 1)
    );

    await Promise.all(
      allHash.slice(0, 5).map((x) => hash(x, false)),
    );

    await Promise.all(
      allHash.slice(5).map((x) => hash(x, false)),
    );
  }
  return { success: true };
};

const signalDataCache = {};
/**
 * @param {string} signal
 * @param {number} _retry
 * @returns {Promise<()=>Promise<any>>} result
 */
export const fetchSignal = async (
  signal,
  _retry,
) => {
  const retry = (typeof _retry === "number") ? _retry : 5;
  const abort = new AbortController();

  let isSignalReceived = null;
  try {
    if (retry === 0) throw new Error("No more retry");
    console.log(
      `Waiting for "${signal}"  (the content to be available on IPFS = we know what will be it's address)`,
    );
    const res = await _waitForSignal(signal, abort.signal);
    if (!res.success) return fetchSignal(signal, retry - 1);

    isSignalReceived = true;
    console.log(`Signal received!`, { res });

    const getData = async () => {
      //@ts-ignore

      if (signalDataCache[signal]) return signalDataCache[signal];

      /**
     * @param {number} delay
     */
      const run = async (delay) => {
        //@ts-ignore
        if (signalDataCache[signal]) return signalDataCache[signal];
        console.log(`delay: ${delay}`);

        try {
          const CID = (await import("./vendor/cids.js")).default;

          const hashArr = new Array(68).fill(0).map((_x, i) =>
            wait(Math.random() * 1000).then(() => getCharAt(signal, i))
          );

          const hashHex = (await Promise.all(hashArr)).join("");

          //@ts-ignore
          if (signalDataCache[signal]) return signalDataCache[signal];

          const cid = new CID(0, 112, fromHexString(hashHex));

          const data = await getHash(cid.toString(), abort.signal);
          //@ts-ignore
          if (signalDataCache[signal]) return signalDataCache[signal];
          /**
         * @param {string | any[] | { success: boolean; } | undefined} d
         */
          const parse = (d) => {
            try {
              if (typeof d !== "string") return d;

              const ret = JSON.parse(d);
              return ret;
            } catch (e) {
              return d;
            }
          };

          const ret = parse(data);
          console.log(
            `got the result and putting it to cache, the delay was: ${delay}`,
            { ret },
          );
          //@ts-ignore
          signalDataCache[signal] = ret;

          return ret;
        } catch (e) {
          console.log("error while getting the data", { e });
        }
      };

      /**
       * @param {number} delay
       */
      const runWithDelay = async (delay) =>
        wait(delay).then((delay) => run(delay));

      const res = await raceToSuccess([
        runWithDelay(0),
        runWithDelay(500),
        runWithDelay(1000),
        runWithDelay(3000),
        runWithDelay(4000),
        runWithDelay(8000),
        runWithDelay(12000),
      ]);

      return res;
    };

    return getData;
  } catch (e) {
    isSignalReceived = false;
    console.log(`Bad news! No signal, and it seems there is an error.`);
    throw new Error("No signal, and it seems there is an error");
  } finally {
    if (isSignalReceived === null) {
      console.log(
        "What WHAT? This is unexpected, we are in the finally part - without error.",
      );
    }
  }
};

const signalCache = {};

export const getCharAt =
  /**
 * @param {string} signal
 * @param {number} i
 */
  async (signal, i) => {
    //@ts-ignore
    if (!signalCache[signal]) {
      //@ts-ignore
      signalCache[signal] = {};
    }
    //@ts-ignore
    if (signalCache[signal][i]) return signalCache[signal][i];

    const chars = [..."0123456789abcdef"];

    const controller = new AbortController();
    const prefix = new Array(i).fill("x").join("");

    const raceArray = chars.map((x) =>
      _waitForSignal(signal + prefix + x, controller.signal).then((s) => {
        if (s.success) return x;
        throw new Error("nope");
      })
    );

    const nextChar = await raceToSuccess(
      raceArray,
    );

    console.log(`${signal} data hash char ${i}: ${nextChar}`);
    //@ts-ignore
    signalCache[signal][i] = nextChar;
    controller.abort();

    return nextChar;
  };

export const getNextChar =
  /**
 * @param {string} signal
 */
  async (signal) => {
    const chars = [..."0123456789abcdef"];

    const controller = new AbortController();

    const raceArray = chars.map((x) =>
      _waitForSignal(signal + x, controller.signal).then((s) => {
        if (s.success) return x;
        throw new Error("nope");
      })
    );

    const nextChar = await raceToSuccess(
      raceArray,
    );
    controller.abort();

    return nextChar;
  };

/**
 * @param {any[]} promises
 */
function raceToSuccess(promises) {
  let numRejected = 0;

  return new Promise(
    /**
     * @param {Promise<any>} promise
     */
    (resolve, reject) =>
      promises.forEach(
        (promise) =>
          promise
            .then(resolve)
            .catch(
              () => {
                if (++numRejected === promises.length) reject();
              },
            ),
      ),
  );
}

/**
       * @param {number} delay
       */
function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

/**
 * @param {string} hexString
 */
const fromHexString = (hexString) =>
  new Uint8Array(
    /**
   * @param {string} byte
   */
    //@ts-ignore
    hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)),
  );

/**
 * @param {string} pathname
 */
const random5GatewaysFetch = (pathname) => {
  publicIpfsGateways.sort(() => 0.5 - Math.random()).slice(0, 5).map((gw) =>
    gw.replace("/ipfs/:hash", pathname)
  ).map((
    x,
  ) =>
    fetch(x).then((res) =>
      res.status === 200 ? res : (() => {
        throw new Error("Not found");
      })()
    )
  );
};

// const toHexString = bytes =>
//   bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

// console.log(toHexString(new Uint8Array([0, 1, 2, 42, 100, 101, 102, 255])))
// console.log(fromHexString('1220ea7802d96f792f9015d67fd65eac5b2ecc4a1b8682e9c73f76fd3ec7efc1af24'))

// import("./code/src/vendor/cids.js").then(m=>m.default).then(CID=>new CID(1,112,fromHexString("1220ea7802d96f792f9015d67fd65eac5b2ecc4a1b8682e9c73f76fd3ec7efc1af24"))).then(x=>Array.from(x.multihash))
// import("./code/src/vendor/cids.js").then(m=>m.default).then(CID=>new CID("Qme7vFQnRzk2AoEgWMkQ8PDujZmUb3BoR1kEtSa1s83fQP")).then(x=>Array.from(x.multihash).map((b) => ("00" + b.toString(16)).slice(-2)).join(""))

///  fetchSignal( {signal, onSignal: async (data)=> {const nextChar = await(getData()); console.log(nextChar)  }})
const publicIpfsGateways = [
  "https://ipfs.io/ipfs/:hash",
  "https://dweb.link/ipfs/:hash",
  "https://gateway.ipfs.io/ipfs/:hash",
  "https://ipfs.infura.io/ipfs/:hash",
  "https://ninetailed.ninja/ipfs/:hash",
  "https://10.via0.com/ipfs/:hash",
  "https://ipfs.eternum.io/ipfs/:hash",
  "https://hardbin.com/ipfs/:hash",
  "https://cloudflare-ipfs.com/ipfs/:hash",
  "https://cf-ipfs.com/ipfs/:hash",
  "https://gateway.pinata.cloud/ipfs/:hash",
  "https://ipfs.sloppyta.co/ipfs/:hash",
  "https://ipfs.greyh.at/ipfs/:hash",
  "https://jorropo.ovh/ipfs/:hash",
  "https://jorropo.net/ipfs/:hash",
  "https://gateway.temporal.cloud/ipfs/:hash",
  "https://ipfs.runfission.com/ipfs/:hash",
  "https://trusti.id/ipfs/:hash",
  "https://ipfs.overpi.com/ipfs/:hash",
  "https://ipfs.ink/ipfs/:hash",
  "https://gateway.ravenland.org/ipfs/:hash",
  "https://ipfs.smartsignature.io/ipfs/:hash",
  "https://ipfs.telos.miami/ipfs/:hash",
  "https://robotizing.net/ipfs/:hash",
  "https://ipfs.mttk.net/ipfs/:hash",
  "https://ipfs.fleek.co/ipfs/:hash",
  "https://ipfs.jbb.one/ipfs/:hash",
  "https://jacl.tech/ipfs/:hash",
  "https://ipfs.k1ic.com/ipfs/:hash",
  "https://ipfs.drink.cafe/ipfs/:hash",
  "https://ipfs.azurewebsites.net/ipfs/:hash",
  "https://gw.ipfspin.com/ipfs/:hash",
  "https://ipfs.denarius.io/ipfs/:hash",
];
