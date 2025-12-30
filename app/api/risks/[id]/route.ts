import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Risk from "@/models/Risk";
import { getAuthUser } from "@/lib/getAuthUser";
import { calculateProjectHealth } from "@/lib/healthScore";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAuthUser();

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const { status } = await req.json();

    await connectDB();

    const risk = await Risk.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (risk) {
      await calculateProjectHealth(risk.projectId.toString());
    }

    return NextResponse.json(risk, { status: 200 });
  } catch (error) {
    console.error("PUT risk error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
