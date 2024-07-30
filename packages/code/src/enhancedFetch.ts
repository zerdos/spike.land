const serverFetchUrl = "/api/server-fetch"; // Adjust this to your server endpoint
const serverResponse: typeof fetch = async  (url, options) => {
  
  const req = await fetch(serverFetchUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url,
    options,
  }),
});

const abuf = await req.arrayBuffer();
return new Response(abuf, {
  status: req.status,
  statusText: req.statusText,
  headers: req.headers,
});
}

export const enhancedFetch: typeof fetch = async (url, options = {}) => {
  
  
  try {
    // First, try the regular fetch
    const response = await fetch(url, options);
    if (response.ok) {    return response}
    return serverResponse(url, options);
  } catch (error) {
    console.log("Client-side fetch failed, trying server-side fetch");
    
    return serverResponse(url, options);
  }
};
