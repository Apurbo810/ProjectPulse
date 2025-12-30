import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Feedback from "@/models/Feedback";
import Project from "@/models/Project";
import { getAuthUser } from "@/lib/getAuthUser";
import { calculateProjectHealth } from "@/lib/healthScore";
/**
 * CREATE WEEKLY CLIENT FEEDBACK
 */
export async function POST(req: Request) {
  try {
    const auth = await getAuthUser();

    if (auth.role !== "client") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const {
      projectId,
      satisfactionRating,
      communicationRating,
      comment,
      flagIssue,
    } = await req.json();

    if (!projectId || !satisfactionRating || !communicationRating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Ensure client is assigned to this project
    const project = await Project.findOne({
      _id: projectId,
      clientId: auth.userId,
    });

    if (!project) {
      return NextResponse.json(
        { error: "Not authorized for this project" },
        { status: 403 }
      );
    }

    // Calculate week start (Monday)
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = new Date(now.setDate(diff));
    weekStart.setHours(0, 0, 0, 0);

    const feedback = await Feedback.create({
      projectId,
      clientId: auth.userId,
      satisfactionRating,
      communicationRating,
      comment,
      flagIssue: flagIssue ?? false,
      weekStart,
    });

    await calculateProjectHealth(projectId);


    return NextResponse.json(feedback, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Weekly feedback already submitted" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
