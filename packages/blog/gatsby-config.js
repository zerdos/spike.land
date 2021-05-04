module.exports = {
  pathPrefix: "blog",
  siteMetadata: {
    title: `Zed vision`,
    author: {
      name: `Zoltan Erdos`,
      summary: ` - developer experience and software quality expert`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://blog.spike.land/blog`,
    social: {
      twitter: `ZoltanErdos`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
    },

    {
      resolve: `gatsby-plugin-manifest`,

      options: {
        icon: `assets/android-chrome-512x512.png`,
        name:
          `Zed Vision - Development experience, Testing, and everything between`,
        short_name: `ZedVision`,
        description: `Blog and tech experiments`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `minimal-ui`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
