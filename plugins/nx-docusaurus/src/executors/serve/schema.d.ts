export interface ServeExecutorSchema {

    /** use specified port (default: 3000) */
    port?: number;

    /** use specified host (default: localhost) */
    host?: string;

    /** Custom config path. Can be customized with `--config` option */
    config?: string;

    /** do not open page in the browser (default: false) */
    noOpen?: boolean;

    /** build website before serving (default: false) */
    build?: boolean;

    /** the full path for the new output directory, relative to the current workspace (default: build) */
    outputPath?: string;
}
