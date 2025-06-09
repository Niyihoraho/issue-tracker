import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod';
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title cannot exceed 255 characters"),
    description: z.string().min(1, "Description is required").max(65535, "Description too long")
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = createIssueSchema.safeParse(body);
        
        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation failed", details: validation.error.errors }, 
                { status: 400 }
            );
        }

        const newIssue = await prisma.issue.create({
            data: { 
                title: validation.data.title, 
                description: validation.data.description 
            }
        });

        return NextResponse.json(newIssue, { status: 201 });
        
    } catch (error) {
        console.error('Error creating issue:', error);
        return NextResponse.json(
            { error: "Internal server error" }, 
            { status: 500 }
        );
    }
}