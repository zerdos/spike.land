export const enhancedFetch: typeof fetch = async (url, options = {}) => {
    try {
      // First, try the regular fetch
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      console.log('Client-side fetch failed, trying server-side fetch');
  
      // If client-side fetch fails, send the request to the server
      const serverFetchUrl = '/api/server-fetch'; // Adjust this to your server endpoint
      const serverResponse = await fetch(serverFetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          options,
        }),
      });
  
      if (!serverResponse.ok) {
        throw new Error('Both client-side and server-side fetches failed');
      }
  
      return serverResponse;
    }
  };
  