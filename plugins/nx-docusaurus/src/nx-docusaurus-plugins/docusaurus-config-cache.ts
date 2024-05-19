
import PATH from 'node:path';
import { AsyncLocalStorage } from 'node:async_hooks';
import { ExecutorContext } from '@nx/devkit';
import { loadSiteConfig } from '@docusaurus/core/lib/server/config';
import { NxDocusaurusInternalPluginOptions, NxDocusaurusPluginExecutorOptions } from './nx-docusaurus-plugin-options';

const sharedKey = 'SiteConfigAsyncLocalStorage__';
const docusaurusConfigPath = PATH.join(__dirname, `docusaurus.config${PATH.extname(__filename)}`);
const asyncLocalStorage: AsyncLocalStorage<SiteConfigCacheRecord> = global[sharedKey] || (global[sharedKey] = new AsyncLocalStorage<SiteConfigCacheRecord>());

export interface SiteConfigCacheInput<T extends NxDocusaurusPluginExecutorOptions = NxDocusaurusPluginExecutorOptions> {
    options: T;
    context: ExecutorContext;
}

export interface SiteConfigCacheRecord<T extends NxDocusaurusPluginExecutorOptions = NxDocusaurusPluginExecutorOptions> extends SiteConfigCacheInput<T> {
    projectRoot: string;
    loadSiteConfig: typeof loadSiteConfig;
    internalOptions: NxDocusaurusInternalPluginOptions;
}

export async function withSiteConfig(cacheRecord: SiteConfigCacheInput & { internalOptions: NxDocusaurusInternalPluginOptions; },
                                     fn: (x: { projectRoot: string; docusaurusConfigPath: string; }) => Promise<void>) {
    const projectRoot = PATH.join(cacheRecord.context.root, cacheRecord.context.workspace.projects[cacheRecord.context.projectName ?? ''].root);
    await asyncLocalStorage.run({ ...cacheRecord, projectRoot, loadSiteConfig }, () => fn({ projectRoot, docusaurusConfigPath }));
}

export function getSiteConfig<T extends NxDocusaurusPluginExecutorOptions = NxDocusaurusPluginExecutorOptions>(): SiteConfigCacheRecord<T> {
    return asyncLocalStorage.getStore() as SiteConfigCacheRecord<T>;
}
