import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchema";
import authOptions from "../auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json({},{status: 401});
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