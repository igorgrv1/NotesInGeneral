"use client";

import React from "react";
import { Tile } from "@carbon/react";
import {
  Rule,
  CheckmarkFilled,
  ErrorFilled,
  SendAlt,
} from "@carbon/icons-react";

interface KpiTileProps {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ size?: number }>;
}

function KpiTile({ label, value, icon: Icon }: KpiTileProps) {
  return (
    <Tile id={`kpi-${label.replace(/\s+/g, "-").toLowerCase()}`}>
      <div className="nhub-kpi-tile">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <p className="nhub-kpi-tile__label">{label}</p>
          <Icon size={20} />
        </div>
        <p className="nhub-kpi-tile__value">{value}</p>
      </div>
    </Tile>
  );
}

interface DashboardKPIsProps {
  totalRules: number;
  activeRules: number;
  inactiveRules: number;
  notificationsSent: number;
}

export default function DashboardKPIs({
  totalRules,
  activeRules,
  inactiveRules,
  notificationsSent,
}: DashboardKPIsProps) {
  return (
    <div className="nhub-kpi-grid" role="region" aria-label="Key metrics">
      <KpiTile label="Total Rules" value={totalRules} icon={Rule} />
      <KpiTile label="Active Rules" value={activeRules} icon={CheckmarkFilled} />
      <KpiTile label="Inactive / Draft" value={inactiveRules} icon={ErrorFilled} />
      <KpiTile label="Notifications Sent" value={notificationsSent} icon={SendAlt} />
    </div>
  );
}
