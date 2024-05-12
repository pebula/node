import PATH from 'node:path';
import { visit } from 'unist-util-visit';
import {themes as prismThemes} from 'prism-react-renderer';
import type { Configuration } from 'webpack';
import type { Config, PluginConfig } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

export interface IDocsBaseConfig {
    readonly dirName: string;
    readonly org: string;
    readonly repo: string;
    readonly package: string;
    readonly title: string;
    readonly apiDocs?: boolean;
    readonly tagline?: string;
}

export class DocsConfig implements IDocsBaseConfig {
    readonly dirName: string;
    readonly org: string;
    readonly repo: string;
    readonly package: string;
    readonly title: string;
    readonly apiDocs: boolean;
    readonly tagline: string;

    constructor(base: IDocsBaseConfig) {
        this.dirName = base.dirName;
        this.org = base.org;
        this.repo = base.repo;
        this.package = base.package;
        this.title = base.title;
        this.apiDocs = !!base.apiDocs;
        this.tagline = base.tagline;
    }

    public create(setup?: (cfg: Config) => void): Config {
        const config: Config = {
            ...this.rootOptions(),
          
            customFields: { },
          
            presets: [
                this.docusaurusPresetClassic(true, { googleAnalytics: this.googleAnalytics('UA-11687894-9') }), // true -> fix invalid markup created from api-documenter
            ],
          
            themeConfig: {
              navbar: this.navbar(), // true -> with api docs item
              footer: this.footer(),
              prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
              },
            } satisfies Preset.ThemeConfig,
            
            plugins: [
              ...this.plugins(),
            ] satisfies PluginConfig[],
        };

        if (this.apiDocs)
            config.customFields.apiDocPrefix = `docs/api-docs/${this.package}.`;
          
        if (setup)
            setup(config);
        return config;
    }

    private rootOptions() {
        return {
            title: this.title,
            tagline: this.tagline,
            url: `https://${this.org}.github.io`,
            baseUrl: process.env.GH_PAGES_BUILD ? `/${this.repo}/${this.package}/` : '/',
            favicon: 'img/favicon.ico',
            organizationName: this.org,
            projectName: this.package,
            onBrokenLinks: 'warn' as const,
            onBrokenMarkdownLinks: 'warn' as const,
            // Even if you don't use internationalization, you can use this field to set
            // useful metadata like html lang. For example, if your site is Chinese, you
            // may want to replace "en" with "zh-Hans".
            i18n: {
                defaultLocale: 'en',
                locales: ['en'],
            },
        };
    }
    
    private navbar() {
        const maybeApiDocs = [];
        if (this.apiDocs) {
          maybeApiDocs.push({
            to: 'docs/api-docs',
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
      
    private footer() {
        return {
            style: 'dark' as const,
            links: [
                {
                    title: 'Docs',
                    items: [ ],
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
      
    private googleAnalytics(trackingID: string) {
        return {
            trackingID,
            // Optional fields.
            anonymizeIP: true,
        };
    }
      
    private docusaurusPresetClassic(detectInvalidApiDocsMarkup: boolean, additionalPresetConfig: any) {
        const beforeDefaultRemarkPlugins: Preset.Options['docs'] = { };
        if (detectInvalidApiDocsMarkup) {
          beforeDefaultRemarkPlugins.beforeDefaultRemarkPlugins = [
            function() {
              const transformer = (root) => {
                visit(root, "mdxJsxFlowElement", (node, _index, parent) => {
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
          'classic',
          {
            docs: {
              sidebarPath: require('path').resolve(this.dirName, './sidebars.ts'),
              editUrl: `https://github.com/${this.org}/${this.repo}/tree/main/apps/docs/${this.package}/docs`,
              ...beforeDefaultRemarkPlugins
            },
            theme: {
              customCss: require('path').resolve(this.dirName, './src/css/custom.css'),
            },
            ...(additionalPresetConfig ?? {})
          },
        ] satisfies [string, Preset.Options];
    }

    private plugins() {
        return [
            require.resolve('docusaurus-lunr-search'),
            [
                async function myPlugin(context, options: Pick<Configuration['resolve'], 'modules' | 'alias'>) {
                    return {
                    name: 'shared-lib-resolver',
                    configureWebpack(config, isServer, utils) {
                        return {
                        resolve: {
                            modules: [ "node_modules" ].concat(options.modules || []),
                            alias: options.alias || {},
                        },
                        };
                    },
                    };
                },
                {
                    modules: [],
                    alias: {
                        '@doc-components': PATH.join(__dirname, '..', '..', 'libs-dev', 'doc', 'components', 'src'),
                    },
                }
            ]
        ] satisfies PluginConfig[];
    }
}