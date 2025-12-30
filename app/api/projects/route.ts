//app/api/projects/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import User from "@/models/User";
import { getAuthUser } from "@/lib/getAuthUser";

/**
 * CREATE PROJECT (ADMIN)
 */
export async function POST(req: Request) {
  try {
    const auth = await getAuthUser();


    if (auth.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const {
      name,
      description,
      clientId,
      employeeIds,
      startDate,
      endDate,
    } = await req.json();

    if (!name || !clientId || !employeeIds?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    // Validate client
    const client = await User.findById(clientId);
    if (!client || client.role !== "client") {
      return NextResponse.json(
        { error: "Invalid client" },
        { status: 400 }
      );
    }

    // Validate employees
    const employees = await User.find({
      _id: { $in: employeeIds },
      role: "employee",
    });

    if (employees.length !== employeeIds.length) {
      return NextResponse.json(
        { error: "Invalid employee list" },
        { status: 400 }
      );
    }

    const project = await Project.create({
      name,
      description,
      clientId,
      employeeIds,
      startDate,
      endDate,
    });

    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

/**
 * LIST PROJECTS (ADMIN)
 */
export async function GET() {
  try {
    const auth = await getAuthUser();

    await connectDB();

    // 🔵 ADMIN → all projects
    if (auth.role === "admin") {
      const projects = await Project.find()
        .populate("clientId", "name email")
        .populate("employeeIds", "name email");

      return NextResponse.json(projects);
    }

    // 🟢 EMPLOYEE → assigned projects only
    if (auth.role === "employee") {
      const projects = await Project.find({
        employeeIds: auth.userId, // 🔥 THIS IS KEY
      })
        .populate("clientId", "name email");

      return NextResponse.json(projects);
    }

    // 🟣 CLIENT → their projects only
    if (auth.role === "client") {
      const projects = await Project.find({
        clientId: auth.userId,
      })
        .populate("employeeIds", "name email");

      return NextResponse.json(projects);
    }

    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}


