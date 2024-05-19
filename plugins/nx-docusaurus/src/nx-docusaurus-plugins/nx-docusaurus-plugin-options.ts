export type NxProjectPathMapping = string | Record<string, string>;

export interface NxDocusaurusPluginOptions {
    /**
     * Automatic project path resolution for nx libraries into the docusaurus application.
     * This is useful to expose a shared component library to be used within MDX files in docusaurus.
     *
     * Either a string or a string key value map.
     *
     * E.G:
     * ```
     * {
     *   "@pebula/nx-docusaurus:build": {
     *     "options": {
     *        "nx": {
     *          "libraryAlias": [
     *            "doc-components",
     *            {
     *              "doc-utils": "@org/doc-utils"
     *            }
     *          ]
     *        }
     *     }
     *   }
     * }
     * ```
     * 
     * In the example above we have 2 alias definitions
     * 
     *   - "doc-components" which is the name of the project and also the alias
     *   - "doc-utils" which is the name of the project but we alias it as "@org/doc-utils"
     * 
     */
    libraryAlias?: NxProjectPathMapping[]
}

/**
 * @internal
 */
export interface NxDocusaurusInternalPluginOptions {
    cachePlugin: 'workspace' | 'project' | false;
}

export type NxDocusaurusPluginExecutorOptions = {
    config?: string;
    nx?: NxDocusaurusPluginOptions
};
