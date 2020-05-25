import React from "react";
import { DFC } from "servestjs";

const Index: DFC<{ title: string; text: string }> = ({ title, text }) => {
  return (
    <html>
      <head>
        <meta charSet={"UTF-8"} />
        <title>{title}</title>
      </head>
      <body>
        <div>{text}</div>
      </body>
    </html>
  );
};

// getInitialProps is an asynchronous data fetcher
// for rendering components in server side.
// This is identical methodology to Next.js
// It will be called exactly once for each request.
Index.getInitialProps = async () => {
  const resp = await fetch("https://api.github.com/users/zerdos");
  const text = await resp.text();
  return { title: "Index Page", text };
};

// default export are used for Server Side Rendering.
export default Index;
