import PATH from 'node:path';
import { build } from '@docusaurus/core/lib';
import { ExecutorContext } from '@nx/devkit';
import { BuildExecutorSchema } from './schema';
import { NxDocusaurusInternalPluginOptions, withSiteConfig } from '../../nx-docusaurus-plugins';

const internalOptions: NxDocusaurusInternalPluginOptions = {
  cachePlugin: 'workspace'
};

export default async function* runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {
  try {
    await withSiteConfig({ internalOptions, options, context }, async ({ projectRoot, docusaurusConfigPath }) => {
      await build(projectRoot, {
        config: docusaurusConfigPath,
        locale: options.locale,
        bundleAnalyzer: options.bundleAnalyzer,
        outDir: PATH.join(context.root, options.outputPath),
        minify: !options.noMinify,
        dev: options.dev
      });
    });

    yield { success: true };
  } catch (err) {
    console.error(err);
    yield { success: false };
  }
}
