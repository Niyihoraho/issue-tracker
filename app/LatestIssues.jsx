import React from "react";
import { Avatar, Badge, Card, Flex, Heading, Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { Link } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <Badge
                      color={
                        issue.status === "OPEN"
                          ? "red"
                          : issue.status === "IN_PROGRESS"
                            ? "violet"
                            : "green"
                      }
                    >
                      {issue.status}
                    </Badge>
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image}
                      fallback={issue.assignedToUser.name?.charAt(0) || "?"}
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
