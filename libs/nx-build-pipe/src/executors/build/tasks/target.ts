import { parseTargetString, readTargetOptions, runExecutor } from '@nrwl/devkit';
import { ExecutorContext, getTaskGlobalOptions, logger } from '../../utils';
import { BuildPipeTargetTask } from '../schema';
import { Task } from './task.type';

function isNxBuildPipeTarget(project: string, target: string, context: ExecutorContext) {
  const targetConfig = context.workspace.projects[project]?.targets[target];
  return targetConfig?.executor === context.target.executor
    || targetConfig?.executor === '@pebula/nx-build-pipe:build';
}

export const target: Task<'target'> = {
  type: 'target',
  async execute(task: BuildPipeTargetTask, context: ExecutorContext): Promise<{ success: boolean }> {
    const targetDescription = parseTargetString(task.target);
    const targetOptions = readTargetOptions(targetDescription, context);

    const baseOptions = getTaskGlobalOptions(task, context);
    Object.assign(targetOptions, {...baseOptions, ...(task.options || {})});

    if (isNxBuildPipeTarget(targetDescription.project, targetDescription.target, context)) {
      targetOptions.taskOptions = {...context.rootOptions.taskOptions, ...(targetOptions.taskOptions || {})};
    }

    const executing = await runExecutor(targetDescription, targetOptions, context);

    // Run in sequence, as intended by Nx, this will usually be one executor but it depends on the executor implementation!
    for await (const s of executing) {
      if (!s.success) {
        logger.error(`Error Running Task: ${task.target}.`);
        return { success: false };
      }
    }
    return { success: true };
  },
  getDescription(task: BuildPipeTargetTask): string { return task.target; },
}
