// import P2PCF from 'p2pcf';


// export const join = (codeSpace: string, user: string,  onMessage: (msg: object)=>void)=>{
//   const client_id = user;
//   const room_id = codeSpace;



// const p2pcf = new P2PCF(client_id, room_id, {
//   // Worker URL (optional) - if left out, will use a public worker
  
//   workerUrl: `https://webrtc.spike.land`,

  

//   // STUN ICE servers (optional)
//   // If left out, will use public STUN from Google + Twilio
//   stunIceServers: { iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com:3478"] }], sdpSemantics: "unified-plan" },
  
//   // TURN ICE servers (optional)
//   // If left out, will use openrelay public TURN servers from metered.ca
//   // turnIceServers: { ... },
  
//   // Network change poll interval (milliseconds, optional, default: 15000, 15 seconds)
//   // Interval to poll STUN for network changes + reconnect
//   networkChangePollIntervalMs: 10_000,
  
//   // State expiration interval (milliseconds, optional, default: 120000, 2 minutes)
//   // Timeout interval for peers during polling
//   // stateExpirationIntervalMs: ...,
  
//   // State heartbeat interval (milliseconds, optional, default: 30000, 30 seconds)
//   // Time before expiration to heartbeat
//   // stateHeartbeatWindowMs: ...,
  
//   // Fast polling rate (milliseconds, optional, default: 750)
//   // Polling rate during state transitions
//   // fastPollingRateMs: ...,
  
//   // Slow polling rate (milliseconds, optional, default: 1500, 1.5 seconds)
//   // Polling rate when state is idle
//   // slowPollingRateMs: ...,

//   // Options to pass to RTCPeerConnection constructor (optional)
//   rtcPeerConnectionOptions: {},

//   // Proprietary constraints to pass to RTCPeerConnection constructor (optional)
//   // rtcPeerConnectionProprietaryConstraints: {},

//   // SDP transform function (optional)
//   sdpTransform: sdp => sdp
// });

// // Start polling
// p2pcf.start()




// p2pcf.on('peerconnect', peer => {
//   // New peer connected
  
//   // Peer is an instance of simple-peer (https://github.com/feross/simple-peer)
//   //
//   // The peer has two custom fields:
//   // - id (a per session unique id)
//   // - client_id (which was passed to their P2PCF constructor)
  
//   console.log("New peer:", peer.id, peer.client_id)
  
//   peer.on('track', (track, stream) => {
//     // New media track + stream from peer
//   })
  
//   // Add a media stream to the peer to start sending it
//   // peer.addStream(new MediaStream(...))
// })

// // p2pcf.on('peerclose', peer => {
//   // Peer has disconnected
// // })

// p2pcf.on('msg', (peer, data) => {
// const str = ab2str(data);


// const obj= JSON.parse(str);

// onMessage(obj);
  
//   // Received data from peer (data is an ArrayBuffer)
// })

// // Broadcast a message via data channel to all peers

// // To send a message via data channel to just one peer:
// //p2pcf.send(peer, new ArrayBuffer(...))

// // To stop polling + shut down (not necessary to call this typically, page transition suffices.)
// //p2pcf.destroy()


// return {

//   broadcast: (obj)=>{
//     const str = JSON.stringify(obj);
//     const enc = new TextEncoder(); 
//     const arrBuff = enc.encode(str);
//     p2pcf.broadcast(arrBuff);
//   }
// }
// }

// function ab2str(buf: ArrayBuffer): string {
//   return String.fromCharCode.apply(null, new Uint16Array(buf));
// }

// function str2ab(str: string) {
//   var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
//   var bufView = new Uint16Array(buf);
//   for (var i=0, strLen=str.length; i<strLen; i++) {
//     bufView[i] = str.charCodeAt(i);
//   }
//   return buf;
// }