import type { RunCommandsBuilderOptions } from '@nrwl/workspace/src/executors/run-commands/run-commands.impl';

/* Define Tasks */
export interface BuildPipeTask<T extends string, TOptions> {
  name?: string;
  type: T;
  options?: TOptions;
}

export interface BuildPipeGroupTask extends BuildPipeTask<'group', never> {
  composition?: 'parallel' | 'sequence';
  pipe: Array<BuildPipeTasks>;
}

export interface BuildPipeTargetTask<TOptions = any> extends BuildPipeTask<'target', TOptions> {
  /**
   * Target reference string formatted as "<PROJECT>:<TARGET>:<CONFIGURATION>?"
   */
  target: string;
}

export interface BuildPipeFromFileTask<TOptions = any> extends BuildPipeTask<'fromFile', TOptions> {
  /**
   * Path to the file to load, relative to the workspace root.
   *
   * There are 2 supported file formats:
   *
   * 1) ".js" - The file is treated as javascript file. The default export is expected to be valid `BuildPipeTask`.
   * 2) ".json" - The file is treated as JSON file. The parsed JSON object is expected to be valid `BuildPipeTask`.
   */
  path: string;

  args?: string[];
}

export interface BuildPipeRunCommandTask<TOptions = any> extends BuildPipeTask<'runCommand', RunCommandsBuilderOptions> {
}

export type BuildPipeTasks =
  | BuildPipeGroupTask
  | BuildPipeTargetTask
  | BuildPipeFromFileTask
  | BuildPipeRunCommandTask;

export interface BuildPipeExecutorSchema {
  task: BuildPipeTasks;
  taskOptions?: Record<string, Record<string, any>>;
  envFile?: string;
  env?: any;
}
