import { ExecutorContext } from '../../utils';
import { BuildPipeGroupTask } from '../schema';
import { runTask } from './task.run';
import { Task } from './task.type';

export const group: Task<'group'> = {
  type: 'group',
  async execute(task: BuildPipeGroupTask, context: ExecutorContext): Promise<{ success: boolean }> {
    switch (task.composition) {
      case 'parallel':
        return Promise
          .all(task.pipe.map( t => runTask(t, context) ))
          .then( results => {
            return results.some( r => r.success === false )
              ? { success: false }
              : { success: true }
            ;
          });
      case 'sequence':
        for (const subTask of task.pipe) {
          const result = await runTask(subTask, context);
          if (result.success === false) {
            return result;
          }
        }
        return { success: true };
      default:
        throw new Error(`Invalid group composition ${task.composition}`);
    }
  },
  getDescription(task: BuildPipeGroupTask): string { return `running ${task.pipe.length} [${task.composition}]`; },
}
