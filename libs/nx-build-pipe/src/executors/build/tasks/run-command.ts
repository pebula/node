import * as Path from 'path';
import runCommandImp from 'nx/src/executors/run-commands/run-commands.impl';
import { validateOptsAgainstSchema } from 'nx/src/utils/params';
import { loadJson, saveJson, ExecutorContext, getTaskGlobalOptions } from '../../utils';
import { BuildPipeExecutorSchema, BuildPipeRunCommandTask } from '../schema';
import { Task } from './task.type';

let modified = false;

function verifySchema(options: BuildPipeExecutorSchema, context: ExecutorContext) {
  if (!modified) {
    const schema = loadJson(Path.join(__dirname, '..', 'schema.json'));
    const buildPipeRunCommandTask = schema.definitions.buildPipeRunCommandTask;
    if ('$comment' in buildPipeRunCommandTask.properties.options) {
      const _refFile = buildPipeRunCommandTask.properties.options.$comment;
      delete buildPipeRunCommandTask.properties.options.$comment;

      const refFile = Path.isAbsolute(_refFile)
        ? Path.resolve(context.root, `node_modules`, _refFile)
        : Path.resolve(__dirname, '..', _refFile);
      schema.definitions.buildPipeRunCommandTask.properties.options =
        loadJson(refFile);
      saveJson(Path.join(__dirname, '..', 'schema.json'), schema);
      modified = true;
      validateOptsAgainstSchema(options, schema);
    } else {
      modified = true;
    }
  }
}

export const runCommand: Task<'runCommand'> & { verifySchema(options: BuildPipeExecutorSchema, context: ExecutorContext): void; } = {
  type: 'runCommand',
  async execute(task: BuildPipeRunCommandTask, context: ExecutorContext): Promise<{ success: boolean }> {
    return runCommandImp({ ...getTaskGlobalOptions(task, context), ...task.options}, context);
  },
  verifySchema,
};
