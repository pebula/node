import PATH from 'node:path';
import { serve } from '@docusaurus/core/lib';
import { ExecutorContext } from '@nx/devkit';
import { ServeExecutorSchema } from './schema';

export default async function* runExecutor(options: ServeExecutorSchema, context: ExecutorContext) {
  const projectRoot = PATH.join(
    context.root,
    context.workspace.projects[context.projectName ?? ''].root
  );

  try {
    await serve(projectRoot, {
      port: options.port?.toString(),
      host: options.host,
      config: options.config,
      open: !options.noOpen,
      build: options.build,
      dir: PATH.join(context.root, options.outputPath),
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
