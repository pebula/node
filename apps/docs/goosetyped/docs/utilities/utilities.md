---
id: utilities
title: Utilities
sidebar_label: Utilities
---
import { ApiDocsLink } from '@doc-components';

## getSchemaOf

Returns the mongoose schema for the provided Model / Resource. [<ApiDocsLink symbol="getSchemaOf">Link</ApiDocsLink>]

## getDiscriminatorKeyFor

Returns the discriminator key for the provided Model / Resource.
Only valid for discriminator implementation, thr base class will not yield a value. [<ApiDocsLink symbol="getDiscriminatorKeyFor">Link</ApiDocsLink>]

## getDiscriminatorKeysOf

Returns the discriminator keys for the provided Model / Resource. [<ApiDocsLink symbol="getDiscriminatorKeysOf">Link</ApiDocsLink>]

## findModels

Return all Models / Resources registered in GooseTyped. [<ApiDocsLink symbol="findModels">Link</ApiDocsLink>]

## getEnum

Returns the list of enums registered for a `path` in a Model / Resource. [<ApiDocsLink symbol="getEnum">Link</ApiDocsLink>]
