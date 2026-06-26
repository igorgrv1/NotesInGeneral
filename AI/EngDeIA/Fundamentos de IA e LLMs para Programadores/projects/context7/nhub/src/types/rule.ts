export type SalesforceObject = "Case" | "WorkOrder";

export type CaseEvent =
  | "Case Created"
  | "Case Updated"
  | "Case Status Changed";

export type WorkOrderEvent =
  | "WorkOrder Created"
  | "WorkOrder Updated"
  | "WorkOrder Status Changed";

export type RuleEvent = CaseEvent | WorkOrderEvent;

export type ConditionOperator = "AND" | "OR";
export type ComparisonOperator =
  | "is"
  | "is not"
  | "contains"
  | "does not contain"
  | "greater than"
  | "less than";

export interface Condition {
  id: string;
  field: string;
  operator: ComparisonOperator;
  value: string;
  logicalOperator?: ConditionOperator; // connects this condition to the NEXT one
}

export type NotificationType = "Email" | "Webhook" | "IBM Event Notification";

export type RuleStatus = "Active" | "Inactive" | "Draft";

export interface NotificationConfig {
  type: NotificationType;
  recipients: string[];
  messageTemplate: string;
  webhookUrl?: string;
}

export interface NotificationRule {
  id: string;
  name: string;
  description: string;
  status: RuleStatus;
  salesforceObject: SalesforceObject;
  event: RuleEvent;
  conditions: Condition[];
  notification: NotificationConfig;
  createdAt: string;
  updatedAt: string;
  notificationsSent: number;
}
