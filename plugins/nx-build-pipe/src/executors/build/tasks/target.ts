import { parseTargetString, readTargetOptions, runExecutor } from '@nx/devkit';
import { ExecutorContext, getTaskGlobalOptions, logger } from '../../utils';
import { BuildPipeTargetTask } from '../schema';
import { Task } from './task.type';
import { runCommand } from './run-command';

function isNxBuildPipeTarget(project: string, target: string, context: ExecutorContext) {
  const targetConfig = context.workspace?.projects?.[project]?.targets?.[target];
  return targetConfig?.executor === context.target?.executor || targetConfig?.executor === '@pebula/nx-build-pipe:build';
}

export const target: Task<'target'> = {
  type: 'target',
  async execute(task: BuildPipeTargetTask, context: ExecutorContext): Promise<{ success: boolean }> {
    const targetDescription = parseTargetString(task.target, context);

    if (task.skipIfNotExist === true) {
      const exists = context.projectsConfigurations.projects[targetDescription.project].targets[targetDescription.target];
      if (!exists)
        return { success: true };
    }


    const targetOptions = readTargetOptions(targetDescription, context);
    task.target = `${targetDescription.project}:${targetDescription.target}`;
    const baseOptions = getTaskGlobalOptions(task, context);
    Object.assign(targetOptions, { ...baseOptions, ...(task.options || {}) });

    if (task.runAsCmd === true) {
      return await runCommand.execute({
        name: task.name || `Run ${task.target}`,
        type: 'runCommand',
        options: {
          command: `npx nx run ${task.target}`
        }
      }, context)
    }

    if (isNxBuildPipeTarget(targetDescription.project, targetDescription.target, context)) {
      targetOptions.taskOptions = {
        ...context.rootOptions.taskOptions,
        ...(targetOptions.taskOptions || {}),
      };
    }

    const executing = await runExecutor(
      targetDescription,
      targetOptions,
      context
    );

    // Run in sequence, as intended by Nx, this will usually be one executor but it depends on the executor implementation!
    for await (const s of executing) {
      if (!s.success) {
        logger.error(`Error Running Task: ${task.target}.`);
        return { success: false };
      }
    }
    return { success: true };
  },
  getDescription(task: BuildPipeTargetTask): string {
    return task.target;
  },
};
