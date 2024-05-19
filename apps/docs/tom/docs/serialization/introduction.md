---
id: serialization-introduction
title: Serialization Introduction
sidebar_label: 1. Introduction
---
import { ExtRelativeLink } from 'doc-components';

## TBD

- Serialization Definition
  - Serialization definition VS Schema definitions
  - Strict definition, explain why
  - Serialization definitions of un-equal types
    - Why & How to
    - Gotchas: Types.String, Nominal, true as 3rd param
- Auto definition (based on Schema)
- Enums - Labels vs Values
- Reusing/Extending an existing serialization definition
- The `Serializer`
  - The default `jsonSerializer`
  - Extending/Forking a `Serializer`
  - Advanced: Type specific Serializer
    - Extending/Cloning a type serializer
    - Overwriting a type serializer
