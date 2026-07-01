"use client";

import React, { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import RulesTable from "@/components/rules/RulesTable";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@carbon/react";
import { mockRules } from "@/data/mockRules";
import type { NotificationRule, RuleStatus } from "@/types/rule";

export default function RulesPage() {
  const [rules, setRules] = useState<NotificationRule[]>(mockRules);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  function handleToggleStatus(id: string) {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next: RuleStatus =
          r.status === "Active" ? "Inactive" : "Active";
        return { ...r, status: next, updatedAt: new Date().toISOString() };
      })
    );
  }

  function handleDelete(id: string) {
    setDeleteTarget(id);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setRules((prev) => prev.filter((r) => r.id !== deleteTarget));
    setDeleteTarget(null);
  }

  function handleDuplicate(id: string) {
    const source = rules.find((r) => r.id === id);
    if (!source) return;
    const copy: NotificationRule = {
      ...source,
      id: `rule-${Date.now()}`,
      name: `${source.name} (Copy)`,
      status: "Draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notificationsSent: 0,
    };
    setRules((prev) => [copy, ...prev]);
  }

  const deleteRule = rules.find((r) => r.id === deleteTarget);

  return (
    <AppShell>
      <div className="nhub-page-header">
        <h1 className="nhub-page-header__title">Notification Rules</h1>
        <p className="nhub-page-header__subtitle">
          Create and manage rules that monitor Salesforce events and trigger notifications
        </p>
      </div>
      <div className="nhub-page-body">
        <RulesTable
          rules={rules}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!deleteTarget}
        onRequestClose={() => setDeleteTarget(null)}
        onRequestSubmit={confirmDelete}
        modalHeading="Delete rule"
        modalLabel="Confirm action"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        danger
        size="sm"
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>{deleteRule?.name}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </AppShell>
  );
}
