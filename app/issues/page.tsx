import React from "react";
import { Button, Table, Badge } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import delay from "delay";
import IssueAction from "./IssueAction";

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
  color: "red" | "violet" | "green"; // Be specific with the color types
}

const statusMap: Record<Status, StatusDetail> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssuesPage = async () => {
  const issues: Issue[] = await prisma.issue.findMany();
  await delay(2000);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <IssueAction />

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table.Root variant="surface" size="1">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="w-80">
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
                      {issue.title}
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    color={statusMap[issue.status].color}
                    variant="outline"
                  >
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
                {issue.title}
              </h3>
              <Badge color={statusMap[issue.status].color} variant="outline">
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
          <div className="text-gray-500 mb-4">No issues found</div>
          <Button>
            <Link href="/issues/new">Create your first issue</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default IssuesPage;
