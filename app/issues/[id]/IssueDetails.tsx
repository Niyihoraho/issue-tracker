"use client";
import { Issue } from "@/app/generated/prisma";
import { Heading, Flex, Badge, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const statusMap = {
  OPEN: { label: "Open", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "blue" },
  CLOSED: { label: "Closed", color: "gray" },
} as const;

const IssueDetails = ({ issue }: { issue: Issue }) => {
  const status = statusMap[issue.status as keyof typeof statusMap];
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <Badge color={status?.color || "gray"}>
          {status?.label || issue.status}
        </Badge>
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
