import { DocsConfig, IDocsBaseConfig } from '../shared.docusaurus.config';

const baseConfig: IDocsBaseConfig = {
  dirName: __dirname,
  org: 'pebula',
  repo: 'node',

  // PACKAGE NAME!
  package: 'nesbus',

  // TITLE
  title: 'NesBus',

  // SHORT DESCRIPTION (MAIN PAGE)
  tagline: 'CQRS style ServiceBus extension for NestJS',

  apiDocs: true,
};

const docsConfig = new DocsConfig(baseConfig);
const config = docsConfig.create(cfg => {
  cfg.customFields.azureDocsUrl = 'https://docs.microsoft.com/en-us/javascript/api/@azure';
});

export default config;