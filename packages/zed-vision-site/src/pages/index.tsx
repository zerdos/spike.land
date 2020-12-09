import * as React from "react";
import { graphql, Link } from "gatsby";
import {getDB} from "@zedvision/shadb";

import { Bio } from "../components/bio.tsx";
import { Layout } from "../components/layout.tsx";
import { SEO } from "../components/seo.tsx";
import { rhythm } from "../components/utils/typography.ts";
import styled from "@emotion/styled";
import { Qr } from "../components/code/Qr.tsx";

import forkMe from "../../assets/forkMe.png";
import { registerSW } from "../sw-reg.js";

const StyledLink = styled(Link)`
  box-shadow: "none";
`;

const H3 = styled.h3`
  margin-bottom: ${rhythm(1 / 4)};
`;

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    allMdx: {
      edges: {
        node: {
          excerpt: string;
          frontmatter: {
            title: string;
            date: string;
            description: string;
          };
          fields: {
            slug: string;
          };
        };
      }[];
    };
  };
  location: Location;
}

const BlogIndex: React.FC<Props> = ({ data }) => {
  const edges = data.allMdx.edges;

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const install = async() => {
        async function getUserId() {
          const shaDB = await getDB();
          const uuid = await shaDB.get("uuid");
          if (!uuid) {
            if (!window.location.href.includes("zed.dev")) {
              const resp = await fetch("https://code.zed.vision/register");
              const data = await resp.json();
              shaDB.put("uuid", data.uuid);
              return data.uuid;
            } else {
              shaDB.put("uuid", "1234");
            }
          }
          return uuid;
        } 
        console.log(await getUserId());
      } 
      install()

      registerSW();

    }
  }, []);

  return (
    <Layout>
      <SEO title="This is Zed vision" />
      <h1>
        Hi, this is my playground: <Qr
          url={"https://code.zed.vision?qr=true"}
        />
      </h1>
      <a href="https://github.com/zed-vision/monorepo">
        <img
          loading="lazy"
          width="149"
          height="149"
          src={forkMe}
          style={{ position: "absolute", top: 0, right: 0 }}
          alt="Fork me on GitHub"
        />
      </a>

      {edges.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <article key={node.fields.slug}>
            <header>
              <H3>
                <StyledLink to={node.fields.slug}>{title}</StyledLink>
              </H3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        );
      })}
      <Bio />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
