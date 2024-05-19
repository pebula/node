---
id: introduction
title: Introduction
sidebar_label: 1. Introduction
---
import { ExtRelativeLink } from 'doc-components';

# Documentation is a Work In Progress

While we work on the documentation you can start using TOM by learning from examples in our source code:  

- <a href="https://github.com/pebula/node/tree/main/libs/tom/tests" target="_blank">Unit testing soure code</a> (<a href="https://coveralls.io/github/pebula/node" target="_blank">Code Coverage</a>)
- <a href="https://github.com/pebula/node/tree/main/libs/tom/benchmarks" target="_blank">Benchmarking source code</a>


## Supported Types

TOM supports a wide list of types, almost any type out there is supported!

- The obvious primitives: `boolean`, `number`, `string`, `Date` & `BigInt`
- All native containers: `Array`, `Set`, `Map` & object map (dictionary, POJO)
- All native buffers: `ArrayBuffer` and all of the typed arrays (`Int8Array`, `Uint8Array`, etc...)
- Enum
- Nested Types/Classes
- Type Literals (boolean, number, string)
- Union (unions of all of the above)

If you have an exotic type that is not supported, extending the framework is relatively easy.  
Of course, you can always request to add it.
