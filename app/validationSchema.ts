import { z } from 'zod';

export const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title cannot exceed 255 characters"),
    description: z.string().min(1, "Description is required").max(65535, "Description too long")
});
 