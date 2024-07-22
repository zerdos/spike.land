export declare function isChunk(link: string): boolean;
export declare function isUrlFile(pathname: string): boolean;
export declare function handleCORS(request: Request): Response;
export declare function handleUnauthorizedRequest(): Response;
export declare function handleRedirectResponse(url: URL, start: string): Response;
export declare function readRequestBody(request: Request): Promise<string>;
