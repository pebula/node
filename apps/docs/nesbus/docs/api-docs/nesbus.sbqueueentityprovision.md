<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/nesbus](./nesbus.md) &gt; [SbQueueEntityProvision](./nesbus.sbqueueentityprovision.md)

## SbQueueEntityProvision interface

<b>Signature:</b>

```typescript
export interface SbQueueEntityProvision extends SbEntityProvision<SbQueue> 
```
<b>Extends:</b> SbEntityProvision&lt;[SbQueue](./nesbus.sbqueue.md)<!-- -->&gt;

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [deadLetter](./nesbus.sbqueueentityprovision.deadletter.md) | SbLinkedEntityProvisionOption | Define how the dead letter queue/topic is provisioned ("forwardDeadLetteredMessagesTo") &gt; Relevant only when "forwardDeadLetteredMessagesTo" has a value. |
|  [forward](./nesbus.sbqueueentityprovision.forward.md) | SbLinkedEntityProvisionOption | Define how the forward queue/topic is provisioned ("forwardTo") &gt; Relevant only when "forwardTo" has a value. |

