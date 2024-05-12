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
      'getting-started/basic-example',
    ],
    Guide: [
      'guide/declaration',
      'guide/configuration',
      'guide/emitters',
      'guide/receivers',
      'guide/the-context',
      'guide/provisioning',
      'guide/interceptors',
    ],
    Tasks: [
      'tasks/introduction',
      'tasks/back-off',
      'tasks/idempotent-subscriber',
    ],
    Recipes: [
      'recipes/dynamic-entity-configuration',
    ]
  }
};

export default sidebars;
