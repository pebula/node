import { ExecutorContext } from '@nx/devkit';
import { BuildPipeTask, BuildPipeTasks } from '../schema';

export type TaskType = BuildPipeTasks['type'];

export interface Task<T extends TaskType> {
  type: T;
  execute(
    task: BuildPipeTask<T, any>,
    context: ExecutorContext
  ): Promise<{ success: boolean }>;
  getDescription?(task: BuildPipeTask<T, any>): string;
}
