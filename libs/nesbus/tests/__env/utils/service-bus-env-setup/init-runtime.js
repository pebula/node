const path = require('path');
const tsNode = require('ts-node');
const tsTransformPaths = require('typescript-transform-paths');

tsNode.register({
  project: path.join(__dirname, 'tsconfig.json')
});

tsTransformPaths.register();

module.exports = require('./jest-service-bus-test-environment').JestServiceBusTestEnvironment;
