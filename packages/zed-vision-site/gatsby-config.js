module.exports = {
  siteMetadata: {
    title: `Zed vision`,
    author: {
      name: `Zoltan Erdos`,
      summary: ` - developer experience and software quality expert`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://www.zed.vision/`,
    social: {
      twitter: `ZoltanErdos`,
    },
  },
  plugins: [
    `gatsby-plugin-remove-fingerprints`,
    `gatsby-plugin-remove-generator`,
    `gatsby-plugin-workerize-loader`,
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
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,

      options: {
        icon: `assets/gatsby-icon.png`,
        name:
          `Zed Vision - Development experience, Testing, and everything between`,
        short_name: `ZedVision`,
        description: `Blog and tech experiments`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        cache_busting_mode: `none`,
      },
    },
  ],
};
