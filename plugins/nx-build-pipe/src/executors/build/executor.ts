import { ExecutorContext, logger } from '../utils';
import { BuildPipeExecutorSchema } from './schema';
import { runTask, registerTask, group, target, runCommand, fromFile } from './tasks';

function loadEnvVars(path?: string) {
  if (path) {
    const result = require('dotenv').config({ path });
    if (result.error) {
      throw result.error;
    }
  } else {
    try {
      require('dotenv').config();
    } catch (e) {}
  }
}

registerTask(group);
registerTask(target);
registerTask(runCommand);
registerTask(fromFile);

function normalize(options: ExecutorContext['rootOptions'], parent?: BuildPipeExecutorSchema): ExecutorContext['rootOptions'] {
  const rootOptions: ExecutorContext['rootOptions'] = { taskOptions: {}, ...options };
  if (parent)
    rootOptions.$parent = options;
  return rootOptions;
}

export default async function runExecutor(options: BuildPipeExecutorSchema, context: ExecutorContext) {
  try {
    loadEnvVars(options.envFile);
    if (options.env) {
      Object.assign(process.env, options.env);
    }

    runCommand.verifySchema(options, context);
    context.rootOptions = normalize(options, context.rootOptions);
    const result = await runTask(options.task, context);
    return result;
  } catch (err) {
    logger.error(err.toString());
    return { success: false };
  }

}