import { DocsConfig, IDocsBaseConfig } from '../shared.docusaurus.config';

const baseConfig: IDocsBaseConfig = {
  dirName: __dirname,
  org: 'pebula',
  repo: 'node',

  // PACKAGE NAME!
  package: 'touchstone',

  // TITLE
  title: 'TouchStone',

  // SHORT DESCRIPTION (MAIN PAGE)
  tagline: 'Metadata-driven benchmarking framework, built on top of benchmark.js',

  apiDocs: true,
};

const docsConfig = new DocsConfig(baseConfig);
const config = docsConfig.create(cfg => {
  cfg.customFields.azureDocsUrl = 'https://docs.microsoft.com/en-us/javascript/api/@azure';
});

export default config;