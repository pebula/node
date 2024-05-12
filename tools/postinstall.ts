import { existsSync } from 'node:fs';
import FS from 'node:fs/promises';
import PATH from 'node:path';
import { env } from 'node:process';
import { EOL } from "node:os";

import ts from 'typescript';
import { spawn } from 'node:child_process';

const MARKER_PATH = PATH.join(process.cwd(), 'yarn-audit-fix.tmp');

async function runAudit() {
    if (existsSync(MARKER_PATH))
        return;

    await FS.writeFile(MARKER_PATH, '', { encoding: 'utf-8' });

    try {
        const code = await new Promise<number | null>((res, rej) => {
            const ps = spawn('npx', ["yarn-audit-fix"], { env: { npm_config_yes: "true", ...env }, shell: true });
            ps.stdout.on('data', d => console.log(`${d}`));
            ps.on('error', rej); 
            ps.on('close', res); 
        });
        console.log(`child process exited with code ${code}`);
    } catch (err) {
        console.error(err);
    }
    await FS.unlink(MARKER_PATH);
}

async function ensureDir(path: string) {
    try {
        const pkgDirStat = await FS.stat(path);
        if (!pkgDirStat.isDirectory)
            throw new Error(`Path is not a directory: ${path}`);
        return false;
    } catch (e: any) {
        if (e.code === 'ENOENT') {
            await FS.mkdir(path, { recursive: true });
            return true;
        }
        throw e;
    }
}

async function installApiDocumenterPlugin() {
    const sourcePath = PATH.join(process.cwd(), 'tools', 'api-documenter-fix-markdown-for-mdx-plugin');
    const pkgJson = JSON.parse(await FS.readFile(PATH.join(sourcePath, 'package.json'), { encoding: 'utf-8' }));
    const destPath = PATH.join(process.cwd(), 'node_modules', ...pkgJson.name.split('/'));

    await ensureDir(destPath);

    const sourceCodeIndexPath = PATH.join(sourcePath, 'index.ts');
    const tsOptions = {
        compilerOptions: {
            sourceMap: true,
            moduleResolution: ts.ModuleResolutionKind.NodeNext,
            target: ts.ScriptTarget.ES2015,
            module: ts.ModuleKind.NodeNext
        },
        reportDiagnostics: true,
        fileName: sourceCodeIndexPath
    } satisfies ts.TranspileOptions;

    const sourceCode = await FS.readFile(sourceCodeIndexPath, { encoding: 'utf-8' });
    const transpilation = ts.transpileModule(sourceCode, tsOptions);

    if (transpilation.diagnostics && transpilation.diagnostics.length > 0) {
        const diagnostics = ts.formatDiagnosticsWithColorAndContext(transpilation.diagnostics, {
            getCanonicalFileName(fileName) { return fileName; },
            getCurrentDirectory() { return process.cwd() },
            getNewLine() { return EOL; }
        });
        console.log(diagnostics);
        throw new Error(`Error compiling typescript @ ${sourceCodeIndexPath}`);
    }

    await FS.writeFile(PATH.join(destPath, 'package.json'), JSON.stringify(pkgJson, null, 2), { encoding: 'utf-8' });
    await FS.writeFile(PATH.join(destPath, 'index.js'), transpilation.outputText, { encoding: 'utf-8' });
    if (transpilation.sourceMapText) {
        const sourceMap = JSON.parse(transpilation.sourceMapText) as any;
        sourceMap.sourceRoot = sourcePath;
        sourceMap.sources = ['index.ts'];
        await FS.writeFile(PATH.join(destPath, 'index.js.map'), JSON.stringify(sourceMap, null), { encoding: 'utf-8' });
    }
}

async function run() {
    console.log("Running yarn audit fix...");
    await runAudit();

    console.log("Installing Api Documentor Plugin...");
    await installApiDocumenterPlugin();
}

run()
    .then(() => console.log('Done!'))
    .catch(e => console.error(e))
    .then(() => process.exit() );
