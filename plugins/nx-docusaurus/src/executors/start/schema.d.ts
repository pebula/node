export interface StartExecutorSchema {
    /** use specified port (default: 3000) */
    port?: number;

    /** use specified host (default: localhost) */
    host?: string;

    /** Custom config path. Can be customized with `--config` option */
    config?: string;
    /** Default is `i18n.defaultLocale` */
    locale?: string;

    /** do not fallback to page refresh if hot reload fails (default: false) */
    hotOnly?: boolean;
    /** do not open page in the browser (default: false) */
    noOpen?: boolean;
    /** use polling rather than watching for reload (default: false). Can specify a poll interval in milliseconds */
    poll?: boolean | number;
    /** build website without minimizing JS bundles (default: false) */
    noMinify?: boolean;
    nx?: NxDocusaurusPluginOptions;
}
