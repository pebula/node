const { SharedConfig } = require('../_shared/shared.docusaurus.config');

const sharedConfig = new SharedConfig({
  dirName: __dirname,
  org: 'pebula',
  repo: 'node',

  // PACKAGE NAME!
  package: 'nesbus',

  // TITLE
  title: 'NesBus',

  // SHORT DESCRIPTION (MAIN PAGE)
  tagline: 'CQRS style ServiceBus extension for NestJS',
});

module.exports = {
  ...sharedConfig.rootOptions(),
  customFields: {
    apiDocPrefix: `docs/api-docs/${sharedConfig.package}.`,
    azureDocsUrl: 'https://docs.microsoft.com/en-us/javascript/api/@azure',
  },
  themeConfig: {
    navbar: sharedConfig.navbar(true), // true -> with api docs item
    footer: sharedConfig.footer(),
    googleAnalytics: sharedConfig.googleAnalytics('UA-11687894-9'),
  },
  plugins: [
    ...sharedConfig.plugins(),
  ],
  presets: [
    sharedConfig.docusaurusPresetClassic(true), // true -> fix invalid markup created from api-documenter
  ],
};

