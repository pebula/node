import type { RunCommandsBuilderOptions } from '@nrwl/workspace/src/executors/run-commands/run-commands.impl';

/* Define Tasks */
export interface BuildPipeTask<T extends string, TOptions> {
  type: T;
  options?: TOptions;
}

export interface BuildPipeGroupTask extends BuildPipeTask<'group', never> {
  composition?: 'parallel' | 'sequential';
  pipe: Array<BuildPipeTasks>;
}

export interface BuildPipeTargetTask<TOptions = any> extends BuildPipeTask<'target', TOptions> {
  /**
   * Target reference string formatted as "<PROJECT>:<TARGET>:<CONFIGURATION>?"
   */
  target: string;
}

export interface BuildPipeRunCommandTask<TOptions = any> extends BuildPipeTask<'runCommand', RunCommandsBuilderOptions> {
}

export type BuildPipeTasks =
  | BuildPipeGroupTask
  | BuildPipeTargetTask
  | BuildPipeRunCommandTask;

export interface BuildPipeExecutorSchema {
  task: BuildPipeTasks;
}
