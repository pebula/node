
const org = 'pebula';
const repo = 'node';
const package = 'goosetyped';

module.exports = {
  title: 'GooseTyped',
  tagline: '',
  url: `https://${org}.github.io/${repo}/${package}`,
  baseUrl: process.env.GH_PAGES_BUILD ? `/${repo}/${package}/` : '/',
  favicon: 'img/favicon.ico',
  organizationName: org,
  projectName: package,
  customFields: {
    apiDocPrefix: `docs/api-docs/${package}.`,
    mongooseDocsUrl: 'https://mongoosejs.com/docs',
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
          activeBasePath: 'docs/getting-started/introduction',
          label: 'Docs',
          position: 'left',
        },
        {
          to: 'docs/api-docs/index',
          activeBasePath: 'docs/api-docs',
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
    require.resolve('docusaurus-lunr-search'),
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
          beforeDefaultRemarkPlugins: [
            function() {
              const visit = require('unist-util-visit');
              const transformer = (root) => {
                visit(root, 'jsx', (node, _index, parent) => {
                  if (typeof node.value === 'string') {
                    node.value = node.value.replace(/<!--\s-->/, '');
                  }
                });
              };
              return transformer;
            }
          ],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
