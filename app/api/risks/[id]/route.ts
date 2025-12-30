import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Risk from "@/models/Risk";
import { getAuthUser } from "@/lib/getAuthUser";
import { calculateProjectHealth } from "@/lib/healthScore";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await getAuthUser();

    if (auth.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { status } = await req.json();

    await connectDB();

    const risk = await Risk.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (risk) {
      await calculateProjectHealth(risk.projectId.toString());
    }

    return NextResponse.json(risk);
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
