import PATH from 'node:path';
import { ExecutorContext } from '@nx/devkit';
import { PluginModule } from '@docusaurus/types';
import { NxDocusaurusInternalPluginOptions } from './nx-docusaurus-plugin-options';

/**
 * A plugin that alters the webpack cache directory so it can work when executing from the workspace root and not from the project root.
 *
 * Internally, docusaurus uses webpack which save all cache to './node_modules/.cache/webpack' within the working directory (cwd).
 * Since it is a project by itself, it is expect to be '{projectRoot}/node_modules/.cache/webpack'.
 * However, if we run NX from the workspace directory, cache is saved to '{workspaceRoot}/node_modules/.cache/webpack'
 * which creates conflict if multiple docusaurus projects exists in the same workspace.
 * 
 * This plugin will solve it by changing webpack's cache destination.
 * 
 * When mode is 'workspace', cache is saved to '{workspaceRoot}/node_modules/.cache/webpack/{projectName}'
 * When mode is 'project', cache is saved to '{projectRoot}/node_modules/.cache/webpack'
 */
export function nxDocusaurusCachePlugin(projectRoot: string,
                                        nxContext: ExecutorContext,
                                        mode: Exclude<NxDocusaurusInternalPluginOptions['cachePlugin'], false>) {
  const plugin: PluginModule = async (dcsContext) => {
      return {
          name: 'nx-docusaurus-cache-plugin',
          configureWebpack() {
            const cacheDirectory = mode === 'project'
              ? PATH.join(dcsContext.siteDir, 'node_modules', '.cache', 'webpack')
              : PATH.join(nxContext.root, 'node_modules', '.cache', 'webpack', `${nxContext.projectName}`);

            return {
              cache: { type: 'filesystem', cacheDirectory }
            };
          },
      };
  };
  return plugin;
};