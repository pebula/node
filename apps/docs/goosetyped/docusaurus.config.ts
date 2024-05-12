import { DocsConfig, IDocsBaseConfig } from '../shared.docusaurus.config';

const baseConfig: IDocsBaseConfig = {
  dirName: __dirname,

  org: 'pebula',
  repo: 'node',

  // PACKAGE NAME!
  package: 'goosetyped',

  // TITLE
  title: 'GooseTyped',

  // SHORT DESCRIPTION (MAIN PAGE)
  tagline: '',

  apiDocs: true,
};

const docsConfig = new DocsConfig(baseConfig);
const config = docsConfig.create(cfg => {
    cfg.customFields.mongooseDocsUrl = 'https://mongoosejs.com/docs';
});

export default config;
