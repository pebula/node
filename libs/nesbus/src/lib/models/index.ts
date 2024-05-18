import {
    QueueProperties,
    TopicProperties,
    SubscriptionProperties,
    RuleProperties,
    SqlRuleFilter,
    CorrelationRuleFilter
} from '@azure/service-bus';

export type SbQueue = Partial<Omit<QueueProperties, 'name'>>;
export type SbTopic = Partial<Omit<TopicProperties, 'name'>>;
export type SbSubscription = Partial<Omit<SubscriptionProperties, 'subscriptionName' | 'topicName'>>;
export type SbRule = Partial<Omit<RuleProperties, 'createdAt'>>;
export type SbSqlFilter = Omit<SqlRuleFilter, 'sqlParameters'>;
export type SbCorrelationFilter = Partial<CorrelationRuleFilter>;