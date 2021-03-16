import { IConfigFile } from '@microsoft/api-extractor';

export interface ApiExtractorExecutorSchema {
  /**
   * The name of the build target
   * @default "build"
   */
  buildTargetName?: string;
  extractorConfig: Omit<IConfigFile, 'projectFolder' | 'mainEntryPointFilePath'>;
}
