const execSync = require('node:child_process').execSync;
const os = require('node:os');
const fs = require('node:fs');
const path = require('node:path');

module.exports = (targets, jobsPerTarget) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `matrix-`));
  const output = [];

  try {
    for (let target of targets) {
      const tempGraphFile = path.join(tempDir, `${target}-${Date.now()}.json`);
      execSync(`npx nx affected -t ${target} --exclude='tag:plugin' --graph ${tempGraphFile}`);
      const graph = JSON.parse(fs.readFileSync(tempGraphFile), { encoding: 'utf-8' });

      const targetProjects = new Array(jobsPerTarget).fill('').map(() => []);
      const array = graph
        .tasks
        .roots
        .map(r => graph.tasks.tasks[r].target.project)
        .forEach((project, index) => targetProjects[index % jobsPerTarget].push(project));

      targetProjects.forEach(projects => {
        if (projects.length === 0)
          return;

        output.push({
          index: output.length + 1,
          target,
          projects: projects.join(',')
        })
      });
    }

    process.stdout.write("\n");
    process.stdout.write(`Matrix: \n`);
    process.stdout.write(JSON.stringify(output, null, 2) + `\n`);
  } catch (error) {
    execSync(`npx rimraf ${tempDir}`);
    throw error;
  }
  execSync(`npx rimraf ${tempDir}`);
  return output;
}