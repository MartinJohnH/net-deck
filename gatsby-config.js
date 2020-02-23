module.exports = {
  siteMetadata: {
    title: `NET Deck`,
    description: ``,
    author: `Martin-John Hearty & Jonathan Ganz`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `NET Deck`,
        short_name: `NET Deck`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#ADADAD`,
        display: `fullscreen`,
        icon: `src/assets/net-logo.png`, // This path is relative to the root of the site.
      },
    },
    //`gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        whitelist:  [ '0%', '80%', '100%', '50%','52%', '53%','53.1%', '20%', '40%', '60%', '75%', '30%', '85%', '90%', '15%', '69%', '70%' ], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      }
    }
  ],
}
