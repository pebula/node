[![Coverage Status](https://coveralls.io/repos/github/pebula/node/badge.svg?branch=main)](https://coveralls.io/github/pebula/node?branch=main)

# Pebula Node

Monorepo for node<sup>[1](#footnote1)</sup> libraries. Contain the following libraries:

Package       | Version | Documentation  | Source Code
--------------|---------|----------------|------------
[@pebula/tom](#pebulatom) | [![npm (scoped)](https://img.shields.io/npm/v/@pebula/tom?color=green&style=flat-square)](https://www.npmjs.com/package/@pebula/tom) | [![Docs](https://img.shields.io/badge/Docs-9cf?style=flat-square&label=‎&logo=Read%20The%20Docs&logoColor=white&color=31A8FF)](https://pebula.github.io/node/docs-tom) | [![GitHub](https://img.shields.io/badge/Source_Code-green?style=flat-square&label=‎&logo=github)](https://github.com/pebula/node/tree/main/libs/tom)
[@pebula/touchstone](#pebulatouchstone) | [![npm (scoped)](https://img.shields.io/npm/v/@pebula/touchstone?color=green&style=flat-square)](https://www.npmjs.com/package/@pebula/touchstone) | [![Docs](https://img.shields.io/badge/Docs-9cf?style=flat-square&label=‎&logo=Read%20The%20Docs&logoColor=white&color=31A8FF)](https://pebula.github.io/node/docs-touchstone) | [![GitHub](https://img.shields.io/badge/Source_Code-green?style=flat-square&label=‎&logo=github)](https://github.com/pebula/node/tree/main/libs/touchstone)
[@pebula/decorate](#pebuladecorate) | [![npm (scoped)](https://img.shields.io/npm/v/@pebula/decorate?color=green&style=flat-square)](https://www.npmjs.com/package/@pebula/decorate) | [![Docs](https://img.shields.io/badge/Docs-9cf?style=flat-square&label=‎&logo=Read%20The%20Docs&logoColor=white&color=31A8FF)](https://pebula.github.io/node/docs-decorate) | [![GitHub](https://img.shields.io/badge/Source_Code-green?style=flat-square&label=‎&logo=github)](https://github.com/pebula/node/tree/main/libs/decorate)
[@pebula/goosetyped](#pebulagoosetyped) | [![npm (scoped)](https://img.shields.io/npm/v/@pebula/goosetyped?color=green&style=flat-square)](https://www.npmjs.com/package/@pebula/goosetyped) | [![Docs](https://img.shields.io/badge/Docs-9cf?style=flat-square&label=‎&logo=Read%20The%20Docs&logoColor=white&color=31A8FF)](https://pebula.github.io/node/docs-goosetyped) | [![GitHub](https://img.shields.io/badge/Source_Code-green?style=flat-square&label=‎&logo=github)](https://github.com/pebula/node/tree/main/libs/goosetyped)
[@pebula/nesbus](#pebulanesbus) | [![npm (scoped)](https://img.shields.io/npm/v/@pebula/nesbus?color=green&style=flat-square)](https://www.npmjs.com/package/@pebula/nesbus) | [![Docs](https://img.shields.io/badge/Docs-9cf?style=flat-square&label=‎&logo=Read%20The%20Docs&logoColor=white&color=31A8FF)](https://pebula.github.io/node/docs-nesbus) | [![GitHub](https://img.shields.io/badge/Source_Code-green?style=flat-square&label=‎&logo=github)](https://github.com/pebula/node/tree/main/libs/nesbus)

## @pebula/tom

A super-fast, type safe, object serialization, validation and mapping

[![Documentation](https://img.shields.io/badge/Documentation-9cf?style=for-the-badge)](https://pebula.github.io/node/docs-tom)   ![npm (scoped)](https://img.shields.io/npm/v/@pebula/tom?color=green&style=for-the-badge)  [![GitHub](https://img.shields.io/badge/Source_Code-green?style=for-the-badge&logo=github)](https://github.com/pebula/node/tree/main/libs/tom)

--------------

## @pebula/touchstone

Metadata-driven benchmarking framework, built on top of [benchmark.js](https://benchmarkjs.com/)

[![Documentation](https://img.shields.io/badge/Documentation-9cf?style=for-the-badge)](https://pebula.github.io/node/docs-touchstone)   ![npm (scoped)](https://img.shields.io/npm/v/@pebula/touchstone?color=green&style=for-the-badge)  [![GitHub](https://img.shields.io/badge/Source_Code-green?style=for-the-badge&logo=github)](https://github.com/pebula/node/tree/main/libs/touchstone)

--------------

## @pebula/decorate

Strictly typed decorator management tool for metadata driven libraries / applications.

[![Documentation](https://img.shields.io/badge/Documentation-9cf?style=for-the-badge)](https://pebula.github.io/node/docs-decorate)   ![npm (scoped)](https://img.shields.io/npm/v/@pebula/decorate?color=green&style=for-the-badge)  [![GitHub](https://img.shields.io/badge/Source_Code-green?style=for-the-badge&logo=github)](https://github.com/pebula/node/tree/main/libs/decorate)

--------------

## @pebula/goosetyped

GooseTyped allows you to focus on building your models more clearly. Simplifying most of the domain specific concepts of mongoose resulting in a modern ORM code which in turn, allows taking advantage of modern JS features and design patterns.

[![Documentation](https://img.shields.io/badge/Documentation-9cf?style=for-the-badge)](https://pebula.github.io/node/docs-goosetyped)   ![npm (scoped)](https://img.shields.io/npm/v/@pebula/goosetyped?color=green&style=for-the-badge)  [![GitHub](https://img.shields.io/badge/Source_Code-green?style=for-the-badge&logo=github)](https://github.com/pebula/node/tree/main/libs/goosetyped)

--------------

## @pebula/nesbus

Hassle free service bus integration.
Provides a code-first approach to service bus entity management including provisioning.
With additional plugin system your service bus can now be turned CQRS with minimal effort.
Setting up service bus is now as simple as setting up an express server!

[![Documentation](https://img.shields.io/badge/Documentation-9cf?style=for-the-badge)](https://pebula.github.io/node/docs-nesbus)   ![npm (scoped)](https://img.shields.io/npm/v/@pebula/nesbus?color=green&style=for-the-badge)  [![GitHub](https://img.shields.io/badge/Source_Code-green?style=for-the-badge&logo=github)](https://github.com/pebula/node/tree/main/libs/nesbus)

--------------

<a id="footnote1" name="footnote1">1</a>: Most libraries will work on the browser but they are designed for node (i.e. performance, bundle size, etc...)
