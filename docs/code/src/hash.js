import versions from "./versions.js";

// @ts-ignore
const v = versions();

/**
 * 
 * @param {string} cid 
 */

const feedTheCache = (cid) => {
  fetch(`https://code.zed.vision/ipfs/${cid}`).then((resp) => resp.text());
  // console.log(cid);
  return cid;
};

/**
 * @param {string | any[]} data
 */

const half = (data) => {
  const halfLength = (data.length - (data.length % 2)) / 2;

  if (
    data.slice(0, halfLength - 1) === data.slice(halfLength + 1, 2 * halfLength)
  ) {
    return (data.slice(0, halfLength));
  }

  // console.log({
  //   slice1: data.slice(0, halfLength) ,
  //   slice2: data.slice(halfLength-1, 2 * halfLength-1)
  // })

  return data;
};

async function getClient() {
  const { getIpfs } = await import("./ipfs.client.js");
  return getIpfs();
}

/**
 * @param {any} data
 * @param {any} onlyHash
 */
const hash = async (data, onlyHash) => {
  /** @type {{ add: (arg0: string, arg1: { onlyHash: any; }) => any; } | null} */
  const ipfs = await getClient();

  const noisyHashes = (await Promise.all([
    // @ts-ignore
    await ipfs.add(`${data}`, { onlyHash }),
  ]));
  if (!onlyHash) {
    const data = await Promise.all(noisyHashes.map(feedTheCache));
    return data[0];
  }

  const res = await Promise.all(
    noisyHashes.map((cid) =>
      getHash(cid, 20000).then((x) => ({ success: x === data }))
    ),
  );

  return res[0];
};

/**
 * @param {string} cid
 * @param {number|undefined} _timeOut
 */
const getHash = async (cid, _timeOut) => {
  const timeout = _timeOut || 20000;
  try {
    /** @type {{ cat: (arg0: any, arg1: any) => any; } | null} */
    const ipfs = await getClient();

    // @ts-ignore
    const data = await ipfs.cat(cid, { timeout });
    if (typeof data === "string") return half(data);
    // console.error({ data });
  } catch (e) {
    console.log({ e });
  }
};

/**
 * @param {string} signal => Promise<{success: boolean}>
 */

export const waitForSignal = (signal) => {
  return hash(signal, true).catch(() => ({ success: false }));
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

    const dataCid = await hash(data, false);
    const hexHash = Array.from((new CID(dataCid)).multihash).map((b) =>
      ("00" + b.toString(16)).slice(-2)
    ).join("");

    const allHash = new Array(hexHash.length).fill(signal).map((x, i) =>
      x + hexHash.slice(0, i + 1)
    );

    await Promise.all(
      allHash.slice(0, 5).map((x) => hash(x, false)),
    );

    await Promise.all(
      allHash.slice(5).map((x) => hash(x, false)),
    );
  }
  alert(`v2   ${signal} ${data}`);
  return { success: true };
};

/**
 * @param {string} url
 */
export const waitForSignalAndJump = async (url) => {
  try {
    const res = await waitForSignal(url);
    if (typeof res === "string" || res.success) {
      window.location.href = url;
    }
  } catch (e) {
    console.log({ msg: "SignalAndJump error", e });
  } finally {
    console.log({ msg: "SignalAndJump Final" });
  }
};

/**
 * @param {{signal: string, onSignal: (getData: ()=> any)=>any, onError?: ()=>any, onExpired?: ()=>any }} opts
 */
export const waitForSignalAndRun = async (
  { signal, onSignal, onError, onExpired },
) => {
  try {
    const res = await waitForSignal(signal);
    if (typeof res === "string" || res.success) {
      if (typeof onSignal === "function") {
        const CID = (await import("./vendor/cids.js")).default;
        return onSignal(
          async () => {
            let hashHex = "";
            while (hashHex.length < 68) {
              console.log(`Getting ${hashHex.length} from 68 `);
              hashHex += await getNextChar(signal + hashHex);
            }

            const cid = new CID(0, 112, fromHexString(hashHex));

            const data = await getHash(cid.toString(), 20000);

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

            return parse(data);
          },
        );
      }
      return 0;
    }
    return 1;
  } catch (e) {
    if (typeof onError === "function") {
      return onError();
    }
    return 1;
  } finally {
    if (typeof onExpired === "function") return onExpired();
    return -1;
  }
};

export const getNextChar =
  /**
 * @param {string} signal
 */
  async (signal) => {
    const chars = [..."0123456789abcdef"];

    const nextChar = await raceToSuccess(
      chars.map((x) =>
        waitForSignal(signal + x).then((s) => {
          if (typeof s === "string") return x;
          if (s.success) return x;
          throw new Error("nope");
        })
      ),
    );

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

// const toHexString = bytes =>
//   bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');

// console.log(toHexString(new Uint8Array([0, 1, 2, 42, 100, 101, 102, 255])))
// console.log(fromHexString('1220ea7802d96f792f9015d67fd65eac5b2ecc4a1b8682e9c73f76fd3ec7efc1af24'))

// import("./code/src/vendor/cids.js").then(m=>m.default).then(CID=>new CID(1,112,fromHexString("1220ea7802d96f792f9015d67fd65eac5b2ecc4a1b8682e9c73f76fd3ec7efc1af24"))).then(x=>Array.from(x.multihash))
// import("./code/src/vendor/cids.js").then(m=>m.default).then(CID=>new CID("Qme7vFQnRzk2AoEgWMkQ8PDujZmUb3BoR1kEtSa1s83fQP")).then(x=>Array.from(x.multihash).map((b) => ("00" + b.toString(16)).slice(-2)).join(""))

///  waitForSignalAndRun( {signal, onSignal: async (data)=> {const nextChar = await(getData()); console.log(nextChar)  }})
