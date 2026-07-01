import React from "react";
import { Tag } from "@carbon/react";
import type { RuleStatus } from "@/types/rule";

const statusMap: Record<RuleStatus, { type: "green" | "red" | "gray"; label: string }> = {
  Active: { type: "green", label: "Active" },
  Inactive: { type: "red", label: "Inactive" },
  Draft: { type: "gray", label: "Draft" },
};

export default function StatusTag({ status }: { status: RuleStatus }) {
  const { type, label } = statusMap[status];
  return (
    <Tag type={type} size="sm">
      {label}
    </Tag>
  );
}
