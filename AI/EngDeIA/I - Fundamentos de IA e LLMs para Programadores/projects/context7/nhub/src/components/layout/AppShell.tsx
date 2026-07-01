"use client";

import React from "react";
import {
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from "@carbon/react";
import { Notification, Settings, Dashboard, Rule } from "@carbon/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="nhub-shell">
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }: {
          isSideNavExpanded: boolean;
          onClickSideNavExpand: () => void;
        }) => (
          <>
            <Header aria-label="NHub Notification Hub">
              <SkipToContent />
              <HeaderMenuButton
                aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
                aria-expanded={isSideNavExpanded}
              />
              <HeaderName href="/" prefix="IBM">
                NHub Notification Hub
              </HeaderName>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  aria-label="Notifications"
                  tooltipAlignment="end"
                >
                  <Notification size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Settings"
                  tooltipAlignment="end"
                >
                  <Settings size={20} />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent
              >
                <SideNavItems>
                  <SideNavLink
                    renderIcon={Dashboard}
                    href="/"
                    isActive={pathname === "/"}
                    element={Link}
                  >
                    Dashboard
                  </SideNavLink>
                  <SideNavMenu renderIcon={Rule} title="Rules" defaultExpanded>
                    <SideNavMenuItem
                      href="/rules"
                      isActive={pathname === "/rules"}
                      element={Link}
                    >
                      All Rules
                    </SideNavMenuItem>
                    <SideNavMenuItem
                      href="/rules/create"
                      isActive={pathname === "/rules/create"}
                      element={Link}
                    >
                      Create Rule
                    </SideNavMenuItem>
                  </SideNavMenu>
                </SideNavItems>
              </SideNav>
            </Header>
          </>
        )}
      />
      <main className="nhub-main-content" id="main-content">
        {children}
      </main>
    </div>
  );
}
