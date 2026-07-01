import AppShell from "@/components/layout/AppShell";
import DashboardKPIs from "@/components/dashboard/DashboardKPIs";
import DashboardRecentRules from "@/components/dashboard/DashboardRecentRules";
import {
  mockRules,
  getActiveRules,
  getInactiveRules,
  getTotalRules,
  getTotalNotificationsSent,
} from "@/data/mockRules";

export default function DashboardPage() {
  const recentRules = mockRules.slice(0, 5);

  return (
    <AppShell>
      <div className="nhub-page-header">
        <h1 className="nhub-page-header__title">Dashboard</h1>
        <p className="nhub-page-header__subtitle">
          Overview of your notification rules and activity
        </p>
      </div>
      <div className="nhub-page-body">
        <DashboardKPIs
          totalRules={getTotalRules()}
          activeRules={getActiveRules()}
          inactiveRules={getInactiveRules()}
          notificationsSent={getTotalNotificationsSent()}
        />
        <DashboardRecentRules rules={recentRules} />
      </div>
    </AppShell>
  );
}
