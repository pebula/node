const { SharedConfig } = require('../_shared/shared.docusaurus.config');

const sharedConfig = new SharedConfig({
  dirName: __dirname,
  org: 'pebula',
  repo: 'node',

  // PACKAGE NAME!
  package: 'touchstone',

  // TITLE
  title: 'TouchStone',

  // SHORT DESCRIPTION (MAIN PAGE)
  tagline: 'Metadata-driven benchmarking framework, built on top of benchmark.js',
});

module.exports = {
  ...sharedConfig.rootOptions(),
  customFields: {
    apiDocPrefix: `docs/api-docs/${sharedConfig.package}.`,
  },
  themeConfig: {
    navbar: sharedConfig.navbar(true), // true -> with api docs item
    footer: sharedConfig.footer(),
  },
  plugins: [
    ...sharedConfig.plugins(),
  ],
  presets: [
    sharedConfig.docusaurusPresetClassic(false, { googleAnalytics: sharedConfig.googleAnalytics('UA-11687894-9') }), // true -> fix invalid markup created from api-documenter
  ],
};
