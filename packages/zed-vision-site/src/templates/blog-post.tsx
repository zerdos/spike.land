import * as React from "react";
import { graphql, Link } from "gatsby";

import { Bio } from "../components/bio";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { rhythm, scale } from "../components/utils/typography";
import { MDXRenderer } from "gatsby-plugin-mdx";
import styled from "@emotion/styled";

import { CodeBox } from "../components/codeBox/CodeBox";
import { MDXProvider } from "@mdx-js/react";

const components = {
  pre: function PreComp(props: { [key: string]: unknown }) {
    return <div {...props} />;
  },
  code: CodeBox,
};
const StyledHeader = styled.h1`
  margin-top: ${rhythm(1)};
  margin-bottom: 0;
`;

const { fontSize, lineHeight } = scale(1 / 5);

const StyledDate = styled.p`
  font-size: ${fontSize};
  line-height: ${lineHeight};
  display: block;
  margin-bottom: ${rhythm(1)};
`;

const Hr = styled.hr`
  margin-bottom: ${rhythm(1)};
`;

interface Props {
  data: {
    mdx: {
      excerpt: string;
      body: string;
      frontmatter: {
        date: string;
        title: string;
        description: string;
      };
    };
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  pageContext: {
    previous: {
      fields: {
        slug: string;
      };
      date: string;
      title: string;
      description: string;
      frontmatter: {
        date: string;
        title: string;
        description: string;
      };
    };
    next: {
      fields: {
        slug: string;
      };
      date: string;
      title: string;
      description: string;
      frontmatter: {
        date: string;
        title: string;
        description: string;
      };
    };
  };
  location: Location;
}

const BlogPostTemplate = ({ data, pageContext }: Props) => {
  const post = data.mdx;

  const { previous, next } = pageContext;
  const BlogPost = () =>
    <MDXProvider components={components}>
      <MDXRenderer>{post.body}</MDXRenderer>
    </MDXProvider>;

  return (
    <React.Fragment>
      <Layout>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <header>
          <StyledHeader>{post.frontmatter.title}</StyledHeader>
          <StyledDate>{post.frontmatter.date}</StyledDate>
        </header>
        <BlogPost></BlogPost>
        <Hr></Hr>
        <footer>
          <Bio></Bio>
        </footer>
        <nav>
          <ul>
            {previous && (
              <li>
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              </li>
            )}
            {next && (
              <li>
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </Layout>
    </React.Fragment>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
