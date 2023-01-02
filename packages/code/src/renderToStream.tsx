import { FC } from "react";
import { renderToReadableStream } from "react-dom/server";

export const renderToStream = async (codeSpace: string) => {
  const App: FC = (await import(
    `${location.origin}/live/${codeSpace}/index.js`
  )).default;

  let controller = new AbortController();
  let didError = false;
  try {
    let stream = await renderToReadableStream(
      <html>
        <body>
          <App></App>
        </body>
      </html>,
      {
        signal: controller.signal,
        onError(error) {
          didError = true;
          console.error(error);
        },
      },
    );

    // This is to wait for all Suspense boundaries to be ready. You can uncomment
    // this line if you want to buffer the entire HTML instead of streaming it.
    // You can use this for crawlers or static generation:

    // await stream.allReady;

    return new Response(stream, {
      status: didError ? 500 : 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    return new Response(
      "<!doctype html><p>Loading...</p><script src=\"clientrender.js\"></script>",
      {
        status: 500,
        headers: { "Content-Type": "text/html" },
      },
    );
  }
};
