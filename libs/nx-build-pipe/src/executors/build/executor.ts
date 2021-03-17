import { ExecutorContext, logger,} from '@nrwl/devkit';
import { BuildPipeExecutorSchema } from './schema';
import {
  runTask,
  registerTask,
  group,
  target,
  runCommand,
} from './tasks';

try {
  require('dotenv').config();
} catch (e) {}

registerTask(group);
registerTask(target);
registerTask(runCommand);

export default async function runExecutor(options: BuildPipeExecutorSchema, context: ExecutorContext) {
  try {
    runCommand.verifySchema(options, context);
    const result = await runTask(options.task, context);
    return result;
  } catch (err) {
    logger.error(err.toString());
    return { success: false };
  }

}
