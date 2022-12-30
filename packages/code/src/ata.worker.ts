import { RpcProvider } from "worker-rpc";

import { run } from "./ata";

const dispatcher: RpcProvider.Dispatcher = (m, t) => postMessage(m, t as StructuredSerializeOptions);

const rpcProvider = new RpcProvider(
  dispatcher,
);

onmessage = (e) => rpcProvider.dispatch(e.data);

rpcProvider.registerRpcHandler("ata", run);
