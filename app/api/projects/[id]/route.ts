//app/api/projects/[id]/route.ts


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { getAuthUser } from "@/lib/getAuthUser";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await getAuthUser();

    if (auth.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectDB();

    const project = await Project.findById(params.id)
      .populate("clientId", "name email")
      .populate("employeeIds", "name email");

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await getAuthUser();
    if (auth.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updates = await req.json();

    await connectDB();

    const project = await Project.findByIdAndUpdate(
      params.id,
      updates,
      { new: true }
    );

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
