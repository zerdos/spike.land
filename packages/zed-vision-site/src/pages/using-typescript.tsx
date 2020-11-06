import * as React from "react";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { Link, PageProps } from "gatsby";
// If you don't want to use TypeScript you can delete this file!

const UsingTypescript: React.FC<PageProps> = ({ path }) => (
  <Layout>
    <SEO title="Using TypeScript" />
    <h1>Gatsby supports TypeScript by default!</h1>
    <p>
      This means that you can create and write <em>.ts/.tsx</em>
      files for your pages, components etc. Please note that the <em>
        gatsby-*.js
      </em> files (like gatsby-node.js) currently do not support TypeScript yet.
    </p>
    <p>
      For type checking you will want to install <em>typescript</em>
      via npm and run <em>tsc --init</em> to create a <em>.tsconfig</em> file.
    </p>
    <p>You are currently on the page {path}\\</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default UsingTypescript;

export const query = null;
