module.exports = {
  title: 'touchstone',
  tagline: '',
  url: 'https://pebula.github.io/node/touchstone',
  baseUrl: process.env.GH_PAGES_BUILD ? '/node/touchstone/' : '/',
  favicon: 'img/favicon.ico',
  organizationName: 'pebula',
  projectName: 'touchstone',
  customFields: {
    apiDocsUrl: 'https://pebula.github.io/node/touchstone/api-docs',
  },
  themeConfig: {
    navbar: {
      title: '@pebula/touchstone',
      logo: {
        alt: '@pebula/touchstone',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/getting-started/introduction',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://pebula.github.io/node/touchstone/api-docs/index.html',
          label: 'API Docs',
          position: 'right',
        },
        {
          href: 'https://github.com/pebula/node/tree/master/packages/touchstone',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            // { label: 'Style Guide', to: 'docs/doc1' },
            // { label: 'Second Doc', to: 'docs/doc2' },
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'More',
          items: [
            // { label: 'Blog', to: 'blog' },
            {
              label: 'GitHub',
              href: 'https://github.com/pebula/node/tree/master/packages/touchstone',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Shlomi Assaf, Inc. Built with Docusaurus.`,
    },
    googleAnalytics: {
      trackingID: 'UA-11687894-9',
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
  },
  plugins: [
    '@docusaurus/plugin-google-analytics',
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/pebula/node/tree/master/packages/touchstone/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/pebula/node/tree/master/packages/touchstone/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
