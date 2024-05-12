import { IConfigFile } from '@microsoft/api-extractor';

export interface ApiExtractorExecutorSchema {
  /**
   * Optionally specifies the path (relative to workspace root) for an Api Extractor Configuration JSON file to be used as a base configuration
   * Note that this is not part of the extractor configuration, hence no token interpolation is performed on this value.
   */
  baseConfigFile?: string;
  /**
   * The name of the build target
   * @default "build"
   */
  buildTargetName?: string;
  extractorConfig: Omit<IConfigFile, 'projectFolder' | 'mainEntryPointFilePath' | 'extends'>;
}
