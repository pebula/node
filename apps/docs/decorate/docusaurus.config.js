const { SharedConfig } = require('../_shared/shared.docusaurus.config');

const sharedConfig = new SharedConfig({
  dirName: __dirname,
  org: 'pebula',
  repo: 'node',

  // PACKAGE NAME!
  package: 'decorate',

  // TITLE
  title: 'Decorate',

  // SHORT DESCRIPTION (MAIN PAGE)
  tagline: 'Strictly typed decorator management tool for metadata driven libraries / applications.',
});

module.exports = {
  ...sharedConfig.rootOptions(),
  customFields: {
    apiDocPrefix: `docs/api-docs/${sharedConfig.package}.`,
  },
  themeConfig: {
    navbar: sharedConfig.navbar(false), // true -> with api docs item
    footer: sharedConfig.footer(),
    googleAnalytics: sharedConfig.googleAnalytics('UA-11687894-9'),
  },
  plugins: [
    ...sharedConfig.plugins(),
  ],
  presets: [
    sharedConfig.docusaurusPresetClassic(false), // true -> fix invalid markup created from api-documenter
  ],
};
