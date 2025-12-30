export const runtime = "nodejs";


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Project from "@/models/Project";
import { hashPassword } from "@/lib/auth";

export async function POST() {
  try {
    await connectDB();

    // Prevent re-seeding
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      return NextResponse.json(
        { message: "Database already seeded" },
        { status: 400 }
      );
    }

    // Create users
    const admin = await User.create({
      name: "Admin User",
      email: "admin@projectpulse.com",
      password: await hashPassword("admin123"),
      role: "admin",
    });

    const employee = await User.create({
      name: "Employee User",
      email: "employee@projectpulse.com",
      password: await hashPassword("employee123"),
      role: "employee",
    });

    const client = await User.create({
      name: "Client User",
      email: "client@projectpulse.com",
      password: await hashPassword("client123"),
      role: "client",
    });

    // Create sample project
    const project = await Project.create({
      name: "Website Revamp Project",
      description: "Internal demo project for ProjectPulse",
      clientId: client._id,
      employeeIds: [employee._id],
      startDate: new Date(),
      endDate: new Date(
        new Date().setDate(new Date().getDate() + 30)
      ),
    });

    return NextResponse.json({
      message: "Database seeded successfully",
      credentials: {
        admin: {
          email: "admin@projectpulse.com",
          password: "admin123",
        },
        employee: {
          email: "employee@projectpulse.com",
          password: "employee123",
        },
        client: {
          email: "client@projectpulse.com",
          password: "client123",
        },
      },
      project,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Seeding failed" },
      { status: 500 }
    );
  }
}
