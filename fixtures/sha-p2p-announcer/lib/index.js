"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.p2pMessages = void 0;

require("babel-polyfill");

var _libp2p = _interopRequireDefault(require("libp2p"));

var _libp2pWebsockets = _interopRequireDefault(require("libp2p-websockets"));

var _libp2pWebrtcStar = _interopRequireDefault(require("libp2p-webrtc-star"));

var _libp2pNoise = require("libp2p-noise");

var _libp2pMplex = _interopRequireDefault(require("libp2p-mplex"));

var _libp2pBootstrap = _interopRequireDefault(require("libp2p-bootstrap"));

var _libp2pGossipsub = _interopRequireDefault(require("libp2p-gossipsub"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const p2pMessages = async (channel, onMessage) => {
  console.log("haaaldkd"); // Create our libp2p node

  const libp2p = await _libp2p.default.create({
    addresses: {
      // Add the signaling server address, along with our PeerId to our multiaddrs list
      // libp2p will automatically attempt to dial to the signaling server so that it can
      // receive inbound connections from other peers
      listen: ["/ip4/0.0.0.0/tcp/9090/ws/p2p-webrtc-star", '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star', '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star']
    },
    modules: {
      transport: [_libp2pWebsockets.default, _libp2pWebrtcStar.default],
      connEncryption: [_libp2pNoise.NOISE],
      streamMuxer: [_libp2pMplex.default],
      peerDiscovery: [_libp2pBootstrap.default],
      pubSub: _libp2pGossipsub.default
    },
    config: {
      enableRelay: true,
      peerDiscovery: {
        // The `tag` property will be searched when creating the instance of your Peer Discovery service.
        // The associated object, will be passed to the service when it is instantiated.
        [_libp2pBootstrap.default.tag]: {
          enabled: true,
          list: ["/ip4/0.0.0.1/tcp/4001/p2p/12D3KooWCmckqZnjL9JCyykFWoDSDD1xvoGJ5Ukkuwmw9rHSStwF", '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd', '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3', '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM', '/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu', '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm', '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64', "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN", "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa", "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb", "/ip4/127.0.0.1/tcp/4001/p2p/12D3KooWCmckqZnjL9JCyykFWoDSDD1xvoGJ5Ukkuwmw9rHSStwF"]
        }
      },
      pubsub: {
        // The pubsub options (and defaults) can be found in the pubsub router documentation
        enabled: true,
        emitSelf: true,
        // whether the node should emit to self on publish
        signMessages: true,
        // if messages should be signed
        strictSigning: true // if message signing should be required

      }
    }
  });

  function log(txt) {
    console.log(txt);
  }

  await libp2p.start();
  const gsub = new _libp2pGossipsub.default(libp2p);
  console.log("YAY");
  gsub.start();
  gsub.on(channel, event => {
    const str = new TextDecoder().decode(event.data);
    onMessage(str);
  });
  gsub.subscribe(channel);
  return {
    message: async str => await gsub.publish(channel, new TextEncoder().encode(str))
  };
};

exports.p2pMessages = p2pMessages;

const onMessage = m => console.log(m);

p2pMessages("haaaldkd", onMessage).then(p2p => window.p2p = p2p);