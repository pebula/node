<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@pebula/nesbus](./nesbus.md) &gt; [SbTopicSubscriptionEntityProvision](./nesbus.sbtopicsubscriptionentityprovision.md)

## SbTopicSubscriptionEntityProvision interface

<b>Signature:</b>

```typescript
export interface SbTopicSubscriptionEntityProvision extends SbEntityProvision<SbSubscription> 
```
<b>Extends:</b> SbEntityProvision&lt;[SbSubscription](./nesbus.sbsubscription.md)<!-- -->&gt;

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [deadLetter](./nesbus.sbtopicsubscriptionentityprovision.deadletter.md) | SbLinkedEntityProvisionOption | Define how the dead letter topic is provisioned ("forwardDeadLetteredMessagesTo") &gt; Relevant only when "forwardDeadLetteredMessagesTo" has a value. |
|  [forward](./nesbus.sbtopicsubscriptionentityprovision.forward.md) | SbLinkedEntityProvisionOption | Define how the forward queue/topic is provisioned ("forwardTo") &gt; Relevant only when "forwardTo" has a value. |
|  [rules](./nesbus.sbtopicsubscriptionentityprovision.rules.md) | [SbRuleEntityProvision](./nesbus.sbruleentityprovision.md)<!-- -->\[\] \| ((topicName: string, subscriptionName: string) =&gt; [SbRuleEntityProvision](./nesbus.sbruleentityprovision.md)<!-- -->\[\]) | A list of rules (actions/filters) to apply to the subscription or, a function that results a list of rules dynamically. |
|  [topic](./nesbus.sbtopicsubscriptionentityprovision.topic.md) | [SbEntityProvisionOption](./nesbus.sbentityprovisionoption.md)<!-- -->&lt;[SbTopicEntityProvision](./nesbus.sbtopicentityprovision.md)<!-- -->&gt; | Define how the topic for this subscription is provisioned. Unlike "deadLetter", the default behavior is "skip" as it is usually the role of the topic's owner to create it. |

