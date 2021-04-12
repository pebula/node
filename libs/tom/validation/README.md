# tom/validation

Validation library using TOM schemas (JIT & Runtime).

## Terminology

### Type

A type is a class, each type is unique and you can create objects for a type (instances).

### Schema

A schema is an objects holding definitions for a **type**.  
There are many types of definitions, for validation we focus on:

- Type structure definition (properties, and type definitions for each property)
- Type constraint definitions (constraints applied for each property)

### Constraint

Logic that checks if a value is valid based on criteria unique to the constraint.

> For example, a **positive** constraint will check if a numeric value is greater then or equal to 0.

A constraint might also except dynamic values.

> For example, a **minimum** constraint will check if a numeric value is greater then a value
that we pre-set dynamically.

Using constraints, we compose the desired validation behavior.  
A **schema** will have properties, each property hold a list of constraints (0 to N).

### Validator

Holds the **schema** for multiple **types** and allow running validating objects of the types known to it.

A validator will use the schema to extract the properties and for each property extract the constraints and invoke each constraint to make sure the object is value.
