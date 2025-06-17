"use client";
import { Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current status from URL params
  const currentStatus = searchParams.get("status") || "ALL";

  const Statuses: { label: string; value: string }[] = [
    { label: "All", value: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const handleStatusChange = (status: string) => {
    if (status === "ALL") {
      router.push("/issues/list");
    } else {
      router.push(`/issues/list?status=${status}`);
    }
  };

  return (
    <Select.Root value={currentStatus} onValueChange={handleStatusChange}>
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
