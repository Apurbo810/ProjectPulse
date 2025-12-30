export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Risk from "@/models/Risk";
import { getAuthUser } from "@/lib/getAuthUser";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAuthUser();

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    await connectDB();

    const risk = await Risk.findById(id);

    if (!risk) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(risk, { status: 200 });
  } catch (error) {
    console.error("GET risk error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

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
    const updates = await req.json();

    await connectDB();

    const risk = await Risk.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!risk) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(risk, { status: 200 });
  } catch (error) {
    console.error("PUT risk error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
