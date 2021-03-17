import * as Path from 'path';
import * as FS from 'fs';
import { ExecutorContext, logger } from '@nrwl/devkit';
import { IConfigFile, Extractor, ExtractorConfig } from '@microsoft/api-extractor';
import { ApiExtractorExecutorSchema } from './schema';
import { loadJson, getOutputFolder, updateTokens, cleanConfig } from './utils';

try {
  require('dotenv').config();
} catch (e) {}

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

  if (!options.baseConfigFile && !options.extractorConfig) {
    throw new Error('Configuration not set, please set a base config and/or direct extract configuration.');
  }

  let baseConfig: IConfigFile = {} as any;
  if (options.baseConfigFile) {
    const extendsPath = Path.isAbsolute(options.baseConfigFile)
      ? options.baseConfigFile
      : Path.join(context.root, options.baseConfigFile)
    ;
    baseConfig = loadJson(extendsPath);
  }

  const rawExtractorConfig = options.extractorConfig || {}
  cleanConfig(rawExtractorConfig);

  const configObject: IConfigFile = {
    ...baseConfig,
    ...rawExtractorConfig,
    projectFolder: outputFolder,
    mainEntryPointFilePath: Path.join(outputFolder, packageJson.typings),
  };

  if (!configObject.compiler) {
    configObject.compiler = {
      tsconfigFilePath: '<sourceRoot>/tsconfig.json',
      skipLibCheck: false,
    };
  }

  updateTokens(configObject, {
    sourceRoot: Path.join(context.root, project.root),
    sourceSourceRoot: Path.join(context.root, project.sourceRoot),
  });

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

  if (FS.existsSync(extractorConfig.reportTempFilePath)) {
    FS.unlinkSync(extractorConfig.reportTempFilePath);
  }

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
