// Code from: https://github.com/yannickglt/nx-github-build/blob/master/tools/scripts/run-many.js
// https://medium.com/emoteev-blog/10x-faster-ci-with-nx-and-github-actions-9a51fc4e82a6
const execSync = require('child_process').execSync;

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
} else {
  nxArgs.push('--all');
}

const affected = execSync(
  `npx nx print-affected --target=${target} ${nxArgs.join(' ')}`
).toString('utf-8');
const array = JSON.parse(affected)
  .tasks.map((t) => t.target.project)
  .filter(p => !p.startsWith('docs-'))
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
