import { ExportedHandler, PagesFunction } from '@cloudflare/workers-types';


interface Env {
    CODESPACE: ExportedHandler;
}

export const onRequest: PagesFunction<Env> = async (ctx) => {
    return ctx.env.CODESPACE.fetch!(ctx.request, ctx.env.CODESPACE, ctx);
}