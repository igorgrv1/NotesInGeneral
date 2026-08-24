"use client";

import React from "react";
import AppShell from "@/components/layout/AppShell";
import RuleForm from "@/components/rules/RuleForm";
import { useRouter } from "next/navigation";
import { mockRules } from "@/data/mockRules";
import type { NotificationRule } from "@/types/rule";
import { InlineNotification } from "@carbon/react";

interface EditRulePageProps {
  params: { id: string };
}

export default function EditRulePage({ params }: EditRulePageProps) {
  const router = useRouter();
  const rule = mockRules.find((r) => r.id === params.id);

  if (!rule) {
    return (
      <AppShell>
        <div className="nhub-page-body">
          <InlineNotification
            kind="error"
            title="Rule not found"
            subtitle={`No rule with id "${params.id}" exists.`}
          />
        </div>
      </AppShell>
    );
  }

  function handleSave(partial: Partial<NotificationRule>) {
    // In a real app, this would PATCH the API.
    router.push("/rules");
  }

  return (
    <AppShell>
      <div className="nhub-page-header">
        <h1 className="nhub-page-header__title">Edit Rule</h1>
        <p className="nhub-page-header__subtitle">{rule.name}</p>
      </div>
      <div className="nhub-page-body">
        <RuleForm initialRule={rule} onSave={handleSave} isEdit />
      </div>
    </AppShell>
  );
}
