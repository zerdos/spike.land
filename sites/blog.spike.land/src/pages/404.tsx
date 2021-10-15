import React from "react";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";

export default function () {
  return (
    <>
      <Layout>
        <SEO title="404: Not Found" />
        <h1>This page is not a page</h1>
        <p>
          Let's say, its a 404 page.
        </p>
      </Layout>
    </>
  );
}
