export const handleEnhancedFetch = async (request: Request) => {
  try {
    const optionsParam = await request.json() as RequestInit & { url: string };

    // Perform the fetch
    const response = await fetch(optionsParam.url, optionsParam);
    
    // if (response.body instanceof ReadableStream) {
    //   // convert it to arrayBuffer
    
    //   const reader = response.body.getReader();
    //   const contentLength = response.headers.get("content-length");
    //   const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;
    //   let receivedBytes = 0;  
    //   const chunks: Uint8Array[] = [];
    //   while (true) {
    //     const { done, value } = await reader.read();
    //     if (done) break;
    //     chunks.push(value);
    //     receivedBytes += value.byteLength;
    //     console.log(`Received ${receivedBytes} of ${totalBytes} bytes`);
    //   }
    //   const allChunks = new Uint8Array(receivedBytes);
    //   let offset = 0;
    //   for (const chunk of chunks) {
    //     allChunks.set(chunk, offset);
    //     offset += chunk.byteLength;
    //   }
    //   console.log(allChunks);
    //   const text = new TextDecoder().decode(allChunks);

    //   // const buffer = await response.arrayBuffer();

    //   // let body = "";
    //   // const reader = response.body.getReader();
    //   // while (true) {
    //   //   const { done, value } = await reader.read();
    //   //   if (done) break;
    //   //   body += new TextDecoder().decode(value);
    //   // }
    //   const newBodyResp = new Response(text, {
    //     status: response.status,
    //     statusText: response.statusText,
    //     headers: response.headers,
    //   });

    //   return newBodyResp;
      
    // }

    // Create a TransformStream to modify headers
    const { readable, writable } = new TransformStream();

    // Start pumping the response body into the TransformStream
    response.body?.pipeTo(writable);

    // Create a new response with the TransformStream as the body
    const newResponse = new Response(readable, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    // Add CORS headers if needed
    newResponse.headers.set("Access-Control-Allow-Origin", "*");
    newResponse.headers.set("Access-Control-Allow-Methods", "*");
    newResponse.headers.set("Access-Control-Allow-Headers", "*");

    return newResponse;
  } catch (error) {
    console.error("Server-side fetch error:", error);
    return new Response("Server-side fetch failed", { status: 500 });
  }
};
