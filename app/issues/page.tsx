import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";

const issuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-4">
        <Button size="2">
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>

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
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      issue.status === "OPEN"
                        ? "bg-green-100 text-green-800"
                        : issue.status === "IN_PROGRESS"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {issue.status}
                  </span>
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
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  issue.status === "OPEN"
                    ? "bg-green-100 text-green-800"
                    : issue.status === "IN_PROGRESS"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {issue.status}
              </span>
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

export default issuesPage;
