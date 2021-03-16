import * as Path from 'path';
import * as FS from 'fs';
import { ExecutorContext, TargetConfiguration, logger } from '@nrwl/devkit';
import { IConfigFile, Extractor, ExtractorConfig } from '@microsoft/api-extractor';
import { ApiExtractorExecutorSchema } from './schema';

try {
  require('dotenv').config();
} catch (e) {}

function loadJson(p: string): any {
  return JSON.parse(FS.readFileSync(p, { encoding: 'utf-8'}));
}

function getOutputFolder(targetConfig: TargetConfiguration, configurationName?: string) {
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

export default async function runExecutor(options: ApiExtractorExecutorSchema, context: ExecutorContext) {
  const project = context.workspace.projects[context.projectName];
  if (project.projectType !== 'library') {
    throw new Error('Api Extractor requires a library project');
  }
  const targetConfig = project.targets[options.buildTargetName];
  if (!targetConfig) {
    throw new Error(`Could not find the target "${options.buildTargetName}" in project "${context.projectName}".`);
  }

  const outputFolder = Path.join(context.root, getOutputFolder(targetConfig, context.configurationName));
  const packageJsonFullPath = Path.join(outputFolder, 'package.json');
  const packageJson = loadJson(packageJsonFullPath);

  const configObject: IConfigFile = {
    projectFolder: outputFolder,
    mainEntryPointFilePath: Path.join(outputFolder, packageJson.typings),
    ...options.extractorConfig,
  };

  const extractorConfig: ExtractorConfig = ExtractorConfig.prepare({
    configObject,
    configObjectFullPath: outputFolder,
    packageJson,
    packageJsonFullPath,
  });

  const extractorResult = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true,
  });

  if (extractorResult.succeeded) {
    logger.info(`API Extractor completed successfully`);
    return {
      success: true,
    };
  } else {
    logger.error(Error(`API Extractor completed with ${extractorResult.errorCount} errors and ${extractorResult.warningCount} warnings`));
    return {
      success: false,
    };
  }
}
