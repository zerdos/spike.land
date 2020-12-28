import React from "react";
import { Layout } from "../components/layout.tsx";
import { SEO } from "../components/seo.tsx";
import { sha256 } from "../components/utils/sha256/sha256.ts";
import { getUserId } from "../components/code/getUser.ts";
import { getHash, hash } from "../components/code/hash.js";

export default function () {
  let pathname = "";
  if (typeof window !== `undefined`) {
    pathname = (new URL(location.href)).pathname.substr(1);
  }

  const isKey = (str: string) =>
    [...(str.slice(1, 9))].filter((x) => x < "0" || x > "f").length === 0;
  const needToCheck = pathname.length === 8 && isKey(pathname);

  const [is404, set404] = React.useState(false);

  React.useEffect(() => {
    console.log("We use effect");

    const runner = async () => {
      console.log("we use run");
      try {
        console.log("we use try");
        // console.log(pathname);
        // const key = pathname;
        // const uuid = await getUserId();
        // console.log(uuid);
        // const uuidHash = (await sha256(uuid)).substring(0, 8);
        // console.log(uuidHash);
        // const checkKeyUuid = (await sha256(key + uuid)).substring(0, 8);
        // const checkHashUuidHash = (await sha256(key + uuidHash)).substring(
        //   0,
        //   8,
        // );
        // console.log({
        //   key,
        //   uuidHash,
        //   checkKeyUuid,
        //   checkHashUuidHash,
        // });
        // const response = await fetch(
        //   `https://code.zed.vision/connect?key=${key}${uuidHash}${checkKeyUuid}${checkHashUuidHash}`,
        // );
        // const data: { success: boolean } = await response.json();

        console.log("ipvs story");
        const cid = await hash(location.href, false);

        console.log({ cid });

        if (cid) {
          location.href = "https://ipfs.io/ipfs/" + cid;
        } else {
          set404(true);
        }
      } catch (e) {
        console.log("we catching");
        set404(true);
      }
    };

    if (typeof window !== "undefined") {
      if (needToCheck) runner();
      else set404("No need to do a hash check");
    }
  }, []);

  return (<>
    {is404 === true && <Layout>
      <SEO title="404: Not Found" />
      <h1>This page is not a page: {pathname}</h1>
      <p>
        Let's say, its a 404 page. {is404}.
      </p>
    </Layout>}
    {is404 === false && <div></div>}
  </>);
}
