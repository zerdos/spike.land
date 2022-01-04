"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raceToSuccess = exports.publicIpfsGateways = void 0;
exports.publicIpfsGateways = [
  "https://ipfs.io/ipfs/:hash",
  // "https://dweb.link/ipfs/:hash",
  // "https://gateway.ipfs.io/ipfs/:hash",
  // "https://ipfs.infura.io/ipfs/:hash",
  // "https://ninetailed.ninja/ipfs/:hash",
  // "https://10.via0.com/ipfs/:hash",
  // "https://ipfs.eternum.io/ipfs/:hash",
  // "https://hardbin.com/ipfs/:hash",
  // "https://cloudflare-ipfs.com/ipfs/:hash",
  "https://cf-ipfs.com/ipfs/:hash",
  // "https://gateway.pinata.cloud/ipfs/:hash",
  // "https://ipfs.sloppyta.co/ipfs/:hash",
  // "https://ipfs.greyh.at/ipfs/:hash",
  // "https://jorropo.ovh/ipfs/:hash",
  // "https://jorropo.net/ipfs/:hash",
  // "https://gateway.temporal.cloud/ipfs/:hash",
  // "https://ipfs.runfission.com/ipfs/:hash",
  // "https://trusti.id/ipfs/:hash",
  // "https://ipfs.overpi.com/ipfs/:hash",
  // "https://ipfs.ink/ipfs/:hash",
  // "https://gateway.ravenland.org/ipfs/:hash",
  // "https://ipfs.smartsignature.io/ipfs/:hash",
  // "https://ipfs.telos.miami/ipfs/:hash",
  // "https://robotizing.net/ipfs/:hash",
  // "https://ipfs.mttk.net/ipfs/:hash",
  // "https://ipfs.fleek.co/ipfs/:hash",
  // "https://ipfs.jbb.one/ipfs/:hash",
  // "https://ipfs.k1ic.com/ipfs/:hash",
  // "https://ipfs.drink.cafe/ipfs/:hash",
  // "https://ipfs.azurewebsites.net/ipfs/:hash",
  // "https://gw.ipfspin.com/ipfs/:hash",
  // "https://ipfs.denarius.io/ipfs/:hash",
];
function raceToSuccess(promises) {
  let numRejected = 0;
  return new Promise(
    /**
     * @param {Promise<any>} promise
     */
    (resolve, reject) =>
      promises.forEach((promise) =>
        promise
          .then(resolve)
          .catch(() => {
            if (++numRejected === promises.length) {
              reject();
            }
          })
      ),
  );
}
exports.raceToSuccess = raceToSuccess;
