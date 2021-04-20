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

const ghPagesTask = (appName) => {
  const apiDocsTasks = () => {
    return [
      {
        type: 'group',
        composition: 'sequence',
        pipe: [
          {
            type: 'target',
            target: `${appName}:apiExtractor`
          },
          {
            type: 'runCommand',
            options: {
              commands: [
                `./node_modules/.bin/api-documenter markdown -i ./dist/libs/${appName}  -o ./apps/docs/${appName}/docs/api-docs`
              ],
              parallel: false
            }
          }
        ]
      }
    ]
  };

  const config = CONFIG[appName] || {};

  const pipe = [
    {
      // We use the type "runCommand" and not "target" because nx will not check for caching with internal chaining of "target", only through a new process
      name: "build package",
      type: "runCommand",
      options: {
        commands: [`yarn nx run ${appName}:package --with-deps`],
        parallel: false
      }
    },
    ...(config.docs ? apiDocsTasks() : []),
    {
      // We use the type "runCommand" and not "target" because nx will not check for caching with internal chaining of "target", only through a new process
      name: "build package",
      type: "runCommand",
      options: {
        commands: [`yarn nx build docs-${appName} --outputPath=dist/gh-pages/${appName}`],
        parallel: false
      }
    },
  ];
  if (typeof config.beforeEmit === 'function') {
    // config.beforeEmit(pipe);
  }
  return {
    type: 'group',
    composition: 'sequence',
    pipe,
  }
};

module.exports = ghPagesTask(process.argv[2]);
