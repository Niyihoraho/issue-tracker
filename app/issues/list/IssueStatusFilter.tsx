import { Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import React from "react";

const IssueStatusFilter = () => {
  const Statuses: { label: string; value: string }[] = [
    { label: "All", value: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by Status" />
      <Select.Content>
        {Statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
