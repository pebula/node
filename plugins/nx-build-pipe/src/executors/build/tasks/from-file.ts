import * as Path from 'path';
import { ExecutorContext, loadJson, logger } from '../../utils';
import { BuildPipeTask, BuildPipeFromFileTask } from '../schema';
import { runTask } from './task.run';
import { Task } from './task.type';

const LOADERS: Record<string, (path: string) => BuildPipeTask<any, any> | false> = {
  '.js': require,
  '.json': loadJson,
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

    const modifyArgs = (args: string[]) => {
      if (args?.length > 0) {
        const originalArgs: string[] = [];
        originalArgs.push(...process.argv.splice(2, process.argv.length - 2, ...args));
        return () => {
          process.argv.splice(2, args.length, ...originalArgs)
        };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => { };
      }
    }

    try {
      const args = task.args || task.options?.args || context.rootOptions?.taskOptions?.[task.name]?.args || [];
      const unModify = modifyArgs(args);
      const dynamicTask = loader(filePath);
      unModify();
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
