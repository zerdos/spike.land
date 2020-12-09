import React from "react";
import { Layout } from "../components/layout.tsx";
import { SEO } from "../components/seo.tsx";

export default function () {
  let pathname;
  if (typeof window !== `undefined`) {
    pathname = (new URL(location.href)).pathname.substr(1);
  }
  return (
    <Layout>
      <SEO title="404: Not Found" />

      <h1>This page is not a page: {pathname}</h1>
      <p>
        Let's say, its a 404 page.
      </p>
    </Layout>
  );
}
