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
    'Using Touchstone': [
      'using-touchstone/suite-container',
      'using-touchstone/suites-and-cases',
      'using-touchstone/events',
    ],
    'Reporters': [
      'reporters/introduction',
      'reporters/simple-console-reporter',
      'reporters/pretty-console-reporter',
      'reporters/chart-js-html-reporter',
      'reporters/vega-lite-reporter',
    ]
  },
};

export default sidebars;
