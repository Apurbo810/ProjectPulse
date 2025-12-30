import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Risk from "@/models/Risk";
import { getAuthUser } from "@/lib/getAuthUser";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const auth = await getAuthUser();

    if (auth.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const updates = await req.json();

    await connectDB();

    const risk = await Risk.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!risk) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(risk);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
