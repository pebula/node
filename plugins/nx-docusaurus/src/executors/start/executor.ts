import { start } from '@docusaurus/core/lib';
import { ExecutorContext } from '@nx/devkit';
import { StartExecutorSchema } from './schema';
import { NxDocusaurusInternalPluginOptions, withSiteConfig } from '../../nx-docusaurus-plugins';

const internalOptions: NxDocusaurusInternalPluginOptions = {
  cachePlugin: 'workspace'
};

export default async function* runExecutor(options: StartExecutorSchema, context: ExecutorContext) {
  try {
    await withSiteConfig({ internalOptions, options, context }, async ({ projectRoot, docusaurusConfigPath }) => {
      await start(projectRoot, {
        port: options.port?.toString(),
        host: options.host,
        config: docusaurusConfigPath,
        hotOnly: options.hotOnly,
        locale: options.locale,
        minify: !options.noMinify,
        open: !options.noOpen,
        poll: options.poll
      });
    });

    await new Promise<void>((res, rej) => {
      let done = false;

      process.on('unhandledRejection', (err) => {
        if (done)
          return;
        done = true;
        rej(err);
      });
      
      ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig, () => {
          if (done)
            return;
          done = true;
          res();
        });
      });
    });

    yield { success: true };
  } catch (err) {
    console.error(err);
    yield { success: false };
  }
}
