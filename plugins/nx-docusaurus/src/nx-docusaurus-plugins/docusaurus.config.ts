import { nxDocusaurusPlugins } from './create';
import { getSiteConfig } from './docusaurus-config-cache'

export default async function config() {
    const { projectRoot, internalOptions, options, context, loadSiteConfig } = getSiteConfig();
    const { siteConfig } = await loadSiteConfig({ siteDir: projectRoot, customConfigFilePath: options.config });

    siteConfig.plugins ??= [];
    siteConfig.plugins.push(...nxDocusaurusPlugins(projectRoot, context, internalOptions, options.nx));

    return siteConfig;
}