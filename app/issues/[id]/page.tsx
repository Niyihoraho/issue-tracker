import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  Heading,
  Flex,
  Text,
  Card,
  Badge,
  Grid,
  Box,
  Button,
} from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

interface Props {
  params: { id: string };
}

const statusMap = {
  OPEN: { label: "Open", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "blue" },
  CLOSED: { label: "Closed", color: "gray" },
} as const;

const IssueDetailPage = async ({ params }: Props) => {
  const issueId = parseInt(params.id);

  if (isNaN(issueId)) return notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) return notFound();

  const status = statusMap[issue.status as keyof typeof statusMap];

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex className="space-x-3" my="2">
          <Badge color={status?.color || "gray"}>
            {status?.label || issue.status}
          </Badge>
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
