import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  sidebar: {
    'Getting Started': [
      'getting-started/introduction',
      'getting-started/installation',
    ],
    'Decorate': [
      'decorate/introduction',
    ],
    'Decorate Fluent': [
      'decorate-fluent/introduction',
      'decorate-fluent/decorator-api-suite',
      'decorate-fluent/decorator-api-class',
      'decorate-fluent/composing-decorator-api-class',
      'decorate-fluent/example',

    ],
  },
};

export default sidebars;
