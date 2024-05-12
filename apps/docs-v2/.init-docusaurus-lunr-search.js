/**
 * This CLI script will initialize the lunr search plugin in the provided docusaurus application
 *
 * To run, execute from the WORKSPACE ROOT directory:
 *
 * node ./apps/docs-v2/.init-docusaurus-lunr-search.js APP_NAME
 *
 * Example:
 *
 * node ./apps/docs-v2/.init-docusaurus-lunr-search.js tom
 */
const FS = require('fs');
const { spawn } = require('child_process');

const appName = process.argv[2];
const fullAppPath = `${__dirname}/${appName}`;

if (!appName) {
  throw new Error('You must provide an application name');
}
if (!FS.existsSync(fullAppPath)) {
  throw new Error(`Invalid application name "${appName}"`)
}
if (!FS.statSync(fullAppPath).isDirectory()) {
  throw new Error(`Invalid application name "${appName}", must point to a directory`);
}

spawn(`${process.cwd()}/node_modules/.bin/docusaurus`, ['swizzle', 'docusaurus-lunr-search', 'SearchBar', `./apps/docs-v2/${appName}`,  '--danger'], {
  stdio: 'inherit',
  cwd: process.cwd(),
});

console.log(`Don't forget to add the plugin to ${fullAppPath}/docusaurus.config.js`);
console.log(`Code: require.resolve('docusaurus-lunr-search'),`);
