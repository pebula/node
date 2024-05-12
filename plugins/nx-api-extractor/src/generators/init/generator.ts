import {
  Tree,
  updateJson,
  addDependenciesToPackageJson,
  stripIndents,
} from '@nx/devkit';
import { InitGeneratorSchema } from './schema';

const apiExtractorVersion = '^7.13.2';

function removeNxApiExtractorFromDeps(host: Tree) {
  updateJson(host, 'package.json', (json) => {
    // check whether updating the package.json is necessary
    if (json.dependencies && json.dependencies['@pebula/nx-api-extractor']) {
      delete json.dependencies['@pebula/nx-api-extractor'];
    }
    return json;
  });
}

function createApiExtractorBaseConfig(host: Tree) {
  if (!host.exists('api-extractor.base.json')) {
    host.write(
      'api-extractor.base.json',
      stripIndents`{
  "docModel": {
    "enabled": true,
    "apiJsonFilePath": "./<unscopedPackageName>.api.json"
  },
  "apiReport": {
    "enabled": true,
    "reportFileName": "public-api-contract.md",
    "reportFolder": "<sourceRoot>",
    "reportTempFolder": "<sourceRoot>/../../tmp"
  },
  "dtsRollup": {
    "enabled": true,
    "untrimmedFilePath": "",
    "betaTrimmedFilePath": "",
    "publicTrimmedFilePath": "./src/index-public.d.ts"
  },
  "tsdocMetadata": {
    "enabled": false
  },
  "messages": {
    "tsdocMessageReporting": {
      "default": {
        "logLevel": "none"
      }
    },
    "extractorMessageReporting": {
      "ae-missing-release-tag": {
        "logLevel": "none"
      },
      "ae-unresolved-link": {
        "logLevel": "none"
      }
    }
  }
}`
    );
  }
}

function updateDependencies(tree: Tree) {
  const devDeps = {
    '@microsoft/api-extractor': apiExtractorVersion,
    '@pebula/nx-api-extractor': '*',
  };

  return addDependenciesToPackageJson(tree, {}, devDeps);
}

export function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  createApiExtractorBaseConfig(tree);
  const installTask = updateDependencies(tree);
  removeNxApiExtractorFromDeps(tree);
  return installTask;
}
export default initGenerator;
