import { create } from 'ipfs-core'
import { Server, IPFSService, import_env } from 'ipfs-message-port-server'

import_env.isNode=false;
console.info('hello world')

const main = async () => {
  try {
  // start listening to all incoming connections - they will be from browsing
  // contexts that run `new SharedWorker(...)`
  // Note: It is important to start listening before we do any async work to
  //  ensure that connections aren't missed while awaiting
  const connections = listen(self, 'connect')

  // Start an IPFS node & create server that will expose its API to all clients
  // over message channel
  const ipfs = await create({isNode: false, isWebWorker: true})
  // And add hello world for tests
  await ipfs.add({ content: 'hello world' })

  // @ts-ignore
  const service = new IPFSService(ipfs)
  const server = new Server(service)
  self.server = server
  self.ipfs = ipfs

  // connect every queued and future connection to the server
  for await (const event of connections) {
    const port = event.ports[0]
    if (port) {
      server.connect(port)
    }
  }
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
