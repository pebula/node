
const { SharedConfig } = require('../_shared/shared.docusaurus.config');

const sharedConfig = new SharedConfig({
  dirName: __dirname,
  org: 'pebula',
  repo: 'node',

  // PACKAGE NAME!
  package: 'tom',

  // TITLE
  title: 'Typed Object Mapper',

  // SHORT DESCRIPTION (MAIN PAGE)
  tagline: 'A super-fast, type safe, object serialization, validation and mapping',
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
