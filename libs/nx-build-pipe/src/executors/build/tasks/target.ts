import { ExecutorContext, logger, parseTargetString, readTargetOptions, runExecutor } from '@nrwl/devkit';
import { BuildPipeTargetTask } from '../schema';
import { Task } from './task.type';

export const target: Task<'target'> = {
  type: 'target',
  async execute(task: BuildPipeTargetTask, context: ExecutorContext): Promise<{ success: boolean }> {
    const targetDescription = parseTargetString(task.target);
    const targetOptions = readTargetOptions(targetDescription, context);

    if (task.options) {
      Object.assign(targetOptions, task.options);
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
