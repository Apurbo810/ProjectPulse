export const runtime = "nodejs";


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Risk from "@/models/Risk";
import Project from "@/models/Project";
import { getAuthUser } from "@/lib/getAuthUser";
import { calculateProjectHealth } from "@/lib/healthScore";

export async function POST(req: Request) {
  try {
    const auth = await getAuthUser();

    if (auth.role !== "employee") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { projectId, title, severity, mitigationPlan } =
      await req.json();

    if (!projectId || !title || !severity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Ensure employee is assigned to project
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

    const risk = await Risk.create({
      projectId,
      title,
      severity,
      mitigationPlan,
    });

    // 🔥 Recalculate health score
    await calculateProjectHealth(projectId);

    return NextResponse.json(risk, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }

}

export async function GET() {
    try {
      const auth = await getAuthUser();
  
      if (auth.role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
  
      await connectDB();
  
      const risks = await Risk.find()
        .populate("projectId", "name")
        .sort({ createdAt: -1 });
  
      return NextResponse.json(risks);
    } catch {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }
  