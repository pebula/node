---
id: core-module
title: Core Module
sidebar_label: 1. Core Module
---
import { DocLink } from 'doc-components';

The core module, `@pebula/tom` provides no user functionality by itself.  
`@pebula/tom` contains the core logic, tools and constructs on which all other modules build meaningful functionalities.

In the core module there are mini-frameworks which are the base of all operations.  
It is mainly the source for:

- <DocLink to="docs/basics/schema">Schema</DocLink> type framework, including  

  - Type System representation
  - Schema decoration Management

- JIT JS code generation framework

- Other core utilities

The core module is highly extensible, design to be so <DocLink to="docs/basics/modules">other modules</DocLink> can use it to built domain specific functionality.  
More specifically, **serialization**, **validation**, and **mapping**

