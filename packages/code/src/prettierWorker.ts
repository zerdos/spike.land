import { prettierJs } from "./prettierEsm";

import { RpcProvider } from "worker-rpc";

const dispatcher: RpcProvider.Dispatcher = (m, t) => postMessage(m, t as StructuredSerializeOptions);

const rpcProvider = new RpcProvider(
  dispatcher,
);

onmessage = (e) => rpcProvider.dispatch(e.data);

rpcProvider.registerRpcHandler(
  "prettierJs",
  (code: string) => prettierJs(code),
);
