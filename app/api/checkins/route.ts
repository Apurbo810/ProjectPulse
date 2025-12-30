import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Checkin from "@/models/Checkin";
import Project from "@/models/Project";
import { getAuthUser } from "@/lib/getAuthUser";
import { calculateProjectHealth } from "@/lib/healthScore";

/**
 * CREATE WEEKLY CHECK-IN (EMPLOYEE)
 */
export async function POST(req: Request) {
  try {
    const auth = await getAuthUser();

    if (auth.role !== "employee") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const {
      projectId,
      progressSummary,
      blockers,
      confidenceLevel,
      completionPercent,
    } = await req.json();

    if (
      !projectId ||
      !progressSummary ||
      !confidenceLevel ||
      completionPercent === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check employee is assigned to project
    const project = await Project.findOne({
      _id: projectId,
      employeeIds: auth.userId,
    });

    if (!project) {
      return NextResponse.json(
        { error: "Not assigned to this project" },
        { status: 403 }
      );
    }

    // Calculate week start (Monday)
    const now = new Date();
    const weekStart = new Date(
      now.setDate(now.getDate() - now.getDay() + 1)
    );
    weekStart.setHours(0, 0, 0, 0);

    const checkin = await Checkin.create({
      projectId,
      employeeId: auth.userId,
      progressSummary,
      blockers,
      confidenceLevel,
      completionPercent,
      weekStart,
    });

    
    await calculateProjectHealth(projectId);


    return NextResponse.json(checkin, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Weekly check-in already submitted" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
