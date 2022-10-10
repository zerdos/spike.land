import defaultConf from "ipfs-core-config/config";
import { libp2pConfig } from "ipfs-core-config/libp2p";
import { routers } from "ipfs-core-config/libp2p-pubsub-routers";

export const startIpfs = async (codeSpace: string) => {
  const options = defaultConf();

  const { create } = await import("ipfs");

  const newOptions = {
    ...options,

    Bootstrap: [
      "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
      "/ip4/104.131.131.82/udp/4001/quic/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
      "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
      "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
      "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
      "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
    ],
    Swarm: { ...options.Swarm, ...libp2pConfig() },
    Pubsub: {
      Enabled: true,
      ...routers,
    },
    Discovery: {
      MDNS: {
        Enabled: true,
        Interval: 10,
      },
      webRTCStar: {
        Enabled: true,
      },
    },
  };

  const ipfs = await create({ repo: codeSpace, ...newOptions });

  // Await ipfs.config.replace({ ...(await ipfs.config.getAll()), ...newOptions});
  // globalThis.newOptions = newOptions;
  // globalThis.ipfs = ipfs;

  const topic = origin + "/live/" + codeSpace;

  if (!(await ipfs.key.list()).map((x) => x.name).includes("coder")) {
    await ipfs.key.import(
      "coder",
      "mWWiB7oiZ2ke5fQsg2fN8jAC6+WHhY/dYrwuhgI0zbAzE/lbIlHdATjwtgKAfmnhgaGdLOuk5pl0A2i4eDTCtw+dASlAHN3/dXGrdDhwq+l8OouPyq3NwDlC/l8D/CdpEG/K+SWWynbFbHgo9877XuA",
      "zolika84",
    );
  }

  //   Await ipfs.swarm.connect((await ipfs.id()).id.toCID().toString());
  await ipfs.pubsub.subscribe(
    topic,
    (message: { data: ArrayBuffer }) => {
      console.log(new TextDecoder().decode(message.data));
    },
  );

  console.log(`subscribed to ${topic}`);

  const send = async (data: string) =>
    ipfs.pubsub.publish(topic, new TextEncoder().encode(data));
  const cat = async (cid: string) => {
    const stream = ipfs.cat(cid);
    Object.assign(globalThis, { send, cat });
    const decoder = new TextDecoder();
    let data = "";

    for await (const chunk of stream) {
      // Chunks of data are returned as a Uint8Array, convert it back to a string
      data += decoder.decode(chunk, { stream: true });
    }

    console.log(data);
    return data;
  };
  //  Const room =  new PubSubRoom(ipfs.libp2p, '12D3KooWQNWHF6o7jdEq6VQAYmE4tnYyJw7XTMHip49whBfdi7MJ')

  //  globalThis.room = room;
  // room.on('peer joined', (peer) => {
  //   console.log('Peer joined the room', peer)
  // })

  // room.on('peer left', (peer) => {
  //   console.log('Peer left...', peer)
  // })

  // // now started to listen to room
  // room.on('subscribed', () => {
  //   console.log('Now connected!')
  // })
};
