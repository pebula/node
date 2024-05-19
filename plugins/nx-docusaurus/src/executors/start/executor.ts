import PATH from 'node:path';
import { start } from '@docusaurus/core/lib';
import { ExecutorContext } from '@nx/devkit';
import { StartExecutorSchema } from './schema';

export default async function* runExecutor(options: StartExecutorSchema, context: ExecutorContext) {
  const projectRoot = PATH.join(
    context.root,
    context.workspace.projects[context.projectName ?? ''].root
  );

  try {
    await start(projectRoot, {
      port: options.port?.toString(),
      host: options.host,
      config: options.config,
      hotOnly: options.hotOnly,
      locale: options.locale,
      minify: !options.noMinify,
      open: !options.noOpen,
      poll: options.poll
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
