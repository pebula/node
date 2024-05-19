import PATH from 'node:path';
import { ExecutorContext } from '@nx/devkit';
import { PluginModule } from '@docusaurus/types';
import { NxProjectPathMapping } from './nx-docusaurus-plugin-options';


function normalize(mapping: NxProjectPathMapping[]) {
    const output = new Map<string, string>();
    for (const m of mapping) {
        if (typeof m === 'string')
            output.set(m, m);
        else
            Object.entries(m).forEach(([k,v]) => output.set(k, v));
    }
    return output;
}

export const nxDocusaurusLibraryResolverPlugin = (projectRoot: string, nxContext: ExecutorContext, mapping: NxProjectPathMapping[]) => {
    const aliasMap = {} as { [index: string]: string; };
    for (const [projectName, aliasName] of normalize(mapping).entries()) {
        const project = nxContext.projectsConfigurations.projects[projectName];
        if (!project)
            throw new Error(`Invalid NX Library resolver project: ${projectName}`);

        aliasMap[aliasName] = PATH.join(nxContext.root, project.sourceRoot);
    }

    const plugin: PluginModule = async () => {
        return {
            name: 'nx-docusaurus-library-resolver-plugin',
            configureWebpack() {
                return {
                    resolve: {
                        alias: aliasMap,
                    },
                };
            },
        };
    };
    return plugin;
};