import { ExecutorContext } from '@nx/devkit';
import { PluginConfig } from '@docusaurus/types';
import { nxDocusaurusCachePlugin } from './cache-plugin';
import { nxDocusaurusLibraryResolverPlugin } from './library-resolver-plugin';
import { NxDocusaurusInternalPluginOptions, NxDocusaurusPluginOptions } from './nx-docusaurus-plugin-options';

export function nxDocusaurusPlugins(projectRoot: string,
                                    context: ExecutorContext,
                                    internalOptions: NxDocusaurusInternalPluginOptions,
                                    options?: NxDocusaurusPluginOptions): PluginConfig[] {
    const plugins: PluginConfig[] = [];

    if (internalOptions.cachePlugin)
        plugins.push(nxDocusaurusCachePlugin(projectRoot, context, internalOptions.cachePlugin));

    options ??= {};

    if (options.libraryAlias?.length)
        plugins.push(nxDocusaurusLibraryResolverPlugin(projectRoot, context, options.libraryAlias));

    return plugins;
}