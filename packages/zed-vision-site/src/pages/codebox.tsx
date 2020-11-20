import * as React from "react";

import { CodeBox } from "../components/codeBox/CodeBox.tsx";
import { Layout } from "../components/layout.tsx";
import { SEO } from "../components/seo.tsx";

export default function Page() {
  return <Layout>
    <SEO title="Code Box" />
    <h1>Code box</h1>
    <p>Lets see!</p>
    <CodeBox title="Example1 :)" />
  </Layout>;
}
