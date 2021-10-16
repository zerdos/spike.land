import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";

const importMap = require("@spike.land/code/js/importmap.json");
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

interface Props {
  description?: string;
  lang?: string;
  meta?: {
    name: string;
    content: string;
  }[];
  title: string;
}

export const SEO: React.FC<Props> = (
  { description = "", lang = "en", meta = [], title },
) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      script={[{
        defer: "true",
        "type": "text/javascript",
        src: "https://unpkg.com/es-module-shims@1.3.0/dist/es-module-shims.js",
        async: "true",
      }, {
        type: "importmap-shim",
        innerHTML: JSON.stringify(importMap),
      }, {
        type: "esms-options",
        innerHTML: JSON.stringify({
          "shimMode": true,
          "polyfillEnable": ["css-modules", "json-modules"],
          "nonce": "n0nce",
        }),
      }]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
};
