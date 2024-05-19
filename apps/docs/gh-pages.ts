import PATH from 'node:path';
import type { FromFileDynamicResolver, BuildPipeGroupTask, BuildPipeTasks, BuildPipeRunCommandTask } from '@pebula/nx-build-pipe';

const CONFIG = {
  decorate: {
    docs: false,
  },
  tom: {
    docs: false,
  },
  nesbus: {
    docs: true,
  },
  goosetyped: {
    docs: true,
  },
  touchstone: {
    docs: true,
    beforeEmit(pipe) {
      const last = pipe.pop();
      pipe.push({
        type: 'target',
        target: 'touchstone:benchmark',
        options: {
          env: {
            vegaDestFile: 'apps/docs/touchstone/static/benchmarks/benchmark-chart'
          }
        }
      });
      pipe.push(last);
    }
  }
};


if (process.env.NX_TASK_TARGET_TARGET !== 'gh-pages')
  throw new Error("Must run within a gh-pages executer");

const createTaskDefinitions: FromFileDynamicResolver = (task, context) => {
  const args = task.args || task.options?.args || context.rootOptions?.taskOptions?.[task.name]?.args || [];

  const appName = process.env.NX_TASK_TARGET_PROJECT;
  if (!appName)
    throw new Error('Project name is missing, environment variable NX_TASK_TARGET_PROJECT is not set.');

  const project = context.projectsConfigurations?.projects?.[appName];
  if (!project)
    throw new Error('Invalid configuration, could not find executing project');

  const libName = args[0];
  if (!libName)
    throw new Error('Library name is missing, please ensure you set the args param');

  const hasApiDocs = 'api-documents' in project.targets;
  const buildCmd = hasApiDocs
    ? `${appName}:api-documents`
    : `${libName}:package`;

  const pipe = [
    {
      // We use the type "runCommand" and not "target" because nx will not check for caching with internal chaining of "target", only through a new process
      name: "build library" + (hasApiDocs ? ' and api documentation' : ''),
      type: "runCommand",
      options: {
        commands: [`npx nx run ${buildCmd} --with-deps`],
        parallel: false
      }
    } satisfies BuildPipeRunCommandTask,
    {
      // We use the type "runCommand" and not "target" because nx will not check for caching with internal chaining of "target", only through a new process
      name: "build package",
      type: "runCommand",
      options: {
        commands: [`npx nx build ${appName} --out-dir=${PATH.join(context.root, 'dist', 'gh-pages', libName)}`],
        parallel: false
      }
    } satisfies BuildPipeRunCommandTask,
  ];
  
  // if (typeof config.beforeEmit === 'function') {
    // config.beforeEmit(pipe);
  // }

  return {
    type: 'group',
    composition: 'sequence',
    pipe,
  } satisfies BuildPipeGroupTask;
};

export default createTaskDefinitions;
