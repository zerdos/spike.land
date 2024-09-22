import { DurableObjectNamespace, PagesFunction } from '@cloudflare/workers-types';

interface Env {
    CODESPACE: DurableObjectNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const codeSpace =  context.params['code-space'] as string;

    const id = context.env.CODESPACE.idFromString(codeSpace);
    const stub = context.env.CODESPACE.get(id);

    
    return stub.fetch(context.request);
  };