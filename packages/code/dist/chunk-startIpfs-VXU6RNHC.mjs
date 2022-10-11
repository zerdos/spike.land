import {
  init_define_process
} from "./chunk-chunk-QTIR5YHF.mjs";
import "./chunk-chunk-477FBAEY.mjs";

// js/startIpfs.ts
init_define_process();

// js/iumd.mjs
init_define_process();
var iumd_default = async (url, module = { exports: {} }) => (Function("module", "exports", await (await fetch(url)).text()).call(
  module,
  module,
  module.exports
), module).exports;

// js/startIpfs.ts
import "/npm:ipfs-core-config/src/libp2p.browser.js";
import { routers } from "/npm:ipfs-core-config/src/libp2p-pubsub-routers.browser.js";
var startIpfs = async (codeSpace) => {
  const { create } = await iumd_default(
    "https://unpkg.com/ipfs-core@0.16.1/dist/index.min.js"
  );
  const options = {
    Addresses: {
      Swarm: [],
      Announce: [],
      NoAnnounce: [],
      API: "",
      Gateway: "",
      RPC: "",
      Delegates: [
        "/dns4/node0.delegate.ipfs.io/tcp/443/https",
        "/dns4/node1.delegate.ipfs.io/tcp/443/https",
        "/dns4/node2.delegate.ipfs.io/tcp/443/https",
        "/dns4/node3.delegate.ipfs.io/tcp/443/https"
      ]
    },
    Discovery: {
      MDNS: {
        Enabled: false,
        Interval: 10
      },
      webRTCStar: {
        Enabled: true
      }
    },
    Bootstrap: [
      "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
      "/ip4/104.131.131.82/udp/4001/quic/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
      "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
      "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
      "/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp",
      "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
      "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
      "/dns4/node0.preload.ipfs.io/tcp/443/wss/p2p/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic",
      "/dns4/node1.preload.ipfs.io/tcp/443/wss/p2p/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6",
      "/dns4/node2.preload.ipfs.io/tcp/443/wss/p2p/QmV7gnbW5VTcJ3oyM2Xk1rdFBJ3kTkvxc87UFGsun29STS",
      "/dns4/node3.preload.ipfs.io/tcp/443/wss/p2p/QmY7JB6MQXhxHvq7dBDh4HpbH29v4yE9JRadAVpndvzySN"
    ],
    Pubsub: {
      Enabled: true
    },
    Swarm: {
      ConnMgr: {
        LowWater: 5,
        HighWater: 20
      },
      DisableNatPortMap: true
    },
    Routing: {
      Type: "dhtclient"
    }
  };
  const newOptions = {
    ...options,
    init: {
      emptyRepo: true
    },
    Bootstrap: [
      "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
      "/ip4/104.131.131.82/udp/4001/quic/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
      "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
      "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
      "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
      "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt"
    ],
    Pubsub: routers(),
    Discovery: {
      MDNS: {
        Enabled: true,
        Interval: 10
      },
      webRTCStar: {
        Enabled: true
      }
    }
  };
  const ipfs = await create(newOptions);
  const allConf = await ipfs.config.getAll();
  console.log({ allConf });
  const topic = origin + "/live/" + codeSpace;
  if (!(await ipfs.key.list()).map((x) => x.name).includes(
    "coder"
  )) {
    await ipfs.key.import(
      "coder",
      "mWWiB7oiZ2ke5fQsg2fN8jAC6+WHhY/dYrwuhgI0zbAzE/lbIlHdATjwtgKAfmnhgaGdLOuk5pl0A2i4eDTCtw+dASlAHN3/dXGrdDhwq+l8OouPyq3NwDlC/l8D/CdpEG/K+SWWynbFbHgo9877XuA",
      "zolika84"
    );
  }
  await ipfs.pubsub.subscribe(
    topic,
    (message) => {
      console.log(new TextDecoder().decode(message.data));
    }
  );
  console.log(`subscribed to ${topic}`);
  const send = async (data) => ipfs.pubsub.publish(topic, new TextEncoder().encode(data));
  const cat = async (cid) => {
    const stream = ipfs.cat(cid);
    Object.assign(globalThis, { send, cat });
    const decoder = new TextDecoder();
    let data = "";
    for await (const chunk of stream) {
      data += decoder.decode(chunk, { stream: true });
    }
    console.log(data);
    return data;
  };
  Object.assign(globalThis, { cat, send, ipfs, routers, newOptions });
};
export {
  startIpfs
};
