export const runtime = "nodejs";


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getAuthUser } from "@/lib/getAuthUser";

export async function GET() {
  await connectDB();

  const auth = await getAuthUser();

  if (!auth || auth.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const users = await User.find({}, "name email role");

  return NextResponse.json(users);
}
