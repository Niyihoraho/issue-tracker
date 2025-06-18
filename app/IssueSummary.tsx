import { Card, Flex, Text } from "@radix-ui/themes";
import { Link } from "./components";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: "open" | "inProgress" | "closed";
  }[] = [
    { label: "Open Issues", value: open, status: "open" },
    { label: "In Progress", value: inProgress, status: "inProgress" },
    { label: "Closed Issues", value: closed, status: "closed" },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
