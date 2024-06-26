<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/nesbus](./nesbus.md) &gt; [SbContext](./nesbus.sbcontext.md)

## SbContext class

**Signature:**

```typescript
export declare class SbContext<T extends keyof SbSubscriberTypeMap = keyof SbSubscriberTypeMap> extends BaseRpcContext<SbContextArgs<T>> 
```
**Extends:** BaseRpcContext&lt;[SbContextArgs](./nesbus.sbcontextargs.md)<!-- -->&lt;T&gt;&gt;

## Constructors

<table><thead><tr><th>

Constructor


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[(constructor)(args)](./nesbus.sbcontext._constructor_.md)


</td><td>


</td><td>

Constructs a new instance of the `SbContext` class


</td></tr>
</tbody></table>

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[type](./nesbus.sbcontext.type.md)


</td><td>

`readonly`


</td><td>

T


</td><td>


</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method


</th><th>

Modifiers


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[entityName()](./nesbus.sbcontext.entityname.md)


</td><td>


</td><td>

The entity name used to identify subscription/queue in service bus


</td></tr>
<tr><td>

[getData()](./nesbus.sbcontext.getdata.md)


</td><td>


</td><td>


</td></tr>
<tr><td>

[getMessage()](./nesbus.sbcontext.getmessage.md)


</td><td>


</td><td>


</td></tr>
<tr><td>

[resolveClient(emitterReference)](./nesbus.sbcontext.resolveclient.md)


</td><td>


</td><td>

Try to resolves a client (queue or topic emitter/sender) based on the entity name.

If an entity reference is not provided, the default reference is the entity used to emit messages to this subscriber. If this is a queue subscriber, it will be a queue emitter. If this is a subscription, it will be the topic of the subscription.

&gt; You can also provide a clientId to look the entity in.


</td></tr>
</tbody></table>
