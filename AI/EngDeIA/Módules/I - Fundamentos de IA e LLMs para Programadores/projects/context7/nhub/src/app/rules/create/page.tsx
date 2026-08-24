"use client";

import React from "react";
import AppShell from "@/components/layout/AppShell";
import RuleForm from "@/components/rules/RuleForm";
import { useRouter } from "next/navigation";
import type { NotificationRule } from "@/types/rule";
import { InlineNotification } from "@carbon/react";

export default function CreateRulePage() {
  const router = useRouter();

  function handleSave(partial: Partial<NotificationRule>) {
    // In a real app, this would POST to an API.
    // For the MVP we just navigate back to rules.
    router.push("/rules");
  }

  return (
    <AppShell>
      <div className="nhub-page-header">
        <h1 className="nhub-page-header__title">Create Notification Rule</h1>
        <p className="nhub-page-header__subtitle">
          Define a Salesforce event rule and configure how notifications are sent
        </p>
      </div>
      <div className="nhub-page-body">
        <RuleForm onSave={handleSave} />
      </div>
    </AppShell>
  );
}
