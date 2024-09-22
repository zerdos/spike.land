import { DurableObjectNamespace, PagesFunction } from '@cloudflare/workers-types';

interface Env {
    CODE_SPACE: DurableObjectNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const codeSpace =  context.params.codeSpace as string;

    const id = context.env.CODE_SPACE.idFromString(codeSpace);
    const object = context.env.CODE_SPACE.get(id);

    
    return object.fetch(context.request);
  };