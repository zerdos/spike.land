import { DurableObjectNamespace, PagesFunction } from '@cloudflare/workers-types';

interface Env {
    CODE_SPACE: DurableObjectNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const codeSpace =  context.params.codeSpace as string;

    const id = context.env.CODE_SPACE.idFromString(codeSpace);
    const stub = context.env.CODE_SPACE.get(id);

    
    return stub.fetch(context.request);
  };