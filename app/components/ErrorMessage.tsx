import React, { PropsWithChildren } from "react";
import { Text } from "@radix-ui/themes";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <Text color="red" as="p" size="2" className="mt-1">
      {children}
    </Text>
  );
};

export default ErrorMessage;
