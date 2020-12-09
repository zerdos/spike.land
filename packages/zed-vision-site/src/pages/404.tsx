import React from "react";
import { Layout } from "../components/layout.tsx";
import { SEO } from "../components/seo.tsx";
import { sha256 } from "../components/utils/sha256/sha256.worker.ts";

export default function () {
  let pathname = "";
  if (typeof window !== `undefined`) {
    pathname = (new URL(location.href)).pathname.substr(1);
  }

  const isKey = (str: string) =>
    [...(str.slice(0, 8))].filter((x) => x < "0" || x > "f").length === 0;
  const needToCheck = pathname.length === 8 && isKey(pathname);

  const [is404, set404] = React.useState(false);

  React.useEffect(() => {
    const runner = async () => {
      try {
        const response = await fetch(`https://code.zed.vision/${pathname}`);
        const data = await response.text();
        const json = JSON.parse(data);
        const uuid = json.uuid;
        if (uuid) {
          const hash = (await sha256(uuid)).substring(0, 8);
          if (pathname === hash) {
            const conn = await fetch(
              `https://code.zed.vision/connect?uuid=${uuid}`,
            );
            location.href = "https://zed.vision/code/";
          } else {
            set404(true);
          }
        } else {
          set404(true);
        }
      } catch {
        set404(true);
      }
    };

    if (typeof window !== "undefined") {
      if (needToCheck) runner();
      else set404(true);
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
    {is404 === false && <div></div>}
  </>);
}
