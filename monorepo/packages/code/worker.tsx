import "core-js"
import {create} from  "../../node_modules/ipfs-core/index.min.js"
import { IPFSService, Server }  from "../../node_modules/ipfs-message-port-server/index.min.js";
const OrbitDB = require('orbit-db/dist/orbitdb.min')
globalThis.OrbitDB = OrbitDB;
console.log(OrbitDB);

// importScripts('https://unpkg.com/ipfs@0.62.3/index.min.js');
// importScripts('https://unpkg.com/ipfs-message-port-server@0.11.3/index.min.js');

const main = async () => {
  try {
  // start listening to all incoming connections - they will be from browsing
  // contexts that run `new SharedWorker(...)`
  // Note: It is important to start listening before we do any async work to
  //  ensure that connections aren't missed while awaiting
  const connections = listen(self, 'connect')

  // Start an IPFS node & create server that will expose its API to all clients
  // over message channel
  // const {create } = Ipfs;

  const ipfs = await create({isNode: false, isWebWorker: true})
  // And add hello world for tests
  await ipfs.add({ content: 'hello world' })

  // @ts-ignore
  // const { IPFSService, Server } = IpfsMessagePortServer;

  const service = new IPFSService(ipfs)
  const server = new Server(service)
  self.server = server
  self.ipfs = ipfs
  const orbit = await OrbitDB.createInstance(ipfs)
  self.orbit = orbit;

  db.events.on("replicated", address => {
    console.log(db.iterator({ limit: -1 }).collect())
  })

  
  // Create / Open a database
  const db = await orbit.log("hello")
  await db.load()


  // connect every queued and future connection to the server
  for await (const event of connections) {
    const port = event.ports[0]
    if (port) {
      server.connect(port)
    }
  }
  const result = db.iterator({ limit: -1 }).collect()
  console.log(JSON.stringify(result, null, 2))
}catch (err) {
  console.error(err)
}
}


const listen = function (target, type, options) {
  const events = []
  let resume
  let ready = new Promise(resolve => (resume = resolve))

  const write = event => {
    events.push(event)
    resume()
  }
  const read = async () => {
    await ready
    ready = new Promise(resolve => (resume = resolve))
    return events.splice(0)
  }

  const reader = async function * () {
    try {
      while (true) {
        yield * await read()
      }
    } finally {
      target.removeEventListener(type, write, options)
    }
  }

  target.addEventListener(type, write, options)
  return reader()
}

main()
