import React from "react";
import { Layout } from "../components/layout.tsx";
import { SEO } from "../components/seo.tsx";
import { sha256 } from "../components/utils/sha256/sha256.ts";
import { getUserId } from "../components/code/getUser";

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
        console.log(pathname);
        const key = pathname;
        const uuid = await getUserId();
        console.log(uuid);
        const uuidHash = (await sha256(uuid)).substring(0, 8);
        const checkKeyUuid = await sha256(key + uuid).substring(0, 8);
        const checkHashUuidHash = await sha256(key + uuidHash).substring(0, 8);
        console.log(`https://code.zed.vision/connect?key=${key}${uuidHash}${checkHashUuidHash}${checkKeyUuid}`);
        const response = await fetch(
          `https://code.zed.vision/connect?key=${key}${uuidHash}${checkHashUuidHash}${checkKeyUuid}`,
        );
        const data: { success: boolean } = await response.json();
        if (data.success) {
          location.href = "https://zed.vision/code/";
        } else {
          set404(true);
        }
      } catch (e) {
        console.error(e);
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
