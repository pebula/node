export interface TypeMapBaseOptions {
  /**
   * When true, require all mapped types to have reflection metadata defined.
   * This means that a class must have at least one property decorated so it can qualify.
   *
   * @default true (DEFAULT_TYPE_MAP_OPTIONS.strictTypes)
   */
  strictTypes?: boolean;
}

export interface TypeMapOptions<TSource = any, TTarget = any, TData = any> extends TypeMapBaseOptions {
  /** The target object to apply mapping to, if not set a new instance is created */
  target?: TTarget;

  data?: TData;

  groups?: string[];
}

export const DEFAULT_TYPE_MAP_OPTIONS: Required<TypeMapBaseOptions> = {
  strictTypes: true,
};
