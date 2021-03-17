import * as FS from 'fs';
import { TargetConfiguration } from '@nrwl/devkit';
import { IConfigFile } from '@microsoft/api-extractor';
import * as dotProp from 'dot-prop';

const TOKENIZED_PATH_PROPS = [
  'apiReport.reportFolder',
  'apiReport.reportTempFolder',
  'compiler.tsconfigFilePath',
  'docModel.apiJsonFilePath',
  'dtsRollup.untrimmedFilePath',
  'dtsRollup.betaTrimmedFilePath',
  'dtsRollup.publicTrimmedFilePath',
  'tsdocMetadata.tsdocMetadataFilePath',
];

export interface ApiExtractorConfigTokens {
  /**
   * The <sourceRoot> token references the root folder of the source code as defined in the workspace.json at `projects.[PROJECT NAME].root`
   */
  sourceRoot: string;
  /**
   * The <sourceSourceRoot> token references the root folder of the source code as defined in the workspace.json at `projects.[PROJECT NAME].sourceRoot`
   */
  sourceSourceRoot: string;
}

export function updateTokens(config: IConfigFile, tokenMap: ApiExtractorConfigTokens) {
  const tokens = Object.keys(tokenMap).map( t => [new RegExp(`<${t}>`, 'g'), tokenMap[t]]) as Array<[RegExp, string]>;
  for (const path of TOKENIZED_PATH_PROPS) {
    const value = dotProp.get(config, path);
    if (typeof value === 'string') {
      let newValue = value;
      for (const [regExp, repValue] of tokens) {
        newValue = newValue.replace(regExp, repValue)
      }
      if (newValue !== value) {
        dotProp.set(config, path, newValue);
      }
    }
  }
}

export function loadJson(p: string): any {
  return JSON.parse(FS.readFileSync(p, { encoding: 'utf-8'}));
}

export function getOutputFolder(targetConfig: TargetConfiguration, configurationName?: string) {
  const output = targetConfig.configurations?.[configurationName || '']?.outputPath || targetConfig.options?.outputPath;

  if (!output) {
    throw new Error('Could not locate output folder destination.');
  }
  return output;
  // TODO: Find out to interpolate the configuration and use "outputs"

  // if (!targetConfig.outputs) {
  //   throw new Error('Could not locate output folder destination.');
  // } else if (targetConfig.outputs.length > 1) {
  //   throw new Error('Multiple output folders are not supported.');
  // }
  // return targetConfig.outputs[0];
}

export function cleanConfig(config: Partial<IConfigFile>) {
  const keyCount = (o: any, count: number) =>  o && Object.keys(o).length === count;

  for (const key of ['apiReport', 'docModel', 'dtsRollup', 'tsdocMetadata']) {
    if (keyCount(config[key], 0)) {
      delete config[key];
    }
  }


  if (keyCount(config.compiler, 1)) {
    if (keyCount(config.compiler.overrideTsconfig, 0)) {
      delete config.compiler;
    }
  } else if (keyCount(config.compiler, 0)) {
    delete config.compiler;
  }

  if (config.messages) {
    const messages = config.messages;
    for (const key of ['compilerMessageReporting', 'extractorMessageReporting', 'tsdocMessageReporting']) {
      if (keyCount(messages[key], 0)) {
        delete messages[key];
      }
    }
  }
  if (keyCount(config.messages, 0)) {
    delete config.messages;
  }
}
