
const org = 'pebula';
const repo = 'node';
const package = 'tom';

module.exports = {
  title: 'Typed Object Mapper',
  tagline: 'A super-fast, type safe object mapper and serializer',
  url: `https://${org}.github.io/${repo}/${package}`,
  baseUrl: process.env.GH_PAGES_BUILD ? `/${repo}/${package}/` : '/',
  favicon: 'img/favicon.ico',
  organizationName: org,
  projectName: package,
  onBrokenLinks: 'warn',
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
