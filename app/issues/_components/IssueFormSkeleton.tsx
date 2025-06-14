import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="3rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
