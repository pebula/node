---
id: validation-introduction
title: Validation Introduction
sidebar_label: 1. Introduction
---
import ExtRelativeLink from '@site-shared/theme/ExtRelativeLink';

## TBD

- Validation using decorators
  - Schema decorators VS validation decorators
  - Why no Definitions (like mapping & serialization)
  - Excluding validation
- Auto definition (based on Schema)
- Reusing/Extending an existing serialization definition
- The `Validator`
  - The `default` validator
  - Extending/Forking a `Validator`
  - Advanced: Type specific constraints group
    - Customizing Error validation messages
    - Extending/Cloning a Type specific constraints group
    - Overwriting a Type specific constraints group
    - Logical constraint
    - Adding new constraints
      - Decorator Extensions (+ augmentation)
      - Register
      - JIT & Runtime Code
      - Error messages
