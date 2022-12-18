import { RpcProvider } from "worker-rpc";

import {run} from "./ata";

const rpcProvider = new RpcProvider(
  (message, transfer) => postMessage(message, transfer),
);

onmessage = e => rpcProvider.dispatch(e.data);

rpcProvider.registerRpcHandler("ata", ({ code, origin }) => run(code, origin));
