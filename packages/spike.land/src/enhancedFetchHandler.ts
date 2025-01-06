export const handleEnhancedFetch = async (request: Request) => {
  try {
    const optionsParam = await request.json() as RequestInit & { url: string; };

    // Perform the fetch
    const res = await fetch(optionsParam.url, optionsParam);

    // Clone the response
    const response = res.clone();
    const body = await res.blob();
    return new Response(body as BodyInit, response);

    // Rest of the commented code remains unchanged
    // ...
  } catch (error) {
    console.error("Server-side fetch error:", error);
    return new Response("Server-side fetch failed", { status: 500 });
  }
};
