import PATH from 'node:path';
import fsExtra from 'fs-extra';
import { build, clear } from '@docusaurus/core/lib';
import { ExecutorContext } from '@nx/devkit';
import { BuildExecutorSchema } from './schema';

export default async function* runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
  const projectRoot = PATH.join(
    context.root,
    context.workspace.projects[context.projectName ?? ''].root
  );

  try {

    await fsExtra.remove(PATH.join(context.root, 'node_modules', '.cache', 'webpack'));
    await build(projectRoot, {
      config: options.config,
      locale: options.locale,
      bundleAnalyzer: options.bundleAnalyzer,
      outDir: PATH.join(context.root, options.outputPath),
      minify: !options.noMinify,
      dev: options.dev
    });

    yield { success: true };
  } catch (err) {
    console.error(err);
    yield { success: false };
  }
}
