
class SharedConfig {
  constructor(config) {
    this.config = config;
    this.dirName = config.dirName;
    this.org = config.org;
    this.repo = config.repo;
    this.package = config.package;
  }

  rootOptions() {
    return {
      title: this.config.title,
      tagline: this.config.tagline,
      url: `https://${this.org}.github.io/${this.repo}/${this.package}`,
      baseUrl: process.env.GH_PAGES_BUILD ? `/${this.repo}/${this.package}/` : '/',
      favicon: 'img/favicon.ico',
      organizationName: this.org,
      projectName: this.package,
      onBrokenLinks: 'warn',
    }
  }

  navbar(apiDocs) {
    const maybeApiDocs = [];
    if (apiDocs) {
      a.push({
        to: 'docs/api-docs/index',
        activeBasePath: 'docs/api-docs',
        label: 'API',
        position: 'left',
      });
    }

    return {
      title: `@${this.org}/${this.package}`,
      logo: {
        alt: `@${this.org}/${this.package}`,
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/getting-started/introduction',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        ...maybeApiDocs,
        {
          href: `https://github.com/${this.org}/${this.repo}/tree/main/libs/${this.package}`,
          label: 'GitHub',
          position: 'right',
        },
      ],
    };
  }

  footer() {
    return {
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
              href: `https://github.com/${this.org}/${this.repo}/tree/main/libs/${this.package}`,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Shlomi Assaf. Built with Docusaurus.`,
    }
  }

  googleAnalytics(trackingID) {
    return {
      trackingID,
      // Optional fields.
      anonymizeIP: true,
    };
  }

  plugins() {
    return [
      require.resolve('docusaurus-lunr-search'),
      [
        '@couds/docusaurus-resolve-plugin',
        {
          modules: [],
          alias: {
            '@site-shared': __dirname,
          },
        }
      ]
    ];
  }

  docusaurusPresetClassic(detectInvalidApiDocsMarkup) {
    const beforeDefaultRemarkPlugins = {};
    if (detectInvalidApiDocsMarkup) {
      beforeDefaultRemarkPlugins.beforeDefaultRemarkPlugins = [
        function() {
          const visit = require('unist-util-visit');
          const transformer = (root) => {
            visit(root, 'jsx', (node, _index, parent) => {
              if (typeof node.value === 'string') {
                node.value = node.value.replace(/<!--\s-->/g, '');
              }
            });
          };
          return transformer;
        }
      ];
    }

    return [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require('path').resolve(this.dirName, './sidebars.js'),
          editUrl: `https://github.com/${this.org}/${this.repo}/tree/main/apps/docs/${this.package}/docs`,
          ...beforeDefaultRemarkPlugins
        },
        theme: {
          customCss: require('path').resolve(this.dirName, './src/css/custom.css'),
        },
      },
    ];
  }
}

module.exports.SharedConfig = SharedConfig;
