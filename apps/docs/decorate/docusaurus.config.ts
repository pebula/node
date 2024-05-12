import { DocsConfig, IDocsBaseConfig } from '../shared.docusaurus.config';

const baseConfig: IDocsBaseConfig = {
  dirName: __dirname,
  org: 'pebula',
  repo: 'node',

  // PACKAGE NAME!
  package: 'decorate',

  // TITLE
  title: 'Decorate',

  // SHORT DESCRIPTION (MAIN PAGE)
  tagline: 'Strictly typed decorator management tool for metadata driven libraries / applications.',

  apiDocs: false,
};

const docsConfig = new DocsConfig(baseConfig);
const config = docsConfig.create();

export default config;