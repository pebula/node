import * as Path from 'path';
import { ExecutorContext, loadJson, logger } from '../../utils';
import { BuildPipeFromFileTask, BuildPipeTasks } from '../schema';
import { runTask } from './task.run';
import { Task } from './task.type';

const LOADERS: Record<string, 'require' | ((path: string) => BuildPipeTasks)> = {
  '.js': 'require',
  '.ts': 'require',
  '.json': loadJson<BuildPipeTasks>,
};

export type FromFileDynamicResolver = (task: BuildPipeFromFileTask, context: ExecutorContext) => (BuildPipeTasks | false);

async function resolveDynamicTaskFromModule(modulePath: string, task: BuildPipeFromFileTask, context: ExecutorContext): Promise<BuildPipeTasks | false | undefined> {
  const module = await import(modulePath);
  const resolver = (typeof module === 'function' ? module : module.default) as unknown as FromFileDynamicResolver;
  return resolver(task, context);
}

export const fromFile: Task<'fromFile'> = {
  type: 'fromFile',
  async execute(task: BuildPipeFromFileTask, context: ExecutorContext): Promise<{ success: boolean }> {
    const filePath = Path.join(context.root, task.path);

    const loader = LOADERS[Path.extname(filePath)];
    if (!loader) {
      logger.error(`Error Running Task: Unsupported file ${task.path}.`);
      return { success: false };
    }

    try {
      const dynamicTask = loader === 'require'
        ? await resolveDynamicTaskFromModule(filePath, task, context)
        : loader(filePath);

      if (!dynamicTask) {
        if (dynamicTask === false)
          return { success: true };
        throw new Error(`Invalid task loaded from file "${task.path}"`);
      }
      return runTask(dynamicTask, context);
    } catch (err) {
      logger.error(`Error Running Task: ${err.message}`);
      return { success: false };
    }
  },
  getDescription(task: BuildPipeFromFileTask): string { return task.path; },
}
