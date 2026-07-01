"use client";

import React from "react";
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from "@carbon/react";
import { ArrowRight } from "@carbon/icons-react";
import Link from "next/link";
import StatusTag from "@/components/layout/StatusTag";
import type { NotificationRule } from "@/types/rule";

const HEADERS = [
  { key: "name", header: "Rule Name" },
  { key: "salesforceObject", header: "Object" },
  { key: "event", header: "Event" },
  { key: "status", header: "Status" },
  { key: "updatedAt", header: "Last Updated" },
];

interface DashboardRecentRulesProps {
  rules: NotificationRule[];
}

export default function DashboardRecentRules({ rules }: DashboardRecentRulesProps) {
  const rows = rules.map((r) => ({
    id: r.id,
    name: r.name,
    salesforceObject: r.salesforceObject,
    event: r.event,
    status: r.status,
    updatedAt: new Date(r.updatedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBlockEnd: "var(--cds-spacing-05)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--cds-productive-heading-02-font-size)",
            fontWeight: "var(--cds-productive-heading-02-font-weight)",
            color: "var(--cds-text-primary)",
          }}
        >
          Recent Rules
        </h2>
        <Button
          kind="ghost"
          renderIcon={ArrowRight}
          as={Link}
          href="/rules"
          size="sm"
        >
          View all rules
        </Button>
      </div>

      <DataTable rows={rows} headers={HEADERS}>
        {({
          rows: tableRows,
          headers,
          getHeaderProps,
          getRowProps,
          getTableProps,
          getTableContainerProps,
        }: any) => (
          <TableContainer {...getTableContainerProps()}>
            <Table {...getTableProps()} aria-label="Recent notification rules">
              <TableHead>
                <TableRow>
                  {headers.map((h: any) => (
                    <TableHeader key={h.key} {...getHeaderProps({ header: h })}>
                      {h.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableRows.map((row: any) => {
                  const rule = rules.find((r) => r.id === row.id)!;
                  return (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      {row.cells.map((cell: any) => {
                        if (cell.info.header === "status") {
                          return (
                            <TableCell key={cell.id}>
                              <StatusTag status={rule.status} />
                            </TableCell>
                          );
                        }
                        if (cell.info.header === "name") {
                          return (
                            <TableCell key={cell.id}>
                              <Link
                                href={`/rules/${rule.id}/edit`}
                                style={{ color: "var(--cds-link-primary)" }}
                              >
                                {cell.value}
                              </Link>
                            </TableCell>
                          );
                        }
                        return <TableCell key={cell.id}>{cell.value}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </div>
  );
}
