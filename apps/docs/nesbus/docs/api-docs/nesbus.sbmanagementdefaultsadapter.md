<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/nesbus](./nesbus.md) &gt; [SbManagementDefaultsAdapter](./nesbus.sbmanagementdefaultsadapter.md)

## SbManagementDefaultsAdapter interface

**Signature:**

```typescript
export interface SbManagementDefaultsAdapter 
```

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

[entities?](./nesbus.sbmanagementdefaultsadapter.entities.md)


</td><td>


</td><td>

\{ queue?: [SbQueue](./nesbus.sbqueue.md)<!-- -->; topic?: [SbTopic](./nesbus.sbtopic.md)<!-- -->; subscription?: [SbSubscription](./nesbus.sbsubscription.md)<!-- -->; }


</td><td>

_(Optional)_


</td></tr>
</tbody></table>

## Methods

<table><thead><tr><th>

Method


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[onNewSubscriptionRules(topicName, subscriptionName, providedRules, subscriptionProvision)?](./nesbus.sbmanagementdefaultsadapter.onnewsubscriptionrules.md)


</td><td>

_(Optional)_ A function that can be used to create default set of rules that will be added when a new subscription is created. This function, when set, is fired at all time even if the user defined a static array or a dynamic function for the rules.

If the user provision defines a function for the rules it will be fired first and after that the default rules function will fire.

The rules from the user's provision is passed to this function and the result from this function will be used as the resolved rules for the subscription. I.E., for pass-through make sure you return the \`<!-- -->providedRules array.


</td></tr>
</tbody></table>
