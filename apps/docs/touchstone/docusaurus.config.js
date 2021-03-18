
const org = 'pebula';
const repo = 'node';
const package = 'touchstone';

module.exports = {
  title: 'touchstone',
  tagline: '',
  url: `https://${org}.github.io/${repo}/${package}`,
  baseUrl: process.env.GH_PAGES_BUILD ? `/${repo}/${package}/` : '/',
  favicon: 'img/favicon.ico',
  organizationName: org,
  projectName: package,
  customFields: {
    apiDocsUrl: `https://${org}.github.io/${repo}/${package}/docs/api/index`,
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
      copyright: `Copyright © ${new Date().getFullYear()} Shlomi Assaf, Inc. Built with Docusaurus.`,
    },
    googleAnalytics: {
      trackingID: 'UA-11687894-9',
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
  },
  plugins: [ ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: `https://github.com/${org}/${repo}/tree/master/apps/dpcs/touchstone/docs`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
