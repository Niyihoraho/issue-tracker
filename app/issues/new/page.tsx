import React from "react";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  loading: () => <IssueFormSkeleton />,
});

const NewIssues = () => {
  return (
    <>
      <IssueForm />
    </>
  );
};

export default NewIssues;
