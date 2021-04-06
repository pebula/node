import { BuildSchemaApi } from './build-schema';
import { DiscriminatorApi, DiscriminatorPropertySchema } from './discriminator';
import { TypeSystemApi, TypeSystemSchema } from './type-system';
import { PropertyMetadataApi, PropertyMetadataSchema } from './property-metadata';

export const PARTIAL_CLASS_FLUENT_APIS = [BuildSchemaApi] as const;

export const PARTIAL_PROP_SCHEMAS = [TypeSystemSchema, PropertyMetadataSchema, DiscriminatorPropertySchema] as const;
export const PARTIAL_PROP_FLUENT_APIS = [TypeSystemApi, BuildSchemaApi, PropertyMetadataApi, DiscriminatorApi] as const;

export * from './property-metadata';
export * from './build-schema';
export * from './type-system';
export * from './discriminator';
