import { ExecutorContext, logger } from '../../utils';
import { BuildPipeTasks } from '../schema';
import { Task, TaskType } from './task.type';

const taskRegistry = new Map<TaskType, Task<TaskType>>();

export function registerTask(taskHandler: Task<TaskType>): void {
  taskRegistry.set(taskHandler.type, taskHandler);
}

export async function runTask(task: BuildPipeTasks, context: ExecutorContext): Promise<{ success: boolean }> {
  const handler = taskRegistry.get(task.type);
  if (handler) {
    logger.info(`Running Task "${task.type}" | Name: ${task.name || '<un-named>'}: ${handler.getDescription?.(task) ?? ''}`).indent();
    const result = await handler.execute(task, context);
    logger.outdent();
    return result;
  } else {
    throw new Error(`Unknown BuildPipeTask "${(task as any).type}"`);
  }
}
