import { DurableObjectNamespace, PagesFunction } from '@cloudflare/workers-types';

interface Env {
    CODESPACE: DurableObjectNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const codeSpace =  context.params.codeSpace as string;

    const id = context.env.CODESPACE.idFromString(codeSpace);
    const stub = context.env.CODESPACE.get(id);

    
    const stubPathName = new URL(context.request.url).pathname.split('/').slice(2).join('/');
    const stubUrl = new URL(stubPathName,context.request.url).toString();
    const updatedContext = {
        ...context,
        request: new Request(stubUrl)
    } as unknown as typeof context;

    return stub.fetch(updatedContext.request);
  };