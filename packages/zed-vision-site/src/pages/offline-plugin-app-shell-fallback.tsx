import * as React from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/layout";
import { SEO } from "../components/seo";

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="... offline" />
      <h1>Maybe you are offline</h1>
      <p>Check your internet connection</p>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
