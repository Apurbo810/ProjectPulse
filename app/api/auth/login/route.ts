export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { comparePassword, signToken } from "@/lib/auth";


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user._id.toString(),
      role: user.role,
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        role: user.role,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ✅ REQUIRED
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
