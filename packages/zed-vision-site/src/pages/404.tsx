import React from "react";
import { Layout } from "../components/layout.tsx";
import { SEO } from "../components/seo.tsx";

export default function () {
  let pathname = "";
  if (typeof window !== `undefined`) {
    pathname = (new URL(location.href)).pathname.substr(1);
  }

  const isKey = (str: string) =>
    [...(str.slice(0, 8))].filter((x) => x < "0" || x > "f").length === 0;
  const needToCheck = pathname.length === 8 && isKey(pathname);

  const [is404, setStatus] = React.useState(!needToCheck);

  React.useEffect(() => {
    if (!is404) {
      const runner = async () => {
        fetch("https://code.zed.vision/");
      };
    }
  }, []);

  return (<>
    {is404 === true && <Layout>
      <SEO title="404: Not Found" />

      <h1>This page is not a page: {pathname}</h1>
      <p>
        Let's say, its a 404 page.
      </p>
    </Layout>}
    {is404 === false && <div>loading...</div>}
  </>);
}
