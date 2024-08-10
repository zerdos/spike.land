import handler from 'serve-handler';
import http from 'http';
import { promises as fs } from 'fs';
import {importMap} from "./dist/modules.mjs"

const importMapFiles = Object.values(importMap.imports)
console.log(importMapFiles)

const proxyHandler = async(request, response) => {


    const proxyUrl = new URL(request.url, 'https://testing.spike.land');
    console.log("Proxying request to testing.spike.land:", proxyUrl);
    
    // Fetch the resource from the proxy server
    const proxyResponse = await fetch(proxyUrl);
    const content = await proxyResponse.arrayBuffer();

    // Set the response headers from the proxy response
    for (const [key, value] of proxyResponse.headers.entries()) {
        if (key.includes('content-type'))
        response.setHeader(key, value);
    }
    response.setHeader('cache-control', 'no-cache')

    // Set the status code from the proxy response
    response.statusCode = proxyResponse.status;

    // Convert the blob to a buffer and send it
    const buffer = Buffer.from(content);
    response.end(buffer);
}

const server = http.createServer(async (request, response) => {
    console.log('Incoming request:', request.url);

    if (importMapFiles.includes(request.url)) {
        
        console.log('IMPORTMAP')
return        await proxyHandler(request, response);
    }


    const localPath = './dist' + request.url;
    const spaRoutes = ['/start', '/live'];

    // Check if it's an SPA route
    // Conditions:
    // 1. URL doesn't include 'swVersion'
    // 2. URL starts with one of the SPA routes
    // 3. URL doesn't include a file extension (i.e., no '.')

    try {
        // Check if the file exists locally
        await fs.access(localPath);
        
        console.log('File found locally:', localPath);
     return   await handler(request, response, { public: './dist' });
        console.log("Served local file:", request.url);
    } catch {
        // If the file doesn't exist locally, throw an error to trigger the proxy
        return await proxyHandler(request, response)
    }

    if (
        spaRoutes.some(route => request.url.startsWith(route)) && 
        !request.url.includes('.')) {
        console.log('Handling SPA route:', request.url);
        // Serve index.html for SPA routes
        return handler(request, response, { 
            public: './dist', 
            rewrites: [{ source: '**', destination: '/index.html' }] 
        });
    }

    try {
        // Attempt to serve from local ./dist/ folder
      

        // Serve the local file

    } catch (error) {
        // If file not found locally, proxy to https://testing.spike.land/
        await proxyHandler(request, response);

        // Forward the proxy server's response
        // response.writeHead(proxyResponse.status, proxyResponse.headers);
        // proxyResponse.body.pipe(response);
    }
});

// Start the server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});