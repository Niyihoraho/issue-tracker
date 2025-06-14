"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button } from "@radix-ui/themes";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";

// Components
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

// Validation
import { createIssueSchema } from "@/app/validationSchema";
import { Issue } from "@/app/generated/prisma";
import delay from "delay";

// Types
interface IssueForm {
  title: string;
  description: string;
}

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = async (data: IssueForm) => {
    try {
      setIsSubmitting(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);

      // Show success feedback
      setShowAlert(true);
      reset();

      // Redirect after success
      setTimeout(() => {
        setShowAlert(false);
        router.push("/issues/list");
      }, 2000);
    } catch (error) {
      console.error("Failed to submit issue:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showAlert && (
        <div className="max-w-xl mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg bg-opacity-80">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">
              {issue
                ? "Success! Your issue has been updated."
                : "Success! Your issue has been submitted."}
            </span>
          </div>
        </div>
      )}

      {/* Form */}
      <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField.Root
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>

        <div>
          <Controller
            name="description"
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          {isSubmitting
            ? "Submitting..."
            : issue
              ? "Update Issue"
              : "Submit New Issue"}
        </Button>
      </form>
    </>
  );
};

export default IssueForm;
