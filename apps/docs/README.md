
# Docusaurus Applications for libraries

This folder contains docusaurus applications for libraries of this repository.  
Each application is configured to run within a **baseRef** url path to allow all applications to run together in **GitHub Pages**.

> The **_shared** folder is an exception, it contains shared browser resources available under the `@site-shared` namespace.

## Adding a new application

To generate a new docusaurus application use the **NX** generate command to execute the docusaurus generator:

```bash
npx create-docusaurus@latest <LIB_NAME> classic apps/docs/ -t -s -p yarn
```

Replace `<LIB_NAME>` with your library name.  
For example, if the library name is `goosetyped` we will execute:

```bash
npx create-docusaurus@latest goosetyped classic apps/docs/ -t -s -p yarn
```

Almost ready, now we need to modify the configuration and update the project to follow some conventions...

### Update `package.json`

Update `name` property from `<LIB_NAME>` to `docs-<LIB_NAME>`, e.g. `docs-goosetyped`

Add the `nx` target:

```json
{
  "nx": {
    "namedInputs": {
      "default": ["{projectRoot}/**/*", "sharedGlobals"],
      "production": [
        "default",
        "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)"
      ]
    },
    "targets": {
      "build": {
        "inputs": [
          "{projectRoot}/docs/*.(md|mdx)",
          "{projectRoot}/docs/**/*.(md|mdx)"
        ],
        "outputs": ["{options.outputPath}"]
      },
      "serve": {
        "inputs": [
          "{projectRoot}/docs/*.(md|mdx)",
          "{projectRoot}/docs/**/*.(md|mdx)"
        ],
        "outputs": ["{options.outputPath}"]
      }
    },
    "includedScripts": ["start", "serve", "build"]
  }
}
```

In `tsconfig.json` change extends to `"extends": "../tsconfig"`

### Update implicit dependencies

In `nx.json` at the `projects` object, find the key matching the name of your new docusaurus application and add and a `implicitDependencies` key
referencing the library the project is documenting.

The docusaurus application name created will follow the convention `<DIRECTORY_NAME>-<APP_NAME>`.  
We set the directory to `docs` so `DIRECTORY_NAME` is always `docs` and the `APP_NAME` is the library name.  

For example, if the library name is `decorate`, the application name will be `docs-decorate`.  
In `nx.json`:

```json
  "docs-decorate": {
    "tags": [],
    "implicitDependencies": ["decorate"]
  },
```

### Update build configuration

workspace gh-pages
gh-pages

### Initialize Lunr Search

Run the command to initialize lunr search in docusaurus:

```bash
node ./apps/docs/.init-docusaurus-lunr-search.js <APP_FOLDER>
```

Where `<APP_FOLDER>` is the name of the folder of the new docusaurus app (library name...)

For example, if the library name is `decorate` and we created a docusaurus application with the same name:

```bash
node ./apps/docs/.init-docusaurus-lunr-search.js decorate
```

> Note that the folder name is the name we've provided when we created the application but since we used a directory, NX gave it the name `docs-decorate`.

### Update docusaurus configuration

Replace the content of `docusaurus.config.js` with the following:

> If there is an existing docusaurus application, use the configuration from there as your initial template (might be more up to date)

```js
const { SharedConfig } = require('../_shared/shared.docusaurus.config');

const sharedConfig = new SharedConfig({
  dirName: __dirname,
  org: 'pebula',
  repo: 'node',

  // PACKAGE NAME!
  package: 'decorate',

  // TITLE
  title: 'Decorate',

  // SHORT DESCRIPTION (MAIN PAGE)
  tagline: 'Strictly typed decorator management tool for metadata driven libraries / applications.',
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

```

Replace the relevant configuration values, these will usually be:

- package
- title
- tagline

### Updating sidebars

Set the content of `sidebars.js` to:

```js
module.exports = {
  someSidebar: {
    'Getting Started': [
      'getting-started/introduction',
    ],
  },
};
```

### Updating `workspace.json`

#### Adding GitHub Pages build task

Adding the `gh-pages` architect target:

Add the following architect target to the architect array in `workspace.json`:

```json
  "gh-pages": {
    "builder": "@pebula/nx-build-pipe:build",
    "options": {
      "task": {
        "type": "fromFile",
        "path": "apps/docs/gh-pages.js",
        "args": ["decorate"]
      },
      "env": {
        "GH_PAGES_BUILD": true
      }
    }
  },
```

**Make sure you replace the project's folder name in `options.args` !!!**

##### Update GitHub Pages pipe configuration

The github pages architect target is using `nx-build-pipe` to load a dynamic architect configuration.  
This is located in `./apps/docs/gh-pages.js`.

Edit the file and add the new application to the `CONFIG` object at the top.

#### Caching Build Artifacts

When adding a new docusaurus application, add an `outputs` key to the `build` target in the workspace configuration file (`workspace.json`).  
This will ensure caching is enabled by **NX**.

Add `"outputs": ["{options.outputPath}"]` to the `build` target:

**BEFORE**:

```json
  "build": {
    "builder": "@nx-plus/docusaurus:browser",
    "options": {
      "outputPath": "dist/apps/docs/nesbus"
    }
  },
```

**AFTER**:

```json
  "build": {
    "builder": "@nx-plus/docusaurus:browser",
    "outputs": ["{options.outputPath}"],
    "options": {
      "outputPath": "dist/apps/docs/nesbus"
    }
  },
```
