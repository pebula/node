const { SharedConfig } = require('../_shared/shared.docusaurus.config');

const sharedConfig = new SharedConfig({
  dirName: __dirname,
  org: 'pebula',
  repo: 'node',

  // PACKAGE NAME!
  package: 'goosetyped',

  // TITLE
  title: 'GooseTyped',

  // SHORT DESCRIPTION (MAIN PAGE)
  tagline: '',
});

module.exports = {
  ...sharedConfig.rootOptions(),
  customFields: {
    apiDocPrefix: `docs/api-docs/${sharedConfig.package}.`,
    mongooseDocsUrl: 'https://mongoosejs.com/docs',
  },
  themeConfig: {
    navbar: sharedConfig.navbar(true), // true -> with api docs item
    footer: sharedConfig.footer(),
  },
  plugins: [
    ...sharedConfig.plugins(),
  ],
  presets: [
    sharedConfig.docusaurusPresetClassic(true, { googleAnalytics: sharedConfig.googleAnalytics('UA-11687894-9') }), // true -> fix invalid markup created from api-documenter
  ],
};
