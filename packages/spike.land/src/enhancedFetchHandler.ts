export  const  handleEnhancedFetch =  async(request: Request) => {

  
  
    try {
      const optionsParam = await request.json() as RequestInit & { url: string };

      // Perform the fetch
      const response = await fetch(optionsParam.url, optionsParam);

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
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      newResponse.headers.set('Access-Control-Allow-Methods', '*');
      newResponse.headers.set('Access-Control-Allow-Headers', '*');

      return newResponse;
    } catch (error) {
      console.error('Server-side fetch error:', error);
      return new Response('Server-side fetch failed', { status: 500 });
    }
  }