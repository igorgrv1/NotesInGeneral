"use client";

import React, { useEffect, useState } from "react";
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  OverflowMenu,
  OverflowMenuItem,
  Button,
} from "@carbon/react";
import { Add } from "@carbon/icons-react";
import Link from "next/link";
import StatusTag from "@/components/layout/StatusTag";
import type { NotificationRule } from "@/types/rule";

const TABLE_HEADERS = [
  { key: "name", header: "Rule Name" },
  { key: "salesforceObject", header: "Object" },
  { key: "event", header: "Event" },
  { key: "conditionCount", header: "Conditions" },
  { key: "status", header: "Status" },
  { key: "updatedAt", header: "Last Updated" },
  { key: "actions", header: "Actions" },
];

interface RulesTableProps {
  rules: NotificationRule[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export default function RulesTable({
  rules,
  onToggleStatus,
  onDelete,
  onDuplicate,
}: RulesTableProps) {
  const rows = rules.map((r) => ({
    id: r.id,
    name: r.name,
    salesforceObject: r.salesforceObject,
    event: r.event,
    conditionCount: `${r.conditions.length} condition${r.conditions.length !== 1 ? "s" : ""}`,
    status: r.status,
    updatedAt: new Date(r.updatedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    actions: r.id,
  }));

  return (
    <DataTable rows={rows} headers={TABLE_HEADERS}>
      {({
        rows: tableRows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getTableContainerProps,
        getToolbarProps,
        onInputChange,
      }: any) => (
        <TableContainer
          title="Notification Rules"
          description="Manage your Salesforce event notification rules"
          {...getTableContainerProps()}
        >
          <TableToolbar {...getToolbarProps()}>
            <TableToolbarContent>
              <TableToolbarSearch
                onChange={onInputChange}
                placeholder="Search rules…"
                persistent
              />
              <Button
                renderIcon={Add}
                as={Link}
                href="/rules/create"
                kind="primary"
                size="md"
              >
                Create rule
              </Button>
            </TableToolbarContent>
          </TableToolbar>

          <Table {...getTableProps()} aria-label="Notification rules table">
            <TableHead>
              <TableRow>
                {headers.map((header: any) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
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
                            <Link href={`/rules/${rule.id}/edit`} style={{ color: "var(--cds-link-primary)" }}>
                              {cell.value}
                            </Link>
                          </TableCell>
                        );
                      }
                      if (cell.info.header === "actions") {
                        return (
                          <TableCell key={cell.id}>
                            <OverflowMenu
                              aria-label={`Actions for ${rule.name}`}
                              flipped
                            >
                              <OverflowMenuItem
                                itemText="Edit"
                                href={`/rules/${rule.id}/edit`}
                              />
                              <OverflowMenuItem
                                itemText="Duplicate"
                                onClick={() => onDuplicate(rule.id)}
                              />
                              <OverflowMenuItem
                                itemText={rule.status === "Active" ? "Disable" : "Enable"}
                                onClick={() => onToggleStatus(rule.id)}
                              />
                              <OverflowMenuItem
                                itemText="Delete"
                                isDelete
                                onClick={() => onDelete(rule.id)}
                              />
                            </OverflowMenu>
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
  );
}
