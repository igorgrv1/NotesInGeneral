"use client";

import React, { useState, useId } from "react";
import {
  Button,
  Dropdown,
  TextInput,
  IconButton,
} from "@carbon/react";
import { Add, TrashCan, ArrowsHorizontal } from "@carbon/icons-react";
import type {
  Condition,
  ConditionOperator,
  ComparisonOperator,
} from "@/types/rule";

const COMPARISON_OPERATORS: ComparisonOperator[] = [
  "is",
  "is not",
  "contains",
  "does not contain",
  "greater than",
  "less than",
];

const CASE_FIELDS = [
  "Status",
  "Severity",
  "Priority",
  "Subject",
  "Owner.Queue",
  "PreviousStatus",
  "Contact.Name",
  "Account.Name",
];

const WORK_ORDER_FIELDS = [
  "Status",
  "Priority",
  "Subject",
  "DueDate",
  "AssignedTo",
  "Account.Name",
  "WorkOrderNumber",
];

interface ConditionBuilderProps {
  conditions: Condition[];
  salesforceObject: "Case" | "WorkOrder";
  onChange: (conditions: Condition[]) => void;
}

export default function ConditionBuilder({
  conditions,
  salesforceObject,
  onChange,
}: ConditionBuilderProps) {
  const uid = useId();
  const fields = salesforceObject === "Case" ? CASE_FIELDS : WORK_ORDER_FIELDS;

  function addCondition() {
    const newCondition: Condition = {
      id: `cond-${Date.now()}`,
      field: fields[0],
      operator: "is",
      value: "",
      logicalOperator: conditions.length > 0 ? "AND" : undefined,
    };
    onChange([...conditions, newCondition]);
  }

  function removeCondition(index: number) {
    const updated = conditions.filter((_, i) => i !== index);
    // Ensure first condition has no logicalOperator
    if (updated.length > 0) {
      updated[0] = { ...updated[0], logicalOperator: undefined };
    }
    onChange(updated);
  }

  function updateCondition(index: number, patch: Partial<Condition>) {
    const updated = conditions.map((c, i) =>
      i === index ? { ...c, ...patch } : c
    );
    onChange(updated);
  }

  function toggleOperator(index: number) {
    const current = conditions[index].logicalOperator ?? "AND";
    const next: ConditionOperator = current === "AND" ? "OR" : "AND";
    updateCondition(index, { logicalOperator: next });
  }

  return (
    <div className="nhub-condition-builder" role="group" aria-label="Condition builder">
      {conditions.map((condition, index) => (
        <React.Fragment key={condition.id}>
          {/* Logical operator badge between conditions */}
          {index > 0 && (
            <button
              type="button"
              className="nhub-condition-builder__operator-badge"
              onClick={() => toggleOperator(index)}
              aria-label={`Toggle logical operator (currently ${condition.logicalOperator})`}
              title="Click to toggle AND / OR"
            >
              {condition.logicalOperator ?? "AND"}
            </button>
          )}

          <div className="nhub-condition-builder__row">
            {/* Field */}
            <Dropdown
              id={`${uid}-field-${index}`}
              titleText="Field"
              label="Select field"
              items={fields}
              itemToString={(item: string | null) => item ?? ""}
              selectedItem={condition.field}
              onChange={({ selectedItem }: { selectedItem: string | null }) =>
                updateCondition(index, { field: selectedItem ?? fields[0] })
              }
            />

            {/* Operator */}
            <Dropdown
              id={`${uid}-op-${index}`}
              titleText="Operator"
              label="Select operator"
              items={COMPARISON_OPERATORS}
              itemToString={(item: string | null) => item ?? ""}
              selectedItem={condition.operator}
              onChange={({ selectedItem }: { selectedItem: ComparisonOperator | null }) =>
                updateCondition(index, { operator: selectedItem ?? "is" })
              }
            />

            {/* Value */}
            <TextInput
              id={`${uid}-val-${index}`}
              labelText="Value"
              value={condition.value}
              placeholder="Enter value"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateCondition(index, { value: e.target.value })
              }
            />

            {/* Remove button */}
            <IconButton
              label="Remove condition"
              kind="ghost"
              size="md"
              onClick={() => removeCondition(index)}
              disabled={conditions.length === 1}
            >
              <TrashCan size={16} />
            </IconButton>
          </div>
        </React.Fragment>
      ))}

      <div className="nhub-condition-builder__add-btn">
        <Button
          kind="ghost"
          renderIcon={Add}
          size="sm"
          onClick={addCondition}
        >
          Add condition
        </Button>
      </div>
    </div>
  );
}
