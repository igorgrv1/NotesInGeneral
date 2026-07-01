import { NotificationRule } from "@/types/rule";

export const mockRules: NotificationRule[] = [
  {
    id: "rule-001",
    name: "Critical Salesforce Cases",
    description:
      "Alerts the operations team whenever a high-severity case is opened.",
    status: "Active",
    salesforceObject: "Case",
    event: "Case Status Changed",
    conditions: [
      {
        id: "cond-001-1",
        field: "Severity",
        operator: "is",
        value: "1",
        logicalOperator: "OR",
      },
      {
        id: "cond-001-2",
        field: "Severity",
        operator: "is",
        value: "2",
        logicalOperator: "AND",
      },
      {
        id: "cond-001-3",
        field: "Status",
        operator: "is",
        value: "New",
      },
    ],
    notification: {
      type: "Email",
      recipients: ["ops-team@company.com", "sla-team@company.com"],
      messageTemplate:
        "A critical case (Severity {{Severity}}) has been opened: {{Subject}}. Please review immediately.",
    },
    createdAt: "2024-09-15T08:30:00Z",
    updatedAt: "2024-11-20T14:15:00Z",
    notificationsSent: 87,
  },
  {
    id: "rule-002",
    name: "Work Order Overdue Alert",
    description:
      "Notifies field service managers when a work order remains open past its due date.",
    status: "Active",
    salesforceObject: "WorkOrder",
    event: "WorkOrder Status Changed",
    conditions: [
      {
        id: "cond-002-1",
        field: "Status",
        operator: "is",
        value: "In Progress",
        logicalOperator: "AND",
      },
      {
        id: "cond-002-2",
        field: "DueDate",
        operator: "less than",
        value: "TODAY",
      },
    ],
    notification: {
      type: "Webhook",
      recipients: [],
      messageTemplate:
        "Work order {{WorkOrderNumber}} is overdue. Assigned to: {{AssignedTo}}.",
      webhookUrl: "https://hooks.slack.com/services/T000/B000/xxx",
    },
    createdAt: "2024-10-01T10:00:00Z",
    updatedAt: "2024-12-05T09:45:00Z",
    notificationsSent: 34,
  },
  {
    id: "rule-003",
    name: "New Case Assignment Notification",
    description:
      "Sends an IBM Event Notification when a new case is created and assigned to a specific queue.",
    status: "Active",
    salesforceObject: "Case",
    event: "Case Created",
    conditions: [
      {
        id: "cond-003-1",
        field: "Owner.Queue",
        operator: "is",
        value: "Tier-2 Support",
      },
    ],
    notification: {
      type: "IBM Event Notification",
      recipients: ["tier2-queue@company.com"],
      messageTemplate:
        "New case {{CaseNumber}} assigned to Tier-2 Support. Subject: {{Subject}}.",
    },
    createdAt: "2024-08-22T12:00:00Z",
    updatedAt: "2025-01-10T11:30:00Z",
    notificationsSent: 215,
  },
  {
    id: "rule-004",
    name: "Work Order Completion Confirmation",
    description: "Notifies the customer when a work order is marked complete.",
    status: "Inactive",
    salesforceObject: "WorkOrder",
    event: "WorkOrder Updated",
    conditions: [
      {
        id: "cond-004-1",
        field: "Status",
        operator: "is",
        value: "Completed",
      },
    ],
    notification: {
      type: "Email",
      recipients: ["{{Account.Email}}"],
      messageTemplate:
        "Your service request {{WorkOrderNumber}} has been completed. Thank you for your business.",
    },
    createdAt: "2024-07-30T09:20:00Z",
    updatedAt: "2024-10-14T16:00:00Z",
    notificationsSent: 62,
  },
  {
    id: "rule-005",
    name: "Case Re-opened Alert",
    description: "Alerts the support lead when a previously closed case is re-opened.",
    status: "Draft",
    salesforceObject: "Case",
    event: "Case Updated",
    conditions: [
      {
        id: "cond-005-1",
        field: "Status",
        operator: "is",
        value: "Re-Opened",
        logicalOperator: "AND",
      },
      {
        id: "cond-005-2",
        field: "PreviousStatus",
        operator: "is",
        value: "Closed",
      },
    ],
    notification: {
      type: "Email",
      recipients: ["support-lead@company.com"],
      messageTemplate:
        "Case {{CaseNumber}} has been re-opened by {{Contact.Name}}. Previous resolution may need review.",
    },
    createdAt: "2025-01-05T14:00:00Z",
    updatedAt: "2025-01-05T14:00:00Z",
    notificationsSent: 0,
  },
  {
    id: "rule-006",
    name: "High Priority WorkOrder Escalation",
    description: "Escalates to director level when a high priority work order is created.",
    status: "Active",
    salesforceObject: "WorkOrder",
    event: "WorkOrder Created",
    conditions: [
      {
        id: "cond-006-1",
        field: "Priority",
        operator: "is",
        value: "High",
        logicalOperator: "AND",
      },
      {
        id: "cond-006-2",
        field: "Subject",
        operator: "contains",
        value: "Critical",
      },
    ],
    notification: {
      type: "IBM Event Notification",
      recipients: ["director-ops@company.com", "vp-services@company.com"],
      messageTemplate:
        "ESCALATION: High priority work order {{WorkOrderNumber}} created. Immediate attention required.",
    },
    createdAt: "2025-02-01T08:00:00Z",
    updatedAt: "2025-02-12T10:30:00Z",
    notificationsSent: 9,
  },
];

export const getTotalRules = () => mockRules.length;
export const getActiveRules = () =>
  mockRules.filter((r) => r.status === "Active").length;
export const getInactiveRules = () =>
  mockRules.filter((r) => r.status === "Inactive").length;
export const getTotalNotificationsSent = () =>
  mockRules.reduce((sum, r) => sum + r.notificationsSent, 0);
