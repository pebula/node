import { DocsConfig, IDocsBaseConfig } from '../shared.docusaurus.config';

const baseConfig: IDocsBaseConfig = {
  dirName: __dirname,
  org: 'pebula',
  repo: 'node',

  // PACKAGE NAME!
  package: 'tom',

  // TITLE
  title: 'Typed Object Mapper',

  // SHORT DESCRIPTION (MAIN PAGE)
  tagline: 'A super-fast, type safe, object serialization, validation and mapping',

  apiDocs: false,
};

const docsConfig = new DocsConfig(baseConfig);
const config = docsConfig.create();

export default config;