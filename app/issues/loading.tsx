import React from "react";
import { Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import IssueAction from "./IssueAction";

const LoadingIssuePage = () => {
  const issues = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div>
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
              <Table.Row key={issue}>
                <Table.Cell>
                  <div className="max-w-xs">
                    <div className="font-medium text-sm truncate">
                      <Skeleton />
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Skeleton />
                </Table.Cell>
                <Table.Cell className="text-sm text-gray-600">
                  <Skeleton />
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
            key={issue}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-sm text-gray-900 flex-1 pr-2">
                <Skeleton />
              </h3>
              <Skeleton />
            </div>
            <div className="text-xs text-gray-500">
              <Skeleton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingIssuePage;
