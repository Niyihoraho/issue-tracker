import React from "react";
import { Table, Badge } from "@radix-ui/themes";
import prisma from "@/prisma/client";

import IssueAction from "./IssueAction";
import { Link } from "@/app/components";

// Force dynamic rendering
export const dynamic = "force-dynamic";

// Define types if not importing from @prisma/client
type Status = "OPEN" | "IN_PROGRESS" | "CLOSED";

interface Issue {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
}

// Define the type for the status properties
interface StatusDetail {
  label: string;
  color: "red" | "violet" | "green";
}

const statusMap: Record<Status, StatusDetail> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

interface Props {
  searchParams: Promise<{ status?: Status }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  // Await the searchParams Promise
  const resolvedSearchParams = await searchParams;
  const status = resolvedSearchParams.status;

  // Fetch issues with optional filtering
  const issues = await prisma.issue.findMany({
    where: status ? { status: status } : {},
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <IssueAction />

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table.Root variant="surface" size="1">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="w-70">
                Issue
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="w-24">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="w-32">
                Created
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <div className="max-w-xs">
                    <div className="font-medium text-sm truncate">
                      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge color={statusMap[issue.status].color}>
                    {statusMap[issue.status].label}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="text-sm text-gray-600">
                  {issue.createdAt.toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-sm text-gray-900 flex-1 pr-2">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </h3>
              <Badge color={statusMap[issue.status].color}>
                {statusMap[issue.status].label}
              </Badge>
            </div>
            <div className="text-xs text-gray-500">
              Created: {issue.createdAt.toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {issues.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {status
              ? `No ${statusMap[status].label.toLowerCase()} issues found`
              : "No issues found"}
          </div>
        </div>
      )}
    </div>
  );
};

export default IssuesPage;
