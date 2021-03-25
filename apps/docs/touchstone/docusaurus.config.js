
const org = 'pebula';
const repo = 'node';
const package = 'touchstone';

module.exports = {
  title: 'TouchStone',
  tagline: 'Metadata-driven benchmarking framework, built on top of benchmark.js',
  url: `https://${org}.github.io/${repo}/${package}`,
  baseUrl: process.env.GH_PAGES_BUILD ? `/${repo}/${package}/` : '/',
  favicon: 'img/favicon.ico',
  organizationName: org,
  projectName: package,
  customFields: {
    apiDocPrefix: `docs/api/${package}.`,
  },
  themeConfig: {
    navbar: {
      title: `@${org}/${package}`,
      logo: {
        alt: `@${org}/${package}`,
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/getting-started/introduction',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'docs/api/index',
          activeBasePath: 'docs/api',
          label: 'API',
          position: 'left',
        },
        {
          href: `https://github.com/${org}/${repo}/tree/master/libs/${package}`,
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
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: `https://github.com/${org}/${repo}/tree/master/libs/${package}`,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Shlomi Assaf. Built with Docusaurus.`,
    },
    googleAnalytics: {
      trackingID: 'UA-11687894-9',
      // Optional fields.
      anonymizeIP: true,
    },
  },
  plugins: [
    [
      '@couds/docusaurus-resolve-plugin',
      {
        modules: [],
        alias: {
          '@site-shared': require('path').resolve(__dirname, '../_shared'),
        },
      }
    ]
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: `https://github.com/${org}/${repo}/tree/master/apps/docs/${package}/docs`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
