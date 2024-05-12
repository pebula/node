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
  sidenav: {
    'Getting Started': [
      'getting-started/introduction',
      'getting-started/installation',
      'getting-started/basic-usage',
    ],
    'Basics': [
      'basics/core-module',
      'basics/schema',
      'basics/modules',
    ],
    'Serialization': [
      'serialization/serialization-introduction',
      'serialization/basic-usage',
      'serialization/serializer',
    ],
    'Validation': [
      'validation/validation-introduction',
      'validation/basic-usage',
      'validation/validator',
    ],
    'Mapping': [
      'mapping/mapping-introduction',
      'mapping/basic-usage',
    ],
  }
};

export default sidebars;
