export interface BuildExecutorSchema {
    /** Custom config path. Can be customized with `--config` option */
    config?: string;
    /** Default is `i18n.defaultLocale` */
    locale?: string;
    bundleAnalyzer?: boolean;
    /** the full path for the new output directory, relative to the current workspace (default: build) */
    outputPath: string;
    /** build website without minimizing JS bundles (default: false) */
    noMinify?: boolean;
    /** Builds the website in dev mode, including full React error messages. (default: false) */
    dev?: boolean;
    nx?: NxDocusaurusPluginOptions;
}
