import { Grid, Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";

const LoadingIssueDetailPage = () => {
  return (
    <div>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Box>
          <Skeleton />
        </Box>
        <Box>
          <Skeleton />
        </Box>
      </Grid>
    </div>
  );
};

export default LoadingIssueDetailPage;
