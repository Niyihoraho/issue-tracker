import React from "react";
import { TextField, Button } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueFormPage = () => {
  return (
    <>
      {/* Form */}
      <form className="max-w-xl space-y-3">
        {/* Title Field */}
        <div>
          <TextField.Root placeholder="Title" disabled />
          <div className="mt-1">
            <Skeleton height={20} width={200} />
          </div>
        </div>

        {/* Description Field */}
        <div>
          <div className="border rounded-md p-3 bg-gray-50 min-h-[200px] flex flex-col space-y-2">
            <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
              <Skeleton height={20} width={60} />
              <Skeleton height={20} width={80} />
              <Skeleton height={20} width={40} />
              <Skeleton height={20} width={50} />
            </div>
            <div className="flex-1 space-y-2 pt-2">
              <Skeleton height={16} />
              <Skeleton height={16} width="80%" />
              <Skeleton height={16} width="60%" />
              <Skeleton height={16} width="90%" />
              <Skeleton height={16} width="70%" />
            </div>
          </div>
          <div className="mt-1">
            <Skeleton height={20} width={180} />
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled>
          <Skeleton height={20} width={120} />
        </Button>
      </form>
    </>
  );
};

export default LoadingIssueFormPage;
