import { ExportedHandler, PagesFunction, Request } from '@cloudflare/workers-types';


interface Env {
    CODESPACE: ExportedHandler;
}

export const onRequest: PagesFunction<Env> = async (ctx) => {
    const allParams = ['live', ...ctx.params.catchall];

    const path = allParams.join('/');
    const url = new URL("/"+path,ctx.request.url).toString( );

    const ctxFor= {
        ...ctx,
        request: {
            ...ctx.request,
            url: url
        }
       
    } as typeof ctx;
    
    return ctx.env.CODESPACE.fetch!(ctxFor.request, ctx.env.CODESPACE, ctx);
}   