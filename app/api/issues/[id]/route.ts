import { patchIssueSchema } from "@/app/validationSchema"; // Changed from createIssueSchema
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  // Use patchIssueSchema instead of createIssueSchema
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { assignedToUserId, title, description } = body;

  // Check if assignedToUserId is provided and not empty
  if (assignedToUserId && assignedToUserId !== "") {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId }
    });
    if (!user)
      return NextResponse.json({ error: 'Invalid user.' }, { status: 400 });
  }

  // Find the issue by ID
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  // Update the issue - handle empty string as null
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId: assignedToUserId === "" ? null : assignedToUserId
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({}, { status: 401 });

  try {
    // Find the issue by ID
    const issue = await prisma.issue.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!issue) {
      return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
    }

    // Delete the issue    
    await prisma.issue.delete({
      where: { id: issue.id },
    });

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete issue" },
      { status: 500 }
    );
  }
}