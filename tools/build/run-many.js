// Code from: https://github.com/yannickglt/nx-github-build/blob/master/tools/scripts/run-many.js
// https://medium.com/emoteev-blog/10x-faster-ci-with-nx-and-github-actions-9a51fc4e82a6
const execSync = require('node:child_process').execSync;
const os = require('node:os');
const fs = require('node:fs');
const path = require('node:path');

const target = process.argv[2];
const jobIndex = Number(process.argv[3]);
const jobCount = Number(process.argv[4]);
const headRef = process.argv[5];
const baseRef = process.argv[6];
const nxArgs = [];

function normalizeRef(ref) {
  return ref.startsWith('refs/')
    ? ref
    : `origin/${ref}`
  ;
}
if (headRef !== baseRef) {
  nxArgs.push(`--head=${normalizeRef(headRef)}`);
  nxArgs.push(`--base=${normalizeRef(baseRef)}`);
}

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `${target}-`));
execSync(`npx nx affected -t ${target} ${nxArgs.join(' ')} --exclude='!tag:release,tag:plugin' --graph ${path.join(tempDir, 'g.json')}`);
const graph = JSON.parse(fs.readFileSync(path.join(tempDir, 'g.json'), { encoding: 'utf-8' }));
execSync(`npx rimraf ${tempDir}`);

const array = graph
  .tasks
  .roots
  .map(r => graph.tasks.tasks[r].target.project)
  .slice()
  .sort();

const sliceSize = Math.max(Math.floor(array.length / jobCount), 1);
const projects =
  jobIndex < jobCount
    ? array.slice(sliceSize * (jobIndex - 1), sliceSize * jobIndex)
    : array.slice(sliceSize * (jobIndex - 1));

if (projects.length > 0) {
  execSync(
    `npx nx run-many --target=${target} --projects=${projects.join(
      ','
    )} --parallel ${restArgs()}`,
    {
      stdio: [0, 1, 2],
    }
  );
}

function restArgs() {
  return process.argv
    .slice(7)
    .map((a) => `"${a}"`)
    .join(' ');
}
