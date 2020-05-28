import React from "react";
import { DFC } from "dfc";

import { css, cx } from 'https://cdn.pika.dev/emotion@^10.0.27';

const color = 'white'

const Index: DFC<{ title: string; text: string }> = ({ title, text }) => {
  return (
    <html>
      <head>
        <meta charSet={"UTF-8"} />
        <title>{title}</title>
      </head>
      <body>
      <div
    className={css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      &:hover {
        color: ${color};
      }
    `}
  >
    Hover to change color.
  </div>
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
