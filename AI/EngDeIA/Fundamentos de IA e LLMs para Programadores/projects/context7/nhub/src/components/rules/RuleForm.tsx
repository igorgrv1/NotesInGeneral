"use client";

import React, { useState } from "react";
import {
  TextInput,
  TextArea,
  Dropdown,
  Select,
  SelectItem,
  Toggle,
  Button,
  InlineNotification,
  Form,
  FormGroup,
  MultiSelect,
} from "@carbon/react";
import { useRouter } from "next/navigation";
import ConditionBuilder from "@/components/condition-builder/ConditionBuilder";
import type {
  NotificationRule,
  SalesforceObject,
  RuleEvent,
  NotificationType,
  RuleStatus,
  Condition,
} from "@/types/rule";

const CASE_EVENTS: RuleEvent[] = [
  "Case Created",
  "Case Updated",
  "Case Status Changed",
];
const WORK_ORDER_EVENTS: RuleEvent[] = [
  "WorkOrder Created",
  "WorkOrder Updated",
  "WorkOrder Status Changed",
];
const NOTIFICATION_TYPES: NotificationType[] = [
  "Email",
  "Webhook",
  "IBM Event Notification",
];
const RECIPIENT_OPTIONS = [
  { id: "ops-team", label: "ops-team@company.com" },
  { id: "sla-team", label: "sla-team@company.com" },
  { id: "support-lead", label: "support-lead@company.com" },
  { id: "director-ops", label: "director-ops@company.com" },
  { id: "field-manager", label: "field-manager@company.com" },
];

const DEFAULT_CONDITION: Condition = {
  id: `cond-${Date.now()}`,
  field: "Status",
  operator: "is",
  value: "",
};

interface RuleFormProps {
  initialRule?: Partial<NotificationRule>;
  onSave: (rule: Partial<NotificationRule>) => void;
  isEdit?: boolean;
}

export default function RuleForm({ initialRule, onSave, isEdit = false }: RuleFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialRule?.name ?? "");
  const [description, setDescription] = useState(initialRule?.description ?? "");
  const [status, setStatus] = useState<RuleStatus>(initialRule?.status ?? "Active");
  const [sfObject, setSfObject] = useState<SalesforceObject>(
    initialRule?.salesforceObject ?? "Case"
  );
  const [event, setEvent] = useState<RuleEvent>(
    initialRule?.event ?? "Case Status Changed"
  );
  const [conditions, setConditions] = useState<Condition[]>(
    initialRule?.conditions?.length ? initialRule.conditions : [DEFAULT_CONDITION]
  );
  const [notifType, setNotifType] = useState<NotificationType>(
    initialRule?.notification?.type ?? "Email"
  );
  const [recipients, setRecipients] = useState<string[]>(
    initialRule?.notification?.recipients ?? []
  );
  const [messageTemplate, setMessageTemplate] = useState(
    initialRule?.notification?.messageTemplate ?? ""
  );
  const [webhookUrl, setWebhookUrl] = useState(
    initialRule?.notification?.webhookUrl ?? ""
  );
  const [error, setError] = useState<string | null>(null);

  const events = sfObject === "Case" ? CASE_EVENTS : WORK_ORDER_EVENTS;

  function handleObjectChange(obj: SalesforceObject) {
    setSfObject(obj);
    setEvent(obj === "Case" ? CASE_EVENTS[0] : WORK_ORDER_EVENTS[0]);
    setConditions([{ ...DEFAULT_CONDITION, id: `cond-${Date.now()}` }]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Rule name is required.");
      return;
    }
    if (conditions.some((c) => !c.value.trim())) {
      setError("All condition values must be filled in.");
      return;
    }
    setError(null);
    onSave({
      name: name.trim(),
      description: description.trim(),
      status,
      salesforceObject: sfObject,
      event,
      conditions,
      notification: {
        type: notifType,
        recipients,
        messageTemplate,
        ...(notifType === "Webhook" ? { webhookUrl } : {}),
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit} aria-label={isEdit ? "Edit rule form" : "Create rule form"}>
      {error && (
        <InlineNotification
          kind="error"
          title="Validation error"
          subtitle={error}
          onCloseButtonClick={() => setError(null)}
          style={{ marginBlockEnd: "var(--cds-spacing-06)" }}
        />
      )}

      {/* ── Basic Information ─────────────────────────────── */}
      <section className="nhub-form-section" aria-labelledby="section-basic">
        <h2 className="nhub-form-section__heading" id="section-basic">
          Basic Information
        </h2>
        <div className="nhub-form-row">
          <TextInput
            id="rule-name"
            labelText="Rule Name"
            placeholder="e.g. Critical Salesforce Cases"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
            invalid={!!error && !name.trim()}
            invalidText="Rule name is required"
          />
          <div>
            <label
              htmlFor="rule-status-toggle"
              className="cds--label"
              style={{ display: "block", marginBlockEnd: "var(--cds-spacing-03)" }}
            >
              Status
            </label>
            <Toggle
              id="rule-status-toggle"
              labelText=""
              labelA="Inactive"
              labelB="Active"
              toggled={status === "Active"}
              onToggle={(checked: boolean) =>
                setStatus(checked ? "Active" : "Inactive")
              }
            />
          </div>
        </div>
        <div className="nhub-form-row--full">
          <TextArea
            id="rule-description"
            labelText="Description"
            placeholder="Describe what this rule does…"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
            rows={3}
          />
        </div>
      </section>

      {/* ── Salesforce Object ─────────────────────────────── */}
      <section className="nhub-form-section" aria-labelledby="section-object">
        <h2 className="nhub-form-section__heading" id="section-object">
          Salesforce Object
        </h2>
        <div className="nhub-form-row">
          <Dropdown
            id="sf-object"
            titleText="Salesforce Object"
            label="Select object"
            items={["Case", "WorkOrder"] as SalesforceObject[]}
            itemToString={(item: SalesforceObject | null) => item ?? ""}
            selectedItem={sfObject}
            onChange={({ selectedItem }: { selectedItem: SalesforceObject | null }) =>
              handleObjectChange(selectedItem ?? "Case")
            }
          />
          <Dropdown
            id="sf-event"
            titleText="Trigger Event"
            label="Select event"
            items={events}
            itemToString={(item: RuleEvent | null) => item ?? ""}
            selectedItem={event}
            onChange={({ selectedItem }: { selectedItem: RuleEvent | null }) =>
              setEvent(selectedItem ?? events[0])
            }
          />
        </div>
      </section>

      {/* ── Condition Builder ─────────────────────────────── */}
      <section className="nhub-form-section" aria-labelledby="section-conditions">
        <h2 className="nhub-form-section__heading" id="section-conditions">
          Conditions
        </h2>
        <ConditionBuilder
          conditions={conditions}
          salesforceObject={sfObject}
          onChange={setConditions}
        />
      </section>

      {/* ── Notification Configuration ────────────────────── */}
      <section className="nhub-form-section" aria-labelledby="section-notif">
        <h2 className="nhub-form-section__heading" id="section-notif">
          Notification Configuration
        </h2>
        <div className="nhub-form-row">
          <Dropdown
            id="notif-type"
            titleText="Notification Type"
            label="Select type"
            items={NOTIFICATION_TYPES}
            itemToString={(item: NotificationType | null) => item ?? ""}
            selectedItem={notifType}
            onChange={({ selectedItem }: { selectedItem: NotificationType | null }) =>
              setNotifType(selectedItem ?? "Email")
            }
          />
          <MultiSelect
            id="notif-recipients"
            titleText="Recipients"
            label="Select recipients"
            items={RECIPIENT_OPTIONS}
            itemToString={(item: { id: string; label: string } | null) =>
              item ? item.label : ""
            }
            initialSelectedItems={RECIPIENT_OPTIONS.filter((o) =>
              recipients.includes(o.label)
            )}
            onChange={({
              selectedItems,
            }: {
              selectedItems: { id: string; label: string }[];
            }) => setRecipients(selectedItems.map((i) => i.label))}
          />
        </div>

        {notifType === "Webhook" && (
          <div className="nhub-form-row--full" style={{ marginBlockEnd: "var(--cds-spacing-05)" }}>
            <TextInput
              id="webhook-url"
              labelText="Webhook URL"
              placeholder="https://hooks.slack.com/services/…"
              value={webhookUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setWebhookUrl(e.target.value)
              }
            />
          </div>
        )}

        <div className="nhub-form-row--full">
          <TextArea
            id="message-template"
            labelText="Message Template"
            helperText="Use {{FieldName}} for dynamic values, e.g. {{CaseNumber}}"
            placeholder="Case {{CaseNumber}} has been updated…"
            value={messageTemplate}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessageTemplate(e.target.value)
            }
            rows={4}
          />
        </div>
      </section>

      {/* ── Actions ───────────────────────────────────────── */}
      <div style={{ display: "flex", gap: "var(--cds-spacing-04)" }}>
        <Button type="submit" kind="primary">
          {isEdit ? "Save changes" : "Create rule"}
        </Button>
        <Button
          kind="secondary"
          onClick={() => router.back()}
          type="button"
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
}
